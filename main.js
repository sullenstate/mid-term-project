$(document).on('ready', function() {
  
	$('ul.navbar-nav li').on('click', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			if($(this).children('a').hasClass('fa-bars')) {
				$('.navbar-right').children('li.active').removeClass('active');
				$('.sidebar-menu .container-fluid').fadeOut(100);
				$('.sidebar-menu').animate({width: '0%'});
				$('.main-content').animate({width: '90%', marginLeft: '5%'});
			}
		}
		else {
			$(this).addClass('active');
			$(this).siblings('li.active').removeClass('active');
			
			if($(this).children('a').hasClass('fa-bars')) {
				$('.navbar-right').children('li.active').removeClass('active');
				$('.sidebar-menu').animate({width: '15%'}, function(){
					$('.sidebar-menu .container-fluid').fadeIn(400);
				});
				$('.main-content').animate({width: '75%', marginLeft: '20%'});

			}
		}
	});

	$('.sidebar-menu li').on('click', function(){
		
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').children('p').slideUp();
		}
		else	{
			$(this).addClass('active').children('p').slideDown();
			$(this).siblings().removeClass('active').children('p').slideUp();
		}
	});

});