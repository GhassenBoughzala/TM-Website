jQuery( window ).on('load', function() {
jQuery(document).ready(function($){

/*------------ main ------------*/

/*-- navbar */
$('body').on('click', '.nav_bar', function(e) {
	e.preventDefault();
    $('body').addClass('modal-open');
    $('.body_nav').addClass('open');
    $('.navigation_mobile').addClass('open');
});

$('body').on('click', '.nav_close, .body_nav', function(e) {
	e.preventDefault();
    $('body').removeClass('modal-open');
    $('.body_nav').removeClass('open');
    $('.navigation_mobile').removeClass('open');
});

/*-- matchHeight */
window.setupHeights = function() {

	//-- list_learn
	$('.height_form').matchHeight({byRow:false});
	$('.our_philosphy h3').matchHeight({byRow:false});
	$('.content_list_learn').matchHeight({byRow:false});
	$('.list_learn .parag_style').matchHeight({byRow:false});
	$('.page_style .list_student a').matchHeight({byRow:false});
};

$(function() {
	window.setupHeights();
});

$('.slider_galerie').owlCarousel({
    margin:25,    
	loop:true,
	nav:false,
	dots:false,
	autoplay:true,
	smartSpeed: 1000,
	slideSpeed : 1500,
	autoplayTimeout:5000,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

$('.slider_partenaire').owlCarousel({
    loop:true,
    margin:30,
    nav:false,
    dots:false,
	autoplay:true,
	smartSpeed: 1000,
	slideSpeed : 1500,
	autoplayTimeout:5000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
});

/*-- fancybox loop */
var contenuPrdImg = $(".slider_galerie a.item");
if (contenuPrdImg.length) {
  contenuPrdImg.fancybox({
  buttons: [
    "slideShow",
    "thumbs",
    "zoom",
    "fullScreen",
    "close"
  ],
    'loop'  : true
  });
}
/*------------ End main ------------*/

});
});