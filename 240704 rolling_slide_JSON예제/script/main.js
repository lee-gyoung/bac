let banner = document.getElementById('banner');
let list = document.querySelector('.list');
let prev = banner.querySelector('.prev');
let next = banner.querySelector('.next');
let wid = 0;
let num = 0;
let body = document.querySelector('body');
let enable_event = true;
let timer;

createList('./asset/data.json');

function createList(el) {
	fetch(el)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			// console.log(json);
			let items = json.imgSrc;
			// console.log(items);
			let tags = '';
			items.map((el) => {
				tags += `
                <li>
						<a href="${el.pic}">
							<img src="${el.thumb}" />
						</a>
					</li>`;
			});
			// console.log(tags);
			list.innerHTML = tags;
			initList();
		})
		.catch((err) => {
			console.error('데이터를 호출하는데 실패하였습니다');
		});
}

function initList() {
	let list_li = list.querySelectorAll('li');
	let len = list_li.length;
	// 유지보수를 위해 숫자 대신 length로
	wid = parseInt(getComputedStyle(list_li[0]).width);
	// console.log(wid);
	list.style.width = len * wid + 'px';
	list.style.marginLeft = -wid + 'px';
	list.prepend(list.lastElementChild);
}

function animate(element, property, start, end, duration, callback) {
	let startTime = performance.now();
	// startTime은 문서가 로드되고 해당 함수 performance.now()가 실행될 때까지의 시간을 의미
	function update(time) {
		let elementTime = time - startTime;
		let progress = Math.min(elementTime / duration, 1);
		let value = start + (end - start) * progress;
		element.style[property] =
			property === 'opacity' || property === 'scroll' ? value : value + 'px';
		if (progress < 1) {
			requestAnimationFrame(update);
		} else if (callback) {
			callback();
		}
	}
	requestAnimationFrame(update);
}

prev.addEventListener('click', (e) => {
	e.preventDefault();

	if (enable_event) {
		enable_event = false;

		/* new Anim(list, {
			prop: 'margin-left',
			value: 0,
			duration: 500,
			callback: () => {
				list.style.marginLeft = -wid + 'px';
				list.prepend(list.lastElementChild);
				enable_event = true;
			},
		});
        */

		animate(list, 'marginLeft', -wid, 0, 500, () => {
			list.style.marginLeft = -wid + 'px';
			list.prepend(list.lastElementChild);
			enable_event = true;
		});
	}
});

next.addEventListener('click', (e) => {
	e.preventDefault();

	if (enable_event) {
		enable_event = false;

		new Anim(list, {
			prop: 'margin-left',
			value: -wid * 2,
			duration: 500,
			callback: () => {
				list.style.marginLeft = -wid + 'px';
				list.append(list.firstElementChild);
				enable_event = true;
			},
		});
	}
});

// 이벤트 위임을 통해 list를 클릭했을 때 동적으로 만든 li a에 클릭 이벤트를 걸어야함

list.addEventListener('click', (e) => {
	e.preventDefault();

	// 실제 클릭 이벤트가 발생하는 e.target은 img이고
	// 우리가 찾아야 하는 것은 img의 부모인 a태그의 href 속성임
	let imgSrc = e.target.parentElement.getAttribute('href');

	// 동적으로 aside태그를 생성하고, 위의 imgScr을 img태그에 넣음

	let pop = document.createElement('aside');
	pop.classList.add('pop');
	pop.innerHTML = `
        <div class="pic">
        <img src="${imgSrc}" >
        </div>
        <span>CLOSE</span>
    `;
	document.body.append(pop);
});

// close 버튼은 body에 넣었기 때문에 body에 이벤트 위임을 해야함
body.addEventListener('click', (e) => {
	let pop = document.querySelector('.pop');

	if (pop) {
		let close = pop.querySelector('span');
		if (e.target == close) {
			pop.remove();
		}
	}
});

timer = setInterval(move, 50);

function move() {
	// margin-left의 초기값은 -240,
	// -480이 되는 순간이 하나의 슬라이드가 이동하는 값이 됨
	if (num < -wid * 2) {
		num = -wid;
		list.append(list.firstElementChild);
	} else {
		num -= 2;
	}
	list.style.marginLeft = num + 'px';
}

banner.addEventListener('mouseenter', () => {
	clearInterval(timer);
});

banner.addEventListener('mouseleave', () => {
	timer = setInterval(move, 50);
});
