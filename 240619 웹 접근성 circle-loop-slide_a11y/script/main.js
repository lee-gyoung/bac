let slideUl = document.querySelector('.slide ul');
let slides = slideUl.children;
let btns = document.querySelector('.btns');
let [prev, next] = btns.children; // 구조분해할당
let pop = document.querySelector('.pop');
let close = pop.querySelector('.close');
let opener = slideUl.querySelectorAll('a');
// a태그를 사용한 곳이 여러군데일 경우 해당 a태그들에만 공통 클래스 부여하면 됨

let enable_event = true;

for (let i = 0; i < 3; i++) slideUl.prepend(slideUl.lastElementChild);
// 첫번째 슬라이드가 초기화면에 보이도록 3번의 로테이션을 돌림

prev.addEventListener('click', () => {
	if (enable_event) {
		enable_event = false;
		slideUl.prepend(slideUl.lastElementChild);
		activeStay();
	}
});
next.addEventListener('click', () => {
	if (enable_event) {
		enable_event = false;
		slideUl.append(slideUl.firstElementChild);
		activeStay();
	}
});
// 슬라이드가 총 7개인데 화면에 5개만 띄운 이유: 버튼 클릭 시 맨 가장자리가 뚝뚝 끊겨서 떨어져나가는 걸 가리기 위함

function activeStay() {
	for (let el of slides) el.classList.remove('on');
	slides[3].classList.add('on');
	setTimeout(() => {
		enable_event = true;
	}, 1500);
}

opener.forEach((el) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		let txt = e.currentTarget.closest('li').querySelector('h2').innerText;
		pop.querySelector('h2').innerText = txt;
		pop.classList.add('on');
		e.currentTarget.classList.add('off');
		btns.classList.add('off');
	});
});

close.addEventListener('click', () => {
	pop.classList.remove('on');
	btns.classList.remove('off');
	slideUl.querySelector('li.on a').classList.remove('off');
});
