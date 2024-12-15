// 공지사항 페이지 게시물 클릭 팝업

let $showNotice = $('.notice_board tbody tr');

$showNotice.on('click', function () {
	$('#popup').css({ display: 'block' });
});

$('#close').on('click', function () {
	$('#popup').css({ display: 'none' });
});

// 리뷰 페이지 유튜브 api 및 동적 DOM 생성

let reviewList = document.querySelector('.review_list');
let key = 'AIzaSyCJXuOssJ-Pyy9CRYVOCOVfhCwvuF9vTWY';
let playListId = 'PLbka_sQYTM6CGzBSQkh-D-5-GiAp6CjK1';
let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=5`;

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		let result = '';
		items.map((el) => {
			let title = el.snippet.title;
			if (title.length > 30) title = title.substr(0, 27) + '...';
			let des = el.snippet.description;
			if (des.length > 50) des = des.substr(0, 50) + '...';
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];
			result += `
            <div>
                <a href="${el.snippet.resourceId.videoId}" class="pic">
                    <img src="${el.snippet.thumbnails.medium.url}" alt="" />
                </a>
                <div class="con">
                    <h4>${title}</h4>
                    <p>${des}</p>
                    <span>${date}</span>
                </div>
            </div>
            `;
			if (reviewList != null) reviewList.innerHTML = result;
		});
	});

if (reviewList != null) {
	reviewList.addEventListener('click', (e) => {
		e.preventDefault();

		if (!e.target.closest('a')) return;

		let vidId = e.target.closest('a').getAttribute('href');

		let pop = document.createElement('figure');
		pop.classList.add('review_pop');
		pop.innerHTML = `
			<iframe src="https://www.youtube.com/embed/${vidId}"
				frameborder="0" width="100%" height="100%"></iframe>
			<span class="btnClose">close</span>
			`;
		reviewList.append(pop);
	});
}

let close = document.querySelector('.btnClose');
if (reviewList != null) {
	reviewList.addEventListener('click', (e) => {
		let pop = reviewList.querySelector('.review_pop');

		if (pop) {
			let close = pop.querySelector('.btnClose');
			if (e.target == close) pop.remove();
		}
	});
}
