let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let list = document.querySelector('.list');
let enable_event = true;
let delay = convertSpeed(list.children[0]);

next.addEventListener('click', movenext);
prev.addEventListener('click', moveprev);

function movenext() {
	if (!enable_event) return;
	enable_event = false;
	list.append(list.firstElementChild);
	setTimeout(() => {
		enable_event = true;
	}, delay);
}

function moveprev() {
	if (!enable_event) return;
	enable_event = false;
	list.prepend(list.lastElementChild);
	setTimeout(() => {
		enable_event = true;
	}, delay);
}

function convertSpeed(el) {
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}

var swiper = new Swiper('.swiperNum1', {
	autoplay: true,
	loop: true,
	slidesPerView: 1,
	spaceBetween: 30,
	centeredSlides: true,
});

var swiper = new Swiper('.swiperNum2', {
	direction: 'vertical',
	autoplay: true,
	loop: true,
	slidesPerView: 1,
	spaceBetween: 30,
	centeredSlides: true,
});
