"use strict";

$(document).ready(function () {
	// fullpage initialization
	if ($("#fullpage").length) {
		$("#fullpage").fullpage({
			navigation: true,
			responsiveWidth: 769,
			fixedElements: 'header',
			onLeave: function onLeave(index, nextIndex, direction) {
				// after leaving section 1
				if (index == 1 && direction == 'down') {
					$('header').addClass('sticky');
				}
				// before entering section 1
				else if (index == 2 && direction == 'up') {
						$('header').removeClass('sticky');
					}
			}
		});
	}

	// Owl-Carousel initializations
	if ($(".top-carousel").length) {
		var top_owl = $(".top-carousel").owlCarousel({
			items: 1,
			loop: false,
			autoplay: true,
			rewind: true,
			autoplaySpeed: 2000,
			autoplayTimeout: 7000,
			mouseDrag: false,
			touchDrag: false,
			navText: ['<img src="assets/img/icons/arrow-left.png" alt="arrow icon">', '<img src="assets/img/icons/arrow-right.png" alt="arrow icon">'],
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			responsive: {
				0: {
					nav: false,
					dots: true
				},
				769: {
					nav: true,
					dots: false
				}
			}
		});
	}

	if ($(".news-carousel").length) {
		$(".news-carousel").owlCarousel({
			items: 1,
			dots: true,
			loop: false,
			autoplay: true,
			rewind: true,
			mouseDrag: false,
			touchDrag: false,
			autoplayTimeout: 7000
		});
	}

	if ($(".pub-carousel").length) {
		$(".pub-carousel").owlCarousel({
			items: 3,
			dots: false,
			nav: true,
			loop: false,
			autoplay: false,
			rewind: true,
			mouseDrag: false,
			touchDrag: false,
			navText: ['<img src="assets/img/icons/arrow-left.png" alt="arrow icon">', '<img src="assets/img/icons/arrow-right.png" alt="arrow icon">'],
			responsive: {
				0: {
					items: 1
				},
				839: {
					items: 2
				},
				1300: {
					items: 3
				}
			}
		});
	}

	// Animate carousel elements
	if ($(".top-carousel").length) {
		var setAnimation = function setAnimation(_elem, _InOut) {
			var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			_elem.each(function () {
				var $elem = $(this);
				var $animationType = 'animated ' + $elem.data('animation-' + _InOut);
				$elem.addClass($animationType).one(animationEndEvent, function () {
					$elem.removeClass($animationType);
				});
			});
		};

		top_owl.on('change.owl.carousel', function (event) {
			var $currentItem = $('.owl-item', top_owl).eq(event.item.index);
			var $elemsToanim = $currentItem.find("[data-animation-out]");
			setAnimation($elemsToanim, 'out');
		});

		top_owl.on('changed.owl.carousel', function (event) {
			var $currentItem = $('.owl-item', top_owl).eq(event.item.index);
			var $elemsToanim = $currentItem.find("[data-animation-in]");
			setAnimation($elemsToanim, 'in');
		});

		var round = 0;
		top_owl.on('translated.owl.carousel', function (event) {
			if (event.item.index == event.page.count - 1) {
				if (round < 1) {
					round++;
				} else {
					top_owl.trigger('stop.owl.autoplay');
					var owlData = top_owl.data('owl.carousel');
					owlData.options.autoplay = false;
					top_owl.trigger('refresh.owl.carousel');
				}
			}
		});
	}

	// Sticky navbar mobile
	$(window).scroll(function () {
		if ($(window).width() < 769) {
			if ($(window).scrollTop() > 30) {
				$('header').addClass("sticky");
			} else {
				$('header').removeClass("sticky");
			}
		}
	});

	if ($(".content-page").length) {
		$(window).scroll(function () {
			if ($(window).scrollTop() > 30) {
				$('header').addClass("sticky");
				$('header').css("position", "fixed");
				$('.content-page main').css("padding-top", "176px");
			} else {
				$('header').removeClass("sticky");
				$('header').css("position", "unset");
				$('.content-page main').css("padding-top", "0");
			}
		});
	}

	// Replace all SVG images with inline SVG
	$('img.svg').each(function () {
		var $img = $(this);
		var imgURL = $img.attr('src');

		$.get(imgURL, function (data) {
			var $svg = $(data).find('svg');
			console.log(data);
			$svg = $svg.removeAttr('xmlns:a');
			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			}
			$img.replaceWith($svg);
		}, 'xml');
	});

	$(".zoom a").on("click", function (event) {
		var dz = $(this).attr("id");
		var size = parseInt($(".wysiwyg").css("font-size"));

		if (dz == "zoom") {
			if (size < 24) {
				$(".wysiwyg").css("font-size", size + 2 + "px");
			}
		} else {
			if (size > 14) {
				$(".wysiwyg").css("font-size", size - 2 + "px");
			}
		}
	});
});

// Show fullscreen overlay content
var opening_direction = "",
    $elm;
var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

function openOverlayLeft(overlay) {
	$elm = $("#" + overlay);
	opening_direction = "left";

	if ($("#fullpage").length) {
		$("#fp-nav").fadeOut("slow");
		$("body").css("overflow", "hidden");
		$.fn.fullpage.setAllowScrolling(false);
	}

	$elm.show();
	$elm.removeClass("fadeOutLeftBig");
	$elm.addClass("fadeInLeftBig");
}

function openOverlayRight(overlay) {
	$elm = $("#" + overlay);
	opening_direction = "right";

	if ($("#fullpage").length) {
		$("#fp-nav").fadeOut("slow");
		$("body").css("overflow", "hidden");
		$.fn.fullpage.setAllowScrolling(false);
	}

	$elm.show();
	$elm.removeClass("fadeOutRightBig");
	$elm.addClass("fadeInRightBig");
}

$(".closeOverlay").click(function () {
	var currentOverlay = $(this).closest('.overlay').attr("id");
	$elm = $("#" + currentOverlay);

	if ($("#fullpage").length) {
		$("#fp-nav").fadeIn("slow");
		$("body").css("overflow", "visible");
		$.fn.fullpage.setAllowScrolling(true);
	}

	if (opening_direction == "left") {
		opening_direction = "";
		$elm.removeClass("fadeInLeftBig");
		$elm.addClass("fadeOutLeftBig").bind(animationEndEvent, function () {
			if (opening_direction == "") {
				$elm.hide();
			}
		});
	} else if (opening_direction == "right") {
		opening_direction = "";
		$elm.removeClass("fadeInRightBig");
		$elm.addClass("fadeOutRightBig").bind(animationEndEvent, function () {
			if (opening_direction == "") {
				$elm.hide();
			}
		});
	}

	if (currentOverlay == "mainNav") {
		$("input[name='main_menu']").prop('checked', false);
	}
	if (currentOverlay == "searchBox") {
		$("#searchBox input[name='search']").val("");
	}
	if (currentOverlay == "login") {
		$("#login input[name='email']").val("");
		$("#login input[name='password']").val("");
	}
});

$(".overlay").on("click", function (event) {
	$("#" + $(this).attr("id") + " .closeOverlay").triggerHandler("click");
}).children(".overlay-content").click(function (e) {
	e.stopPropagation();
});