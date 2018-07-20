function fnOnlyNumber(obj){
	/*if ((event.keyCode < 46)||(event.keyCode > 57)){
		//alert("숫자로만 입력 가능합니다.");
		event.returnValue=false;
	}*/
	for (var i = 0; i < obj.value.length ; i++){
		chr = obj.value.substr(i,1);  
		chr = escape(chr);
		key_eg = chr.charAt(1);
		if (key_eg == "u"){
			key_num = chr.substr(i,(chr.length-1));   
			if((key_num < "AC00") || (key_num > "D7A3")) { 
				event.returnValue = false;
			}    
		}
	}
	if (event.keyCode >= 48 && event.keyCode <= 57) {
  
	} else {
		event.returnValue = false;
	}
}

function fnIsNumeric(el) {
	var pattern = /^[0-9]+$/;
	if(el.value == "") return;

	return (pattern.test(el.value)) ? true : fnIsNumericMsg(el);
}

function fnIsNumericMsg(el){
	alert("숫자로만 입력해야 합니다");
	el.value = "";
}

/*
function fnConfirmCheck(){
	var a= 1;
	// 성인인증 쿠키값 체크
	if(fnGetCookie('kloudbeer_ok') != "OK" || fnGetCookie('kloudbeer_ok') == null){
		alert("성인 인증 후 사용해 주십시요");
		//top.location.href = "kloudbeer.com";
		top.location.href = "http://www.kloudbeer.com";
	}
}
*/
/******************************************************************************
*	용도		:	넘어온 문자열의 한글,영문을 합쳐서 최대값 계산 넣어줌
*	Syntax		:	fnTextLimit(sStr AS String, nLimit As Integer)
*	파라미터	:	sStr	- 문자열
*				:	nLimit	- Maxlength
*	예제		:	fnTextLimit('test', 50)
*	리턴값		:	문자열에 대한 값
*	참고사항	:	없음
*	기타		:	개발자 배포용
*	작성일자	:	2014.04.01
*******************************************************************************/
function fnTextLimit(sStr, nLimit){
    var tmp, strlen = 0;
    var rtnStr;
    
	if (fnStringLength(sStr) > nLimit){
		for (i=0; i < sStr.length; i++){
			tmp = escape(sStr.substr(i,1));
			if (tmp.length == 3 || tmp.length == 1)
			   strlen ++;
			else
			   strlen += 2;
			
			if(strlen > nLimit){
				rtnStr = sStr.substring(0, i);
				break;
			}
		}
		rtnStr = rtnStr + "...";
	}else{
		rtnStr = sStr;
	}
    return (rtnStr);
}

/******************************************************************************
*	용도		:	넘어온 문자열의 한글,영문을 합쳐서 바이트 계산하여 반환
*	Syntax		:	fnStringLength(sStr AS String)
*	파라미터	:	sStr	- 문자열
*	예제		:	fnStringLength('test')
*	리턴값		:	문자열에 대한 길이값
*	참고사항	:	없음
*	기타		:	개발자 배포용
*	작성일자	:	2014.04.01
*******************************************************************************/
function fnStringLength(sStr){
    var tmp, strlen = 0;
    
    for (i=0; i < sStr.length; i++){
        tmp = escape(sStr.substr(i,1));
        if (tmp.length == 3 || tmp.length == 1)
           strlen ++;
        else
           strlen += 2;
    }
    return (strlen);
}


/******************************************************************************
*	용도		:	콤보박스 데이터 입력
*	Syntax		:	fnInputCombo(argItem AS String, argData AS String, argNull AS String)
*	파라미터	:	argItem	- 입력할 컨트롤 박스명
*					argData	- 입력할 데이타
*					argNull	- 제일 처음 초기값 존재유무 S:선택, A:전체, M:직접입력
*	예제		:	fnInputCombo("selYear","1^2004;2^2003","Y")
*	리턴값		:	없음
*	참고사항	:	value/text 구분자는 "^", 행구분자는 ";"
******************************************************************************/
function fnInputCombo(argItem, argData, argNull)
{
	var objItem = eval("document.all[\'" + argItem + "\']");
	var str		= argData.split(";");
	var n		= objItem.length;
	var intCnt	= 0;
	var length	= str.length - 1;

	while(n > -1)
	{
		objItem.options[n] = null;
		n = n - 1;
	}
	
	if(argNull == "S")
	{
		option = new Option("- 선택 -", "");
		objItem.options[0] = option;
		intCnt = 1
		length = str.length 
	}
	
	
	if(argNull == "A")
	{
		option = new Option("- 전체 -", "");
		objItem.options[0] = option;
		intCnt = 1
		length = str.length 
	}
	
	if(argNull == "M")
	{
		option = new Option("직접입력", "");
		objItem.options[0] = option;
		intCnt = 1
		length = str.length 
	}

	for(i=intCnt; i< length; i++)
	{
		if(intCnt == 1)
			j = i - 1
		else
			j = i

		str1	= str[j].split("^");
		option	= new Option(str1[1], str1[0]);
		objItem.options[i] = option;
	}
	
}



