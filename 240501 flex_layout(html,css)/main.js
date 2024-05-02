// 자바스크립트 작성 1단계
// DOM에 접근할 내용을 변수에 담기
let articles = document.querySelectorAll('article');
let aside = document.querySelector('aside');
let close = aside.querySelector('span');
console.log(articles);
// [article, article, article, article]
// 유사 배열로 가져옴 => 반복문
// 참 혹은 거짓 => 조건문

// 유지보수를 위한 코드를 생각할 수 있어야함
// for(변수정의 변수범위지정 변수가감){}
// for (let i = 0; i < 4; i++) {} <- 이렇게 쓰지 않아야 함
for (let i = 0; i < articles.length; i++) {
	// js에서는 hover메소드가 없어 마우스엔터 / 마우스리브로 동작하게 됨
	articles[i].addEventListener('mouseenter', (e) => {
		console.log(e.currentTarget);
		// e.currentTarget => 이벤트 리스너가 붙은 대상을 의미
		// e.Target => 실제 이벤트가 발생하는 대상을 의미
		// 둘은 같은 대상을 의미할 때도 많지만 아닌 경우가 많음
		e.currentTarget.querySelector('video').play();
	});

	articles[i].addEventListener('mouseleave', (e) => {
		e.currentTarget.querySelector('video').pause();
	});

	articles[i].addEventListener('click', (e) => {
		aside.classList.add('on');

		// 클릭한 article의 h2, p, video의 값을 가지고와서 교체할 예정
		// 1. 각 값을 가져와서 변수에 담는 과정
		let article_h2 = e.currentTarget.querySelector('h2').innerText;
		let article_p = e.currentTarget.querySelector('p').innerText;
		console.log(article_p);
		let article_video_src = e.currentTarget
			.querySelector('video')
			.getAttribute('src');
		console.log(article_video_src);

		// 2. 변수로 담은 값으로 aside태그 안의 내용 교체
		// 교체할 대상 = 교체할 값
		aside.querySelector('h2').innerText = article_h2;
		aside.querySelector('p').innerText = article_p;
		aside.querySelector('video').setAttribute('src', article_video_src);
		// getAttribute 에서 setAttribute 으로 바뀌는 것만 유의하깅

		aside.querySelector('video').play();
	});
}
// close버튼은 articles의 반복과 상관없기 때문에 반복문 밖에 만듦
close.addEventListener('click', () => {
	aside.classList.remove('on');
	aside.querySelector('video').pause();
});

// 기본 for문
/*
// 처음 i=0으로 시작해서 i < articles.length; 이 조건이 참이기 때문에
// articles[0].addEventListener('mouseenter', () => {});
// 위의 코드를 실행하고 다시 for문으로 반복, 이때 i는 i++에 의해서
// i는 1이 된 상태로 시작
// 식이 끝날 때 까지 반복 (i가 1,2,3이 되다가 4가 되면 거짓이 되기 때문에 종료) */

// for of문
// for (let el of articles) {
// 	el.addEventListener('mouseover', (e) => {
// 		e.currentTarget.querySelector('video').play();
// 	});
// 	el.addEventListener('mouseout', (e) => {
// 		e.currentTarget.querySelector('video').pause();
// 	});
// }
// mouseover와 mouseenter는 거의 같은 기능을 함
// mouseover와 mouseleave, mouseover과 mouseout의 쌍만 맞춰주면 됨
