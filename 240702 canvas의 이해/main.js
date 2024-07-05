let canvas = document.getElementById('myCanvas');
// 아이디를 js에서 변수로 담기 위해 호출할 때는 getElementById를 쓰는 것이 좋음

let canvas_context = canvas.getContext('2d');

canvas_context.beginPath();
/*
beginPath() 메서드는 새로운 경로를 시작하겠다는 의미로
캔버스에서 그림을 그리기 시작할 때 새로운 경로를 정의하는 용도임
이 메서드를 이용해서 이전 경로와 독립된 새로운 경로를 생성하므로
독립된 도형을 그릴 수 있음
*/
canvas_context.arc(100, 100, 50, 0, 2 * Math.PI);
/*(x, y, radius, startAngle, endAngle)
x: 원의 중심 좌표
y: 원의 중심 좌표
radius: 원의 반지름
startAngle: 시작 지점 (라디안)
endAngle: 종료 지점 (라디안)
*/
canvas_context.fillStyle = 'red';
canvas_context.fill();

canvas_context.beginPath();
canvas_context.fillStyle = 'blue';
canvas_context.fillRect(300, 300, 100, 100);
/*(x, y, width, height)
x: 도형의 시작지점
y: 도형의 시작지점
width: 도형의 너비
height: 도형의 높이
*/

canvas_context.beginPath();
canvas_context.moveTo(300, 300);
// moveTo 메서드는 펜의 위치를 새로운 x,y 좌표로 옮기는 메서드임
// 단, 실제 선을 그리지는 않고 새로운 시작점을 설정하는 것

canvas_context.lineTo(350, 350);
canvas_context.lineTo(300, 400);
canvas_context.lineTo(250, 350);
canvas_context.closePath();

canvas_context.fillStyle = 'aqua';
canvas_context.fill();

canvas_context.beginPath();
canvas_context.moveTo(400, 400);
canvas_context.lineTo(440, 430);
canvas_context.lineTo(430, 470);
canvas_context.lineTo(370, 470);
canvas_context.lineTo(360, 430);
canvas_context.closePath();
canvas_context.fillStyle = 'green';
canvas_context.fill();

canvas_context.beginPath();
canvas_context.moveTo(400, 400);
canvas_context.lineTo(430, 470);
canvas_context.lineTo(360, 430);
canvas_context.lineTo(440, 430);
canvas_context.lineTo(370, 470);
canvas_context.closePath();
canvas_context.strokeStyle = 'gold';
canvas_context.lineWidth = 3;
canvas_context.stroke();
