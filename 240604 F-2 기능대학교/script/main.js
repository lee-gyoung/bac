//gnb
$("#gnb>li").on("mouseenter",function(){
    // $(this).children()
    $(this).find(".sub").stop().slideDown();
});
$("#gnb>li").on("mouseleave",function(){
    $(this).find(".sub").stop().slideUp();
})


//slide
$("#slide .frame li").eq(0).siblings().hide();

let slideIndex = 0;
setInterval(function(){
    if(slideIndex < 2){
        slideIndex++;
    }else{
        slideIndex = 0;
    }
    $("#slide .frame li").eq(slideIndex).siblings().fadeOut();
    $('#slide .frame li').eq(slideIndex).fadeIn();
},3000);

// tab
$(".tab >li").on("click", function(){
    $('.tab>li').removeClass("on");
    // $(".tab").children("li").removeClass("on");
    $(".content>div").removeClass("on");

    $(this).addClass("on");
    let contentID = $(this).children("a").attr("href");
    $(contentID).addClass("on");
});

// popup
$(".content>ul>li").eq(0).on("click",function(){
    // $('.popup').css({display:"block"});
    $('.popupWrap').css("display", "block");
});

$("#close").on("click",function(){
    $('.popupWrap').css("display", "none");
});




