//논리연산자
console.log('add' || 'remove');

console.log('add' && 'remove');

/*
|| 논리 합 연산자 (or)
두개의 피연산자 중에 하나만 트루가 나와도 트루가 반환됨
-> js가 평가할 때 좌항에서 우항으로 평가합니다(방향)
이때 add를 만났을때??truthy , falsey평가란?
불린값은 아니지만 불린값처럼 참, 거짓으로 평가(간주)하는 것을 
문자열의 경우 빈문자열만 아닌 모든 문자열을 truthy
숫자값의 경우 0이 아닌 모든 숫자를 truthy
불린값은 true만
객체나 배열, 함수등도 truthy평가가 가능합니다
-> 빈값만 아니면 됩니다. [1],{null}이것은 빈값이 아니므로
truthy로 평가합니다
|| 논리합 연산은 좌항에서 우항으로 평가하다가 좌항이
참이면 우항을 평가하지 않고, 참인 좌항만 평가한후 
해당 값을 반환합니다.
console.log('' || 'remove');
-> ''빈문자열을 만나서 거짓이기 때문에 or연산자는
우항을 평가하고 'remove를 평가한뒤 반환합니다.
*/

/*
&& 논리 곱 연산자
두개의 피연산자중에 모두가 트루이어야 트루가 반환됨
이 연산자도 좌항에서 우항으로 평가방향이 이루어짐
좌항이 만약 거짓이면 평가를 중단(우항을 평가하지 않음)
좌항이 참이어야 우항으로 넘어가서 우항을 평가하고
둘다 참이면 평가값을 반환함
*/

/*
옵셔널 체이닝 연산자 ?.
자바스크립트의 특징으로 1개의 두뇌를 가지고있기 때문에
1개의 오류가 생기면 이 오류로 인해서 이후의 모든코드가 
동작을 하지 않게됩니다.
오류가체가 큰의미가 없을경우 오류해결은 의미가 없는데
이 오류로 인해서 다음코드가 발현되지 않아 어려움이 있음*/
let user = {
	name: '은택',
	address: {
		city: '부천',
	},
};

console.log(user.address.city);
console.log(user?.address?.city);
// console.log(user.jab.named);
console.log(user?.jab?.named);

console.log('이 문장이 보일까요?');

// let userInfo = [{ name: '은택' }, { name: '수빈' }];
let userInfo = [
	{
		name: '은택',
		greeting: function () {
			return '안녕하세요';
		},
	},
	{ name: '수빈' },
];
console.log(userInfo[0].name);
console.log(userInfo[1].name);
console.log(userInfo?.[0]?.name);
console.log(userInfo?.[3]?.find);
//옵셔널 체이닝연산자로 호출하면 존재하지 않는 값이면
//언디파인드를 반환하여 에러를 방지함
// console.log(userInfo[3].find); //기존 방법으로 불렀을때
//에러가 발생함 따라서 이후 코드는 동작안됨

console.log(userInfo[0].greeting());
// console.log(userInfo[1].greeting()); //존재하지 않음으로에러
console.log(userInfo[1].greeting?.());

/*
옵셔너 체이닝연산자는 각 코드사이에 ?.연산자를 넣어 표현하고
사용 예시 ) userInfo?.[0]?.name
장점으로는 널이나 언디파인드일때 안전하게(에러가 없게)처리하여
런타임 에러를 방지합니다. 따라서 개발할때 불필요한 에러처리
조건문작성등을 방지하여 개발시간을 단축할수있습니다
주의) 개발이 완성되고 나서는 해당 코드를 남겨놓을시
위험할수있으므로 개발중간단계에서만 사용하는것이 좋겠다.*/

/* null병합 연산자 ??
기본동작이나 개념은 옵셔널체이닝 연산자와 비슷합니다
다만 명확한 성질이 있습니다
옵셔널 체이닝연산자는 falsey값도 취급하지만 널병합은
무조건 오직 false값만 취급하여 명확하게 표시할 수 있음.
예시) userInfo?.[0]?.name 을 평가할때 기준을 falsey값으로 
평가합니다 
참고) false는 명확히 거짓을 말하고,
falsey는 거짓으로 판별할 수 있는것들을 의미함
null, 빈값, 언디파인드는 확실하게 값이 없음을 말하지만
NaN 숫자를 넣어야하는데 숫자가 아닌값일경우 반환하는 값인데
NaN은 falsey값입니다.

*/

let userOne = {
	profile: {
		name: '은택',
	},
};
// null병합연산자와 ||(or)연산자가 스위칭이 가능합니다
let userName = userOne.profile.names ?? '수빈';
console.log(userName);

let userProfile = {};
userName = userProfile.profile?.names ?? '은택';
console.log(userName);

/*
널병합연산자는 예를들면 !important와 같습니다.
따라서 자주 사용하지 않고 되도록 ||(or)연산자를 사용하거나
혹은 ?.를 사용하는 방법으로 하는것을 추천합니다
*/

// 디폴트 파라미터
/*파라미터란??
//파라미터란 함수 외부에서 내부로 값을 전달하기 위한
//내부 변수를 의미합니다
go('안녕');
function go(greet) {
	return greet + '하세요';
}*/

function intro1(animal) {
	!animal && (animal = 'rabbit');
	return `My animal is ${animal}`;
}
// 명령문의 스타일로 변수 할당하고, 조건부로 처리합니다
//변수를 수정하는 스타일입니다, 변수수정이라는 일처리가
//추가됩니다, 변수재활용, 수정등이 자주 일어난다면 이방법이
//좀더 좋을 수 있습니다.
console.log(intro1());
console.log(intro1('ant'));
function intro2(animal) {
	return `My animal is ${animal || 'rabbit'}`;
}
/* 표현식스타일로 기본값을 처리하여 좀더 간결합니다
반환문 내에서 조건에 따라서 값을 설정하기 때문에
반순한 값을 반환하는 코드로 수정이나 다른 기타상황이 일어나지
않는 장점*/
console.log(intro2());
console.log(intro2('ant'));

/* 매개변수가 여러개인 경우 복수 디폴트 파라미터가 가능합니다
 */

let intro3 = function (name = '은택', interest = '책읽기') {
	return `My name is ${name} and I like ${interest}.`;
};
// 기본 논리는 위의 코드처럼 ()파라미터자리에 디폴값이 존재하면
//동작된다는 원리다.
console.log(intro3());
console.log(intro3('수빈', '잠자기'));
//이 코드는 좋은 코드가 아니다??
//디폴트 파라미터를 ()매개변수 자리에서 사용할 경우
//가독성이 좋지 않으며, 혹시 오타등의 이유로 망가질 경우
//함수 자체에 영향을 미쳐 동작을 어렵게 만듭니다.
let defaults = { name: 'david', interest: 'singing' };
let intro4 = function (option = defaults) {
	// return `My name is ${name} and I like ${interest}.`;
	return `My name is ${option.name} 
	and I like ${option.interest}.`;
};
console.log(intro4());
console.log(intro4({ name: '은택', interest: '영화보기' }));
//매개변수자리에 값(객체)을 넣으면 해당 값(객체가) option매개변수
//에 할당됩니다(option = {})
//하지만 없을경우 option = defaults가 할당되어 적용됨

let intro5 = function ({ name = 'david', interest = 'singing' } = {}) {
	return `My name is ${name} 
	and I like ${interest}.`;
};
console.log(intro5());
console.log(intro5({ name: '은택', interest: '책읽기' }));
