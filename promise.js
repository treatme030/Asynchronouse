//! Promise
//? https://ko.javascript.info/promise-basics
//흐름이 자연스럽고 유연한 코드를 작성 가능 
//프라미스 객체는 제작함수(executor)와 소비함수(.then, .catch, .finally 메서드)를 연결해줌
//executor는 new Promise에 의해 자동으로 그리고 즉각적으로 호출
//executor는 인자로 resolve와 reject 함수를 받음 
//executor는 resolve나 reject 중 하나를 반드시 호출해야 함 
//처리가 끝난 프라미스에 resolve와 reject를 호출하면 무시됨
//프라미스가 이미 처리상태라면 핸들러가 즉각 실행됨 

//* resolve(value): 일이 성공적으로 끝난 경우 그 결과를 나타내는 value와 함께 호출
//* reject(error): 에러 발생 시 에러 객체를 나타내는 error와 함께 호출
//resolve나 reject는 인수를 하나만 받고(혹은 아무것도 받지 않음) 그 이외의 인수는 무시한다는 특성

//state: pending(대기)-->resolve가 호출되면 fulfilled(이행, 완료)-->reject가 호출되면 rejected(거부)
//result: undefined-->resolve(value)가 호출되면 value-->reject(error)가 호출되면 error

// let promise = new Promise((resolve, reject) => {
//     //프라미스가 만들어지면 executor 함수는 자동으로 실행됨
//     //executor '처리’가 시작 된 지 1초 후, resolve("done")이 호출
//     setTimeout(() => resolve('done'), 1000);
// });

// //* .then 
// promise.then(
//     function(result) { /* 결과(result)를 다룹니다 */ },
//     function(error) { /* 에러(error)를 다룹니다 */ }
// );

// //성공적으로 이행된 경우
// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve("done!"), 1000);
// });
  
//   // resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
// promise.then(
//     result => alert(result), // 1초 후 "done!"을 출력
//     error => alert(error) // 실행되지 않음
// );

// //거부된 경우
// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => reject(new Error("에러 발생!")), 1000);
// });
  
//   // reject 함수는 .then의 두 번째 함수를 실행합니다.
// promise.then(
//     result => alert(result), // 실행되지 않음
//     error => alert(error) // 1초 후 "Error: 에러 발생!"를 출력
// );

// //* .catch
// //에러가 발생한 경우, .then(null,f)와 동일 
// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => reject(new Error("에러 발생!")), 1000);
// });

// promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력

// //* .finally
// //결과가 어떻든(성공, 실패 여부 알필요 없음) 마무리가 필요하다면 유용, .then(f, f)과 유사
// //자동으로 다음 핸들러에 결과와 에러를 전달
// //프라미스 결과를 처리하기 위해 만들어진게 아니라, 결과를 전달해 줌
// new Promise((resolve, reject) => {
//     setTimeout(() => resolve("결과"), 2000)
// })
//     .finally(() => alert("프라미스가 준비되었습니다."))//로딩 인디케이터 중지
//     .then(result => alert(result)); // <-- .then에서 result를 다룰 수 있음 
 
// new Promise((resolve, reject) => {
//     throw new Error("에러 발생!");
// })
//     .finally(() => alert("프라미스가 준비되었습니다."))
//     .catch(err => alert(err)); // <-- .catch에서 에러 객체를 다룰 수 있음 

// const loadScript = ((src) => {
//     return new Promise((resolve, reject) => {
//         let script = document.createElement('script');
//         script.src = src;
//         script.onload = () => resolve(script);
//         script.onerror = () => reject(new Error('Error!!!'));
//         document.head.append(script);
//     });
// });

// let promise = loadScript('/file');
// promise.then(
//     script => alert(`${script.src}를 불러왔습니다.`),
//     error => alert(`Error!!!${error.message}`)
// );


function delay(ms) {
    // 여기에 코드 작성
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
  }
  
delay(3000).then(() => alert('3초후 실행'));


// //! Promise chaining
// //result가 .then 핸들러의 체인(사슬)을 통해 전달
// //핸들러가 값을 반환할 때엔 이 값이 프라미스의 result가 됨
// //단순하게 프라미스 하나에 .then을 여러 개 추가하는 것은 프라미스 체인이 아님
// new Promise(function(resolve, reject) {

//     setTimeout(() => resolve(1), 1000); // 1초 후 최초 프라미스가 이행
  
// }).then(function(result) { // 첫번째 .then 핸들러가 호출
  
//     alert(result); // 1
//     return result * 2;
  
// }).then(function(result) { // 반환한 값은 다음 .then 핸들러에 전달
  
//     alert(result); // 2
//     return result * 2;
  
// }).then(function(result) {
  
//     alert(result); // 4
//     return result * 2;
  
// });


