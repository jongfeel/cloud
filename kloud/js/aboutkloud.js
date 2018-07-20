var auto_start; //  setInterval 관련
var auto_time = 5000;    // 이미지 바뀌는 시간설정
var _index = 0; //이벤트 베너 처음 설정값
jQuery(document).ready(function ($){
	var Browser = {
	   chk : navigator.userAgent.toLowerCase()
	}

	Browser = {
	  ie : Browser.chk.indexOf('msie') != -1,
	  ie6 : Browser.chk.indexOf('msie 6') != -1,
	  ie7 : Browser.chk.indexOf('msie 7') != -1,
	  ie8 : Browser.chk.indexOf('trident/4.0') != -1,
	  ie9 : Browser.chk.indexOf('trident/5.0') != -1,
	  ie10 : Browser.chk.indexOf('trident/6.0') != -1,
	  ie11 : Browser.chk.indexOf('trident/7.0') != -1,
	  icheck : Browser.chk.indexOf('trident/') != -1,
	  opera : !!window.opera,
	  safari : Browser.chk.indexOf('safari') != -1,
	  safari3 : Browser.chk.indexOf('applewebkir/5') != -1,
	  mac : Browser.chk.indexOf('mac') != -1,
	  chrome : Browser.chk.indexOf('chrome') != -1,
	  firefox : Browser.chk.indexOf('firefox') != -1
	}

	var aNum = 1 // 초기 설정값 1이면 스크롤 움직임, 0이면 스크롤 안움직임
	var bNum = 0 // 두번째 슬라이드 맥주 animate관련 변수 - 맥주 마스킹 꽉차면 0, 단계별로 1, 2
	var menuNum = 0 // 각 현재 슬라이드를 가리키는 값(0이 첫번째)
	var oneDepthNum = 0 // 메뉴의 원뎁스를 가리키는 값(0이 첫번째)
	var twoDepthNum = 0 // 메뉴의 투뎁스를 가리키는 값	(0이 첫번째)
	var aniTime = 500 // 오브젝트 애니메이션 시간
	var jNum = 0 // 그래비티공법 초기 변수값
	var scrollFlag = false;	// 스크롤 한번만 동작하도록 하는 변수, false일때 동작, true일때 비동작
	var slideNum = 5;	// 슬라이드 총갯수(0,1,2,3,4,5) - about Kloud는 겉보기에는 5개의 슬라이드지만 3번째 슬라이드 이후 그래비티공정이 숨은 슬라이드로 총 6개의 슬라이드로 구성되어있다.
	
	
	
	// 처음 이벤트 베너가 있을 경우
	if($(".player_pop2").html()!=undefined)
	{
		//처음 이벤트 베너 숨기는 함수 - 숨겼다가 fadeIn으로 등장
		$(".player_pop2 .mov_content2").fadeOut(0)
		$(".player_pop2 .layer_pop3").fadeOut(0)
		
		if(fnGetCookie('kloudbeer_today_ok') == "OK"){
			$(".player_pop2").html("");
			$(".player_pop2").css('display','none')
			$('html').css({'overflow':'auto'});
		}
		else
		{
			// 숨겨졌던 이벤트 베너 fadeIn으로 등장하며 스크롤숨기고 스크롤되지않도록 막기
			$('html').css({'overflow-y':'hidden'})
			$(".player_pop2").css('visibility','visible')
			$(".player_pop2 .mov_content2").delay(500).fadeIn(500)
			$(".player_pop2 .layer_pop3").delay(500).fadeIn(500)
			aNum = 0

		}
	}

	/* 이벤트 베너 삭제시 휠 안되는 부분 수정 0730*/
	jQuery.aNumFunc = function(){
		aNum = 1
	} 

	
	// 새로고침 관련 함수
	//새로고침시 맨 상단으로 이동 
	$(window).load(function(){
		var scrollTo = '0px';
		$('body, html').delay(100).animate({scrollTop:scrollTo},1);
		startFunc();
		resizeFunc()
	});

/******************************************************************************
*	용도		:	윈도우 창 크기가 변할때 실행하는 함수
*	함수		:	resizeFunc()
*******************************************************************************/

	$(window).resize(function () {
		resizeFunc()
	});
	function resizeFunc()
	{
		
	var wNum = $(window).width()
	var wwNum = wNum - 260
	var wwNum2 = -(wwNum / 2)
	var wwwNum = wwNum + 'px'
	var wwwNum2 = wwNum2 + 'px'
	

		// 각 슬라이드 최소 넓이값 700px 고정
		if($(window).width() > 960)
		{
			$('.slide_common').css({'width':wwwNum});	
		}
		else
		{
			$('.slide_common').css({'width':'700px','overflow':'hidden'});		
		}


		// 첫번째 슬라이드에서 윈도우창 크기가 1024아래일때 위치값 조정   about_kloud
		if($(window).width() > 1024)
		{
			$('#slide1 .slide01_left_content').stop().animate({'left':'-33px'}, 500);
			$('#slide1 .slide01_right_content').stop().animate({'left':'0'}, 500);
			$('#slide1 .slide01_right_content p img').stop().animate({'width':'1011px'}, 500);
			if($(window).width() > 1600){
				$('#slide1 .slide01_right_content p img').stop().animate({'width':'1135px'}, 500);
			}
		}
		else
		{
			$('#slide1 .slide01_left_content').stop().animate({'left':'0'}, 500);
			$('#slide1 .slide01_right_content').stop().animate({'left':'30px'}, 500);
			$('#slide1 .slide01_right_content p img').stop().animate({'width':'870px'}, 500);
			
			
		}
		// 네번째 슬라이드 캔맥주와 병맥주 윈도우 창크기에 따른 사이즈와 위치값 조정
		if($(window).height() > 800 && $(window).width() > 1024)
		{
			
			$('.beer01 img').stop().animate({'height':'542px'}, 500);
			$('.beer02 img').stop().animate({'height':'871px'}, 500);
			
			
			$('.beer01').stop().animate({'top':'277px','left':'-187px'}, 500);
			$('.beer02').stop().animate({'top':'-59px','left':'84px'}, 500);
		}
		else
		{
			
			$('.beer01 img').stop().animate({'height':'322px'}, 500);
			$('.beer02 img').stop().animate({'height':'651px'}, 500);
			
			
			$('.beer01').stop().animate({'top':'370px','left':'0px'}, 500);
			$('.beer02').stop().animate({'top':'44px','left':'157px'}, 500);
			
		}	
		// 세번째 슬라이드에 속한 그래비티 공정 관련 height값에 따른 타이틀과 업다운 메뉴 위치값 잡아주기
		var hNum = $(window).height();
		
		if(hNum < 600){
			$('.container_wrap2 .title').stop().animate({'position':'relative','top':'0px'});
			$('.slide03_container_wrapper .contents .paging').stop().animate({'position':'absolute','bottom':'0px'});
		}else{
			$('.container_wrap2 .title').stop().animate({'position':'relative','top':'35px'});
			$('.slide03_container_wrapper .contents .paging').stop().animate({'position':'absolute','bottom':'35px'});
		}
	
		//마스크의 너비와 높이를 화면의 크기값을 받아 전체 화면으로 채운다.
		$(".layer_pop").css({"width": $(document).width()+"px", "height": $(document).height()+"px"});
	
	};

/******************************************************************************
*	용도		:	전체적으로 시작되고 각 슬라이드 초기셋팅 함수
*	함수		:	startFunc()
*******************************************************************************/

	function startFunc(){

		//네비게이션 원뎁스 투뎁스 현재위치 설정
		for(var i = 0 ; i < slideNum + 1 ; i ++){
			$('.sub_navi > li ').eq(i).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(i+1)+'_off.gif'});
		}
		$('.sub_navi > li ').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
		

		// 두번째 맥주잔 animate 관련 초기 opacity값과 위치값 설정 
		$('.scrollDown').stop().animate({'opacity':'1'},0);
		$('.b_txt01').stop().animate({'opacity':'0', 'right':'30px'},0);
		$('.b_txt02').stop().animate({'opacity':'0', 'right':'30px'},0);
		$('.b_txt03').stop().animate({'opacity':'0', 'right':'30px'},0);


		// 네비게이션 클릭하게 되면 해당 웨이포인트(슬라이드값)으로 슬라이드하는 함수(dataslide 값을 참조)
		var links = $('.sub_navi li a')	
		htmlbody = $('html,body');
		
	
		links.click(function (e){
			e.preventDefault();
			dataslide = $(this).parent().attr('data-slide');
			goToByScroll(dataslide);
			return false;
		});

		function goToByScroll(dataslide){
			htmlbody.animate({
				scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
			}, 2000, 'easeInOutExpo');
		}

		
/******************************************************************************
*	용도		:	마우스 휠 관련 스크립트
*	함수		:	handle()
*	참고사항	:	handle함수 안에 두번째 슬라이드에서 맥주잔 animate 관련 
					스크롤과 세번째 슬라이드에 속한 그래비티 공정에서 숨은 
					슬라이드에 관련된 스크롤 예외상황이 있다.
*******************************************************************************/
		

		if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = document.onmousewheel = wheel;
		wheel()
		function wheel(event){
			$(document)
			.mousewheel(function(event, delta){
				 handle(delta);

				 if (event.preventDefault) event.preventDefault();
				 event.returnValue = false;
			});			
		}

		function handle(dNum){
			var swh = $(window).outerHeight()/2;
			scrollTop = $(window).scrollTop();
			
			// 한번에 스크롤 하고 싶을때
			if(aNum != 0){
				if(scrollFlag != true){
					if(dNum < 0){ //아래로
						if(menuNum < slideNum){
							menuNum = menuNum + 1
							if (!htmlbody.hasClass('animated')) {
								htmlbody.animate({
								scrollTop: $('.slide[data-slide="' + (menuNum+1) + '"]').offset().top
								 }, 1000, 'easeInOutExpo', function(){
									$(this).removeClass('animated').dequeue();
								});
							}
							scrollFlag = true
						}
					}else{ // 위로
						if(menuNum > 0){
							menuNum = menuNum - 1
							// 네번째 슬라이드 일 경우 세번째 그래비티 공정의 숨은 슬라이드를 스킵하고 2개 한번에 슬라이드 하기
							if(scrollTop>=$('#slide5').offset().top-swh/2 && scrollTop<$('#slide6').offset().top-swh){
								
								if (!htmlbody.hasClass('animated')) {
									htmlbody.animate({
									scrollTop: $('.slide[data-slide="' + (menuNum ) + '"]').offset().top
									}, 1000, 'easeInOutExpo', function(){
										$(this).removeClass('animated').dequeue();
									});
								}
							}
							else{
							// 네번째 슬라이드가 아닐 경우는 일반적으로 한번씩 슬라이드 하기
								if (!htmlbody.hasClass('animated')) {
									htmlbody.animate({
									scrollTop: $('.slide[data-slide="' + (menuNum + 1) + '"]').offset().top
									}, 1000, 'easeInOutExpo', function(){
										$(this).removeClass('animated').dequeue();
									});
								}

							}
							scrollFlag = true
						}
					}
				}
				//스크롤이 막혔을 경우 aNum = 0 일때 슬라이드 스크롤을 막고 그안에서 세부 스크롤을 실행한다.
			}else if(aNum == 0){
				//두번째 슬라이드 맥주 잔 animate
				if(scrollTop>=$('#slide2').offset().top-swh/2 && scrollTop<$('#slide3').offset().top-swh){
					if(scrollFlag != true){
						scrollFlag = true
						if(dNum < 0){ //아래로
							switch(bNum){
								case(0):
									$('.beerKloud').stop().animate({'opacity':'0'},aniTime);
									$('.scrollDown').stop().animate({'opacity':'0'},aniTime);
									$('.b_txt01').stop().animate({'opacity':'1','right':'0px'},aniTime);
									$('.b_txt02').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.beer_point').stop().animate({'top':'199px'},aniTime);
									$('.beers').stop().animate({'top':'170px'},aniTime, function(){
										bNum = 1
										scrollFlag = false;
									});
									break;
								case(1):
									$('.scrollDown').stop().animate({'opacity':'0'},aniTime);
									$('.b_txt01').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt02').stop().animate({'opacity':'1','right':'0px'},aniTime);
									$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.beer_point').stop().animate({'top':'316px'},aniTime);
									$('.beers').stop().animate({'top':'287px'},aniTime, function(){
										bNum = 2
										scrollFlag = false;
									});
									break;
								case(2):
									$('.scrollDown').stop().animate({'opacity':'0'},aniTime);
									$('.b_txt01').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt02').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt03').stop().animate({'opacity':'1','right':'0px'},aniTime);
									$('.beer_point').stop().animate({'top':'432px'},aniTime);
									$('.beers').stop().animate({'top':'403px'},aniTime, function(){
										bNum = 3
										scrollFlag = false;
									});
									break;
								case(3):
									if(menuNum < slideNum){
										menuNum = menuNum + 1
										if (!htmlbody.hasClass('animated')) {
											htmlbody.animate({
											scrollTop: $('.slide[data-slide="' + (menuNum+1) + '"]').offset().top
											 }, 1000, 'easeInOutExpo', function(){
												$(this).removeClass('animated').dequeue();
											});
										}
										scrollFlag = true
									}
									break;
							}
						}else{ // 위로
							scrollFlag = true
							switch(bNum){
								case(0):
									if(menuNum > 0){
										menuNum = menuNum - 1
										if (!htmlbody.hasClass('animated')) {
											htmlbody.animate({
											scrollTop: $('.slide[data-slide="' + (menuNum+1) + '"]').offset().top
											}, 1000, 'easeInOutExpo', function(){
												$(this).removeClass('animated').dequeue();
											});
										}
										scrollFlag = true
									}
									break;
								case(1):
									$('.scrollDown').stop().animate({'opacity':'1'},aniTime);
									$('.beer_point').stop().animate({'top':'82px'},aniTime);
									$('.b_txt01').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt02').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);
									
									$('.beers').stop().animate({'top':'41px'},aniTime, function(){
										bNum = 0
										$('.beerKloud').stop().animate({'opacity':'1'},aniTime);
										scrollFlag = false;
									});
									break;
								case(2):
									$('.beer_point').stop().animate({'top':'199px'},aniTime);
									$('.b_txt01').stop().animate({'opacity':'1','right':'0px'},aniTime);
									$('.b_txt02').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.beers').stop().animate({'top':'170px'},aniTime, function(){
										bNum = 1
										scrollFlag = false;
									});
									break;
								case(3):
									$('.beer_point').stop().animate({'top':'316px'},aniTime);
									$('.b_txt01').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.b_txt02').stop().animate({'opacity':'1','right':'0px'},aniTime);
									$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);
									$('.beers').stop().animate({'top':'287px'},aniTime, function(){
										bNum = 2
										scrollFlag = false;
									});
									break;
							}
						}
					}
				}

				// 세번째 슬라이드에 속한 그래비티공정에서 스크롤 할 경우
				if(scrollTop>=$('#slide4').offset().top-swh/2 && scrollTop<$('#slide5').offset().top-swh){
					if(scrollFlag != true){
						scrollFlag = true
						if(dNum < 0){ //아래로
							gravityDown(jNum)	
						}else{ // 위로
							gravityUp(jNum)	
						}
					}
				}
			}
		}
		

