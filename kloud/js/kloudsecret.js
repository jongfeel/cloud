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
	var menuNum = 0 // 각 현재 슬라이드를 가리키는 값(0이 첫번째)
	var oneDepthNum = 1 // 메뉴의 원뎁스를 가리키는 값(0이 첫번째)
	var twoDepthNum = 0 // 메뉴의 투뎁스를 가리키는 값(0이 첫번째)
	var aniTime = 500 // 오브젝트 애니메이션 시간
	var scrollFlag = true;	// 스크롤 한번만 동작하도록 하는 변수, false일때 동작, true일때 비동작
	var slideNum = 3;	// 슬라이드 총갯수(0,1,2,3)
	
	//-----------------------------새로고침 관련 함수--------------------------------------------
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

		if($(window).width() > 1024)
		{
		$('.more_view_wrap').css({'width':wwwNum});

		}
		else
		{
			$('.more_view_wrap').css({'width':'764px','overflow':'hidden'});
			
		}	
	};

	
/******************************************************************************
*	용도		:	전체적으로 시작되고 각 슬라이드 초기셋팅 함수
*	함수		:	startFunc()
*******************************************************************************/

	function startFunc(){

		// 클라우드 시크릿 각 요소들 초기 위치 설정
		$('.logo').css({'opacity':'0'});
		$('.no').css({'opacity':'0', 'top':'-144px'});
		$('.title').css({'opacity':'0', 'top':'71px'});
		$('.more_arrow').css({'opacity':'0', 'top':'345px'});
		$('.layer_pop2').css({'opacity':'0', 'display':'block'});
		
		// 처음 시크릿 관련 숨겨놨다가 인트로 끝난뒤 보이도록
		$('.secret_wrapper').delay(1000).css('visibility','visible')

		// 처음 인트로 - 시크릿 페이지 들어오면 delay(1000) 이후 위로 animate하며 스크롤 정지
		$('.slide02_intro_container').delay(1000).animate({'top':'-100%'},aniTime, 'easeInOutCubic', function(){
		aNum = 0;
		scrollFlag = false;
			$('.layer_pop2').stop().animate({'opacity':'0.5'},aniTime);
			$('.slide02_01 .logo').stop().animate({'opacity':'1'},aniTime, function(){
				$('.no').stop().animate({'opacity':'1', 'top':'44px'},aniTime+200);
				$('.title').stop().animate({'opacity':'1', 'top':'171px'},aniTime+100);
				$('.more_arrow').stop().animate({'opacity':'1', 'top':'445px'},aniTime);
			});
		})
		
		
		//네비게이션 원뎁스 투뎁스 현재위치 설정
		for(var i = 0 ; i < slideNum + 1 ; i ++)
			{
				
				$('.sub_navi > li ').eq(i).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(i+1)+'_off.gif'});
				
			}
			$('.sub_navi > li ').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});

	

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
								if (!htmlbody.hasClass('animated')) {
									htmlbody.animate({
									scrollTop: $('.slide[data-slide="' + (menuNum + 1) + '"]').offset().top
									}, 1000, 'easeInOutExpo', function(){
										$(this).removeClass('animated').dequeue();
									});
								}
							scrollFlag = true
						}
					}
				}
				
			}
			//스크롤이 막혔을 경우 aNum = 0 일때 슬라이드 스크롤을 막고 그안에서 세부 스크롤을 실행한다. 
			else if(aNum == 0){
	
					if(scrollFlag != true){
						scrollFlag = true
						if(dNum < 0){ //아래로
							graFunc()
						}else{ // 위로
							if(menuNum > 0){
							menuNum = menuNum - 1

								if (!htmlbody.hasClass('animated')) {
									htmlbody.animate({
									scrollTop: $('.slide[data-slide="' + (menuNum + 1) + '"]').offset().top
									}, 1000, 'easeInOutExpo', function(){
										$(this).removeClass('animated').dequeue();
									});
								}
							scrollFlag = true
							}
						}
					}	
				}
			}
			// 각 슬라이드마다 동그란 버튼 클릭할 경우 세부내용 보기
			$('.container_wrap a').click(function (e){
			graFunc()	
			return false;
		});
		
		// 각 슬라이드 시크릿 세부내용이 보여지며 스크롤 움직이도록
		function graFunc()
		{
			$('.more_arrow').fadeOut();
			$('.slide02_0'+(menuNum+1)+' .more_view_wrap').stop().animate({'bottom':'0'}, aniTime, function(){
				aNum = 1
				scrollFlag = false;
			});
		}

		// 다음 슬라이드로 넘어갈 경우 각 요소값 초기화 함수

		function alFunc()
		{
			$('.more_arrow').fadeIn();
			$('.logo').stop().animate({'opacity':'0'}, 0);
			$('.no').stop().animate({'opacity':'0', 'top':'-144px'}, 0);
			$('.title').stop().animate({'opacity':'0', 'top':'71px'}, 0);
			$('.more_arrow').stop().animate({'opacity':'0', 'top':'345px'}, 0);
			$('.layer_pop2').stop().animate({'opacity':'0', 'display':'block'}, 0);
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
			
			for(var i = 0 ; i < slideNum + 1 ; i ++)
			{
				
				$('.sub_navi > li ').eq(i).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(i+1)+'_off.gif'});
				
			}
			$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
			
			
			
			if(scrollTop>=$('#slide1').offset().top-swh/2 && scrollTop<$('#slide2').offset().top-swh){
		
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;	
					$('.more_view_wrap').css({'bottom':'-50%'});
					$('.layer_pop2').stop().animate({'opacity':'0.5'},aniTime);
					$('.logo').stop().animate({'opacity':'1'},aniTime, function(){
						$('.no').stop().animate({'opacity':'1', 'top':'44px'},aniTime+200);
						$('.title').stop().animate({'opacity':'1', 'top':'171px'},aniTime+100);
						$('.more_arrow').stop().animate({'opacity':'1', 'top':'445px'},aniTime);
					});
				});
				menuNum = 0
				twoDepthNum = 0
	
			}else{
				alFunc()
				aNum =0
				scrollFlag = true;
			}

			if(scrollTop>=$('#slide2').offset().top-swh/2 && scrollTop<$('#slide3').offset().top-swh){
				
				
				
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;	
					$('.more_view_wrap').css({'bottom':'-50%'});
					$('.layer_pop2').stop().animate({'opacity':'0.5'},aniTime);
					$('.logo').stop().animate({'opacity':'1'},aniTime, function(){
						$('.no').stop().animate({'opacity':'1', 'top':'44px'},aniTime+200);
						$('.title').stop().animate({'opacity':'1', 'top':'171px'},aniTime+100);
						$('.more_arrow').stop().animate({'opacity':'1', 'top':'445px'},aniTime);
					});
				});
				menuNum = 1
				twoDepthNum = 1
			}else{
				alFunc()
				aNum =0
				scrollFlag = true;
				
			}

			if(scrollTop>=$('#slide3').offset().top-swh/2 && scrollTop<$('#slide4').offset().top-swh){
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;	
					$('.more_view_wrap').css({'bottom':'-50%'});
					$('.layer_pop2').stop().animate({'opacity':'0.5'},aniTime);
					$('.logo').stop().animate({'opacity':'1'},aniTime, function(){
						$('.no').stop().animate({'opacity':'1', 'top':'44px'},aniTime+200);
						$('.title').stop().animate({'opacity':'1', 'top':'171px'},aniTime+100);
						$('.more_arrow').stop().animate({'opacity':'1', 'top':'445px'},aniTime);
					});
				});
				menuNum = 2
				twoDepthNum = 2
			}else{
				alFunc()
				aNum = 0
				scrollFlag = true;
			}
			if(scrollTop>=$('#slide4').offset().top-swh/2){
				menuNum = 3
				twoDepthNum = 3
				$('.sub_navi').stop().animate({'opacity':'1'}, 300, function(){
					scrollFlag = false;
					$('.more_view_wrap').css({'bottom':'-50%'});
					$('.layer_pop2').stop().animate({'opacity':'0.5'},aniTime);
					$('.logo').stop().animate({'opacity':'1'},aniTime, function(){
						$('.no').stop().animate({'opacity':'1', 'top':'44px'},aniTime+200);
						$('.title').stop().animate({'opacity':'1', 'top':'171px'},aniTime+100);
						$('.more_arrow').stop().animate({'opacity':'1', 'top':'445px'},aniTime);
					});
				});			
			}else{
				aNum = 0
				scrollFlag = true;
			}	
		});
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

			
			$('.sub_navi > li >').eq(twoDepthNum).find('img').attr({'src':'images/common/navi0'+(oneDepthNum+1)+'_sub0'+(twoDepthNum+1)+'_over.gif'});
			
			

		});

		
		// 이미지 지글거림 ie8 검은거 묻어나오는부분 없애는 함수
		preloadimages('.logo')
		preloadimages('.no')
		preloadimages('.title')
		preloadimages('.more_arrow')
		
		function preloadimages(id) {
			var c = new Array();
			$(id+' img').each( function(j) {
				c[j] = new Image();
				c[j].src = this.src;
				
					this.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='image',src='"+ this.src +"')"; 
				
			});
		}
});