// loadScript("/article/promise-chaining/one.js")
//     .then(script => loadScript("/article/promise-chaining/two.js"))
//     .then(script => loadScript("/article/promise-chaining/three.js"))
//     .then(script => {
//     // 스크립트를 정상적으로 불러왔기 때문에 스크립트 내의 함수를 호출할 수 있습니다.
//     one();
//     two();
//     three();
//     });

// //* fetch와 체이닝 함께 응용하기
// //원격 서버에서 사용자 정보 가져오기

// // response.json()은 원격 서버에서 불러온 내용을 JSON으로 변경해줌 
// fetch('/article/promise-chaining/user.json')
//   .then(response => response.json())
//   .then(user => alert(user.name)); // iliakan, got user name

// //GitHub에 요청을 보내 사용자 프로필을 불러오고 아바타를 출력해보기
// fetch('/article/promise-chaining/user.json')// user.json에 요청
// .then(response => response.json())// 응답받은 내용을 json으로 불러옴
// .then(user => fetch(`https://api.github.com/users/${user.name}`))// GitHub에 요청
// .then(response => response.json())// 응답받은 내용을 json으로 불러옴
// .then(githubUser => new Promise((resolve, reject) => { // (*)
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = 'promise-avatar-example';
//     document.body.append(img);

//     setTimeout(() => {
//         img.remove();
//         resolve(githubUser); // (**)
//     }, 3000);// 3초간 아바타 이미지(githubUser.avatar_url)를 보여줌
// }));
// //--> (*)로 표시한 곳의 .then 핸들러는 이제 setTimeout안의 resolve(githubUser)를 호출했을 때
// //((**)) 만 처리상태가 되는 new Promise를 반환

// //--> 위 코드 함수단위로 분리하기
// const loadJson = ((url) => {
//     return fetch(url)
//     .then(response => response.json());
// });

// const loadGithubUser = ((name) => {
//     return fetch(`https://api.github.com/users/${name}`)
//     .then(response => response.json());
// });

// const showAvatar = ((githubUser) => {
//     return new Promise((resolve, reject) => {
//         let img = document.createElement('img');
//         img.src = githubUser.avatar_url;
//         img.className = "promise-avatar-example";
//         document.body.append(img);
        
//         setTimeout(() => {
//             img.remove();
//             resolve(githubUser);
//         },3000);
//     });
// });

// loadJson('/article/promise-chaining/user.json')
//     .then(user => loadGithubUser(user.name))
//     .then(showAvatar)
//     .then(githubUser => alert(`Finished showing ${githubUser.name}`));
// //.then 또는 .catch, .finally의 핸들러(어떤 경우도 상관없음)가 프라미스를 반환하면, 
// //나머지 체인은 프라미스가 처리될 때까지 대기
// //처리가 완료되면 프라미스의 result(값 또는 에러)가 다음 체인으로 전달


// //! Promise.all
// //여러 개의 프라미스를 동시에 실행시킬 때
// //요소 전체가 프라미스인 배열을 받고 새로운 프라미스를 반환
// //let promise = Promise.all([...promises...]);
// //배열 안 프라미스가 모두 처리되면 새로운 프라미스가 이행되는데, 
// //배열 안 프라미스의 결괏값을 담은 배열이 새로운 프라미스의 result가 됨
// //배열 result의 요소 순서는 Promise.all에 전달되는 프라미스 순서와 상응한다는 점

// Promise.all([
//     new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1, 가장 늦게 이행되더라도 처리 결과는 배열의 첫 번째 요소에 저장
//     new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
//     new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
// ]).then(alert); // 프라미스 전체가 처리되면 1, 2, 3이 반환됩니다. 각 프라미스는 배열을 구성하는 요소가 됨

// //URL이 담긴 배열을 fetch를 써서 처리하는 예
// let urls = [
//     'https://api.github.com/users/iliakan',
//     'https://api.github.com/users/remy',
//     'https://api.github.com/users/jeresig'
// ];
// // fetch를 사용해 url을 프라미스로 매핑
// let requests = urls.map(url => fetch(url));
// // Promise.all은 모든 작업이 이행될 때까지 기다림
// Promise.all(requests)
// .then(responses => responses.forEach(
//     response => alert(`${response.url}: ${response.status}`)
// ));

// //GitHub 유저네임이 담긴 배열을 사용해 사용자 정보를 가져오는 예
// let names = ['iliakan', 'remy', 'jeresig'];
// let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

// Promise.all(requests)
// .then(responses => {
//     for(let response of responses){
//         alert(`${response.url}: ${response.status}`);
//     }
//     return responses;
// })
// // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽기
// .then(responses => Promise.all(responses.map(r => r.json())))
// // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장
// .then(users => users.forEach(user => alert(user.name)));

// //전달되는 프라미스 중 하나라도 거부되면, 
// //Promise.all이 반환하는 프라미스는 에러와 함께 바로 거부,다른 프라미스는 무시됨 
// //거부 에러는 Promise.all 전체의 결과가 됨 
// Promise.all([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
//   ]).catch(alert); // Error: 에러 발생!