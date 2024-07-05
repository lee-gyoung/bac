/*
class문법을 사용하여 객체지향을 함
class 선언이라고도 함
장점: 코드의 가독성과 이해하기가 비교적 쉽다
메서드를 화살표 함수로 정의하여 this의 바인딩 작업을 알아서 해주므로
추가적인 바인딩 작업이 필요없다
또한 상속 등과 같은 객체지향 고급 기능을 추가적으로 구현할 수 있음
*/

class MyTab {
	constructor() {
		this.tab = document.querySelector('#tab');
		this.btns = this.tab.querySelectorAll('ul li');
		this.boxes = this.tab.querySelectorAll('article div');
		this.bindingEvent();
	}
	bindingEvent() {
		this.btns.forEach((el, index) => {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				this.active(this.btns, index);
				this.active(this.boxes, index);
			});
		});
	}
	active(arr, index) {
		for (let el of arr) el.classList.remove('on');
		arr[index].classList.add('on');
	}
}

new MyTab('#tab');

// 상속

class ExTab extends MyTab {
	constructor() {
		super();
		//상속받는 대상의 모든것을 그대로 사용하겠다는 의미
		//추가작업
		this.tab.addEventListener('mouseenter', () => {
			console.log('상속자들입니다.');
		});
	}
	addMethod() {
		this.tab.style.backgroundColor = 'pink';
		console.log('메서드가 추가되었습니다');
	}
}

let extendTab = new ExTab();
// 상속하고 추가한 메서드는 반드시 추가적인 호출을 해줘야 함
extendTab.addMethod();
extendTab.active(extendTab.btns, 0);
