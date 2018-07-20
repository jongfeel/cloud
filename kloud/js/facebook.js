var f_login = "N";

window.fbAsyncInit = function() {
	FB.init({
		appId      : '753331108108470', 
		status		: true, 
		cookie     : true,  // enable cookies to allow the server to access 
		xfbml      : true,  // parse social plugins on this page
		oauth		: true,
		version    : 'v2.0' // use version 2.0
	});

	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			f_login = "Y";
		}else{
			f_login = "N";
			
		}
	},true);

	
};

// Load the SDK asynchronously
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// 페이스북 이동(로그인 안되어 있으면 로그인 후 이동)
function fnFacebookSend(url){



	FB.getLoginStatus(function(response) {

		if (response.status == 'connected') {
			var link, temp1, temp2

			$("#frmOpen").html("");
			if(url.indexOf("?") != -1){
				link = url.substring(0,url.indexOf("?"));
				temp1 = url.substring(url.indexOf("?")+1,url.length).split("&");
				for(i=0; i < temp1.length; i++){
					temp2 = temp1[i].split("=");
					$("#frmOpen").append("<input type='hidden' name='"+temp2[0]+"' value='" + temp2[1] + "'>")
				}
			}else{
				link = url;
			}

			frmOpen.action = link
			frmOpen.submit();
		}else{
			FB.login(function(response) {
				if (response.authResponse) {
					fnWin(url,"kloud")
				} else {
				}
			},{scope:'public_profile'});
			
		}
	});
}

function fnWin(argURL,argName){

	var width = screen.width;
	var height = screen.height;
	var windowFeatures = "height="+width+",width="+width+",toolbar=1,scrollbars=1,status=1,resizable=1,location=1,menuBar=0";

	var winName = this.name || argName;
	var winURL = this.href || argURL;

	var centeredY,centeredX;

	centeredY = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120)/2) - (width/2)));
	centeredX = window.screenLeft + ((((document.body.offsetWidth + 20)/2) - (width/2)));

	var win = window.open(winURL, winName, windowFeatures+',left=' + centeredX +',top=' + centeredY);

	if (win == null || typeof(win) == "undefined" || (win == null && win.outerWidth == 0) || (win != null && win.outerHeight == 0) || win.test == "undefined"){
		alert("팝업 차단 기능이 설정되어있습니다\n\n차단 기능을 해제(팝업허용) 한 후 다시 이용해 주십시오.")
	}else if (win){
		if (win.innerWidth === 0){
			alert("팝업 차단 기능이 설정되어있습니다\n\n차단 기능을 해제(팝업허용) 한 후 다시 이용해 주십시오.")
		}
	}
}