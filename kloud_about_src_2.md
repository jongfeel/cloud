## aboutkoud.html 소스분석

```
66번째줄
li 태그 내부에 <li data-slide="1" id="sub_navi01_01"> 
data-slide 이런것
92번째줄
<div class="slide" id="slide1" data-slide="1" data-stellar-background-ratio="0">  
data-slide="1" data-stellar-background-ratio="0" 이런것은 왜? 

attr 로 js 에서 접근(?) 가능 dataslide = $(this).parent().attr('data-slide'); 
라이브러리가 아닌 것? 
```

## aboutkoud.js 소스분석

```
70번째줄

$(window).load(function(){
 var scrollTo = '0px';
 $('body, html').delay(100).animate({scrollTop:scrollTo},1);
 startFunc();
 resizeFunc()
});
굳이 scrollTo 라는 변수를 또 만들어서 쓸 필요가 있나요? 
$('body, html').delay(100).animate({scrollTop:0});
 
```

```
82번째줄
$(selector).resize(function)    // jquery api -> resize 메소드 -> 함수 형태로 인자 값? 
함수 형태도 가능하다면 2) 번처럼도 가능??
1) $(window).resize(function () { resizeFunc() });
2) $(window).resize( resizeFunc() {   });
```
```
95번째줄 ~ 103번째줄
너비가 960 이상일 경우 컨텐츠의 너비는 (브라우저 너비 - 사이드바 너비)
너비가 960 이하일 경우 컨텐츠의 너비는 700px 으로 고정 
```

```
106 번째줄
주석 // 첫번째 슬라이드에서 윈도우창 크기가 1024아래일때 위치값 조정 -> 1024 이상일때가 맞는거 같은데...?

.animate( properties [, duration ] [, easing ] [, complete ] )  //resize 처럼 aniamte도 메소드?? 이겠죠? 

너비가 1024 이상일 경우 슬라이드1의 컨텐츠들의 위치 조정 
위에 var aniTime = 500 // 오브젝트 애니메이션 시간 변수 선언을 해놓고 안썼네요...ㅎㅎ 500은 저 변수로 다 교체 가능! 
```

```
124번째줄 ~ 156번째줄
두개 if문 모두 선택자가 동일하고 위치 값만 다르기 때문에 코드를 줄일 수 있을 것 같은데...
```

```
891,894 번째줄  
$(".rollover")라는 선택자에 .hover(function(){  /  ,function(){ 함수가 두개가 연결되서 쓰이는 구조??

-hover 와 mouseenter 차이
참고링크 : 
https://ux.stackexchange.com/questions/106380/what-is-the-difference-between-a-mouseover-and-a-hoverover/106382

$(selector).hover(handlerIn, handlerOut) / $(selector).mouseenter(handlerIn).mouseleave(handlerOut);
결국 같은거라는 의미 같네용 
위에 handlerIn 과 handlerOut 에 각각 함수로 ...쓴것?

-replace 함수 
var result = test.replace('가', '나'); //가를 나로 바꿔라

```

```
955 번째줄 
$(document).on("click",".close_bt2 a",function(){
$(".close_bt2 a").click( function(){
둘의 차이 .on은??
```

***

## 공통질문

```
1. 선택자의 css스타일을 주고 px 단위를 꼭 해줘야 하는지?
```
```
2. return false; 의 의미 --> a 링크가 선택자일 경우 페이지가 이동하지 않게...
```
```
3. 메소드와 함수의 차이???
```



***

## 소스 줄이기

1. 
```
$('.b_txt01').stop().animate({'opacity':'0', 'right':'30px'},0);
$('.b_txt02').stop().animate({'opacity':'0', 'right':'30px'},0);
$('.b_txt03').stop().animate({'opacity':'0', 'right':'30px'},0);

//변화하는 속성이 동일 할 경우 선택자 내부에 , 로 구분하여 한번에 사용 가능
$('.b_txt01, .b_txt02, .b_txt03').stop().animate({'opacity':'0', 'right':'30px'},0);
 
```
2. 



if 문을 줄이기!
