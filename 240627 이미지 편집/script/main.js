let fileInput = document.querySelector('.fileInput');
let filterOptions = document.querySelectorAll('.filter button');
let filterName = document.querySelector('.filterInfo .name');
let filterValue = document.querySelector('.filterInfo .value');
let filterRange = document.querySelector('.info input');
let rotateOptions = document.querySelectorAll('.rotate button');
let previewImg = document.querySelector('.previewImg img');
let reset = document.querySelector('.reset');
let chooseBtn = document.querySelector('.chooseImg');
let saveBtn = document.querySelector('.saveImg');

// 초기 필터값, 초기 로테이트 값을 설정
// 필터는 문자로, 로테이트는 숫자로
let brightness = '100';
let saturation = '100';
let inversion = '0';
let grayscale = '0';
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;

function loadImage() {
	let file = fileInput.files[0];
	// files[] 라는 배열은 사용자가 파일을 선택해서 파일 입력 필드에 적용할 때
	// 받는 배열의 이름. 파일이 1개만 적용됐을 때는 0인덱스이므로 files[0]로 표현
	if (!file) return;
	previewImg.src = URL.createObjectURL(file);
	/* 파일 객체에 대한 임시 url을 만드는 것
    로컬 파일 시스템에서 선택한 파일을 브라우저에서 미리 볼 수 있도록
    임시 url을 생성하여 기존 이미지 태그의 url과 교체함
    하지만 지금 생성한 임시 url은 이 세션 안에서만 유효하기 때문에
    새로고침이 일어나면 url이 사라짐 */

	//
	previewImg.addEventListener('load', () => {
		document.querySelector('.editor').classList.remove('disable');
	});
}

chooseBtn.addEventListener('click', () => {
	fileInput.click();
});
fileInput.addEventListener('change', loadImage);

//

filterOptions.forEach((el) => {
	el.addEventListener('click', () => {
		document.querySelector('.filter .on').classList.remove('on');
		el.classList.add('on');

		filterName.innerText = el.innerText;

		if (el.id === 'brightness') {
			filterRange.max = '200';
			filterRange.value = brightness;
			filterValue.innerText = `${brightness}%`;
		} else if (el.id === 'saturation') {
			filterRange.max = '200';
			filterRange.value = saturation;
			filterValue.innerText = `${saturation}%`;
		} else if (el.id === 'inversion') {
			filterRange.max = '200';
			filterRange.value = inversion;
			filterValue.innerText = `${inversion}%`;
		} else {
			filterRange.max = '100';
			filterRange.value = grayscale;
			filterValue.innerText = `${grayscale}%`;
		}
	});
});

// 함수를 선언식이 아닌 표현식으로 만드는 이유 : 함수의 값을 다른 곳에서 사용할 수 있음
let updateFilter = () => {
	filterValue.innerText = `${filterRange.value}%`;

	// 내가 현재 동작하는 필터의 종류의 밸류값을 고정해서
	// 전역변수에 넣은 각 필터의 초기값을 변경하고,
	// 함수(실제 이미지에 필터를 적용하는 함수)에 해당 값을 적용하면 됨

	let selectedFilter = document.querySelector('.filter .on');
	if (selectedFilter.id === 'brightness') {
		brightness = filterRange.value;
	} else if (selectedFilter.id === 'saturation') {
		saturation = filterRange.value;
	} else if (selectedFilter.id === 'inversion') {
		inversion = filterRange.value;
	} else {
		grayscale = filterRange.value;
	}

	// 위의 코드로 각각의 필터값을 전역변수로 변경/덮어서 적용하면서
	// 아래의 필터 적용 함수를 호출하게 함
	applyFilter();
};

filterRange.addEventListener('input', updateFilter);

/*
이 예제에서 알아야하는 js의 내용
-> 파일을 첨부하는 내용, 동작을 통해 파일을 간단하게 편집하는 코드
*/

// 업데이트된 필터의 내용을 이미지에 적용시키는 함수
function applyFilter() {
	// 필터 적용하는 방법도 transform 적용하는 방법과 비슷함.
	// 적용할 것을 한 번에 적어야 하고, 유지하고자 한다면 계속 적어주어야 함
	previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

	previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}

