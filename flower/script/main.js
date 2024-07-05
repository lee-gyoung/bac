let $box = $('.box');
let enable_event = true;

$('.navi li a').on('click', function (e) {
	e.preventDefault();

	if (enable_event) {
		enable_event = false;
		$('.navi li a').removeClass('on');
		$('.box').removeClass('on');

		$(this).addClass('on');
		let boxId = $(this).attr('href');
		// $(boxId).addClass('on');
		activeBox(boxId);
	}
});

function activeBox(target) {
	$box.stop().fadeOut(500).removeClass('on');
	$(target)
		.stop()
		.fadeIn(500, function () {
			$(this).addClass('on');

			setTimeout(function () {
				enable_event = true;
			}, convertSpeed($(this).children('img')));
		});
}

function convertSpeed(target) {
	let speed = $(target).css('transition-duration');
	//console.log(speed); //2s , 2.5s
	// console.log(parseFloat(speed.split('s')));
	speed = parseFloat(speed.split('s')) * 1000;
	// console.log(speed);
	return speed;
}
