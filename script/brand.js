// 스크롤 페이드 인 이벤트
let section1 = document.querySelector('.brand_story2');
let section2 = document.querySelector('.brand_feature');
let section3 = document.querySelector('.brand_nature');
let section4 = document.querySelector('.brand_join');
let swiperInitialized = false;

function checkScroll() {
	let scrollY = window.scrollY || window.pageYOffset;

	if (scrollY >= 860) {
		section1.classList.add('on');
	}
	if (scrollY >= 1850) {
		section2.classList.add('on');
	}
	if (scrollY >= 2600) {
		section3.classList.add('on');
		if (!swiperInitialized) {
			initializeSwiper();
			swiperInitialized = true;
		}
	}
	if (scrollY >= 3200) {
		section4.classList.add('on');
	}
}

window.addEventListener('scroll', checkScroll);
checkScroll();

// 버티컬 슬라이드 작동
function initializeSwiper() {
	new Swiper('.mySwiper', {
		speed: 400,
		direction: 'vertical',
		mousewheel: true,
		watchOverflow: true,
		touchReleaseOnEdges: true,
		mousewheel: {
			releaseOnEdges: true,
		},
		on: {
			slideChange: function () {
				setTimeout(() => {
					this.params.touchReleaseOnEdges = false;
					this.params.mousewheel.releaseOnEdges = false;
				});
			},
			reachEnd: function () {
				setTimeout(() => {
					this.params.touchReleaseOnEdges = true;
					this.params.mousewheel.releaseOnEdges = true;
				}, 400);
			},
			reachBeginning: function () {
				setTimeout(() => {
					this.params.touchReleaseOnEdges = true;
					this.params.mousewheel.releaseOnEdges = true;
				}, 400);
			},
		},
	});
}