/******************************************************************************
*	용도		:	스크롤 애니메이션에 관련된 함수로 각 슬라이드에 스크롤 
					될 때마다 해당 슬라이드에 맞는 애니메이션을 스크롤 하고, 
					네비게이션 버튼이미지도 슬라이드에 맞는 이미지로 교체한다.
*	함수		:	$(window).scroll(function(){});
*******************************************************************************/

		$(window).scroll(function(){
			var swh = $(window).outerHeight()/2;
			scrollTop = $(window).scrollTop();
			for(var i = 0 ; i < slideNum + 1 ; i ++){
				$('.sub_navi > li ').eq(i).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(i+1)+'_off.gif'});
			}
			if(scrollTop>=$('#slide1').offset().top-swh/2 && scrollTop<$('#slide2').offset().top-swh){
				$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
					$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
						scrollFlag = false;	
						});
					menuNum = 0
					twoDepthNum = 0
			}else{

			}

			if(scrollTop>=$('#slide2').offset().top-swh/2 && scrollTop<$('#slide3').offset().top-swh){
				$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
				aNum = 0
				bNum = 0
				
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;	
					});
					menuNum = 1
					twoDepthNum = 1
			}else{
				aNum = 1
				$('.scrollDown').css({'opacity':'1'});
				$('.b_txt01').css({'opacity':'0', 'right':'30px'});
				$('.b_txt02').css({'opacity':'0', 'right':'30px'});
				$('.b_txt03').css({'opacity':'0', 'right':'30px'});
				$('.beerKloud').css({'opacity':'1'});
				$('.beer_point').css({'top':'82px'});
				$('.beers').css({'top':'41px'});
			}

			if(scrollTop>=$('#slide3').offset().top-swh/2 && scrollTop<$('#slide4').offset().top-swh){
				$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_on.gif'});
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;	
					});
					menuNum = 2
					twoDepthNum = 2
			}else{
				
			}

			if(scrollTop>=$('#slide4').offset().top-swh/2 && scrollTop<$('#slide5').offset().top-swh){
				$('.title_01').stop().animate({'opacity':'1', 'top':'5px'},aniTime);
				$('.sub01_01').stop().animate({'opacity':'1','top':'215px'},aniTime+200);
				$('.txt01_01').stop().animate({'opacity':'1'},aniTime);
				$('.txt01_03').stop().animate({'opacity':'1'},aniTime);
				$('.paging').stop().animate({'opacity':'1'},aniTime);

				aNum = 0
				jNum = 0
				menuNum = 3
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;
					$('.sub_navi > li >').eq(2).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub03_01_on.gif'});	
					});
			}else{
					$('.txt01_01').css({'opacity':'0'},aniTime);
					$('.txt01_01').show(0);
					$('.txt01_03').css({'opacity':'0'},aniTime);
					$('.txt03_01').css({'opacity':'0'},aniTime);
					$('.paging').css({'opacity':'0'},aniTime);
					$('.sub01_01').css({'opacity':'0','top':'1215px'});
					$('.sub02_01').css({'opacity':'0','top':'1215px'});
					$('.sub03_01').css({'opacity':'0', 'top':'51px'});
					$('.sub03_02').css({'opacity':'0', 'left':'69px'});
					$('.sub03_03').css({'opacity':'0','top':'1134px'});
					$('.sub03_04').css({'opacity':'0','top':'1310px'});
					$('.sub04_01').css({'opacity':'0','left':'315px'});
					$('.sub04_02').css({'opacity':'0','left':'315px'});
					$('.sub04_03').css({'opacity':'0','top':'1144px'});
					$('.title_01').css({'opacity':'0', 'top':'1060px'});
					$('.title_02').css({'opacity':'0', 'top':'1060px'});
					$('.title_03').css({'opacity':'0', 'top':'1060px'});
					$('.title_04').css({'opacity':'0', 'top':'1060px'});
					$('.up .paging_num').find('img').attr({'src':'images/aboutKloud/slide03_page01.gif'});
					$('.down .paging_num').find('img').attr({'src':'images/aboutKloud/slide03_page02.gif'});
					$('.up').css('visibility','hidden')
					$('.down').css('visibility','visible')
					jNum = 0
			}

			if(scrollTop>=$('#slide5').offset().top-swh/2 && scrollTop<$('#slide6').offset().top-swh){
				$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;	
				});
				menuNum = 4
				twoDepthNum = 3

				if($(window).height() > 800 && $(window).width() > 1024)
				{
				$('.beer01 img').stop().animate({'height':'542px'}, 500);
				$('.beer02 img').stop().animate({'height':'871px'}, 500);
				$('.beer01').stop().animate({'opacity':'1', 'top':'277px'});
				$('.beer02').stop().animate({'opacity':'1','top':'-59px'},aniTime);
				$('.beer01').css({'left':'-187px'});
				$('.beer02').css({'left':'84px'});
				}
				else
				{
				$('.beer01 img').stop().animate({'height':'322px'}, 500);
				$('.beer02 img').stop().animate({'height':'651px'}, 500);
				$('.beer01').stop().animate({'opacity':'1','top':'370px'},aniTime);
				$('.beer02').stop().animate({'opacity':'1', 'top':'44px'});
				$('.beer01').css({'left':'0px'});
				$('.beer02').css({'left':'157px'});
				}

			}else{

				if($(window).height() > 800 && $(window).width() > 1024)
				{
				$('.beer01').stop().animate({'height':'542px'}, 500);
				$('.beer02').stop().animate({'height':'871px'}, 500);
				$('.beer01').stop().animate({'opacity':'0','top':'409px'},aniTime);
				$('.beer02').stop().animate({'opacity':'0','top':'-159px'},aniTime);
				$('.beer01').css({'left':'-187px'});
				$('.beer02').css({'left':'84px'});
				}
				else
				{
				$('.beer01 img').stop().animate({'height':'322px'}, 500);
				$('.beer02 img').stop().animate({'height':'651px'}, 500);
				$('.beer01').stop().animate({'opacity':'0','top':'470px'},aniTime);
				$('.beer02').stop().animate({'opacity':'0', 'top':'-44px'});
				$('.beer01').css({'left':'0px'});
				$('.beer02').css({'left':'157px'});
				
				}
				

				$('.beer01').stop().animate({'opacity':'0','top':'409px'},aniTime);
				$('.beer02').stop().animate({'opacity':'0','top':'-159px'},aniTime);
			}

			if(scrollTop>=$('#slide6').offset().top-swh/2){
				$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
				menuNum = 5
				twoDepthNum = 4
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;	
				});
				$('.right_container2').stop().animate({'opacity':'1','left':'400px'},aniTime);
			}else{
				$('.right_container2').stop().animate({'opacity':'0','left':'500px'},aniTime);
			}
		});
	}

	

		
	
		
		
