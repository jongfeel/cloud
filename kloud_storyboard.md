## kloud 브랜드 페이지 스터디

### url
~~~
www.kloudbeer.com/about_kloud.asp
~~~

### 목표
~~~
css3를 활용한 동적 UI로 구현해낸 클라우드 맥주 브랜드 페이지 만들기
~~~

### 특징
~~~
- 원페이지 구조로 슬라이드 형식
- 스크롤 제어에 의해 컨텐츠 움직임 
- 이미지, 비디오, html 컨텐츠 제공
- 지원브라우저
- 갤러리 페이지
- SNS 연동 페이지 ( + 클릭시 컨텐츠가 늘어나는 ...)
~~~

### 필요한 기술 + 배워야할 기술
~~~
HTML
CSS Transitions 
CSS Animation
CSS Transform
slider
scroll
페이스북 연동?
인스타그램 연동?
트위터 연동?
~~~
 
### kloud 메뉴 구성도 
~~~
01 About Kloud(about_kloud.asp) -> 서브메뉴 5개
02 kloud Secret(about_kloud.asp) -> 서브메뉴 4개
03 kloud gallery -> 상단 메뉴 클릭 시 소팅되는 형태(일정 개수 초과시 +버튼) -> 중앙 이미지 슬라이드 모달창
04 kloud square -> 상단 메뉴 클릭 시 소팅되는 형태(일정 개수 초과시 +버튼)  -> 각 sns로 링크 연결 
05 kloud beer station -> 컨텐츠 클릭 시 중앙 이미지 슬라이드 모달창 
00 팝업 
~~~

## 해상도
~~~
너비 기준
$(window).width() > 960
$(window).width() > 1024
$(window).width() > 1600
~~~

### 크로스브라우징
~~~
 ie9/ie10/ie11, Chrome, Firefox 크로스브라우징
~~~

### DTD
~~~
XHTML 1.0 호환모드
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
~~~

### language TYPE
~~~
<!--[if IE 8]> <html lang="kr" class="ie8"> <![endif]-->
<!--[if IE 9]> <html lang="kr" class="ie9"> <![endif]-->
<!--[if !IE]><!-->
<html lang="kr">
<!--<![endif]-->
~~~

### Encoding
~~~
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
~~~

### META TAG
~~~
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="Author" content="kloudbeer.com" />
<meta name="title" content="롯데 클라우드 맥주" />
<meta name="keywords" content="KLOUD, 클라우드, 클라우드맥주, 맥주, 탄생배경, 오리지널그래피티 공법, 물을 타지 않는" />
<meta name="description" content="클라우드 맥주의 탄생배경, 밍밍하지 않은 맥주다운 맥주, 진정한 맥주를 찾기 위한 여정!" />
~~~

### js 작성 규칙
~~~
<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>

(aboutkloud)
<script type="text/javascript" src="js/aboutkloud.js"></script>
~~~

### ui library
~~~
(mousewheel)
<script type="text/javascript" src="js/jquery.mousewheel.js"></script>

(easing)
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
~~~

## css 작성 규칙
~~~
<link rel="stylesheet" type="text/css" href="css/cm.import.css" />

@import url(cm.reset.css);
@import url(cm.kloud.css);
@import url(cm.box.css);

~~~

### ui 핸들링 및 기능구현을 위한 jquery
### 폰트
### color 
### 버튼