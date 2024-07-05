function MyTab() {
	this.tab = document.querySelector('#tab');
	this.btns = this.querySelectorAll('ul li');
	this.boxes = this.querySelectorAll('article div');
	// 생성자함수(틀)에서 생성될 인스턴스의 변수를 설정해주는 것
	this.bindingEvent();
}

/*
프로토 타입이란?
객체 생성자 함수의 프로퍼티로 객체 생성자 함수를 정의할 때
프로토 타입을 사용해서 이 생성자 함수로 생성될 모든 인스턴스가
공유할 수 있는 메서드나 속성을 정의한다
따라서 메모리 절약과 효율성을 높일 수 있음
*/

MyTab.prototype.bindingEvent = function () {
	this.btns.forEach(
		function (el, index) {
			el.addEventListener(
				'click',
				function (e) {
					e.preventDefault();
					this.active(this.btns, index);
					this.active(this.boxes, index);
				}.bind(this)
			);
		}.bind(this)
	);
};

MyTab.prototype.active = function (arr, index) {
	for (let el of arr) el.classList.remove('on');
	arr[index].classList.add('on');
};

let useTab = new MyTab('#tab');
