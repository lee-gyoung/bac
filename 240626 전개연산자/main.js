/*
js의 데이터들은 JSON형식으로 저장, 관리, 사용되는데
이 json은 객체, 배열로 이루어져있음
복사를 할 때 자료형(원시형, 참조형)에 따라 복사의 방법이 달라짐
*/

// 원시형 복사 방법
let num1 = '20240626';
let num2 = num1;

console.log(num1); //20240626
console.log(num2); //20240626

num1 = '12341234';
console.log(num1); //12341234
console.log(num2); //20240626
// => 독립적임

//
// 참조형 복사 방법
let arr1 = [1, 2, 3];
let arr2 = arr1;
console.log(arr1); // [1, 2, 3]
console.log(arr2); // [1, 2, 3]

arr1[0] = 0;
console.log(arr1); // [0, 2, 3]
console.log(arr2); // [0, 2, 3]
//  => 의존적임

/*
불변성이란?
기존의 자료가 복사, 변형, 이동 등의 변화가 있을 때,
변화 이전과 이후의 자료가 서로에게 영향을 미치지 않는 성질을 뜻함
=> 빅데이터 시대에 매우 중요해진 성질


전개연산자 -> '스프레드 문법'이 더 정확한 표현
*/

let arr3 = [1, 2, 3, 4, 5];
let arr4 = [...arr3];
console.log(arr3); // [1, 2, 3, 4, 5]
console.log(arr4); // [1, 2, 3, 4, 5]

arr3[0] = 0;
console.log(arr3); // [0, 2, 3, 4, 5]

let arr5 = [...arr3, 6];
console.log(arr5); // [0, 2, 3, 4, 5, 6]

let arr6 = [...arr3, ...arr4];
console.log(arr6); // [0, 2, 3, 4, 5, 1, 2, 3, 4, 5]

let www = {
	name: 'wdz',
	age: '29',
};

let wwwCopy = { ...www, address: 'army' };

console.log(www); // {name: 'wdz', age: '29'}
console.log(wwwCopy); // {name: 'wdz', age: '29', address: 'army'}
