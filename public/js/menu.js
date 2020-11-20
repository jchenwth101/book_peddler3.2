const updateMenu = 30000; //this is  5 minutes
const url = window.location.pathname.split( '/' ), path = url[1];

$(document).on("click", "#logout",(function(e) {
	e.preventDefault();
	localStorage.removeItem('bookUser');
	window.location.href = "index.html";
}));

$("#navigation").load("/includes/navigation.html");

function updateNav() {
	$(".navbar-nav").children("li").each(function () {
		const link = $(this).children("a").attr("href");
		if (link.indexOf(path) > -1) {
			$(this).addClass("highlighted");
			return;
		}
	});
}

let existCondition = setInterval(function() {
	if ($('.navbar-nav').length) {
		console.log("Navbar Exists!");
		$('#request-count').hide();
		clearInterval(existCondition);
		updateNav();
	}
}, 100); // check every 100ms

//get requests every minute and update the request menu
setInterval(function() {
	//check the api for requests, update ui
	$.ajax
	({
		type: "get",
		url: "/api/request/count",
		dataType: 'json',
		headers: {
			'x-access-token': user.accessToken
		},
		success: function (data){
			if (data.count && data.count > 0){
				$('#request-count').html('');
				$('#request-count').html(data.count);
				$('#request-count').show();
			}else{
				$('#request-count').hide();
			}
		},
		error: function     (error) {
			alert(error.responseJSON.message);
		}
	},"json");

}, updateMenu); // 60 * 1000 milsec);
//footer
$("#footer").load("/includes/navigation.html");
