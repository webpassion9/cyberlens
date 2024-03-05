
$(document).ready(function() {

	// --------------------------------------------------------------------------
	// svg4everybody
	// --------------------------------------------------------------------------
	svg4everybody();

	// --------------------------------------------------------------------------
	// Slick
	// --------------------------------------------------------------------------
	$('.research__slider-main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		fade: false,
		infinite: true,
		touchThreshold: 30,
		prevArrow: $(".research__slider-btn-prev"),
		nextArrow: $(".research__slider-btn-next"),
		mobileFirst: true,
		  responsive: [
		    {
		      breakpoint: 767,
		      settings: {
		        slidesToShow: 5
		      }
		    },
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 7
		      }
		    }
		  ]
	});

	$('.news-feed__main').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		fade: false,
		adaptiveHeight: true,
		infinite: true,
		touchThreshold: 30,
		prevArrow: $(".news-feed__main-btn-prev"),
		nextArrow: $(".news-feed__main-btn-next"),
		  responsive: [
		    {
		      breakpoint: 767,
		      settings: {
		        slidesToShow: 1
		      }
		    }
		  ]
	});


	// --------------------------------------------------------------------------
	// Styled select
	// --------------------------------------------------------------------------
	$('select').selectize({
		openOnFocus: false,
			onInitialize: function () {
		    var that = this;

		    this.$control.on("click", function () {
		        that.ignoreFocusOpen = true;
		        setTimeout(function () {
		            that.ignoreFocusOpen = false;
		        }, 50);
		    });
		},

		onFocus: function () {
		    if (!this.ignoreFocusOpen) {
		        this.open();
		    }
		}

	});

	// stop page scrolling when select dropdown opened
	$('.selectize-dropdown').on('scroll touchmove mousewheel', function(e){
		e.preventDefault();
		e.stopPropagation();
		return false;
	})

	// --------------------------------------------------------------------------
	// Custom scroll in select
	// --------------------------------------------------------------------------
	$('.select-wrap').click(function (e) {
		var $target = $(e.currentTarget);
		if ($target.data('has-scrollbar') === void 0) {
			new PerfectScrollbar($target.closest('.select-wrap').find('.selectize-dropdown-content')[0]);
		}

	});


	// --------------------------------------------------------------------------
	// Fancybox
	// --------------------------------------------------------------------------
	$('[data-fancybox]').fancybox({
		autoFocus: false,
		touch: false,
		loop: false,
		thumbs : {
			autoStart : false
		},
		btnTpl: {

		    // Arrows
		    arrowLeft:
		      '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
		      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10"><path d="M19 18L23 22 19 26" transform="translate(-18 -17) matrix(-1 0 0 1 42 0)"/></svg>' +
		      "</button>",

		    arrowRight:
		      '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
		      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10"><path d="M19 18L23 22 19 26" transform="matrix(-1 0 0 1 24 -17) matrix(-1 0 0 1 42 0)"/></svg>' +
		      "</button>"
		  }
	});


	// --------------------------------------------------------------------------
	// Form submit
	// --------------------------------------------------------------------------
    $('form.form-base').each(function() {
        var $form = $(this);

        $form.on('submit', function(e) {
            e.preventDefault();

            $.ajax({
				// url: 'mail/mail.php',
				// type: 'POST',
				// data: new FormData(this),
				// contentType: false,
				// cache: false,
				// processData: false,
                success: function(response) {
                    if (!response.error) {
                        $form.trigger('reset');
                        $.fancybox.close();
                        $.fancybox.open({ src: '#popup-thank', touch: false});
                        setTimeout(function() {
                            $.fancybox.close({ src: '#popup-thank'});
                        }, 6000);
                    }
                }
            });
        });
    });


    // --------------------------------------------------------------------------
	// Mob menu
	// --------------------------------------------------------------------------
    $('.btn-mob-menu').on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        var $target = $(e.currentTarget);
        if($target.hasClass('active')){
            $target.removeClass('active');
            $($target.attr('href')).removeClass('active');
        }else{
            $target.closest('.js-popup').find('.btn-mob-menu').removeClass('active');
            $target.addClass('active');
            $('.header__main.active').removeClass('active');
            $($target.attr('href')).addClass('active');
        }
    })
    $(".btn-mob-menu").click(function (event) {
     $("body").addClass('is-menu-active');
    });
    $(".header__main-close").click(function (event) {
     $(this).closest(".header__main").removeClass('active');
     $(".btn-mob-menu").removeClass('active');
     $("body").removeClass('is-menu-active');
    });

    $(document).click(function (event) {
        if ($(event.target).closest(".header__main").length) return;
        $('.header__main.active').removeClass("active");
        $('.btn-mob-menu.active').removeClass("active");
        $('body').removeClass('is-menu-active');
        event.stopPropagation();
    });


	$('.header__menu>li>a').on('click', function (e) {
		$(this).closest(".header__menu>li").toggleClass('active');
	});


	// --------------------------------------------------------------------------
	// Video
	// --------------------------------------------------------------------------
	$('.video-wrap__overlay').click(function(e) {
       	$(this).parent().find('iframe')[0].src += "?autoplay=1";
		$(this).delay(1000).hide(0)
        return false;
    });

});
