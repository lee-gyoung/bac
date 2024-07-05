// gnb
$("#gnb>li").on("mouseenter",function(){
    // $(this).children()
    $(this).find(".sub").stop().slideDown();
});
$("#gnb>li").on("mouseleave",function(){
    $(this).find(".sub").stop().slideUp();
});

// slide
$("#slide .frame li").eq(0).siblings().hide();
// eq(0).siblings() 는 첫번째 eq"빼고"나서의 형제를 찾아주는 것

let slideIndex = 0;
setInterval(function(){
    if(slideIndex < 2){
        slideIndex++
    }else{
        slideIndex = 0;
    }

    $("#slide .frame li").eq(slideIndex).siblings().fadeOut();
    $("#slide .frame li").eq(slideIndex).fadeIn();
},3000);

// tab
$(".tab >li").on('click',function(){
    $(".tab >li").removeClass('on');
    // 여기에서 $(this)를 쓰지 않고 $(".tab >li")를 쓴 이유는
    // this는 클릭이벤트가 발생하는 li 하나만 해당되기 때문
    $(".content>div").removeClass('on');

    $(this).addClass('on');
    let contentId = $(this).children('a').attr("href");
    $(contentId).addClass('on');
});

// popup
$("#notice>ul>li").eq(0).on('click',function(){
    $(".popup").css({display: "block"});
});

$(".popup").on('click',function(){
    $(this).css({display: "none"});
});