rotateOptions.forEach((el) => {
	el.addEventListener('click', () => {
		if (el.id === 'left') {
			rotate -= 90;
		} else if (el.id === 'right') {
			rotate += 90;
		} else if (el.id === 'horizontal') {
			flipHorizontal = flipHorizontal === 1 ? -1 : 1;
			// 기본값을 1로 설정함, 따라서 현재의 값이 1이라면 -1로 변경하고
			// 1이 아니라면 (-1이라면) 다시 1로 변경하는 3항 연산자를 사용해서 값을 변경
			// scale의 음수값은 대상을 반전시킴. 해당 축으로 반전
			// -3이라면 3배 증가시키는데 반전시켜서 적용.
		} else {
			flipVertical = flipVertical === 1 ? -1 : 1;
		}
		applyFilter();
	});
});

reset.addEventListener('click', () => {
	// 전역변수에 처음 설정한 기본값으로 회귀하게 하고,
	// applyfilter 함수를 호출해서 리셋하면 됨

	brightness = '100';
	saturation = '100';
	inversion = '0';
	grayscale = '0';
	rotate = 0;
	flipHorizontal = 1;
	flipVertical = 1;
	filterOptions[0].click();
	applyFilter();
});

/*

canvas vs SVG

Canvas
1. 2차원 그래픽을 표현하기 위한 html언어에 속해있음
2. html5가 도입되면서 정립된 속성임
3. 픽셀 단위로 렌더링되며, 한 번 이미지가 그려지고 나면 브라우저는
해당 정보를 기억하지 않고, 위치가 바뀌면 재렌더링이 필요함
4. 해상도에 영향을 받음(확대하면 도트라 깨짐), 이벤트 핸들러가 지원되지 않아
해당 요소를 자바스크립트로 적용하기가 까다로움
5. 오직 그래픽만 지원하기 때문에 텍스트는 출력되지 않음
6. 주로 게임 등에서 사용됨
7. png, jpg등의 확장자를 가짐


SVG - 가변 벡터 도형 처리라는 의미
1. 2차원 그래픽을 표현하기 위한 xml언어
2. html에서는 사용을 못했으나 html5가 도입되면서 사용 가능해짐
3. 그려진 이미지를 객체로 인식하기 때문에 위치가 바뀌어도 인식되어 자동으로 위치가 변경
-> 객체의 위치 속성만 바뀐걸로 인식하기 때문
-> 비교) canvas로 만들어진 게임/그래픽은 용량이 큰 반면, svg로 만든 이미지는 비교적 용량이 작음
4. 해상도에 영향을 받지 않고 이벤트 핸들러가 지원이 됨(js 적용이 원활)
5. 범용적인 사용(이미지 뿐만 아니라 텍스트도 지원됨)
-> 범용적인 애플리케이션에 최적화된 방법
6. 확장자는 svg
*/

saveBtn.addEventListener('click', () => {
	let canvas = document.createElement('canvas');
	let canvas_context = canvas.getContext('2d');
	// 캔버스의 너비, 높이를 지정해야함
	canvas.width = previewImg.naturalWidth;
	canvas.height = previewImg.naturalHeight;
	// css에서 이미지의 크기를 max-width, max-height값으로 고정함
	// 따라서 캔버스의 가로 세로 값도 같은 값으로 적용하게 함
	// 실제 저장할 때는 원본 사이즈로 저장(해당 툴에서 볼 때만 부여한 사이즈로 보임)

	canvas_context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
	canvas_context.translate(canvas.width / 2, canvas.height / 2);
	// canvas 2d에서는 transform 생략하고 바로 속성으로 작성 가능함

	if (rotate !== 0) {
		canvas_context.rotate((rotate * Math.PI) / 180);
		// math함수에서 PI는 원에 관련된 함수를 적용하여
		// 그 지름의 비율을 만들어서 커스텀한 rotate를 적용할 수 있도록 함
	}
	canvas_context.scale(flipHorizontal, flipVertical);
	// 최종적으로 저장할 이미지 객체를 생성하는 코드가 필요함

	canvas_context.drawImage(
		previewImg,
		-canvas.width / 2,
		-canvas.height / 2,
		canvas.width,
		canvas.height
	);
	/*
	해당 메소드는 이미지를 캔버스의 특정 위치에 그려주는 메소드임
	매개변수 5개가 필요함
	1. 그릴 이미지의 객체
	2,3. 이미지가 그려질 X,Y 좌표
	4,5. 이미지가 가지는 너비와 높이
	*/
	let link = document.createElement('a');
	link.href = canvas.toDataURL('image/png', 1);
	// toDataURL('image/이미지의 확장자 선택', 이미지의 품질이나 큰 영향 없음)
	link.download = '이미지편집.png';
	link.click();
});