/******************************************************************************
*	용도		:	데이타 선택
*	Syntax		:	fnSetCombo(argItem AS String, argData AS String)
*	파라미터	:	argItem	- 선택할 컨트롤 박스명
*					argData	- 선택할 데이타
*	예제		:	fnSetCombo("selYear","2004")
*	리턴값		:	없음
*	참고사항	:
******************************************************************************/
function fnSetCombo(argItem, argData)
{
	var objItem = eval("document.all[\'" + argItem + "\']");
	var n		= objItem.length;

	while(n > 0 && argData != "")
	{
		if(objItem.options[n-1].value == argData)
			objItem.options[n-1].selected = true
		n = n - 1;
		
	}
}

//SUB 메뉴에서 3단 메뉴 숨김처리 함수
function fnHideRow (argRow, argTable, gb){
	// 인터넷 익스플로러 4면 document.all.myTable2로,
	// 인터넷 익스플로러 5 이상 또는 넷스케이프 6 이상에서는
	// document.getElementById('myTable')로 테이블 객체를 얻어 옴
	var objTable = document.all ? eval('document.all.' + argTable) : document.getElementById(argTable)

	var temp =  argRow.toString().split(",")

	for(i = 0; i < temp.length; i++){
		if(gb == undefined){	// 구분값이 없을때
			if(objTable.rows[temp[i]].style.display == 'none')
				objTable.rows[temp[i]].style.display = '';
			else
				objTable.rows[temp[i]].style.display = 'none';
			
		}
		else{					// 구분값이 있을때
			if(gb == 1)
				objTable.rows[temp[i]].style.display = '';
			else
				objTable.rows[temp[i]].style.display = 'none';
		}
	}
}


/******************************************************************************
*	용도		:	replace
*	Syntax		:	fnReplace(str AS String, changeChar AS String, retChar AS String)
*	파라미터	:	str			- 치환된 대상을 담을 변수
*					changeChar	- 없애주고자 하는 문자열
*					retChar		- 바꿀 문자열
*	예제		:	fnReplace("test", ".")
*	리턴값		:	치환된 문자열
*	참고사항	:	없음
*	기타		:	개발자 배포용
*	작성일자	:	2005.03.01
*******************************************************************************/
function fnReplace(str, changeChar,retChar)
{
	if(str != "")
	{
		for (i=0; i < (str).length; i++) 
			str = str.replace(changeChar,retChar);
	}
	
    return str;
}

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}
/*
function fnSetCookie(name, value, expiredays){
	if (expiredays == undefined){
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/;expires=" + todayDate.toGMTString() + ";" 
	}else{
		//document.cookie = name + "=" + escape( value ) + "; path=/;" 
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate());
		document.cookie = name + "=" + escape( value ) + "; path=/;expires=" + todayDate.toGMTString() + ";" 
	}
}*/

function fnGetCookie(name){
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ){
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
		break;
	}
	return "";
}


