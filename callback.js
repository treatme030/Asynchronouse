//!  ‘콜백 기반(callback-based)’ 비동기 프로그래밍
//? https://ko.javascript.info/callbacks
//비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 
//실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야 힘

function loadScript(src, callback){
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);//스크립트 로드가 끝나면 콜백함수 실행됨
    document.head.append(script);
}

//! 콜백 속 콜백 ==> 콜백 지옥
//두 스크립트를 순차적으로 불러올 때, 콜백 함수 안에서 두 번째 loadScript를 호출

loadScript('/my/script.js', function(script) {
    loadScript('/my/script2.js', function(script) {
        loadScript('/my/script2.js', function(script) {
            //계속 순차적으로 불러옴
        });
    });
});

//! 에러 핸들링
function loadScript(src, callback){
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script);//로딩 성공시 
    script.onerror = () => callback(new Error('Error!!!'));//실패시 
    document.head.append(script);
}

//* 오류 우선 콜백
//-callback의 첫 번째 인수는 에러를 넣고, 에러가 발생하면 이 인수를 이용해 callback(err)이 호출
//-두 번째 인수(필요하면 인수를 더 추가할 수 있음)는 에러가 발생하지 않았을 때
loadScript('/my/script.js', function(error, script) {
    if (error) {
      // 에러 처리
    } else {
      // 스크립트 로딩이 성공적으로 끝남
    }
});