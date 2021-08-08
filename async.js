//! async
//async가 붙은 함수는 반드시 프라미스를 반환하고, 
//프라미스가 아닌 것은 프라미스로 감싸 반환
//await는 async 함수 안에서만 동작

async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("완료!"), 1000)
    });
  
    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
  
    alert(result); // "완료!"
}


async function showAvatar(){
    // JSON 읽기
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();

    // github 사용자 정보 읽기
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();

    // 아바타 보여주기
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    // 3초 대기
    await new Promise((resolve, reject) => setTimeout(resolve,3000));
    img.remove();
    return githubUser;
}

//await는 최상위 레벨 코드에서 작동하지 않고, 에러 발생
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

//익명 async 함수로 코드를 감싸면 최상위 레벨 코드에도 await를 사용 가능
(async () => {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
})();

//*에러 핸들링
//아래 두 코드 동일 
async function f() {
    await Promise.reject(new Error("에러 발생!"));
}
async function f() {
    throw new Error("에러 발생!");
}

//try..catch를 사용
async function f() {

    try {
      let response = await fetch('http://유효하지-않은-주소');
    } catch(err) {
      alert(err); // TypeError: failed to fetch
    }
}

//async/await works well with Promise.all
// 프라미스 처리 결과가 담긴 배열을 기다립니다.
let results = await Promise.all([
    fetch(url1),
    fetch(url2),
]);


async function loadJson(url) {
    let response = await fetch(url);

    if (response.status == 200) {
        let json = await response.json();
        return json();
    }
    throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)