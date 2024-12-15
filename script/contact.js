// 카카오맵 api

var container = document.getElementById('map');
var options = {
	center: new kakao.maps.LatLng(37.5482585, 126.9189736),
	level: 3,
};

var map = new kakao.maps.Map(container, options);
var markerPosition = new kakao.maps.LatLng(37.5482585, 126.9189736);
var marker = new kakao.maps.Marker({
	position: markerPosition,
});

marker.setMap(map);
