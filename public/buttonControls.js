// buttonControls.js

// 버튼을 생성하고 스타일을 지정합니다.
const weekendBtn = document.createElement('button');
weekendBtn.textContent = '주중 유동인구 버전';
document.body.appendChild(weekendBtn);

const age14Btn = document.createElement('button');
age14Btn.textContent = '14세 이하 버전';
document.body.appendChild(age14Btn);

const age20_50Btn = document.createElement('button');
age20_50Btn.textContent = '20대 ~ 50대 버전';
document.body.appendChild(age20_50Btn);

const age65Btn = document.createElement('button');
age65Btn.textContent = '65세 이상 버전';
document.body.appendChild(age65Btn);

const age20_60Btn = document.createElement('button');
age20_60Btn.textContent = '20세 이상 60세 미만 버전';
document.body.appendChild(age20_60Btn);


// 주말 유동인구 데이터 처리
function processWeekendData() {
  // 이전에 있던 모든 격자 삭제
  map.eachLayer(function (layer) {
    if (layer instanceof L.Rectangle) {
      map.removeLayer(layer);
    }
  });

  // 새로운 유동인구 데이터를 가져와서 처리하는 로직 추가
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      console.log('새로운 데이터를 정상적으로 가져왔습니다.');
      console.log(data);  // 데이터 콘솔 출력

      // 각 주소별 유동인구 값의 총합과 개수를 저장할 객체
      const sumValues = {};
      const countValues = {};

      // 데이터 배열을 순회하면서 유동인구 값의 총합과 개수를 계산
      data.forEach(item => {
        const addr = item.addr;
        const value = parseFloat(item.value);

        // 주소별로 유동인구 값의 총합과 개수를 업데이트
        if (!isNaN(value)) {
          if (!sumValues[addr]) {
            sumValues[addr] = value;
            countValues[addr] = 1;
          } else {
            sumValues[addr] += value;
            countValues[addr] += 1;
          }
        }
      });

      // 각 주소별 유동인구 값의 평균을 계산하고 격자의 배경색을 설정
      const averageValues = {};
      for (const addr in sumValues) {
        const averageValue = sumValues[addr] / countValues[addr];
        averageValues[addr] = averageValue;
      }

      // 모든 지역에 대한 데이터를 가져오도록 수정
      for (const region in regions) {
        if (!averageValues.hasOwnProperty(region)) {
          averageValues[region] = 0; // 기본값으로 0 설정 또는 다른 값으로 설정 가능
        }
      }
      console.log(averageValues);
      // 격자의 배경색을 설정하고 추가
      addGridCells(averageValues);
    })
    .catch(error => {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    });
}

// _14age 데이터 처리 함수
function process14AgeData() {
  // 이전에 있던 모든 격자 삭제
  map.eachLayer(function (layer) {
    if (layer instanceof L.Rectangle) {
      map.removeLayer(layer);
    }
  });

  // _14age 데이터를 가져와서 처리하는 로직 추가
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      console.log('14세 이하 인구 데이터를 정상적으로 가져왔습니다.');
      console.log(data);  // 데이터 콘솔 출력

      // 데이터 처리 및 격자 추가 로직 추가
      // 예시로 간단하게 구현하겠습니다.
      // 실제 데이터 형식과 처리 방법에 맞게 구현해야 합니다.
    })
    .catch(error => {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    });
}

// _20_50T21_ 데이터 처리 함수
function process20_50T21Data() {
  // 이전에 있던 모든 격자 삭제
  map.eachLayer(function (layer) {
    if (layer instanceof L.Rectangle) {
      map.removeLayer(layer);
    }
  });

  // _20_50T21_ 데이터를 가져와서 처리하는 로직 추가
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      console.log('_20_50T21_ 인구 데이터를 정상적으로 가져왔습니다.');
      console.log(data);  // 데이터 콘솔 출력

      // 데이터 처리 및 격자 추가 로직 추가
      // 예시로 간단하게 구현하겠습니다.
      // 실제 데이터 형식과 처리 방법에 맞게 구현해야 합니다.
    })
    .catch(error => {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    });
}

// _65age_ 데이터 처리 함수
function process65AgeData() {
  // 이전에 있던 모든 격자 삭제
  map.eachLayer(function (layer) {
    if (layer instanceof L.Rectangle) {
      map.removeLayer(layer);
    }
  });

  // _65age_ 데이터를 가져와서 처리하는 로직 추가
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      console.log('65세 이상 인구 데이터를 정상적으로 가져왔습니다.');
      console.log(data);  // 데이터 콘솔 출력

      // 데이터 처리 및 격자 추가 로직 추가
      // 예시로 간단하게 구현하겠습니다.
      // 실제 데이터 형식과 처리 방법에 맞게 구현해야 합니다.
    })
    .catch(error => {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    });
}

// _20_60T9_18 데이터 처리 함수
function process20_60T9_18Data() {
  // 이전에 있던 모든 격자 삭제
  map.eachLayer(function (layer) {
    if (layer instanceof L.Rectangle) {
      map.removeLayer(layer);
    }
  });

  // _20_60T9_18 데이터를 가져와서 처리하는 로직 추가
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      console.log('_20_60T9_18 인구 데이터를 정상적으로 가져왔습니다.');
      console.log(data);  // 데이터 콘솔 출력

      // 데이터 처리 및 격자 추가 로직 추가
      // 예시로 간단하게 구현하겠습니다.
      // 실제 데이터 형식과 처리 방법에 맞게 구현해야 합니다.
    })
    .catch(error => {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    });
}


// 주중 유동인구 버튼 클릭 시 이벤트 리스너
weekendBtn.addEventListener('click', function() {
  // 주중 유동인구 버전을 보여줄 로직을 추가합니다.
  console.log('주중 유동인구 버전을 보여줍니다.');
  processWeekendData();

});

// 그 외 버튼들에 대한 클릭 이벤트 리스너 등록
age14Btn.addEventListener('click', function() {
  // 14세 이하 버전을 보여줄 로직을 추가합니다.
  console.log('14세 이하 버전을 보여줍니다.');
  process14AgeData();
});

age20_50Btn.addEventListener('click', function() {
  // 20대 ~ 50대 버전을 보여줄 로직을 추가합니다.
  console.log('20대 ~ 50대 버전을 보여줍니다.');
  process20_50T21Data();
});

age65Btn.addEventListener('click', function() {
  // 65세 이상 버전을 보여줄 로직을 추가합니다.
  console.log('65세 이상 버전을 보여줍니다.');
  process65AgeData();
});

age20_60Btn.addEventListener('click', function() {
  // 20세 이상 60세 미만 버전을 보여줄 로직을 추가합니다.
  console.log('20세 이상 60세 미만 버전을 보여줍니다.');
  process20_60T9_18Data();
});
