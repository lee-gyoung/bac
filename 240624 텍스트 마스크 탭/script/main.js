let main = document.querySelector('main');
let btns = main.querySelectorAll('ul li');
let boxes = main.querySelectorAll('article');

let enable_event = true;
let btnsDelay = convertSpeed(btns[0].querySelector('a'));

let btns_array = Array.from(btns);
// -> 배열로 가져오는 법

// forEach와 map은 비슷한 구조를 갖고 있지만
// forEach는 배열, 유사배열 둘 다 사용이 가능하고
// map은 배열에만 사용이 가능하다

// 대상(배열이 아닌 것도)에 반복을 돌며 이벤트를 붙여야할때 forEach 사용
btns.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		if (enable_event) {
			enable_event = false;
			main.className = `bg${index + 1}`;
			// for (let el of btns) el.classList.remove('on');
			// for (let el of boxes) el.classList.remove('on');

			/*
        반복문으로 on클래스를 찾아서 지우는 방법은
        on클래스가 아닌 대상도 찾아가서 코드를 적용시키기 때문에 스레싱 발생
        반복 대상의 개수가 적을 때는 상관없지만 반복대상이 많을수록
        스레싱이 발생함
        */

			// 스레싱이란?
			/*
        필요없는 혹은 같은 작업을 잦은 반복을 해서 성능이 저하되는 현상,
        예방, 제거하기 위해서는 필요한 작업만 하는 방법이 있음
        */

			// 스레싱을 최소한으로 하여 on클래스가 있는 대상을 찾는 방법
			document.querySelector('ul li.on').classList.remove('on');
			document.querySelector('article.on').classList.remove('on');

			btns[index].classList.add('on');
			boxes[index].classList.add('on');

			setTimeout(() => {
				enable_event = true;
			}, btnsDelay);
		}
	});
});

/* 예외처리: 어떤 기능을 코딩하는 것은 생각보다 어렵지 않음
예외처리하는 잔머리가 필요함. 개발자들의 일머리는 곧 예외처리를 할 줄 아는 정도
*/

// btns_array.map((el, index) => {
// 	el.addEventListener('click', () => {});
// });

boxes.forEach((el, index) => {
	splitH2(el.querySelector('h2'));
});

function splitH2(el) {
	let txt = el.innerText;
	let fragment = document.createDocumentFragment();
	/*
    정적돔과 동적돔 둘다 리얼돔이기 때문에 html의 몸체를 소모함
    따라서 실질적인 js의 엔진이 사용/소모되는 작업이 일어나게 됨

    가상돔 - 가상의 메모리에서 일어나게 될 작업을 미리 시험하여
            돔의 변경될 내용을 작성하고 딱 한 번만 실제 돔에 랜더링을 함으로써
            스레싱을 줄이게 됨

    createDocumentFragment은 DOM조작을 메모리에서 수행하는 메소드, DOM트리라는 객체에
    속해있는 노드임.
    따라서 스레싱을 줄여서 더 빠르게 연산을 가능케하고 성능 저하를 방지할 수 있음
    추가적으로 js만 이득을 보는 것이 아니라 실제 DOM과 연결된 css의 렌더링도
    불필요한 작업이 없어지므로 성능 향상에 도움을 줄 수 있음
    */

	let num = 0;
	// 문자열 -> 유사배열로 인식할 수 있음
	for (let el of txt) {
		let span = document.createElement('span');
		span.style.transitionDelay = `${0.1 * num++}s`;
		span.textContent = el;
		fragment.appendChild(span);
	}
	el.innerText = ''; // 원래 작성된 h2내용을 지움 => 두번 중복돼서 써지기 때문에
	el.appendChild(fragment);
}

function convertSpeed(el) {
	// let duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000;
	// parseFloat을 사용해서 css의 0.5s 값의 s를 탈락시킨 방법이지만
	// 사용할 수 없는 경우에는 아래와 같은 방법으로도 코딩할 수 있음

	let duration = getComputedStyle(el).transitionDuration.split('s')[0];

	return 4 * duration;
}
