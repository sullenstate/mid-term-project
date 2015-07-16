// Save page state in local storage
var pageState = function(){
		console.log("I be savin' yo data!");
		localStorage["projectPageState"] = JSON.stringify($('.save-container').html());
};

var clientList = [];

$(document).on('ready', function() {

	// Load locally stored page content
	// $('.save-container').html(JSON.parse(localStorage["projectPageState"]));

	var workingProject;

	$("[data-toggle=popover]").popover({container : 'body'});
	
	// Top Nav Bar Click Events
	$('ul.navbar-nav li').on('click', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			// Sidebar Hamburger - Deactivate other Top Nav Elements and Hide Sidebar
			if($(this).children('a').hasClass('fa-bars')) {
				$('.navbar-right').children('li.active').removeClass('active');
				$('.sidebar-menu .container-fluid').fadeOut(100);
				$('.sidebar-menu').animate({width: '0%'});
				$('.main-content').animate({width: '90%', marginLeft: '5%'}, function(){
					pageState();
				});
			}
		}
		else {
			$(this).addClass('active');
			$(this).children('.fa-envelope-o').popover('show');
			$(this).siblings('li.active').removeClass('active');
			// Sidebar Hamburger - Deavtivate other Top Nav Elements and Show Sidebar
			if($(this).children('a').hasClass('fa-bars')) {
				$('.navbar-right').children('li.active').removeClass('active');
				$('.sidebar-menu').animate({width: '15%'}, function(){
					$('.sidebar-menu .container-fluid').fadeIn().animate({opacity: 1}, 200, function(){
						pageState();
					});
				});
				$('.main-content').animate({width: '75%', marginLeft: '20%'});
			}
		}
	});

	// Sidebar Click Events
	$('.sidebar-menu li').on('click', function(){
		// Handle Sidebar accordions
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').children('p').slideUp();
		}
		else	{
			$(this).addClass('active').children('p').slideDown();
			$(this).siblings().removeClass('active').children('p').slideUp();
		}

		setTimeout(pageState, 1000);
	});

	$('.sidebar-menu li > p').on('click', function(event){
		// Handle menu items
		event.stopPropagation();
		if ($(this).hasClass('add') && $(this).text() === 'Add New Project') {
			$('table.tasks.active').toggleClass('active').fadeToggle();

				$('select').empty();

				for (var i = 0; i < clientList.length; i += 2) {
						$('select').append('<option>' + clientList[i] + '</option>');
				};

			$('#projectEntryModal').modal();
		}
		else {
			$('table.tasks.active').toggleClass('active').fadeToggle();
			$('#clientEntryModal').modal();
		}
	});

	// Project Click Events - Delegated to main-content div
	$('.main-content').on('click', 'table.projects tr.project', function(){
		var selectedProjectTasks = $(this).find('table.tasks');
		var activeProjectTasks = $(this).siblings('tr').find('table.tasks.active');

		if (selectedProjectTasks.hasClass('active')) {
			selectedProjectTasks.removeClass('active').fadeOut();
	
			setTimeout(pageState, 1000);

		}
		else {
			selectedProjectTasks.addClass('active').fadeIn().animate({opacity : 1}, 100, function(){
				pageState();
			});
			$(this).find('table.tasks').find('a.btn').animate({
				opacity : 0
			}, 100);
			$(this).find('table.tasks').siblings('a.btn').animate({
				opacity : 1
			}, 100);

			activeProjectTasks.removeClass('active').fadeOut();
		}
	});

	// Project Button Clicks
	$('.main-content').on('click', 'table.projects .btn', function( event ){

		event.stopPropagation();

		workingProject = $(this).closest('tr.project');
		
		if ($(this).text() === 'Add Task') {
			
			if (! workingProject.find('table.tasks').hasClass('active')) {
				workingProject.find('table.tasks').addClass('active');
			}

			$('#taskEntryModal').modal();
			workingProject.find('table.tasks').fadeIn();
		}
		else {
		}
	});

	// Task Click Events
	$('table.tasks tr').on('click', function( event ){
		var taskName = $(this).find('h4').first().text();
		var taskDesc = $(this).find('h4').first().next().text();

		event.stopPropagation();
		
		$('#modalName').text(taskName);
		$('#modalDesc').html('<small><em>' + taskDesc + '</em></small>');
		$('#taskDetailModal').modal();
	});

	// Form Click Events
	// Project Entry Form
	$('#projectEntryModal .modal-footer .btn-primary').on('click', function(){
		var projectName = $('#projectName').val();
		var projectDesc = $('#projectDescription').val();
		var newProject = $('table.template .project');
		var clientName = $('#clientID :selected').text();
		var clientImg = clientList.indexOf(clientName);
		console.log(clientImg);

		// Populate Project Template
		newProject.find('h2').first().text(projectName);
		newProject.find('em').first().text(projectDesc);
		newProject.find('img').attr("src", clientList[clientImg + 1]);
		newProject.find('.client').text(clientName);
		// Add Project Template Clone to Main Table Body
		$('table.projects > tbody').prepend(newProject.clone());
		// Close Modal and Clear Form Data
		$('#projectEntryModal').modal('toggle');
		$('#projectName').val('');
		$('#projectDescription').val('');
		$('#clientName').val('');
		// Save New Page State
		setTimeout(pageState, 1000);
	});

	// Task Entry Form
	$('#taskEntryModal .modal-footer .btn-primary').on('click', function(){
		var taskName = $('#taskName').val();
		var taskDescription = $('#taskDescription').val();
		var newTask = $('table.taskTemplate .task');

		// Populate Task Template
		newTask.find('h4').first().text(taskName);
		newTask.find('em').first().text(taskDescription);
		// Add Task Template Clone to Project Table Task Space
		workingProject.find('table.tasks tbody').prepend(newTask.clone());
		// Close Modal and Clear Form Data
		$('#taskEntryModal').modal('toggle');
		$('#taskName').val('');
		$('#taskDescription').val('');
		// Save New Page State
		setTimeout(pageState, 1000);
	});

	// Client Entry Form
	$('#clientEntryModal .modal-footer .btn-primary').on('click', function(){
		var clientName = $('#clientEntryModal').find('#clientName').val();
		var clientIcon = $('#clientIcon').val();

		if (clientName !== '') {
			clientList.push(clientName);
			clientList.push(clientIcon);
		}

		$('#clientEntryModal').modal('toggle');
		$('#clientEntryModal').find('#clientName').val('');
		$('#clientIcon').val('');
	});

	// Animate buttons on hover
	// Project Button Show
	$('.main-content').on('mouseenter', 'tr.project', function(){
		$(this).find('table.tasks').siblings('a.btn').animate({opacity : 1}, 200);
	});

	$('.main-content').on('mouseleave', 'tr.project', function(){
		$(this).find('.btn').animate({opacity : 0}, 200);
	});

	// Task Button Show
	$('.main-content').on('mouseenter', 'tr.task', function(){
		$(this).find('a').animate({opacity : 1}, 200);
	});

	$('.main-content').on('mouseleave', 'tr.task', function(){
		$(this).find('a').animate({opacity : 0}, 200);
	});
});