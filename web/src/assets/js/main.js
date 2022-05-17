// Retain Focus

function RetainFocusOnPopUp(modalId, submitPopId, cancelPopId) {
    var firstAnchor = document.getElementById(modalId),
        lastAnchor = document.getElementById(submitPopId);
    if ($(lastAnchor)[0].hasAttribute("disabled")) {
        lastAnchor = document.getElementById(cancelPopId)
    }
    function keydownHandler(e) {
        var evt = e || window.event;
        var keyCode = evt.which || evt.keyCode;
        if (keyCode === 9) { // TAB pressed
            if (evt.preventDefault) evt.preventDefault();
            else evt.returnValue = false;
            firstAnchor.focus();
        }
    }
    if (lastAnchor.addEventListener) lastAnchor.addEventListener('keydown', keydownHandler, false);
    else if (lastAnchor.attachEvent) lastAnchor.attachEvent('onkeydown', keydownHandler);
}

// Retain Focus Areas

$(function () {
RetainFocusOnPopUp("alertEmployeeModal", "employeeYesbtn", "employeeNobtn");
});


// Sidebar

// $(function() {

// 	var sidebar = $('#sidebar').SimpleSidebar({
// 		mainDiv: $('#wrapper'),
// 		toggleEl: $('.sidebarToggle'),
// 		rtl: false,
// 	});
	
// 	$('#sidebarClosebtn').click(function() {
// 		sidebar.toggle($('#toggleButton').attr('aria-expanded','false'));
// 		$('#toggleButton').data('toggleclicked', 0);
// 	});
	
// });


$(document).ready(function() {

//Sidebar

	$.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
	$('#toggleButton').clickToggle(function() {
		$(this).attr('aria-expanded','true');
	}, function() {
		$(this).attr('aria-expanded','false');
	});


	var sidebar = $('#sidebar').SimpleSidebar({
		mainDiv: $('#wrapper'),
		toggleEl: $('.sidebarToggle'),
		rtl: false,
	});
	
	$('#sidebarClosebtn').click(function() {
		sidebar.toggle($('#toggleButton').attr('aria-expanded','false'));
		$('#toggleButton').data('toggleclicked', 0);
	});

	

});



// Reference Sidebar
/*$(function() {

	var sidebar = $('#sidebar').SimpleSidebar({
		mainDiv: $('#wrapper'),
		toggleEl: $('.sidebarToggle'),
		rtl: false,
	});

	var sidebar2 = $('#sidebar2').SimpleSidebar({
		mainDiv: $('#main'),
		toggleEl: $('.sidebarToggle2'),
		rtl: true,
	});

	$('.sidebarToggleAll').click(function() {
		sidebar.toggle();
		sidebar2.toggle();
	});

	$('.close1').click(function() {
		sidebar.toggle();
	});

	$('.close2').click(function() {
		sidebar2.toggle();
	});

});*/

