$(function() {
	$("form[name='login']").validate({
		rules: {

			email: {
				required: true,
				email: true
			},
			password: {
				required: true,

			}
		},
		messages: {
			email: "Please enter a valid email address",

			password: {
				required: "Please enter password",

			}

		},
		submitHandler: function() {
			//get the pieces
			const email = $('#loginEmail').val();
			const password = $('#loginPassword').val();
			$('.errorLogin').hide();

			$.ajax({
				url  : "/api/auth/signin",
				type : 'post',
				data : {email, password},
				success: function (data) {
					$('.successLogin').html("Login Successful! Redirecting...");
					$('.successLogin').show();
					//save the whole user to local storage

					localStorage.setItem('bookUser', JSON.stringify(data));
					setTimeout(function () {
						window.location.href = "home.html";
					}, 2000);
				},
				error: function (error) {
					$('.errorLogin').html(error.responseJSON.message);
					$('.errorLogin').show();
				}
			});
		}
	});
});


$(function() {
	$("form[name='registration']").validate({
		rules: {
			username: "required",
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			}
		},

		messages: {
			username: "Please enter your username",
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			email: "Please enter a valid email address"
		},

		submitHandler: function() {
			//get the pieces
			const username = $('#registerUsername').val();
			const email = $('#registerEmail').val();
			const password = $('#registerPassword').val();
			$('.errorRegister').hide();

			$.ajax({
				url  : "/api/auth/signup",
				type : 'post',
				data : {username, email, password},
				success: function (data) {
					$('.successRegister').html(data.message);
					$('.successRegister').show();

					setTimeout(function () {
						$("#signin").trigger("click");
					}, 2000);

				},
				error: function (error) {
					$('.errorRegister').html(error.responseJSON.message);
					$('.errorRegister').show();
				}
			});
		}
	});
});

$("#signup").click(function(e) {
	e.preventDefault();
	$("#first").fadeOut("fast", function() {
		$("#second").fadeIn("fast");
	});
});

$("#signin").click(function(e) {
	e.preventDefault();
	$("#second").fadeOut("fast", function() {
		$("#first").fadeIn("fast");
	});
});
