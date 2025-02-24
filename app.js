const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');
const express = require('express');

const app = express();

// 정적 파일 서비스
app.use(express.static(path.join(__dirname, 'public')));

// EJS를 뷰 엔진으로 사용
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 데이터베이스 설정
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'ddinghost'
};

// API 데이터 가져오기 및 데이터베이스 저장
const fetchDataAndStoreInDB = async () => {
  try {
    const response = await axios.get('http://apis.data.go.kr/3130000/openapi/floatingPopulation/getfloatingPopulation', {
      params: {
        serviceKey: 'dFxt8tFz/VBYDSYGtl6SG7MTLy95uwA4qCgLwwoWcBsT3sHm1KZzrLKOYqUkxR/ZFujGL4+Z/Ety3YHsFO0Yqw==',
        numOfRows: '1000',
        pageNo: '4',
        sortKey: '',
        filterKey: '',
        filterValues: '',
        type: 'xml',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const parser = new xml2js.Parser();
    const { data } = response;

    parser.parseStringPromise(data)
      .then(async (result) => {
        const items = result.response.item;

        if (!items) {
          console.error('No items found in the XML response.');
          return;
        }

        const connection = await mysql.createConnection(dbConfig);
        // pop 테이블의 모든 데이터 삭제
        await connection.execute('DELETE FROM pop');

        for (const item of items) {
          const newItem = {
            grid_id: item.grid_id[0],
            _left: item._left[0],
            top: item.top[0],
            _right: item._right[0],
            bottom: item.bottom[0],
            _14age: item._14age[0],
            _20_50T21_: item._20_50T21_[0],
            _65age_: item._65age_[0],
            _20_60T9_18: item._20_60T9_18[0],
            weekend: item.weekend[0],
            addr: item.addr[0],
          };

          const insertQuery = `
            INSERT INTO pop (grid_id, _left, top, _right, bottom, _14age, _20_50T21_, _65age_, _20_60T9_18, weekend, addr)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          await connection.execute(insertQuery, [
            newItem.grid_id,
            newItem._left,
            newItem.top,
            newItem._right,
            newItem.bottom,
            newItem._14age,
            newItem._20_50T21_,
            newItem._65age_,
            newItem._20_60T9_18,
            newItem.weekend,
            newItem.addr,
          ]);
        }

        await connection.end();
      })
      .catch((err) => {
        console.error('Error parsing XML:', err);
      });
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    if (error.response) {
      console.error('Status code:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
};

// 데이터 가져오기 및 데이터베이스 저장
fetchDataAndStoreInDB();

// 데이터베이스에서 데이터 가져오기
const fetchDataFromDatabase = async () => {
  try {
    // 데이터베이스 연결
    const connection = await mysql.createConnection(dbConfig);

    // pop 테이블에서 데이터 가져오기
    const [rows, fields] = await connection.execute('SELECT * FROM pop');

    // 데이터베이스 연결 종료
    await connection.end();

    console.log('데이터베이스에서 데이터를 성공적으로 가져왔습니다.');

    return rows;
  } catch (error) {
    console.error('데이터베이스에서 데이터를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 데이터 가져오기 라우터
app.get('/data', async (req, res) => {
  try {
    // 데이터베이스 연결
    const connection = await mysql.createConnection(dbConfig);

    // 데이터베이스에서 데이터 가져오기
    const [rows, fields] = await connection.execute('SELECT * FROM pop');

    // 데이터베이스 연결 종료
    await connection.end();

    // 데이터를 클라이언트에게 전송
    res.json(rows);
    // console.log(rows)
  } catch (error) {
    console.error('데이터베이스에서 데이터를 가져오는 중 오류가 발생했습니다:', error);
    res.status(500).send('내부 서버 오류');
  }
});

// 루트 경로에 대한 핸들러
app.get('/', async (req, res) => {
  try {
    // 데이터베이스 연결
    const connection = await mysql.createConnection(dbConfig);

    // 데이터베이스에서 데이터 가져오기
    const [rows, fields] = await connection.execute('SELECT * FROM pop');

    // 데이터베이스 연결 종료
    await connection.end();

    // 데이터를 렌더링할 템플릿에 전달하고 페이지 렌더링
    res.render('index', { rows });
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 데이터 가져오기 엔드포인트
app.get('/data', async (req, res) => {
  try {
    // 데이터베이스에서 데이터 가져오기
    const dbData = await fetchDataFromDatabase();

    // API에서 데이터 가져오기
    const apiData = await fetchDataFromAPI();

    // 중복된 데이터 필터링
    const uniqueData = apiData.filter(item => !dbData.some(dbItem => dbItem._left === item._left && dbItem.top === item.top && dbItem._right === item._right && dbItem.bottom === item.bottom && dbItem.weekend === item.weekend));

    // 데이터베이스에 저장
    await saveDataToDatabase(uniqueData);

    // 클라이언트에게 API에서 받아온 데이터 전송
    res.json(uniqueData);

     // 데이터를 클라이언트에게 전송
     res.json(rows);

    // 데이터 로깅
    console.log('Received data from API:', uniqueData);
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 서버 리스닝
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
