$(document).ready(function () {
  var scrollT;
  var timer = 0;
  var $gnb=$("#gnb > ul");
  $gnb.find('li ul').hide();

  // 2) 뎁스1 li에 마우스(mouseenter) 키보드(focusin) 제어
  $gnb.children().on('mouseenter focusin', function () {
	// 2-1) 모든 뎁스2 ul을 동시에 열기
	$gnb.find('li ul').stop().slideDown();
	// 2-2) 현재 li.on 추가, 나머지 li는 .on 제거
	$(this).addClass('on').siblings().removeClass('on');
	// 
	$(this).closest('#header').addClass('active');	//#header 배경색 생성을 위한 클래스명 추가
  });

  // 3) 뎁스1 ul에서 마우스 나오기(mouseleave)
  $gnb.on('mouseleave', function () {
	// 모든 ul 닫기, li에 .on 제거
	$(this).children().removeClass('on').children('ul').stop().slideUp();
	$('#header').removeClass('active');
  });

  // 4) 가장 첫번째(shift+tab), 마지막(!shift+tab) a에서 포커스 나오기(blur)
  $gnb.find('a:first').on('keydown', function (e) {
	//console.log(e.keyCode); //9
	if (e.shiftKey && e.keyCode === 9) $gnb.trigger('mouseleave');
  });
  $gnb.find('a:last').on('keydown', function (e) {
	if (!e.shiftKey && e.keyCode === 9) $gnb.trigger('mouseleave');
  });

  //scroll 되면 검정 배경색 추가
  $(window).on('scroll', function () {
    clearTimeout(timer);

    setTimeout(function () {
      scrollT = $(this).scrollTop();

      if (scrollT > 20) $('#header').addClass('bgchange');
      else $('#header').removeClass('bgchange');
    }, 50);
  });

    //bean 원두아이콘 스크롤 되면 animation추가(ani)
  $(window).on('scroll', function () {
    clearTimeout(timer);

    setTimeout(function () {
      scrollT = $(this).scrollTop();

      if (scrollT > 70) $('#content').addClass('ani');
      else $('#content').removeClass('ani');
    }, 50);
  });

	// top 이동 버튼
	$(".btn_top").on("click", function () {
		$("html, body").stop().animate({scrollTop: 0});
		return false;
	});

  //top 이동 - scroll 없어도 동작 가능
	$('.btn_top').on('click', function () {
		fullpage_api.moveTo(1); //본문 1번의 위치로 자동 이동시키기
		$('.logo a').focus(); // 접근성을 위하여 문서의 처음(.logo a)으로 focus 강제 이동
  });
});