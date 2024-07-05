/* */

//1. 객체를 생성하는방법?
// 객체리터럴 생성방식 : 직관적인 코드, 간편하게 객체를 만들수있다
// 동일한 형식의 객체를 여러개 만들게될경우 비효율적임
let circle1 = {
	radius: 4,
	backColor: 'red',
};
let circle2 = {
	radius: 6,
	backColor: 'blue',
};
// 2. js내부에 존재하는 생성자 함수(내장함수)를 사용해서 만드는방법

let funCircle1 = new Object();
//Object라는 내장함수(공장, 거푸집)를 이용해서 아이템(객체)를
//하나 생성하는 그런 과정
//예) 슬라이드를 하드코딩으로 안만드로 swiper.js를 사용해서
//만드는것이라고 예시들수있겠습니다
funCircle1.radius = 7;
funCircle1.backColor = 'green';
console.log(funCircle1);
// 사용자 정의의 객체를 만들기는 어렵다

//3. 생성자 함수를 커스텀함수로 제작하기
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.greeting = function () {
		console.log(`hello, my name is ${this.name}
            and I am ${this.age} years old.
        `);
	};
}
let person1 = new Person('은택', 20);
person1.greeting();

let person2 = new Person('수빈', 22);
person2.greeting();

// function person2(name, age) {
// 	수빈 = name;
// 	22 = age;
// 	this.greeting = function () {
// 		console.log(`hello, my name is 수빈
//             and I am 22 years old.
//         `);
// 	};
// }
