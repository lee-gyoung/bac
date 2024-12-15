// 헤더 햄버거 버튼 클릭 이벤트
let leftBtn = document.querySelector('#header_left_btn');
let leftMenu = document.querySelector('#left_btn_menu');

leftBtn.addEventListener('click', (e) => {
	e.preventDefault();
	leftBtn.classList.toggle('on');
	leftMenu.classList.toggle('on');
});

// 초기화면 스크롤 버튼 클릭 이벤트
let scrBtn = document.querySelector('#scrBtn');

function scrActive() {
	if (scrBtn != null) {
		let topPoint = $('.main_slide.scroll_event').offset().top;
		scrBtn.addEventListener('click', function () {
			window.scrollTo({ left: 0, top: topPoint, behavior: 'smooth' });
		});
	}
}

// 좌측 슬라이드
var swiper = new Swiper('#main_slide_left', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	centeredSlides: true,
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
});

// 스크롤 페이드 인 이벤트
let sections = document.querySelectorAll('main .scroll_event');
let sections_array = Array.from(sections);
let position_array = [];

for (let el of sections_array) {
	position_array.push(el.offsetTop);
}
let best_item_active_scrollTop = 1500;
let new_product_active_scrollTop = 2300;
let contact_active_scrollTop = 2900;
window.addEventListener('scroll', () => {
	let scroll =
		window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

	sections_array.forEach((el, index) => {
		if (index === 2 && scroll >= best_item_active_scrollTop) {
			sections_array[index].classList.add('on');
		} else if (index === 3 && scroll >= new_product_active_scrollTop) {
			sections_array[index].classList.add('on');
		} else if (index === 4 && scroll >= contact_active_scrollTop) {
			sections_array[index].classList.add('on');
		}
	});
});

// 탭 메뉴 클릭 이벤트
$(document).ready(function () {
	scrActive();
	$('#tab_title ul li').click(function () {
		$('#tab_title ul li').removeClass('active');

		$(this).addClass('active');

		let data = $(this).find('div').attr('data-tab');
		$('#tab_fragrance, #tab_nail, #tab_lip').removeClass('active');
		$(data).addClass('active');
	});
});

// contact 영역 탭메뉴 클릭 이벤트
let dts = document.querySelectorAll('.contact_left_text dt');
let dds = document.querySelectorAll('.contact_left_text dd');
let rightImgs = document.querySelectorAll('.contact_right_img img, video');

let dts_a = document.querySelectorAll('.contact_left_text dt>a');

dts_a.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		active(dts, index);
		active(dds, index);
		active(rightImgs, index);
	});
});

function active(array, index) {
	for (let el of array) {
		el.classList.remove('on');
	}
	array[index].classList.add('on');
}
