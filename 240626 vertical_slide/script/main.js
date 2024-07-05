let panel = document.querySelector('.panel');
let panel_li = Array.from(panel.querySelectorAll('li'));

let btnUp = document.querySelector('.btnUp');
let btnDown = document.querySelector('.btnDown');

let enable_event = true;

panel_li.map((el) => split(el.querySelector('h2')));

function split(el) {
	let txt = el.innerText;
	let frag = document.createDocumentFragment();

	let num = 0;
	for (let el of txt) {
		let span = document.createElement('span');
		span.style.transitionDelay = `${0.1 * num++}s`;
		span.textContent = el;
		frag.appendChild(span);
	}
	el.innerText = '';
	el.appendChild(frag);
}

/*
현재 활성화 되어있는 패널의 인덱스를 알아야함
1. 순환을 위해서
2. 모션을 위해서( up을 눌렀을 시 현재 활성화 li에 up클래스를 붙여서 위로 사라지는 모션을 추가함,
    이후 그 다음 순번의 li가 down클래스가 사라지면서 활성화가 되어야 함
    -> 그러므로 up클래스로 사라진 현재 활성화 패널에 순간적으로 up 클래스를 붙여 모션 활성화 후에
    반드시 up을 제거하고 up모션 동안 다음 순번 패널에 순간 down클래스를 붙였다가 바로 떼서
    밑에서 올라오는 모션을 취할 수 있도록 함 )
*/
btnUp.addEventListener('click', () => {
	if (enable_event) {
		enable_event = false;
		let current_li = panel.querySelector('.on');
		let current_index = panel_li.indexOf(current_li);
		// 대상.indexOf(조건) : 대상 중에 조건에 해당되는 내용이 몇번째에 있는지 찾아서 순번을 반환함. 없으면 -1을 반환
		let next_index = null;
		if (current_index !== panel_li.length - 1) {
			next_index = current_index + 1;
		} else {
			next_index = 0;
		}

		current_li.classList.remove('on');
		current_li.classList.add('up');
		panel_li[next_index].classList.add('down');

		setTimeout(() => {
			panel_li[next_index].classList.remove('down');
			panel_li[next_index].classList.add('on');
			panel.querySelector('.up').classList.remove('up');
			setTimeout(() => {
				enable_event = true;
			}, 1500);
		}, 700);
	}
});

btnDown.addEventListener('click', () => {
	if (enable_event) {
		enable_event = false;
		let current_li = panel.querySelector('.on');
		let current_index = panel_li.indexOf(current_li);
		let prev_index = null;

		if (current_index !== 0) {
			prev_index = current_index - 1;
		} else {
			prev_index = panel_li.length - 1;
		}

		current_li.classList.remove('on');
		current_li.classList.add('down');
		panel_li[prev_index].classList.add('up');

		setTimeout(() => {
			panel_li[prev_index].classList.remove('up');
			panel_li[prev_index].classList.add('on');
			panel.querySelector('.down').classList.remove('down');
			setTimeout(() => {
				enable_event = true;
			}, 1500);
		}, 700);
	}
});
