$(document).ready(function() {
    $('#sky h1').each(function () {
      let wordArray = $(this).html().split(' ');
      //console.log(wordArray);//(2) ["Beauty's", "Portfolio"]
      let tagWrite = '';

      for (let i = 0; i < wordArray.length; i++) {
        $(this).html(''); //기존 태그 우선 지우기
        let spanArray = wordArray[i].split(''); //한글자씩 잘라서 배열에 저장
        //console.log(spanArray); //(8) ["B", "e", "a", "u", "t", "y", "'", "s"], (9) ["P", "o", "r", "t", "f", "o", "l", "i", "o"]
        // 반복문을 통해 각 div 부모 안에 막내 자식으로 span 동적생성
        tagWrite += ' ';
        for (let j = 0; j < spanArray.length; j++) {
          tagWrite += `<span class="smoky">${spanArray[j]}</span>`;
        }
        $(this).append(tagWrite);
      }
    });
    
    // delay 시간 지정
    $('#sky h1').each(function () {
      $(this).find('.smoky').each(function (idx) {
        $(this).css('animationDelay', 1.5 + (idx / 10) + 's');
      });
    });
  
  setTimeout(function () {
    $('#sky p').fadeIn();
  }, 5000);

  // 스크롤해서 가까워지면 사과, 새싹 자라나기 
  $(window).on('scroll', function () {
    const scrollY = $(this).scrollTop() + $(this).height() * 2/3;

    $('.apple_drop, .sprout').each(function (idx, ele) {
        if (scrollY >= $(this).offset().top) $(this).addClass('on');
        else $(this).removeClass('on');
    });
  });

  //버튼 클릭하면 줌되기
  $('.go_link').on('click', function () {
    $(this).stop().animate({width: '100%', height: '100%'}, 2000, easeInOutQuart);
  });

  //돋보기
  $('.go_link').each(function () {
    const boxPosX = $(this).offset().left;
    const boxPosY = $(this).offset().top;
    const circleHalfW = $(this).children('.circle').outerWidth() / 2;
    const circleHalfH = $(this).children('.circle').outerHeight() / 2;
    console.log(boxPosX,boxPosY);

    $(this).on('mousemove', function (e) {
      // 스크롤바의 이동거리를 포함하는 마우스 좌표 알아오기
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      const $circle = $(this).children('.circle');
      console.log(mouseX,mouseY);
      gsap.to($circle, {top: mouseY - boxPosY - circleHalfH, left: mouseX - boxPosX - circleHalfW, duration: 0.5});
    });
  });
  //돋보기
  /* const boxPosX = $('.go_link').offset().left;
  const boxPosY = $('.go_link').offset().top;
  const circleHalfW = $('.go_link .circle').outerWidth() / 2;
  const circleHalfH = $('.go_link .circle').outerHeight() / 2;
  console.log(boxPosX,boxPosY);

  $('.go_link').on('mousemove', function (e) {
      // 스크롤바의 이동거리를 포함하는 마우스 좌표 알아오기
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      console.log(mouseX,mouseY);
      gsap.to('.circle', {top: mouseY - boxPosY - circleHalfH, left: mouseX - boxPosX - circleHalfW, duration: 0.5});
  }); */

  $('.go_link').parent().each(function (idx) {
    $(this).index(idx).children().on('mousemove', function (e) {
      const boxPosX = $('.go_link').offset().left;
      const boxPosY = $('.go_link').offset().top;
      const circleHalfW = $('.go_link .circle').outerWidth() / 2;
      const circleHalfH = $('.go_link .circle').outerHeight() / 2;
      console.log(boxPosX,boxPosY);
  
      // 스크롤바의 이동거리를 포함하는 마우스 좌표 알아오기
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      console.log(mouseX,mouseY);
      gsap.to('.circle', {top: mouseY - boxPosY - circleHalfH, left: mouseX - boxPosX - circleHalfW, duration: 0.5});
    });
  });

});