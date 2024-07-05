// gnb

// let $gnb = $('#gnb');
// let $gnbBg = $('#gnbBg');
// let $gnb_li = $('#gnb > li');

// $('.sub').hide();
// $gnbBg.css({width: "0px"}).hide();

// 우측으로 열리는 slide
// $gnb.on('mouseenter',function(){
//     $gnbBg.stop().show().animate({width: "100vw"}, 100, function(){
//         $gnb.find('.sub').stop().slideDown(100);
//     });
// });
// $gnb.on('mouseleave',function(){
//     $gnb.find('.sub').stop().slideUp(100, function(){
//         $gnbBg.stop().hide().animate({width: "0"}, 500)
//     });
// });

// 하단으로 열리는 slide
let $gnb_li = $('#gnb >li');
let $gnbBg = $('#gnbBg');
$('.sub').hide();
$gnbBg.hide();

$gnb_li.on('mouseenter',function(){
    $gnbBg.stop().slideDown(100, function(){
        $gnb_li.children('.sub').stop().slideDown(100)
    });
});
$gnb_li.on('mouseleave',function(){
    $gnb_li.children('.sub').stop().slideUp(100, function(){
        $gnbBg.stop().slideUp(100)
    });
});


$gnb_li.on('mouseenter', function(){
    $(this).children('a').addClass('on');
});
$gnb_li.on('mouseleave', function(){
    $(this).children('a').removeClass('on');
});

// 선생님 거
// $gnb.on('mouseleave',function(){
//     $gnb.find('.sub').stop().slideUp(100, function(){
//         $gnbBg.stop().animate({width: "0"}, 500, function(){
//             $(this).hide();
//         });
//     });
// });

// slide
$('#slide .frame li').eq(0).siblings().hide();
let slideIndex = 0;
setInterval(function(){
    // 순번을 순환하기 위해서 조건문으로 0,1,2 -> 0 으로 가는 순환고리를 만들어줌
    if(slideIndex < 2){
        slideIndex++
    }else{
        slideIndex = 0;
    }
    // fadeInOut시 fast는 대략 0.2초, slow는 대략 0.6초를 의미
    // 혹은 ms단위로도 시간 조절 가능
    $('#slide .frame li').eq(slideIndex).siblings().fadeOut(400);
    $('#slide .frame li').eq(slideIndex).fadeIn(400);
}, 3000);

