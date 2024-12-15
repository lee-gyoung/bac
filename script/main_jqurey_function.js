// 헤더 서브 메뉴 슬라이드
$('.header_slide').on('mouseenter', function () {
	$(this).children('.sub_menu').stop().slideDown();
});
$('.header_slide').on('mouseleave', function () {
	$(this).children('.sub_menu').stop().slideUp();
});

// 모바일 버전 서브 메뉴 클릭 이벤트
$('.btn_fold').click(function () {
	$(this).children('.btn_sub_menu').stop().slideToggle();
});

// 우측 슬라이드
$('#right_slide_wrapper .right_slide_pics li:gt(0)').hide();

setInterval(function () {
	$('#right_slide_wrapper .right_slide_pics li:first-child')
		.fadeOut()
		.next('li')
		.fadeIn()
		.end()
		.appendTo('.right_slide_pics');
}, 3300);