/******************************************************************************
*	용도		:	클릭이벤트 관련 함수모음
*	참고사항	:	$(document).on()으로 된 click 함수는 jquery-1.10.2의 상위 
					jquery 플러그인에서 click이벤트가 삭제되더라도 click 이벤트 
					값을 유지시키는 함수로 레이어팝업에 관련된 클릭이벤트는 클릭값이
					삭제되므로 반드시 다음과 같이 써야한다.
*******************************************************************************/
		
		// 스킵네비 관련 함수
		$(".skip_nav a").click(function(){
			$(".player_pop2").html("");
			$('html').css({'overflow-y':'auto'})
			aNum = 1
			$(".player_pop2").css('display','none')
			$(".play a").attr('tabindex', '0').show().focus();
			return false;

		});	
		
		// 첫번째 슬라이드 동영상 레이어팝업 열기
		
		$(".play a").click(function(){
			
				$(".player_pop").css("display","block");
				$(".player_pop").attr('tabindex', '0');
				$(".layer_pop").css("display","block");
				//$(".player_pop").html("<div class='mov_content'><div class='title_div'><h3>Kloud TV-CF, 전지현 편</h3></div><div class='mov_content_in'><iframe name='ifrMovie' title='Kloud TV-CF, 전지현 편' width='920' height='470' src='http://www.youtube.com/embed/0uDpf8SaHEk?rel=0&showinfo=0&controls=1&vq=hd720&rel=0&iv_load_policy=3&autoplay=0' frameborder='0' allowfullscreen='true'></iframe><br /><textarea name='' id='' cols='' rows=''>100% 맥즙 발효 원액 그대로 물 타지 않았다. 그래서 클라우드를 리얼이라 부른다. 물을 타지 않는 오리지널 그래비티 공법의 리얼 맥주 클라우드</textarea></div><p class='close_bt'><a href='#'><img src='images/factory/btn_colse.png' alt='영상 닫기' /></a></p></div><div class='layer_pop'></div>")
				//$(".player_pop").html("<div class='mov_content'><div class='title_div'><h3>Kloud(클라우드) 맥주CF, 전지현 편(30sec) </h3></div><div class='mov_content_in'><iframe name='ifrMovie' title='Kloud TV-CF, 전지현 편' width='920' height='470' src='http://www.youtube.com/embed/Y7X0-1UgnkY?rel=0&showinfo=0&controls=1&vq=hd720&rel=0&iv_load_policy=3&autoplay=0' frameborder='0' allowfullscreen='true'></iframe><br /><textarea name='' id='' cols='' rows=''>입안가득 꽉찬느낌 물타지 않아 맛이 풍부해\r\n “지현아”\r\n “어머” \r\n“클라우드~”\r\n 발효원액 그대로 물타지 않았다. “맛있다” \r\n 물을타지 않는 오리지널 그래비티공법의 리얼맥주 클라우드</textarea></div><p class='close_bt'><a href='#'><img src='images/factory/btn_colse.png' alt='영상 닫기' /></a></p></div><div class='layer_pop'></div>")
				//$(".player_pop").html("<div class='mov_content'><div class='title_div'><h3>Kloud(클라우드) 전지현 맥주CF - 올라오라편(30sec)</h3></div><div class='mov_content_in'><iframe name='ifrMovie' title='Kloud 전지현 맥주CF - 올라오라편' width='920' height='470' src='https://www.youtube.com/embed/hjYSey-hyf8?rel=0&showinfo=0&controls=1&vq=hd720&rel=0&iv_load_policy=3&autoplay=0' frameborder='0' allowfullscreen='true'></iframe><br /><textarea name='' id='' cols='' rows=''>올라오라, 올라오라\r\n맥주에서 클라우드로 \r\n100% 발효원액 그대로 물타지 않았다.\r\n물을 타지 않은 오리지널 그래비티 공법의 리얼 맥주, 클라우드\r\n이젠 못 내려가 </textarea></div><p class='close_bt'><a href='#'><img src='images/factory/btn_colse.png' alt='영상 닫기' /></a></p></div><div class='layer_pop'></div>")
				//$(".player_pop").html("<div class='mov_content'><div class='title_div'><h3>Kloud(클라우드) 전지현 맥주CF - 해피 홈파티 편(30sec)</h3></div><div class='mov_content_in'><iframe name='ifrMovie' title='Kloud 전지현 맥주CF - 해피 홈파티 편' width='920' height='470' src='https://www.youtube.com/embed/UDSKZEAUKHE?rel=0&showinfo=0&controls=1&vq=hd720&rel=0&iv_load_policy=3&autoplay=0' frameborder='0' allowfullscreen='true'></iframe><br /><textarea name='' id='' cols='' rows=''>그런 기분 알아\r\n정말 좋은자리엔 물타기 싫은거\r\n100% 발효원액 그대로 물타지 않았다.\r\n물을 타지 않은 오리지널 그래비티 공법의 리얼 맥주, 클라우드</textarea></div><p class='close_bt'><a href='#'><img src='images/factory/btn_colse.png' alt='영상 닫기' /></a></p></div><div class='layer_pop'></div>")
				//$(".player_pop").html("<div class='mov_content'><div class='title_div'><h3>Kloud Premium(클라우드 프리미엄) 설현 CF - BEACH 편(30sec)</h3></div><div class='mov_content_in'><iframe name='ifrMovie' title='Kloud 전지현 맥주CF - 해피 홈파티 편' width='920' height='470' src='https://www.youtube.com/embed/sZxxzY36BLg?rel=0&showinfo=0&controls=1&vq=hd720&rel=0&iv_load_policy=3&autoplay=0' frameborder='0' allowfullscreen='true'></iframe><br /><textarea name='' id='' cols='' rows=''>맥주는 바디감으로 마시는거야! 풍부하게~\r\nGood Body!\r\n100% 발효원액 그대로\r\n물을 타지 않는 프리미엄 맥주 클라우드!</textarea></div><p class='close_bt'><a href='#'><img src='images/factory/btn_colse.png' alt='영상 닫기' /></a></p></div><div class='layer_pop'></div>")
				$(".player_pop").html("<div class='mov_content'><div class='title_div'><h3>제대로 만든 진짜 맥주 Kloud #설현 CF (15초)</h3></div><div class='mov_content_in'><iframe name='ifrMovie' title='Kloud 설현 맥주CF' width='920' height='470' src='https://www.youtube.com/embed/qlOJZtAv49M?rel=0&showinfo=0&controls=1&vq=hd720&rel=0&iv_load_policy=3&wmode=transparent&autoplay=0' frameborder='0' allowfullscreen='true'></iframe><br /><textarea name='' id='' cols='' rows=''>제대로 풍부하게\r\n물 타지 않아 제대로다\r\n100% 발효원액 그대로\r\n제대로 만든 진짜 맥주 Kloud</textarea></div><p class='close_bt'><a href='#'><img src='images/factory/btn_colse.png' alt='영상 닫기' /></a></p></div><div class='layer_pop'></div>")
				$('html').css({'overflow-y':'hidden'})
				aNum = 0;

				
			return false;

		});
		
		// 첫번째 슬라이드 동영상 레이어팝업 클로즈

		$(document).on("click",".close_bt a",function(){
			$(".player_pop").css("display","none");
			$(".layer_pop").css("display","none");
			$(".player_pop").html("")
			
			$('html').css({'overflow-y':'auto'})
			aNum = 1
			
			setTimeout(function(){$(".play a").focus()},50);


			return false;
		});
		
		// 두번째 슬라이드 맥주 눈금 버튼 관련
		
		$(".beer_point_s0 a").click(function(){
			$('.scrollDown').stop().animate({'opacity':'1'},aniTime);
			$('.beer_point').stop().animate({'top':'82px'},aniTime);

			$('.b_txt01').stop().animate({'opacity':'0','right':'30px'},aniTime);
			$('.b_txt02').stop().animate({'opacity':'0','right':'30px'},aniTime);
			$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);

			$('.beers').stop().animate({'top':'41px'},aniTime, function(){
				bNum = 0
				$('.beerKloud').stop().animate({'opacity':'1'},aniTime);
				scrollFlag = false;
			});
			return false;
		});

		$(".beer_point_s1 a").click(function(){
			$('.beerKloud').stop().animate({'opacity':'0'},aniTime);	//거품없애고
			$('.scrollDown').stop().animate({'opacity':'0'},aniTime);

			$('.b_txt01').stop().animate({'opacity':'1','right':'0px'},aniTime);
			$('.b_txt02').stop().animate({'opacity':'0','right':'30px'},aniTime);
			$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);

			$('.beer_point').stop().animate({'top':'199px'},aniTime);

			$('.beers').stop().animate({'top':'170px'},aniTime, function(){
				bNum = 1
				scrollFlag = false;
			});
			return false;
		});

		$(".beer_point_s2 a").click(function(){
			$('.beerKloud').stop().animate({'opacity':'0'},aniTime);	
			$('.scrollDown').stop().animate({'opacity':'0'},aniTime);

			$('.b_txt01').stop().animate({'opacity':'0','right':'30px'},aniTime);
			$('.b_txt02').stop().animate({'opacity':'1','right':'0px'},aniTime);
			$('.b_txt03').stop().animate({'opacity':'0','right':'30px'},aniTime);

			$('.beer_point').stop().animate({'top':'316px'},aniTime);
			$('.beers').stop().animate({'top':'287px'},aniTime, function(){
				bNum = 2
				scrollFlag = false;
			});
			return false;
		});

		$(".beer_point_s3 a").click(function(){
			$('.beerKloud').stop().animate({'opacity':'0'},aniTime);
			$('.scrollDown').stop().animate({'opacity':'0'},aniTime);

			$('.b_txt01').stop().animate({'opacity':'0','right':'30px'},aniTime);
			$('.b_txt02').stop().animate({'opacity':'0','right':'30px'},aniTime);
			$('.b_txt03').stop().animate({'opacity':'1','right':'0px'},aniTime);

			$('.beer_point').stop().animate({'top':'432px'},aniTime);
			$('.beers').stop().animate({'top':'403px'},aniTime, function(){
				bNum = 3
				scrollFlag = false;
			});
			return false;
		});

		// 세번째 슬라이드에 속한 제조공법 보기 버튼

		$('.intro_p > a').click(function (e){
			if(menuNum < slideNum){
				menuNum = menuNum + 1
				if (!htmlbody.hasClass('animated')) {
					htmlbody.animate({
					scrollTop: $('.slide[data-slide="' + (menuNum+1) + '"]').offset().top
					 }, 1000, 'easeInOutExpo', function(){
						$(this).removeClass('animated').dequeue();
					});
				}
				scrollFlag = true
			}
			
			return false;
		});


		// 세번째 슬라이드에 속한 제조공법의 업다운 버튼 관련

		$('.up a').click(function (e){
			gravityUp(jNum)	
			return false;
		});

		$('.down a').click(function (e){
			gravityDown(jNum)	
			return false;
		});

		// 세번째 그래비티 공정에서 스크롤 다운 관련 함수(jj를 변수로 받는데 jj는 그래비티공정 단계와 관련된 값이다.)
		function gravityDown(jj){
		switch(jj){
			case(0):
				$('.sub01_01').stop().animate({'opacity':'0','top':'-1215px'},aniTime);
				$('.sub02_01').stop().animate({'opacity':'1','top':'215px'},aniTime+200);
				$('.title_01').stop().animate({'opacity':'0', 'top':'-1060px'},aniTime);
				$('.title_02').stop().animate({'opacity':'1', 'top':'5px'},aniTime, function(){
					jNum = 1
					scrollFlag = false;
				});
				$('.up .paging_num').find('img').attr({'alt':'발효'});
				$('.down .paging_num').find('img').attr({'alt':'여과'});
				break;
			case(1):
				$('.sub02_01').stop().animate({'opacity':'0','top':'-1215px'},aniTime);
				$('.sub03_03').stop().animate({'opacity':'1','top':'134px'},aniTime+200);
				$('.sub03_04').stop().animate({'opacity':'1','top':'310px'},aniTime+200, function(){
					$('.sub03_01').stop().animate({'opacity':'1', 'top':'151px'},aniTime, function(){
						$('.sub03_02').stop().animate({'opacity':'1', 'left':'169px'},aniTime, function(){
							$('.txt01_01').hide(aniTime);
							$('.txt03_01').stop().animate({'opacity':'1'},aniTime);
						});
					});
				});
					
				$('.title_02').stop().animate({'opacity':'0', 'top':'-1060px'},aniTime);
				$('.title_03').stop().animate({'opacity':'1', 'top':'5px'},aniTime, function(){
					jNum = 2
					scrollFlag = false;
				});
				$('.up .paging_num').find('img').attr({'alt':'숙성'});
				$('.down .paging_num').find('img').attr({'alt':'저장'});
				break;
			case(2):
				$('.txt01_01').hide(aniTime);
				$('.txt03_01').stop().animate({'opacity':'1'},aniTime);
				$('.sub03_01').stop().animate({'opacity':'0'},aniTime);
				$('.sub03_02').stop().animate({'opacity':'0'},aniTime, function(){
					$('.sub03_01').stop().animate({'top':'51px'},aniTime);
					$('.sub03_02').stop().animate({'left':'69px'},aniTime);
				});
				$('.sub03_03').stop().animate({'opacity':'0','top':'-1134px'},aniTime);
				$('.sub03_04').stop().animate({'opacity':'0','top':'-1310px'},aniTime);
				$('.sub04_03').stop().animate({'opacity':'1','top':'144px'},aniTime+200, function(){
					$('.sub04_01').stop().animate({'opacity':'1','left':'103px'},aniTime);
					$('.sub04_02').stop().animate({'opacity':'1','left':'559px'},aniTime);
				});
					
				$('.title_03').stop().animate({'opacity':'0', 'top':'-1060px'},aniTime);
				$('.title_04').stop().animate({'opacity':'1', 'top':'5px'},aniTime, function(){
					jNum = 3
					scrollFlag = false;
				});
				$('.up .paging_num').find('img').attr({'alt':'여과'});
				$('.down .paging_num').find('img').attr({'alt':''});
				break;
			case(3):
				if(menuNum < slideNum){
					menuNum = menuNum + 1
					if (!htmlbody.hasClass('animated')) {
						htmlbody.animate({
							scrollTop: $('.slide[data-slide="' + (menuNum+1) + '"]').offset().top
						}, 1000, 'easeInOutExpo', function(){
							$(this).removeClass('animated').dequeue();
						});
					}
					scrollFlag = true
				}
				break;
		}
					
		if(jNum < 3){
			$('.up').css('visibility','visible')
			$('.down').css('visibility','visible')
			$('.up .paging_num').find('img').attr({'src':'images/aboutKloud/slide03_page0'+(jNum+1)+'.gif'});
			if(jNum != 2){
				$('.down .paging_num').find('img').attr({'src':'images/aboutKloud/slide03_page0'+(jNum+3)+'.gif'});
				$('.down').css('visibility','visible')
			}else{
				$('.down').css('visibility','hidden')
			}
			$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub03_0'+(jNum+2)+'_on.gif'});
		}
	}
	// 세번째 그래비티 공정에서 스크롤 업 관련 함수(jj를 변수로 받는데 jj는 그래비티공정 단계와 관련된 값이다.)
	function gravityUp(jj){
		switch(jj){
			case(0):
				if(menuNum > 0){
					menuNum = menuNum - 1
					if (!htmlbody.hasClass('animated')) {
						htmlbody.animate({
						scrollTop: $('.slide[data-slide="' + (menuNum+1) + '"]').offset().top
						}, 1000, 'easeInOutExpo', function(){
							$(this).removeClass('animated').dequeue();
						});
					}
					scrollFlag = true
				}
				break;
			case(1):
				$('.sub01_01').stop().animate({'opacity':'1','top':'215px'},aniTime);
				$('.sub02_01').stop().animate({'opacity':'0','top':'1215px'},aniTime);
				$('.title_01').stop().animate({'opacity':'1', 'top':'5px'},aniTime+200);
				$('.title_02').stop().animate({'opacity':'0', 'top':'1060px'},aniTime+200, function(){
					jNum = 0
					scrollFlag = false;
				});
				$('.up .paging_num').find('img').attr({'alt':''});
				$('.down .paging_num').find('img').attr({'alt':'숙성'});
				break;
			case(2):
				$('.txt01_01').show(aniTime);
				$('.txt03_01').stop().animate({'opacity':'0'},aniTime);
				$('.txt01_01').stop().animate({'opacity':'1'},aniTime, function(){
					$('.sub03_01').stop().animate({'opacity':'0', 'top':'51px'},aniTime);
					$('.sub03_02').stop().animate({'opacity':'0', 'left':'69px'},aniTime, function(){
						$('.sub02_01').stop().animate({'opacity':'1','top':'215px'},aniTime);
						$('.sub03_03').stop().animate({'opacity':'0','top':'1134px'},aniTime);
						$('.sub03_04').stop().animate({'opacity':'0','top':'1310px'},aniTime);
						$('.title_02').stop().animate({'opacity':'1', 'top':'5px'},aniTime+200);
						$('.title_03').stop().animate({'opacity':'0', 'top':'1060px'},aniTime+200, function(){
							jNum = 1
							scrollFlag = false;
						});
					});
				});
				$('.up .paging_num').find('img').attr({'alt':'발효'});
				$('.down .paging_num').find('img').attr({'alt':'여과'});
				break;
			case(3):
				$('.sub04_01').stop().animate({'opacity':'0','left':'315px'},aniTime);
				$('.sub04_02').stop().animate({'opacity':'0','left':'315px'},aniTime, function(){
					$('.sub04_03').stop().animate({'opacity':'0','top':'1144px'},aniTime);
					$('.sub03_01').stop().animate({'opacity':'1', 'top':'151px'},aniTime);
					$('.sub03_02').stop().animate({'opacity':'1', 'left':'169px'},aniTime);
					$('.sub03_03').stop().animate({'opacity':'1','top':'134px'},aniTime);
					$('.sub03_04').stop().animate({'opacity':'1','top':'310px'},aniTime);
					$('.title_04').stop().animate({'opacity':'0', 'top':'1060px'},aniTime+200);
					$('.title_03').stop().animate({'opacity':'1', 'top':'5px'},aniTime+200, function(){
						jNum = 2
						scrollFlag = false;
					});
				});
				$('.up .paging_num').find('img').attr({'alt':'숙성'});
				$('.down .paging_num').find('img').attr({'alt':'저장'});
				break;

		}
		
		if(jNum > 0){
			$('.up').css('visibility','visible')
			$('.down').css('visibility','visible')
			if(jNum != 1){
				$('.up .paging_num').find('img').attr({'src':'images/aboutKloud/slide03_page0'+(jNum-1)+'.gif'});
				$('.up').css('visibility','visible')
			}else{
				$('.up').css('visibility','hidden')
			}
			$('.down .paging_num').find('img').attr({'src':'images/aboutKloud/slide03_page0'+(jNum+1)+'.gif'});
			$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub03_0'+(jNum)+'_on.gif'});
		}
	}


