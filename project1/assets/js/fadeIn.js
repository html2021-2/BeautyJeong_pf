$(document).ready(function () {
  // 1) 스크롤 이벤트 
  $(window).on('scroll', function () {
    // 2) 스크롤바의 수직이동거리 변수
    var scrollY = $(this).scrollTop() + $(this).height() * 2/3; //스크롤바를 빠르게 움직이는 사용자를 위해 자신의 위치 보다 먼저 보여지기 시작한다. 값은 요소의 크기에 따라 다르다
    console.log(scrollY);

    // 스크롤바가 움직인 거리와 본문의 위치가 가까워질 경우만 .cnt.fade를 추가함
    $('.fade').each(function (idx) {
      if (scrollY > $(this).offset().top) {
        $(this).addClass('on');
      } else { //반복적인 효과가 필요한 경우만 사용하기
        $(this).removeClass('on');
      }
    });
    $('.fade_tit').each(function (idx) {
      if (scrollY > $(this).offset().top) {
        $(this).addClass('on');
      } else { //반복적인 효과가 필요한 경우만 사용하기
        $(this).removeClass('on');
      }
    });
  });
  
  $(window).trigger('scroll');
});