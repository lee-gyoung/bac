// 카테고리 탭 클릭 이벤트

let $shopTitle = $('#shop_title>ul>li>div');
let $selectedTitle = $('#shop_title>ul>li');

$shopTitle
	.on('click', function () {
		$('#shop_tag').text($shopTitle.filter(this).text());
		$shopTitle.removeClass('on');
		$(this).addClass('on');
	})
	.filter(':eq(0)')
	.click()
	.addClass('on');

$selectedTitle.on('click', function () {
	$selectedTitle.removeClass('on');
	$(this).addClass('on');

	$('.shop_product_wrap>ul').removeClass('on');
	let dataTitle = $(this).find('div').attr('data-title');
	$(dataTitle).addClass('on');
});

$(document).ready(function () {
	let urlParams = new URLSearchParams(window.location.search);
	let toParam = urlParams.get('to');
	if (toParam == '' || toParam == null) {
		toParam = 'Nail';
	}
	let result = '#' + toParam.toLowerCase();
	$("div[data-title='" + result + "']").click();
});
