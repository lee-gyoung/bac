// function* numGen() {
// 	console.log('시작');
// 	yield 1;
// 	console.log('1 이후');
// 	yield 2;
// 	console.log('2 이후');
// 	yield 3;
// 	console.log('종료');
// }
// let gen = numGen();

// gen.next();
// gen.next();
// gen.next();
// gen.next();

/*
제너레이터란? ES6부터 도입된 기능임
이 함수는 일반적인 함수와 달리 호출될 때 실행을 완료하지 않음
중단하고 싶다면 중단할 수 있고, 이를 통해 함수의 실행을 여러 단계로 나누고
각 단계마다 값을 외부로 반환할 수 있음
function* 키워드 : 제너레이터 함수를 정의할 때 키워드 뒤에 반드시 *을 붙인다
yield 키워드 : 제너레이터 함수 내부에서 이 키워드를 사용해서 일시 중단하고
값을 반환하도록 하는 키워드
제너레이터 객체 : 제너레이터 함수를 호출하면 객체가 반환됨
이 객체의 next()메서드를 호출해야 yield로 중단된 위치로부터 실행을 이어나갈 수 있음
따라서 yield는 책갈피의 역할, next를 책갈피부터 다시 읽는 메서드
*/

// function* infinitCouter() {
// 	let count = 1;
// 	while (true) {
// 		yield count;
// 		count += 1;
// 	}
// 	// while은 무한하게 실행하는 함수로 보통 break문을 함께 씀(위험해서)
// }

// let counter = infinitCouter();
// console.log(counter.next().value);
// console.log(counter.next().value);
// console.log(counter.next().value);
// console.log(counter.next().value);
// console.log(counter.next().value);
// console.log(counter.next().value);

let vidList = document.querySelector('.vidList');
let key = 'AIzaSyCJXuOssJ-Pyy9CRYVOCOVfhCwvuF9vTWY';
let playListId = 'PLbka_sQYTM6CGzBSQkh-D-5-GiAp6CjK1';

/*
async 키워드
사용방법 : 함수 선언 앞에 붙여서 사용한다
async가 붙은 함수는 항상 프로미스를 반환함
따라서 이 함수 내에서 값을 반환하면 해당 값은 자동으로 Promise.resolve()라는 값으로
감싸져서 반환됨
async 함수 내에서는 await라는 키워드를 사용할 수 있음

await 키워드
사용방법 : await 키워드는 어싱크 함수 내에서만 사용할 수 있음
어웨이트는 프로미스가 처리될 때까지 함수 실행을 일시중단함
그리고 프로미스 객체가 해결(잘 받아지면)되면 그 결과값을 어웨이트가 반환함
+ 에러처리는 try, catch문으로 제어함
*/

async function* YoutubeAPI() {
	let nextPage;
	// nextPage의 역할은 순번을 정해주는 것
	while (true) {
		let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}${
			nextPage ? '&pageToken=' + nextPage : ''
		}`;
		let response = await fetch(url);
		let data = await response.json();
		yield data.items; // 현재 페이지의 비디오 목록을 반환함
		nextPage = data.nextPage;
		if (!nextPage) break;
	}
}

let videoGen = YoutubeAPI();
// 5개의 값이 존재함
// async 키워드를 사용해서 비동기적으로 작업하기 위해 함수를 생성함

/*
1번 제너레이터가 반환이 되면 items = [1개의 값]
2번 제너레이터가 반환이 되면 items = [1개의 값, 1개의 값]
3번 제너레이터가 반환이 되면 items = [1개의 값, 1개의 값, 1개의 값]
4번 제너레이터가 반환이 되면 items = [1개의 값, 1개의 값, 1개의 값, 1개의 값]
5번 제너레이터가 반환이 되면 items = [1개의 값, 1개의 값, 1개의 값, 1개의 값, 1개의 값]
*/
async function loadYoutube() {
	let result = '';
	for await (let ele of videoGen) {
		ele.forEach((el) => {
			let title = el.snippet.title;
			if (title.length > 20) title = title.substr(0, 30) + '...';
			let des = el.snippet.description;
			if (des.length > 50) des = des.substr(0, 50) + '...';
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];
			result += `
            <article>
                <a href="${el.snippet.resourceId.videoId}" class="pic">
                    <img src="${el.snippet.thumbnails.medium.url}" alt="" />
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${des}</p>
                    <span>${date}</span>
                </div>
            </article>
            `;
		});
	}

	vidList.innerHTML = result;
}
loadYoutube();