function fnSetCookie(name, value){
	/*
	1일이후까지
	var ExpDate = new Date();

	ExpDate.setTime(ExpDate.getTime() + 1000*60*60*24);
	1시간
	ExpDate.setTime(ExpDate.getTime() + 1000*60*60);
	fnSetCookie('myCookie', 1234, ExpDate);
	*/
	var argv = fnSetCookie.arguments;
	var argc = fnSetCookie.arguments.length;
	var expires = (2 < argc) ? argv[2] : null;
	var path = (3 < argc) ? argv[3] : null;
	var domain = (4 < argc) ? argv[4] : null;
	var secure = (5 < argc) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
		((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
}

function fnModalWin(argUrl, argWidth, argHeight){
	var str;
			
	str = "dialogWidth:" + argWidth + "px";
	str += ";dialogHeight:" + argHeight + "px";
	str += ";border:think;center:yes;help:no;maximize:no;minimize:no;scroll:no;status:no";
	
	var rgResult = window.showModalDialog(argUrl, "", str);
	
	rgResult.focus();
}

function fnWinOpen(argUrl, argWinId, argWidth, argHeight, argGubun){
	var winX = 0;
	var winY = 0;

	winX = (screen.availWidth - argWidth) * 0.5;
	winY = (screen.availHeight - argHeight) * 0.5;
	
	if(argGubun == "Y"){
		var features = "width=" + argWidth + ",height=" + argHeight + ",left=" + winX + ",top=" + winY + ",scrollbars=yes,resizable=yes";
		var objWinPop = window.open(argUrl, argWinId, features);
	}else if(argGubun == "N"){
		var features = "width=" + argWidth + ",height=" + argHeight + ",left=" + winX + ",top=" + winY + ",scrollbars=no,resizable=yes";
		var objWinPop = window.open(argUrl, argWinId, features);
	}else{
		var objWinPop = window.open(argUrl);
	}
	
	objWinPop.focus();
}

function fnEmailCheck(argEmail) {
	/*var invalidChars = "'|&;<>!*'\""  ;
	for (var i = 0; i < invalidChars.length; i++) {
		if (argEmail.indexOf(invalidChars.charAt ) != -1) {
			//alert("잘못된 이메일 주소입니다.");
			return false;
		}
	}
	if (argEmail.indexOf("@")==-1){
		//alert("잘못된 이메일 주소입니다. '@'가 없습니다..");
		return false;
	}
	if (argEmail.indexOf(" ") != -1){
		//alert("잘못된 이메일 주소입니다.");
		return false;
	}
	if (window.RegExp) {
		var reg1str = "(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)";
		var reg2str = "^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3}|[0-9]{1,3})(\]?)$";
		var reg1 = new RegExp (reg1str);
		var reg2 = new RegExp (reg2str);
 
		if (reg1.test(argEmail) || !reg2.test(argEmail)) {
			//alert("잘못된 이메일 주소입니다.");
			return false;
		}
	}*/

	var t = escape(argEmail);
	if(t.match(/^(\w+)@(\w+)[.](\w+)$/ig) == null && t.match(/^(\w+)@(\w+)[.](\w+)[.](\w+)$/ig) == null){
		//alert("이메일을 올바르게 입력해 주세요.");
		return false;
	}
	return true;
}

function fnCheckPassword(argPwd){
	if(!/^[a-zA-Z0-9]{6,20}$/.test(argPwd)){
		alert('비밀번호는 숫자, 문자의 조합으로 6~20자리를 사용해야 합니다.');
		return false;
	}
	var chk_num = argPwd.search(/[0-9]/g);
	var chk_eng = argPwd.search(/[a-z]/ig);
//	var spe = pw.search(/['~!@@#$%^&*|\\\'\";:\/?]/gi);
 
	if(chk_num < 0 || chk_eng < 0){
		alert('숫자, 문자를 혼합하여 입력해 주십시요.');
		return false;
	}
   
    if(/(\w)\1\1\1/.test(argPwd)){
        alert('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.');
        return false;
    }

	if(fnCheckSpace(argPwd)){
		alert("비밀번호는 공백없이 입력해주십시요.");
		return false;
	}
	return true;
}

function fnCheckSpace(argStr){
	if(argStr.search(/\s/) != -1)
		return true;
	else
		return false;
}
/*
var num = pw.seqrch(/[0-9]/g);
var eng = pw.search(/[a-z]/ig);
var spe = pw.search(/['~!@@#$%^&*|\\\'\";:\/?]/gi);
var spa = checkSpace(pw);
if(pw.length < 6 || pw.length > 16){
	alert("6자리 ~ 20자리로 입력해주세요.");
	return false;
}

if(num < 0 || eng <0 || spe <0){
	alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
	return false;
}
if(spa){
	alert(비밀번호는 공백엇이 입력해주세요.");
	return false;
return true;

*/

function fnCalNum(str){
	if(str == undefined)
		return 0
	else if(str.toString() == "" || isNaN(str) == true || str.toString() == "0")
		return 0
	else
		return parseInt(str)
}

function fnRemoveHtml(text){
	text = text.replace(/<br>/ig, "\n"); // <br>을 엔터로 변경
	text = text.replace(/&nbsp;/ig, " "); // 공백      
	// HTML 태그제거
	text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
 
	// shkim.add.
	text = text.replace(/<(no)?script[^>]*>.*?<\/(no)?script>/ig, "");
	text = text.replace(/<style[^>]*>.*<\/style>/ig, "");
	text = text.replace(/<(\"[^\"]*\"|\'[^\']*\'|[^\'\">])*>/ig, "");
	text = text.replace(/<\\w+\\s+[^<]*\\s*>/ig, "");
	text = text.replace(/&[^;]+;/ig, "");
	text = text.replace(/\\s\\s+/ig, "");
 
	return text;
}

function fnUrlEncode(linkStr){
	var link = linkStr.split("/");

	if(link.length == 1)
		return linkStr;
	else{
		var linkname = ""
		for (i=0; i < link.length ; i++){
			if(i == link.length-1)
				linkname += escape(link[i]);
			else
				linkname += link[i] + "/";

		}
		return linkname;
	}
}

// 구글 아날리틱스 웹로그 분석기 추가
/*
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49822740-1', 'kloudbeer.com');
ga('send', 'pageview');
*/
