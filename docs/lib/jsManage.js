// JavaScript Document
const gVal = {
	vw: function () {
		return window.innerWidth;
	},
	top: function () {
		return window.pageYOffset || document.documentElement.scrollTop;
	},
	chkLinkGo: function (event) {
		var chk = 1,
			ele = event.target;
		if (ele.tagName != 'A') {
			ele = ele.parentNode;
		}
		// 0 = stop; 1 = continue;
		var link = ele.getAttribute('href');
		if (ele.getAttribute('target') == '_blank' || link == '' || link.indexOf('#') == 0 || link.indexOf('javascript') == 0 || link.indexOf('tel') == 0 || link.indexOf('mailto') == 0 || link.indexOf('youtube') != -1) {
			chk = 0;
		}
		var pEle = ele;
		while (!!pEle.parentNode) {
			if (pEle.classList.contains('titan')) {
				chk = 0;
				break;
			} else {
				pEle = pEle.parentNode;
			}
		}
		var result = {
			'go': !!chk,
			'link': link
		}
		return result;
	}
};
$(function () {
	
	 //scrollDown
        var windowY = 0;
        $(window).on('scroll', function() {
            windowY = $(window).scrollTop();
            // floatBox 下滑變更樣式
            if (windowY > 100) {
                $('.floatBox').addClass('scroll');
    
            } else {
                $('.floatBox').removeClass('scroll');
            };
    
        }).scroll();

	//submenu
	$('.dropDown').hover(function () {
		if ($(this).parent().hasClass('nav')) return false;
		$(this).find('.submenu').stop(false, true).slideDown(200);
	}, function () {
		if ($(this).parent().hasClass('nav')) return false;
		$(this).find('.submenu').stop(false, true).slideUp(200);
	});

	//mobile menu
	var $m_menu = $('ul.menu').clone();
	var $top_m_menu = ""; //$('.topLink').find('.rightBox').children('a').not('.exclude').clone();

	$m_menu.insertAfter('.m_menu .hideBox p.sp_menu').removeClass().addClass('nav').find('b').remove().end().append($top_m_menu).children('a').wrap('<li/>').end().find('li.dropDown').each(function () {
		$(this).children('a').removeClass().append('<i class="fa fa-angle-down" />').attr('href', '');
	});

	$('.m_menu').find('a.main').click(function () {
		if (!$(this).parents('.m_menu').hasClass('active')) {
			$(this).parents('.m_menu').addClass('active');
			$(this).addClass('show');
			$('.m_menu').find('.mask').fadeIn(100);
			$('.m_menu').find('.hideBox').fadeIn(100);
			$('body').css('overflow', 'hidden');
			$('.m_menu').find('.mask').click(function () {
				/*點空白處收起menu*/
				$('.m_menu').removeClass('active');
				$('.m_menu').find('.hideBox').fadeOut();
				$('.m_menu').find('.mask').fadeOut();
			});
		} else {
			$(this).parents('.m_menu').removeClass('active');
			$(this).removeClass('show');
			$('.m_menu').find('.mask').fadeOut();
			$('.m_menu').find('.hideBox').fadeOut();
			$('body').css('overflow', 'auto');
		} //end if hasClass

		return false;
	});

	$('.m_menu').find('li.dropDown').children('a').click(function () {
		$(this).siblings().slideToggle();
		return false;
	});

	//mobile classLink
	var $clone = $('ul.classLink').clone().attr('class', ''),
		$current_txt = $('ul.classLink').find('.current').text();
	if ($('ul.classLink').data('title') != null) {
		$current_txt = $('ul.classLink').data('title');
	}
	$('ul.classLink').after('<div class="m_classLink"><a class="main"><b></b><i class="fa fa-angle-down"></i></a></div>');
	$('.m_classLink').append($clone).find('a.main b').text($current_txt);

	$('.m_classLink').click(function () {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open').find('ul').stop().slideUp(200);
			$(this).find('a.main').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
		} else {
			$(this).addClass('open').find('ul').stop().slideDown(200);
			$(this).find('a.main').find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
		}
	});

	//mailLink
	$('.contactLink').click(function () {
		if (isMobile) {
			var href = $(this).data('mail');
			window.location.href = 'mailto:' + href;
			return false;
		}
	});

	//gotop
	$('.goTop').click(function () {
		$('body,html').stop().animate({
			scrollTop: 0
		});
		return false;
	});

	//module box
	$('.outerWrap').after('<div class="moduleMask"></div>');
	$(document).on('click', '.openModule', function () {
		var obj = $(this).attr('href');
		var moduleWidth = $(obj).outerWidth() / 2;
		var moduleHeight = $(obj).outerHeight() / 2;
		$(obj).css({
			'margin-left': -moduleWidth,
			'margin-top': -moduleHeight
		}).addClass('show');
		$('.moduleMask').addClass('show');
		$('body').css('overflow', 'hidden');
		return false;
	});
	$('.moduleMask, .moduleClose').click(function () {
		$('.moduleBox, .moduleMask').removeClass('show');
		$('body').css('overflow', 'auto');
	});

	//item
	$('.item').click(function () {
		if ($(this).hasClass('hasVideo') && isMobile == true) {
			var href = $(this).siblings().find('a').attr('href');
			window.open(href);
		} else if ($(this).hasClass('hasVideo') && isMobile == false) {
			$(this).siblings().find('a').eq(0).click();
		} else if ($(this).hasClass('hasAlbum')) {
			$(this).siblings().find('a').eq(0).click();
		}
	});

	$(window).scroll(function () {
		if (gVal.top() > 100) {
			if (!$('header').hasClass('bg')) {
				$('header').addClass('bg');
				$('.menu').removeClass('dark');
			}
		} else {
			if ($('header').hasClass('none')) {
				$('header').removeClass('bg');
				$('.menu').addClass('dark');
			}
		}
	}).scroll();

});