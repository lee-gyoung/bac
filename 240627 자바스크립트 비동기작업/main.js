// let btn = document.getElementById('btn');
// let resultDiv = document.getElementById('result');

// callbak 함수의 매개변수(순번에 해당하는 숫자, 함수)
// function callbak(step, callback) {
// 	setTimeout(() => {
// 		callback('콜백함수' + step);
// 	}, 1000);
// }

// btn.addEventListener('click', () => {
// 	callbak(1, (data1) => {
// 		resultDiv.innerHTML = 'step 1: ' + data1;
// 		callbak(2, (data2) => {
// 			// resultDiv.innerHTML = '<br>step 2: ' + data2;
// 			// 윗줄은 기존의 내용을 지우고 밑줄을 작성하므로 한줄만 출력
// 			resultDiv.innerHTML += '<br>step 2: ' + data2;
// 			// +=을 사용하면 추가적으로 작업함
// 			callbak(3, (data3) => {
// 				resultDiv.innerHTML += '<br>step 3: ' + data3;
// 				callbak(4, (data4) => {
// 					resultDiv.innerHTML += '<br>step 4: ' + data4;
// 					callbak(5, (data5) => {
// 						resultDiv.innerHTML += '<br>step 5: ' + data5;
// 					});
// 				});
// 			});
// 		});
// 	});
// });
/*
콜백함수란?
비동기적 실행방식의 1단계로 함수의 매개변수로 함수를 넣어서
함수 실행 후 매개변수로 넣은 함수가 실행하는 모양이 된다.

단점: 유지보수와 가독성이 매우 좋지 않음
에러처리가 어렵고 코드가 중복되기 쉬움
제어의 흐름을 명확하게 이해하여 어떤 함수가 어떤 지점에서 호출되는지
추적하기 어려움

장점: 1단계라 배우고 사용하기 쉬움
*/

// 두번째 비동기 작업 프로미스

let btn = document.getElementById('btn');
let resultDiv = document.getElementById('result');

// 프로미스 객체를 만듦

function callbak(step) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (step > 3) {
				console.log(`Error : step이 오버됨`);
			} else {
				resolve('프로미스 비동기 처리' + step);
			}
		}, 1000);
	});
}

btn.addEventListener('click', () => {
	callbak(1)
		.then((data1) => {
			resultDiv.innerHTML += 'step1 : ' + data1;
			return callbak(2);
		})
		.then((data2) => {
			resultDiv.innerHTML += '<br>step2 : ' + data2;
			return callbak(3);
		})
		.then((data3) => {
			resultDiv.innerHTML += '<br>step3 : ' + data3;
			return callbak(4);
		})
		.then((data4) => {
			resultDiv.innerHTML += '<br>step4 : ' + data4;
			return callbak(5);
		})
		.catch((err) => {
			console.log('Error : ', err);
		});
});

/*
프로미스 후속 처리 메소드

1. then
프로미스의 핵심 메소드
프로미스가 완료되었을 때 수행될 콜백함수를 등록한다

특징
- 체이닝, then은 항상 새로운 프로미스 객체를 반환하여
연쇄적인 then작성을 할 수 있도록 함
.then((data4) => {
			resultDiv.innerHTML += '<br>step4 : ' + data4;
			return callbak(5); // 이렇게 연달아서 작업 요청 가능
		})

- 비동기작업
then은 return값에 접근이 가능하여 해당 프로미스가 완료되어 프로미스 객체를 반환할 때까지
다음 then은 대기하여 비동기작업이 이루어지도록 함(순서에 맞춰서 일처리를 하게 함)


2. catch
프로미스에서 발생한 오류를 처리하기 위해서 사용한다
프로미스 내부에서 예외가 발생하거나, reject 객체가 반환될 경우
catch가 실행됨

then에서도 오류처리가 가능하긴 하지만 catch에서 한번에 작업하는 게 일반적이고
다만 유지보수를 위해서 맨 마지막에 catch문을 작성함(위치는 무방하긴 함)


=> 웹 퍼블리셔 기준으로는 api를 프로미스로 객체를 호출하는 정도만 알고있어도 무방


비동기작업과 자바스크립트의 비동기작업에서 이벤트 루프의 역할(중요)

기본 동기작업인 js내부에서는 순서대로 작업이 이루어지고
비동기작업은 순서가 아닌 작업이 마치는 시간에 따라서 다른 순서와 상관없는 작업으로
생각될 수 있지만 js의 비동기 작업은 이벤트 루프에서 관리되기 때문에
코드의 실행순서를 조절할 수 있다는 면에서 비동기작업의 순서가 이루어짐
*/
