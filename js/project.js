$(document).ready(function () {
  $('#twosomeNotice').on('click', function () {
    window.open('../popup/popup.html', 'popup1', 'width=700, height=300, top=300, left=500');
  });
  $('#ikeaNotice').on('click', function () {
    window.open('../popup/popup2.html', 'popup2', 'width=700, height=300, top=300, left=500');
  });

  $(".btn_top").on('click', function () {
		$("html, body").stop().animate({scrollTop: 0});
		return false;
	});

  $('#btnClose').on('click', function () {
    window.close();
  });

  const clockEle = $('.clock');
  function clock () {
    const now = new Date();
    const yy = now.getFullYear();
    const mm = now.getMonth() + 1;
    const dd = now.getDate();
    const day = now.getDay();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    //console.log(now, yy, mm, dd, day, h, m, s);
    
    //요일을 문자로
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //console.log(week[day]);
  
    //오전오후 표시
    const ampm = h < 12? 'AM' : 'PM';
    //console.log(ampm);

    //12시간제로 변경
    h %= 12;
    h = h? h : 12;
    //console.log(h);

    //시간을 두자리 숫자로 표현
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    //console.log(h,m,s);

    //변수 result에 출력할 문자 저장
    const result = `${yy} - ${mm} - ${dd} - ${week[day]}<br>${ampm} ${h} : ${m} : ${s}`;
    //console.log(result);

    $('#clock').html(result);

  }
  clock();

  let timer = setInterval(clock, 1000);

});