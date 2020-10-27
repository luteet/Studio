$(function () {




    var supportedWebpCheck, lazyBg = '.lazy-bg';

    function ThisIsWebP() {
        var def = $.Deferred(), crimg = new Image();
        crimg.onload = function () { def.resolve(); };
        crimg.onerror = function () { def.reject(); };
        crimg.src = "img/webp-test.webp";
        return def.promise();
    }

    ThisIsWebP().then(function () {
        $(lazyBg).removeAttr('data-src-not-webp');
        $('.lazy-bg-slide').removeAttr('data-src-not-webp');
        $(lazyBg).lazy({
            afterLoad: function (e) {
                $(e).addClass('loaded');
            }
        })


    }, function () {
        $.each($(lazyBg), function () {
            $(this).attr('data-src', $(this).data('src-not-webp')).removeAttr('data-src-not-webp');
        })
        $.each($('.lazy-bg-slide'), function () {
            $(this).attr('data-src', $(this).data('src-not-webp')).removeAttr('data-src-not-webp');
        })
        $(lazyBg).lazy()
        $(lazyBg).addClass('loaded')

    });

    var imageViewSliderCheck = false;
    function imageViewSlider(e) {
        if (imageViewSliderCheck == false && $(window).width() > 525) {
            imageViewSliderCheck = true;
            //console.log('active script')
            if (!$('html').hasClass('not-supported') && !$(e).hasClass('active')) {
                //console.log('work script')
                $('.services__slider--img-active').css('opacity', '0');
                setTimeout(function () {
                    $('.services__slider--img-active').parent().find('source').attr('srcset', $(e).find('.services__slider--img').parent().find('source').data('srcset')).parent().find('img').css('opacity', '1');
                    imageViewSliderCheck = false;
                }, 300)
            }
            else {
                $('.services__slider--img-active').css('opacity', '0');
                setTimeout(function () {
                    $('.services__slider--img-active').attr('src', $(e).find('.services__slider--img').attr('src'))
                    imageViewSliderCheck = false;
                }, 300)
            }
        }
    }

    function mobileClickOnSliderItem(e) {
        if ($('html').hasClass('mobile')) {
            if (!$(this).hasClass('active') && $(window).width() > 525) {
                e.preventDefault()
                imageViewSlider($(this))
                $('.services__slider--item').removeClass('active')
                $(this).addClass('active')
            }
        }
    }

    $('.services__slider--item').on('click', function (e) {
        mobileClickOnSliderItem(e)
    });

    $('.services__slider--list').on('init', function () {
        let sliderItem = $(this).find('.slick-active').find('.services__slider--img'),
        sliderItemFirst = $(this).find('.slick-active').find('.services__slider--item');
        
        $('.services__slider--item').hover(function () {
            //console.log('hover');
            if ($('html').hasClass('desktop') && !$(this).hasClass('active')) {
                imageViewSlider($(this))
                $('.services__slider--item').removeClass('active')
                $(this).addClass('active')
            }
        }, function () {

        });
        ThisIsWebP().then(function () {
            $(sliderItemFirst[0]).addClass('active');
            $.each(sliderItem, function () {
                $(this).parent().find('[data-srcset]').attr('srcset', $(this).parent().find('[data-srcset]').data('srcset'));
                $('.services__slider--img-active').parent().find('source').attr('srcset', $(sliderItem[0]).parent().find('source').data('srcset')).parent().find('img').css('opacity', '1');
            })
            $('.services__slider--img').on('load', function () {
                $(this).addClass('loaded');
            })

        }, function () {
            $(sliderItemFirst[0]).addClass('active');
            $('html').addClass('not-supported');
            $.each(sliderItem, function () {
                $(this).attr('src', $(this).data('src'));
                $('.services__slider--img-active').attr('src', $(sliderItem[0]).find('.services__slider--img').attr('src'))
            })
            $('.services__slider--img').on('load', function () {
                $(this).addClass('loaded');
            })

        });

        $('.services__slider--item').on('click', function (e) {
            mobileClickOnSliderItem(e)
        });
        
        
        if($('html').hasClass('desktop')) {
            
        }

    });
    function sliderSevicesSettings() {
        return {
            rows: 2,
            slidesToShow: 2,
            infinite: false,
            nextArrow: '<button type="button" class="slick-next slider-arrow slider-next"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 50" style="enable-background:new 0 0 150 50;" xml:space="preserve"><path style="fill:#222222;" d="M120.6,26.7c0.1-0.1,0.1-0.2,0.2-0.3c0-0.1,0.1-0.2,0.1-0.4c0-0.1,0.1-0.2,0.1-0.3c0.1-0.5,0.1-0.9,0-1.4c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.4c0-0.1-0.1-0.2-0.2-0.3c0-0.1-0.1-0.2-0.1-0.3c-0.1-0.2-0.3-0.4-0.4-0.5L100.3,2.8c-1.4-1.4-3.6-1.4-4.9,0c-1.4,1.4-1.4,3.6,0,4.9l13.8,13.8H32.4c-1.9,0-3.5,1.6-3.5,3.5c0,1.9,1.6,3.5,3.5,3.5h76.7L95.4,42.3c-1.4,1.4-1.4,3.6,0,4.9c1.4,1.4,3.6,1.4,4.9,0L120,27.5c0.2-0.2,0.3-0.3,0.4-0.5C120.5,26.8,120.6,26.8,120.6,26.7z"/></svg></button>',
            prevArrow: '<button type="button" class="slick-prev slider-arrow slider-prev"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 50" style="enable-background:new 0 0 150 50;" xml:space="preserve"><path style="fill:#222222;" d="M29.4,23.3c-0.1,0.1-0.1,0.2-0.2,0.3c0,0.1-0.1,0.2-0.1,0.4c0,0.1-0.1,0.2-0.1,0.3c-0.1,0.5-0.1,0.9,0,1.4c0,0.1,0.1,0.2,0.1,0.3c0,0.1,0.1,0.2,0.1,0.4c0,0.1,0.1,0.2,0.2,0.3c0,0.1,0.1,0.2,0.1,0.3c0.1,0.2,0.3,0.4,0.4,0.5l19.7,19.7c1.4,1.4,3.6,1.4,4.9,0c1.4-1.4,1.4-3.6,0-4.9L40.8,28.5h76.7c1.9,0,3.5-1.6,3.5-3.5c0-1.9-1.6-3.5-3.5-3.5H40.8L54.6,7.7c1.4-1.4,1.4-3.6,0-4.9c-1.4-1.4-3.6-1.4-4.9,0L30,22.5c-0.2,0.2-0.3,0.3-0.4,0.5C29.5,23.2,29.4,23.2,29.4,23.3z"/></svg></button>',
            responsive: [
                {
                    breakpoint: 1141,
                    settings: {
                        rows: 1,
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        rows: 1,
                    }
                },
                {
                    breakpoint: 525,
                    settings: {
                        slidesToShow: 1,
                        rows: 1,
                    }
                },
            ]
        }
    }
    $('.services__slider--list').slick(sliderSevicesSettings())
    let sliderBtnTab = $('.services__nav--tab'), sliderItemStart;
    $('.services__nav--tab').on('click', function () {
        if (!$(this).hasClass('active')) {
            sliderBtnTab = $(this);
            $('.services__nav--tab').removeClass('active')
            sliderBtnTab.addClass('active');
            $('.services__slider--list, .services__slider--item-active').css('opacity', '0')
            setTimeout(function () {
                $('.services__slider--list').slick('destroy')
                $.each($('.services__slider--item'), function () {
                    $(this).appendTo('.services__slider--none')
                    if ($(this).data('item-for') == '#' + sliderBtnTab.attr('id') + '') {
                        $(this).appendTo('.services__slider--list')
                    }
                    else if(sliderBtnTab.attr('id') == 'slider-all') {
                        
                        $(this).appendTo('.services__slider--list')
                    }
                });
                $('.services__slider--list').slick(sliderSevicesSettings())
                sliderItemStart = $('.services__slider--list').find('.services__slider--item');
                $('.services__slider--item').removeClass('active')
                imageViewSlider(sliderItemStart[0])
                $('.services__slider--list, .services__slider--item-active').css('opacity', '1')
            }, 200)

        }
    });

    sliderBtnTab[0].click();

    $('.services__slider--list').on('afterChange', function () {
        sliderItem = $(this).find('.slick-active').find('[data-src]');
        $.each(sliderItem, function () {
            if (!$('html').hasClass('not-supported')) {
                $.each(sliderItem, function () {
                    $(this).parent().find('[data-srcset]').attr('srcset', $(this).parent().find('[data-srcset]').data('srcset'));
                });
                $('.services__slider--img').on('load', function () {
                    $(this).addClass('loaded');
                })
            }
            else {
                $(this).attr('src', $(this).data('src'));
                $('.services__slider--img').on('load', function () {
                    $(this).addClass('loaded');
                })
            }
        })
    });

    /* $('.services__slider--item').hover(function () {
        console.log('hover');
        if($('html').hasClass('desktop') && !$(this).hasClass('active')) {
            imageViewSlider($(this))
            $('.services__slider--item').removeClass('active')
            $(this).addClass('active')
        }
    }, function () {

    }); */

    

    $('.btn').hover(function () {
        $(this).removeClass('off-hover').addClass('on-hover')
    },
        function () {
            $(this).removeClass('on-hover').addClass('off-hover')
        });

    $('.burger').on('click', function () {
        $('.burger, .header__nav--menu').toggleClass('active');

    });

    function customMeidaEvents(e) {
        if (e <= 992) {
            if (!$('.header__nav--menu').hasClass('anim-effect')) {
                $('.header__nav--menu').addClass('anim-effect')
            }
        }
        else if (e >= 992) {
            if ($('.header__nav--menu').hasClass('anim-effect')) {
                $('.header__nav--menu').removeClass('anim-effect')
            }
        }

    }
    customMeidaEvents($(window).width());
    $(window).resize(function () {
        customMeidaEvents($(this).width());
    });





    function hHeader(settings) {

        let header = settings.elemName,
            distance = settings.distance,
            scrollPrev = 0, ifHeaderTopClass, ifHeaderTopDistance,
            scrollDown = distance,
            distanceHide = settings.distanceHide,
            distanceShow = settings.distanceShow,
            scrolled = $(window).scrollTop(),
            scrollDownCheck = false,
            scrollTop = 0,
            scrollTopCheck = false,
            scrollToTop = false,
            scrollToDown = false;


        scrollDown = distanceHide;

        ifHeaderTopClass = settings.ifHeaderTop[0];
        ifHeaderTopDistance = settings.ifHeaderTop[1];

        function ifHeaderTop() {
            if (scrolled <= ifHeaderTopDistance) {
                $(header).addClass(ifHeaderTopClass);
            }
            else if (scrolled > ifHeaderTopDistance) {
                $(header).removeClass(ifHeaderTopClass);
            }
        }

        ifHeaderTop();

        let lazyImgCheck;
        function imgLazyActive() {
            lazyImgCheck = $(header).offset().top + $(window).height() + 50;
            $.each($('.slick-active .img-lazy-load'), function () {
                //console.log($(this))
                if (lazyImgCheck >= $(this).offset().top/*  && !$(this).hasClass('img-lazy-slider') */ && !$(this).hasClass('loaded')) {
                    lazyLoadSliderImg($(this));
                }
                if ($('.slick-active .img-lazy-load .loaded').length == $('.slick-active .img-lazy-load').length) {
                    console.log('stop');
                    return false
                }
            });
        }
        imgLazyActive()
        if (typeof settings.loaded == 'string') {
            let classLoaded = settings.loaded;
            $(header).addClass(classLoaded);
        }
        else if (settings.loaded == true && typeof settings.loaded == 'boolean') {
            $(header).addClass('loaded');
        }
        //$('header')
        $(window).scroll(function () {
            scrolled = $(window).scrollTop();
            if (scrolled == 0) {
                $(header).removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
            imgLazyActive();
            ifHeaderTop();

            if (scrolled > 100 && scrolled > scrollPrev) {
                if (scrollToDown == false) {
                    scrollToTop = false;
                    scrollDown = scrolled + distanceHide;
                    scrollDownCheck = false;
                    scrollToDown = true;
                }

            } else if (scrollToTop == false) {

                scrollToDown = false;
                scrollTop = scrolled - distanceShow;
                scrollTopCheck = false;
                scrollToTop = true;
            }

            scrollPrev = scrolled;
            if (scrolled >= scrollDown && scrollDownCheck == false) {
                // hide elem
                $(header).addClass(settings.classToHide);
                scrollDownCheck = true;
            }
            if (scrollTop >= scrolled && scrollTopCheck == false) {
                // show elem
                $(header).removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
        });
    }

    hHeader({
        elemName: $('.header'),
        classToHide: 'hide',
        distanceHide: 300,
        distanceShow: 100,
        ifHeaderTop: ['top', 0],
        classAnchorForTop: true,
        loaded: 'loaded'
    });


    $('[data-placeholder]').focus(function () {
        $(this).attr('placeholder', '');
    }).blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });


    $(window).on('popstate', function (e) {
        if ($('.burger, .header__nav--menu').hasClass('active')) {
            e.preventDefault()
            history.go(1);
            $('.burger, .header__nav--menu').toggleClass('active');
        }

    });

});