/******************************************************************************
*	용도		:	기타 스크립트
*******************************************************************************/
	
		// 원뎁스, 투뎁스 메뉴 롤오버 관련 
		$(".rollover").hover(function(){
			this.src = this.src.replace("_off","_on");
		},function(){
			this.src = this.src.replace("_on","_off");
			/*메뉴 롤아웃시 현재 페이지값 유지 */
			$('.main_navi > li >').eq(oneDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_over.gif'});
			if(menuNum == 2){
				$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_on.gif'});
			}else if(menuNum == 3){
				$('.sub_navi > li >').eq(2).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub03_0'+(jNum+1)+'_on.gif'});
			}else{
				$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
			}
		});

		// 이미지 지글거림 ie8 검은거 묻어나오는부분 없애는 함수
		preloadimages('.beerKloud')
		preloadimages('.right_container2')
		
		
		function preloadimages(id) {
			var c = new Array();
			$(id+' img').each( function(j) {
				c[j] = new Image();
				c[j].src = this.src;
				this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='"+ this.src +"')"; 
			});
		}



/******************************************************************************
*	용도		:	이벤트 베너 관련 스크립트 모음
*******************************************************************************/
	

		// 이벤트 초기셋팅

		auto_start = setInterval("auto()",auto_time);

		$(document).on("click",".event_control ul li a",function(){
			$(".event_control ul li a").removeClass('on')
			$(this).addClass('on')
			_index = $(this).parent().index()
				
			$(".event_control ul li a").removeClass('on')
			$(".event_control ul li").eq(_index).find('a').addClass('on')
			$(".event_pic ul li").stop().animate({'opacity':'0'}, 300)
			$(".event_pic ul li").eq(_index).stop().animate({'opacity':'1'}, 300, function(){
			
			})
			$(".event_pic ul li").find('a').css({'display':'none'})
			$(".event_pic ul li").eq(_index).find('a').css({'display':'block'})

			
			clearInterval(auto_start);
			auto_start = setInterval('auto()',auto_time);
		});


		// 이벤트 레이어팝업 롤링 스타트 버튼 이벤트
		$(".e_start a").click(function(){
			
			auto_start = setInterval('auto()',auto_time);

		});
		// 이벤트 레이어팝업 롤링 스탑 버튼 이벤트
		$(".e_pause a").click(function(){
			clearInterval(auto_start);

		});	


		// 이벤트 베너 그냥 클로즈 할때
		$(document).on("click",".close_bt2 a",function(){
			$(".player_pop2").html("");
			$('html').css({'overflow-y':'auto'})
			aNum = 1
			$(".player_pop2").css('display','none')
			$("h1 a").focus();
			return false;
		});
		// 이벤트 베너 오늘하루 안보기 클로즈 할때
		$(document).on("click",".close_bt3 a",function(){
			var ExpDate = new Date();
			ExpDate.setTime(ExpDate.getTime() + 1000*60*60*24);

			fnSetCookie('kloudbeer_today_ok', "OK", ExpDate);

			
			$(".player_pop2").html("");
			$('html').css({'overflow-y':'auto'})
			$(".player_pop2").css('display','none')
			aNum = 1
			$("h1 a").focus();
			return false;
		});
		
		


		
});
// 이벤트 관련 롤링 함수(제이쿼리 밖에 써줘야 다음 함수를 setInterval이 찾는다.)
function auto(){
			
	if(_index < $(".event_pic ul li").length - 1)
	{
		_index ++
	
	}
	else
	{
		_index = 0
	}
	$(".event_pic ul li").stop().animate({'opacity':'0'}, 300)
	$(".event_pic ul li").eq(_index).stop().animate({'opacity':'1'}, 300)
	$(".event_control ul li a").removeClass('on')
	$(".event_control ul li").eq(_index).find('a').addClass('on')
	$(".event_pic ul li").find('a').css({'display':'none'})
	$(".event_pic ul li").eq(_index).find('a').css({'display':'block'})
}



