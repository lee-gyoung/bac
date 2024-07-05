let frame = document.querySelector('section');
let mask = document.querySelector('aside');
let imgs = '';

for (let i = 0; i < 100; i++) {
	imgs += `<img src="./img/pic${i}.jpg">`;
}

frame.innerHTML = imgs;
let imgDom = frame.querySelectorAll('img');
let imgDom_arr = Array.from(imgDom);
let count = 0;

imgDom_arr.map((el) => {
	el.addEventListener('load', () => {
		count++;

		let percent = parseInt((count / 100) * 100);
		mask.querySelector('span').textContent = percent;
		mask.querySelector('.bar').style.width = percent + '%';
		if (percent === 100) {
			mask.classList.add('off');
			setTimeout(() => {
				mask.remove();
			}, 1000);
		}
	});
});

window.addEventListener('mousemove', (e) => {
	// console.log(e.pageX); console.log(e.pageY); 사용해서 mousemove의 위치 추적 가능

	let wid = window.innerWidth;
	// 윈도우가 가진 너비의 값을 그때그때 갖게 함

	let percent = parseInt((e.pageX / wid) * 100);
	// 가로 창 너비에서 이미지 개수만큼 나눠줌

	imgDom_arr.map((el) => {
		el.style.display = 'none';
	});
	imgDom_arr[percent].style.display = 'block';
});
