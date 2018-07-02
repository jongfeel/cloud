## aboutkoud.js 소스분석

106 번째 줄의 주석 // 첫번째 슬라이드에서 윈도우창 크기가 1024아래일때 위치값 조정 -> 1024 이상일때가 맞는거 같은데...?

891,894 번째줄  $(".rollover")라는 선택자에 .hover(function(){  /  ,function(){ 함수가 두개가 연결되서 쓰이는 구조??

***

## 공통질문

* 선택자의 css스타일을 주고 px 단위를 꼭 해줘야 하는지?
* return false; 의 의미 --> a 링크가 선택자일 경우 페이지가 이동하지 않게...

***

## 소스 줄이기

1. 
```
$('.b_txt01').stop().animate({'opacity':'0', 'right':'30px'},0);
$('.b_txt02').stop().animate({'opacity':'0', 'right':'30px'},0);
$('.b_txt03').stop().animate({'opacity':'0', 'right':'30px'},0);
```
``` 
$('.b_txt01, .b_txt02, .b_txt03').stop().animate({'opacity':'0', 'right':'30px'},0);
//변화하는 속성이 동일 할 경우 선택자 내부에 , 로 구분하여 한번에 사용 가능 
```
2. 
