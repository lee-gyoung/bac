let toggleBtn = document.getElementById('toggleBtn');
let pwd1 = document.querySelector('#pwd1');

toggleBtn.addEventListener('click', () => {
	// if(조건1의 내용){
	//     조건1이 참이면 실행하는 코드가 들어갑니다
	// }else if(조건2의 내용){
	//     조건1이 거짓이면서 동시에 조건2가 참이면 실행하는 코드
	// }
	if (pwd1.type === 'password') {
		pwd1.setAttribute('type', 'text');
		toggleBtn.classList.add('hide');
	} else if (pwd1.type === 'text') {
		pwd1.setAttribute('type', 'password');
		toggleBtn.classList.remove('hide');
	}
});

// validation 인증 작업
let form = document.querySelector('.join');
let btnSubmit = document.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	// 아이디
	if (!isTxt('userid', 5)) {
		e.preventDefault();
	}
	// e.preventDefault();
	// 위의 5개 인증 요소를 다 충족시켜야만 submit버튼의 이벤트를 발생하도록 하고
	// 하나라도 충족되지 않을 시 submit 버튼의 역할을 막음
	if (!isCheck('hobby')) {
		e.preventDefault();
	}
	if (!isCheck('gender')) {
		e.preventDefault();
	}
	if (!isPwd('pwd', 're-pwd', 8)) {
		e.preventDefault();
	}
});

// 인증함수
// 함수=동작, 기능의 하나의 역할 단위
// 인증 하나 당 하나의 함수가 필요하다치면 최소 5개의 함수 필요

function isTxt(id, len) {
	// *사용자가 값을 넣는 대상을 변수로 설정
	let lens = len;
	let input = form.querySelector(`[name=${id}]`);
	// 전역변수로 사용 시 충돌이 일어날 수 있기 때문에
	// 지역변수로 적어줌
	// *그 대상의 인풋 태그에 넣은 값을 변수에 담음
	let txt = input.value;
	// *사용자가 작성한 값과 개발자가 설정한 값을 비교함
	if (txt.length >= 5) {
		// 먼저 에러메세지가 있는지 p태그를 선택하는 코드
		let iserrMsgs = input.closest('td').querySelectorAll('p');
		// p태그는 동적으로(js에서) 생성된 태그이기 때문에 remove로 삭제가 됨
		// iserrMsgs.remove();
		if (iserrMsgs.length > 0) {
			input.closest('td').querySelector('p').remove();
		}
		// *비교값이 참이면 트루를
		return true;
	} else {
		// 1. 조건이 거짓이면 동적으로 경고문구를 만들어줌
		// 2. 하지만 이렇게만 하면 무한하게 경고문구를 만들어냄
		// 따라서
		// 2-1. 다시 참으로 바뀌었을 시 경고 문구를 지워야하고
		// 2-2. 또다시 거짓이면 경고 문구가 또 만들어지지 않아야함

		// 이전 에러메세지 지우는 코드
		let iserrMsgs = input.closest('td').querySelectorAll('p');
		if (iserrMsgs.length > 0) {
			input.closest('td').querySelector('p').remove();
		}

		// 에러메세지를 생성하는 코드
		let errMsg = document.createElement('p');
		errMsg.append('입력 항목을 5글자 이상 입력하세요');
		input.closest('td').append(errMsg);

		return false;
	}
}

// 체크함수 (체크박스, 라디오)
function isCheck(el) {
	// 변수 설정
	let inputs = form.querySelectorAll(`[name=${el}]`);
	console.log(inputs);
	let isCheck = false;
	// 취미일때 [input#game, input#sleeping, input#reading]
	// 성별일때 [input#male, input#female]
	for (let el of inputs) {
		// el.checked를 확인해서 하나라도 체크가 되어있으면 true
		// 하나도 체크가 안되어있으면 false
		// 그리고 false일 경우 else 코딩이 안되어있으므로 if 자체가 무시됨
		// true면 안에 있는 isCheck = true; 가 실행됨
		if (el.checked) {
			isCheck = true;
		}
	}

	// *사용자가 작성한 값과 개발자가 설정한 값을 비교함
	if (isCheck == true) {
		let iserrMsgs = inputs[0].closest('td').querySelectorAll('p');
		console.log(iserrMsgs);
		if (iserrMsgs.length > 0) {
			inputs[0].closest('td').querySelector('p').remove();
		}
		return true;
	} else {
		let iserrMsgs = inputs[0].closest('td').querySelectorAll('p');
		console.log(iserrMsgs);
		if (iserrMsgs.length > 0) {
			inputs[0].closest('td').querySelector('p').remove();
		}
		let errMsg = document.createElement('p');
		errMsg.append('필수 입력 항목을 선택해주세요');
		inputs[0].closest('td').append(errMsg);
		return false;
	}
}

// 패스워드 함수
function isPwd(name1, name2, len) {
	let pwd1 = form.querySelector(`[name=${name1}]`);
	let pwd2 = form.querySelector(`[name=${name2}]`);
	console.log(pwd1, pwd2, len);

	let pwd1_val = pwd1.value;
	let pwd2_val = pwd2.value;
	console.log(pwd1_val, pwd2_val);

	if (
		pwd1_val === pwd2_val &&
		pwd1_val.length >= len &&
		/[0-9]/.test(pwd1_val) &&
		/[a-zA-Z]/.test(pwd1_val) &&
		/[~!@#$%^&*()_+?<>]/.test(pwd1_val)
		/*
		/안녕/.test(특정대상)
		=> 특정대상에 안녕이라는 글자가 있는지의 여부를 평가해서
		있으면 true 없으면 false를 반환
		*/
	) {
		let iserrMsgs = pwd1.closest('td').querySelectorAll('p');
		// p태그는 동적으로(js에서) 생성된 태그이기 때문에 remove로 삭제가 됨
		// iserrMsgs.remove();
		if (iserrMsgs.length > 0) {
			pwd1.closest('td').querySelector('p').remove();
		}

		return true;
	} else {
		let iserrMsgs = pwd1.closest('td').querySelectorAll('p');
		if (iserrMsgs.length > 0) {
			pwd1.closest('td').querySelector('p').remove();
		}

		// 에러메세지를 생성하는 코드
		let errMsg = document.createElement('p');
		errMsg.append(
			`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`
		);
		pwd1.closest('td').append(errMsg);
		return false;
	}
}
