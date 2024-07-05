function outerFunction(outerV) {
	let outerScopedValue = 'rockstar never die';
	function innerFunction(innerV) {
		console.log('outerV : ', outerV);
		console.log('outerScopeValue : ', outerScopedValue);
		console.log('innerV :', innerV);
	}
	return innerFunction;
}
let newFunc = outerFunction('outside');
newFunc('woodz');
/*
클로저란?
함수와 그 함수가 선언된 어휘적 환경의 조합을 지칭한다
"함수와 그 함수의 주변환경을 '기억'하는 것"
*/

function creatingGreeting(greeting) {
	return function (name) {
		console.log(greeting + ', ' + name);
	};
}
let www = creatingGreeting('fff');
www('ddd');
