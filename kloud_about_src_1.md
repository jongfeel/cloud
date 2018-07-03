## aboutkloud.js 소스분석 


#1~3 초기 변수값 설정

#4~24 브라우저체크 (userAgent)

- function($) : $는 왜 넣어놓는건지? 인자값 받는 곳?


- 브라우저 체크 참고 블로그 
출처: http://blog.opid.kr/125 [opid's document]

사용예 

if ((Browser.ie9) || (Browser.ie10)) {
	// 브라우저가 IE9, 10일 때 실행할 코드
} else if(Browser.chrome) {
	// chrome
} else if(Browser.firefox) {
	// fierfox
} else {
	// 그 외 실행할 코드
}



#26~34 애니메이션 관련 초기 변수값 설정 

#38~60 페이지 로딩 시 뜨는 팝업 관련 소스
- if else
- fadeIn( ), fadeOut( ), html( ), css( ), delay( ),  

#62~65

#68~75  
- 페이지 로드 시 스크롤 맨 상단으로 이동

#82~ 리사이즈

#95~102 width 값에 따른 넓이값 고정


## kloudsecret.js

#140~ 마우스 휠 관련 스크립트 


## common.js
- 쿠키
## facebook.js
## jquery.easing.1.3.js
## jquery.mousewheel.js
## jquery-1.10.2.min.js






## 질문

#39 if($(".player_pop2").html()!=undefined) ??  해당 클래스명이 정의되지 않은.....
#45 fnGetCookie( )
