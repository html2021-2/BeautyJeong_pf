$(document).ready(function () {
    //skill
    //skicky
    const winHei = $(window).height();
    const stickyY = $('.sticky').offset().top;
    console.log(winHei, stickyY);

    $(window).on('scroll', function () {
        const scrollY = $(this).scrollTop();
        $('.tree_wrap > div').each(function (idx) {
            if(scrollY > stickyY + winHei * idx) $(this).addClass('on').siblings().removeClass('on');
        });
    });

    //ie브라우저 9+ 추가지원
    const elements = $('.sticky');
    Stickyfill.add(elements);

});