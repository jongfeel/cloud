## aboutkoud.html 소스분석

```
66번째줄
li 태그 내부에 <li data-slide="1" id="sub_navi01_01"> 
data-slide 이런것

=> 실제 tag가 가지지 않는 생소한 attribute의 경우는 javascript 코드로 생성해서 만들어준 것 100%

92번째줄
<div class="slide" id="slide1" data-slide="1" data-stellar-background-ratio="0">  
data-slide="1" data-stellar-background-ratio="0" 이런것은 왜? 

- 같은 이유, 어쨌든 div 태그의 속성을 설정하고 가져오는 작업을 하면서 뭔가 "data-xxx"의 값을 읽고 쓰면서 컨트롤 하고 싶어서 넣은 것

attr 로 js 에서 접근(?) 가능 dataslide = $(this).parent().attr('data-slide'); 
라이브러리가 아닌 것? 

50%/50% 사람이 직접 attribute 값을 세팅했을 수 있음
진짜 html로만 썼을수도 있음.

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

=> 없어요. 0은 px 안써줘도 무방
 
```

```
82번째줄
$(selector).resize(function)    // jquery api -> resize 메소드 -> 함수 형태로 인자 값? 

=> 메소드(method): 어떤 변수에서 호출하는 것 $('body, html').delay(100), 여기서 delay가 메소드, delay 함수라고 해도 무방
=> 함수(function): 단독으로 있는 함수 function f() {} 요런 형태. f(); 요렇게 호출할 수 있으면 함수

=> javascript first class function 찾아서 이해해 보시면 좋아요.
https://bestalign.github.io/2015/10/18/first-class-object/

함수 형태도 가능하다면 2) 번처럼도 가능??
1) $(window).resize(function () { resizeFunc() });
2) $(window).resize(resizeFunc);

=> 가능합니다. 제가 수정했어요.
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

=> 한번 해볼까요?
=> 방법: 중복 제거, 바뀌는 값들에 대해서만 설정해 주고 중복되는 코드는 한번만 실행되게 변경

let duration = 500;
let beer1heightValue = { height: '0px' };
let beer2heightValue = { height: '0px' };
let beer1topLeftValue = { top: '0px', left: '0px' };
let beer2topLeftValue = { top: '0px', left: '0px' };

if($(window).height() > 800 && $(window).width() > 1024)
{
       beer1heightValue.height = '542px';
       beer2heightValue.height = '871px';
       
       beer1topLeftValue.top = '277px';
       beer1topLeftValue.left = '-187px';
       
       beer2topLeftValue.top = '-59px';
       beer2topLeftValue.left = '-84px';
}
else
{
        beer1heightValue.height = '322px';
       beer2heightValue.height = '651px';
       
       beer1topLeftValue.top = '370px';
       beer1topLeftValue.left = '0px';
       
       beer2topLeftValue.top = '44px';
       beer2topLeftValue.left = '157px';
}	

$('.beer01 img').stop().animate(beer1heightValue, duration);
$('.beer02 img').stop().animate(beer2heightValue, duration);


$('.beer01').stop().animate(beer1topLeftValue, duration);
$('.beer02').stop().animate(beer2topLeftValue, duration);

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

=> 기능 차이는 없고 문법의 차이, vanilla script / jQuery
```

***

## 공통질문

```
1. 선택자의 css스타일을 주고 px 단위를 꼭 해줘야 하는지?

=> 0은 상관 없고, 나머지는 px를 써주는게 맞음, 안써주면 cross-browsing check
http://xahlee.info/js/css_default_unit.html
```
```
2. return false; 의 의미 --> a 링크가 선택자일 경우 페이지가 이동하지 않게...

=> a tag에서 onclick에 넣어서 이동하지 않게 하는 효과
https://hyeonseok.com/docs/accessible-javascript/

=> 함수 호출 후에 리턴 값으로 false를 받아서 처리하겠다는 의미
```
```
3. 메소드와 함수의 차이???
=> 위에 이미 적어놨어요.
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
