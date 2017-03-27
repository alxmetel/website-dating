// making links DON'T send to the top of the page

$(".breadcrumbs a, .slide-context-menu a, .link-view-more").click(function(event){
	event.preventDefault()
});


// ROTATOR

var activeBullet = $('<img />').attr({
	'src': 'images/pagination-active.png',
	'class': 'active-bullet'
});


function theRotator() {
	$('.rotator-slides ul li').css({opacity: 0.0});
	$('.rotator-slides ul li:first').css({opacity: 1.0});
	$('.rotator-pagination ul li:first').append(activeBullet);

	setInterval('rotate()', 3000);
}

function rotate() {

	var current;
	if ($('.rotator-slides ul li.show')) {
		current = $('.rotator-slides ul li.show');
	} else {
		current = $('.rotator-slides ul li:first');
	}

	var currentBullet;
	if ($('.rotator-pagination ul li.active')) {
		currentBullet = $('.rotator-pagination ul li.active');
	} else {
		$('.rotator-pagination ul li:first');
	}

	var next;
	if (current.next().length) {
		if (current.next().hasClass('show')){
			next = $('.rotator-slides ul li:first');
		} else {
			next = current.next();
		}
	} else {
		next = $('.rotator-slides ul li:first');
	}

	var nextBullet;
	if (currentBullet.next().length) {
		if (currentBullet.next().hasClass('active')) {
			nextBullet = $('.rotator-pagination ul li:first');
		} else {
			nextBullet = currentBullet.next();
		}
	} else {
		nextBullet = $('.rotator-pagination ul li:first');
	}

	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 1000);

	nextBullet.addClass('active')
	.append(activeBullet);

	current.animate({opacity: 0.0}, 1000)
	.removeClass('show');

	currentBullet.removeClass('active');
};

$(document).ready(function() {		
	theRotator();
});


// VALIDATIONS

$('#name').blur(function() {
	if($(this).val()) {
		$(".name-validation .non-valid").removeClass("show");
		$(".name-validation-warning").removeClass("show");
		$(".name-validation .valid").addClass("show");
	} else {
		$(".name-validation .non-valid").addClass("show");
		$(".name-validation-warning").addClass("show");
		$(".name-validation .valid").removeClass("show");
	}
});

$('.date-of-birth').change(function() {
	if($(this).val() != "") {
		$(".form-age .non-valid").removeClass("show");
		$(".form-age .valid").addClass("show");
	} else {
		$(".form-age .non-valid").addClass("show");
		$(".form-age .valid").removeClass("show");
	}
});


// DATE PICKER

$('.date-of-birth').combodate({
	minYear: 1957,
	maxYear: 1999,
	smartDays: true,
	customClass: "form-generic-input"
});

$('.combodate .day').addClass('form-generic-input form-day-input');
$('.combodate .month').addClass('form-generic-input-wrapper form-month-input');
$('.combodate .year').addClass('form-generic-input-wrapper form-year-input');

$('.combodate .day').wrap("<div class='form-generic-styled-wrapper form-day-styled'>");
$('.combodate .month').wrap("<div class='form-generic-styled-wrapper form-month-styled'>");
$('.combodate .year').wrap("<div class='form-generic-styled-wrapper form-year-styled'>");

/*replacing months' names*/
$('.form-month-styled .form-month-input option[value="0"]').text("january");
$('.form-month-styled .form-month-input option[value="1"]').text("ferbuary");
$('.form-month-styled .form-month-input option[value="2"]').text("march");
$('.form-month-styled .form-month-input option[value="3"]').text("april");
$('.form-month-styled .form-month-input option[value="4"]').text("may");
$('.form-month-styled .form-month-input option[value="5"]').text("june");
$('.form-month-styled .form-month-input option[value="6"]').text("july");
$('.form-month-styled .form-month-input option[value="7"]').text("august");
$('.form-month-styled .form-month-input option[value="8"]').text("september");
$('.form-month-styled .form-month-input option[value="9"]').text("oktober"); // "k" - nice try )
$('.form-month-styled .form-month-input option[value="10"]').text("november");
$('.form-month-styled .form-month-input option[value="11"]').text("december");


// CAROUSEL

var prevArrow = $('<img />').attr({
	'src': 'images/prev-arrow.png'
});

$(document).ready(function(){
	$('.carousel-slides').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		prevArrow: '<img class="prev" src="images/prev-arrow.png" alt="Prev button">',
		nextArrow: '<img class="next" src="images/next-arrow.png" alt="Next button">',
	});
});


// SLIDE'S CONTEXT MENU

$('.carousel-slides img').click(function(event) {

	$(".slide-context-menu").addClass("show");

	var targetLeft = $(event.target).offset().left;
	var targetTop = $(event.target).offset().top;
	$(".slide-context-menu").offset({ left: targetLeft, top: targetTop});
});

$(document.body).click(function(event) {
	if (!$(event.target).is('.carousel-slides img')) {
		$(".slide-context-menu").removeClass("show");
	};
});


// TAB MENU

$('.tabs').chrometab();


//  PROGRESS BAR

var bar = $('.meter span');
var p = $('.meter p');

var width = bar.attr('style');
width = width.replace("width:", "");
width = width.substr(0, width.length-1);


var interval;
var start = 0; 
var end = parseInt(width);
var current = start;

var countUp = function() {
	current++;
	p.html(current + "%");

	if (current === end) {
		clearInterval(interval);
	}
};

interval = setInterval(countUp, (1000 / (end + 1)));


// RANGE SLIDER

$(function() {
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
});