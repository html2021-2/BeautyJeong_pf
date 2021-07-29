$(document).ready(function () {
    //contact=====
    $('#cnt_contact .click').on('click', function () {
      //변수선언
      const $clickBtn = $(this);
      const $modalBg = $('#modal .bg');
      const $closeBtn = $modalBg.find('.md_btn_close');
      const $first = $modalBg.find('[data-link="first"]');
      const $last = $modalBg.find('[data-link="last"]');

      //transform일어나도록 .on추가
      $modalBg.addClass('on').next().addClass('on');

      //모달창이 열리면 스크롤이 동작하지 못하도록 하기
      const wrapHei = $('#wrap').outerHeight();
      $('html, body').css({height: wrapHei, overflow: 'hidden'});

      //열려진 모달 외의 나머지 -> 스크린리더 접근제한하기
      $modalBg.parent().siblings().attr({'aria-hidden': true, inert: ''});

      //dim동적생성, 모달 보이기, 첫번째 요소에 포커스 강제이동
      $modalBg.parent().before('<div id="dim"></div>');
      const $dim = $('#dim');

      //포커스 이동오류
      //$dim.stop().fadeIn().next().css('visibility', 'visible').find('[data-link="first"]').focus();
      //포커스 이동오류 : 모달창이 보이고 포커스 강제이동 시켜야 하는데 타이밍이 맞지 않는 것 같음 -> setTimeout으로 맞추기
      $dim.stop().fadeIn().next().css('visibility', 'visible');
      setTimeout(function () {
        $modalBg.find('[data-link="first"]').focus();
      }, 100);

      //닫기버튼 누르기 전까지 포커스 제어
      $first.on('keydown', function (e) {
        //console.log(e.keyCode); //tab: 9
        if (e.shiftKey && e.keyCode === 9) {
          e.preventDefault();//기본기능 차단하기
          $last.focus();
        }
      });
      $last.on('keydown', function (e) {
        if (!e.shiftKey && e.keyCode === 9) {
          e.preventDefault();
          $first.focus();
        }
      });

      //닫기버튼 클릭하면
      $closeBtn.on('click', function () {
        $('html, body').removeAttr('style');
        $dim.stop().fadeOut(function () {
          $(this).remove(); //dim이 여러개 생기는 것 방지
        });
        $modalBg.removeClass('on').next().removeClass('on');
        $modalBg.parent().css('visibility', 'hidden').siblings().removeAttr('aria-hidden inert');
        $clickBtn.focus();
      });

      //Esc, #dim클릭시 닫기
      $dim.on('click', function () {
        $closeBtn.trigger('click');
      });
      $(window).on('keydown', function (e) {
        //console.log(e.keyCode); //esc: 27
        if (e.keyCode === 27) $closeBtn.trigger('click');
      });

      return false;
    });

});