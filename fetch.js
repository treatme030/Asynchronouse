//! fetch API
//let promise = fetch(url, [options])
//options에 아무것도 넘기지 않으면 요청은 GET 메서드로 진행되어 url로부터 콘텐츠가 다운로드 됨
//네트워크를 통해 이뤄지는 요청 중 URL로 요청하는 걸 가능하게 해 주는 API
//호출하면 브라우저는 네트워크 요청을 보내고 프라미스가 반환됨 
//Promise의 형식으로 이루어져 있음
fetch(url)
  .then((response) => response.json()) // 자체적으로 json() 메소드가 있어, 응답을 JSON 형태로 변환시켜서 다음 Promise로 전달
  .then((json) => console.log(json)) // 콘솔에 json을 출력
  .catch((error) => console.log(error)); // 에러가 발생한 경우, 에러를 띄움 

//* 응답 단계
//1. 서버에서 응답 헤더를 받자마자 fetch 호출 시 반환받은 promise가 내장 클래스 Response의 인스턴스와 함께 이행 상태가 됨
//status – HTTP 상태 코드(예: 200)
//ok – 불린 값. HTTP 상태 코드가 200과 299 사이일 경우 true
let response = await fetch(url);

if (response.ok) { // HTTP 상태 코드가 200~299일 경우
  // 응답 몬문을 받습니다(관련 메서드는 아래에서 설명).
  let json = await response.json();//JSON 형태로 파싱
} else {
  alert("HTTP-Error: " + response.status);
}

//2.추가 메서드를 호출해 응답 본문을 받기
/*
본문을 읽을 때 사용되는 메서드는 딱 하나만 사용

response.text() – 응답을 읽고 텍스트를 반환
response.json() – 응답을 JSON 형태로 파싱
response.formData() – 응답을 FormData 객체 형태로 반환
response.blob() – 응답을 Blob(타입이 있는 바이너리 데이터) 형태로 반환
response.arrayBuffer() – 응답을 ArrayBuffer(바이너리 데이터를 로우 레벨 형식으로 표현한 것) 형태로 반환
*/

// 응답 본문을 텍스트 형태로 읽기
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
let text = await response.text(); 
alert(text.slice(0, 80) + '...');

//응답을 JSON 형태로 파싱
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));


let response = await fetch(url, options); // 응답 헤더와 함께 이행됨
let result = await response.json(); // json 본문을 읽음

// fetch(url, options)
//   .then(response => response.json())
//   .then(result => /* 결과 처리 */)

/**
사용자당 fetch 요청은 한 번만 수행해야 합니다.
데이터가 최대한 일찍 도착할 수 있도록 각 요청은 다른 요청의 결과를 기다려서는 안 됩니다.
요청에 실패하거나 존재하지 않는 사용자에 대한 요청을 보냈다면 null을 리턴하고 배열 요소에 담아
*/
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
  