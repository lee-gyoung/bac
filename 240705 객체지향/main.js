const tab = document.querySelector('#tab');
const btns = tab.querySelectorAll('ul li');
const boxes = tab.querySelectorAll('article div');

btns.forEach((el, index) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		// for (let el of btns) el.classList.remove('on');
		// btns[index].classList.add('on');
		active(btns, index);

		// for (let el of boxes) el.classList.remove('on');
		// boxes[index].classList.add('on');
		active(boxes, index);
	});
});

function active(arr, index) {
	for (let el of arr) el.classList.remove('on');
	arr[index].classList.add('on');
}

/*
1. 절차지향 코드 (절차지향적 프로그래밍)
코드를 단계적인 절차로 구성하고, 데이터와 절차를 분리해서 프로그램을 구성하는 방법
보안에 관련된 코드는 절차 지향적 코드를 선호함
그러나 js에서는 절차지향적 코드를 저급 코드라고 봄
=> 프로그래밍 철학적 관점(코딩 스타일), 작동 환경 등을 고려해서 절차지향과 객체지향을 섞어서
코딩하는 모습이 많음

2. 함수지향적 프로그래밍
-> 순수함수 : 외부로부터 독립되어 영향을 주거나 받지 않는 함수
-> 따라서 순수함수는 이식성이나 재활용성이 높음
함수지향적 프로그래밍이란 순수함수를 지향하여 함수의 조합과 변환을 통해서
재활용, 유지보수성을 극대화하려는 노력의 코딩 방식

3. 객체지향적 프로그래밍
객체와 객체지향?
코드를 독립적인 단위로 만드는 것이 목표인 프로그래밍

객체지향의 성격 주요개념
1) 캡슐화
2) 상속
3) 다형성
4) 추상화
*/

/*
es5 vs es6
es5에서의 객체지향 코드는 생성자함수
-> 단점: 바인딩 이슈와 프로토타입 이슈가 있음

es6에서는 객체지향 코드로 클래스 문법이라는 것을 사용함
-> 장점: 바인딩 이슈를 ()=>{} 화살표 함수로 해결
프로토 타입 이슈도 해결해서 아주 쉽고 간결하게 객체 지향 코드를 작성할 수 있음
*/
