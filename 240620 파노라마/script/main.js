let frame = document.querySelector('#circle');
let boxes = frame.querySelectorAll('article');
let btnMode = document.querySelectorAll('.mode li');

let info = document.querySelector('#panorama-tab .status');
let navi = document.querySelector('#control-tab .navi');
let btnNavi = navi.querySelectorAll('li');
let btnPrev = document.querySelector('.prev');
let btnNext = document.querySelector('.next');

// 자료의 형태 : 배열의 형태로 활성화를 해주어야 하는 대상을 묶어서 사용함
let panoramaEl = [btnMode[0], info];
let controlEl = [btnMode[1], navi, btnPrev, btnNext];

let activeNum = 0;
let rotateNum = 0;
let timer;

startRolling();
function startRolling() {
	let deg = 0;
	timer = setInterval(() => {
		deg += 0.2;
		if (deg >= 360) deg = 0;
		frame.style.transform = `rotateY(${deg}deg)`;
	}, 20);
}
function stopRolling() {
	clearInterval(timer);
}

btnMode[0].addEventListener('click', () => {
	// 컨트롤 모드에 사용되는 요소에 on을 지운다
	for (let el of controlEl) el.classList.remove('on');
	// 파노라마 모드에 사용되는 요소에 on을 부여한다
	for (let el of panoramaEl) el.classList.add('on');

	boxes[0].classList.remove('on');

	frame.style.transform = `rotateY(0deg)`;
	// frame에 transition duration 값 제거
	frame.style.transitionDuration = `0s`;
	startRolling();
});
btnMode[1].addEventListener('click', () => {
	// 파노라마 모드에 사용되는 요소에 on을 지운다
	for (let el of panoramaEl) el.classList.remove('on');
	// 컨트롤 모드에 사용되는 요소에 on을 부여한다
	for (let el of controlEl) el.classList.add('on');

	// frame에 transition duration 값 부여
	frame.style.transitionDuration = `1s`;
	// frame에 0도로 프레임 각도를 초기화하는 작업
	frame.style.transform = `rotateY(0deg)`;
	stopRolling();

	for (let el of btnNavi) el.classList.remove('on');
	btnNavi[0].classList.add('on');
	boxes[0].classList.add('on');
});

btnPrev.addEventListener('click', () => {
	let deg = 45 * --rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;

	boxes[0].classList.remove('on');

	activeNum === 0 ? (activeNum = 7) : --activeNum;
	active(activeNum);
});

btnNext.addEventListener('click', () => {
	let deg = 45 * ++rotateNum;
	frame.style.transform = `rotateY(${deg}deg)`;

	boxes[0].classList.remove('on');

	activeNum === 7 ? (activeNum = 0) : ++activeNum;
	active(activeNum);
});

function active(index) {
	for (let el of btnNavi) el.classList.remove('on');
	btnNavi[index].classList.add('on');

	let boxNum = 0;
	index === 0 ? (boxNum = 0) : (boxNum = 8 - index);

	for (let el of boxes) el.classList.remove('on');
	boxes[boxNum].classList.add('on');
}

btnNavi.forEach((el, index) => {
	el.addEventListener('click', () => rotation(index));
});

function rotation(index) {
	frame.style.transform = `rotateY(${45 * index}deg)`;
	active(index);
	activeNum = index;
	rotateNum = index;
}
