// Save page state in local storage
var pageState = function(){
	setTimeout(function(){
		console.log("I be savin' yo data!");
		localStorage["projectPageState"] = JSON.stringify($('.save-container').html());
	}, 2000);
};

$(document).on('ready', function() {

	// Load locally stored page content
	$('.save-container').html(JSON.parse(localStorage["projectPageState"]));

	// Top Nav Bar Click Events
	$('ul.navbar-nav li').on('click', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			// Sidebar Hamburger - Deactivate other Top Nav Elements and Hide Sidebar
			if($(this).children('a').hasClass('fa-bars')) {
				$('.navbar-right').children('li.active').removeClass('active');
				$('.sidebar-menu .container-fluid').fadeOut(100);
				$('.sidebar-menu').animate({width: '0%'});
				$('.main-content').animate({width: '90%', marginLeft: '5%'});
				pageState();
			}
		}
		else {
			$(this).addClass('active');
			$(this).siblings('li.active').removeClass('active');
			// Sidebar Hamburger - Deavtivate other Top Nav Elements and Show Sidebar
			if($(this).children('a').hasClass('fa-bars')) {
				$('.navbar-right').children('li.active').removeClass('active');
				$('.sidebar-menu').animate({width: '15%'}, function(){
					$('.sidebar-menu .container-fluid').fadeIn(400);
				});
				$('.main-content').animate({width: '75%', marginLeft: '20%'});
				pageState();
			}
		}
	});

	// Sidebar Click Events
	$('.sidebar-menu li').on('click', function(){
		// Handle Sidebar accordions
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').children('p').slideUp();
			pageState();
		}
		else	{
			$(this).addClass('active').children('p').slideDown();
			$(this).siblings().removeClass('active').children('p').slideUp();
			pageState();
		}
	});

	// Project Click Events
	$('table.projects tr.project').on('click', function(){
		var selectedProjectTasks = $(this).find('table.tasks');
		var activeProjectTasks = $(this).siblings('tr').find('table.tasks.active');

		activeProjectTasks.toggleClass('active').fadeToggle();
		selectedProjectTasks.toggleClass('active').fadeToggle();
		pageState();

	});

	// Task Click Events
	$('table.tasks tr').on('click', function( event ){
		var taskName = $(this).find('h4').first().text();
		var taskDesc = $(this).find('h4').first().next().text();

		event.stopPropagation();
		
		$('#modalName').text(taskName);
		$('#modalDesc').html('<small>' + taskDesc + '</small>');
		$('#myModal').modal();
	});
});