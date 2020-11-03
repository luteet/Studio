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
    $('.services__slider--img-active').on('load', function () {
        $(this).css('opacity', '1');
    })
    var imageViewSliderCheck = false;
    let elemForView;
    function imageViewSlider(e) {
        elemForView = $(e);
        if (imageViewSliderCheck == false && $(window).width() > 525) {
            $('.services__slider--item-active').css('opacity', '0');
            imageViewSliderCheck = true;
            if (!$('html').hasClass('not-supported') && !$(e).hasClass('active')) {
                setTimeout(function () {
                    $('.services__slider--img-active').prev('source').attr('srcset', elemForView.find('.services__slider--img').prev('source').data('srcset'));
                    $('.services__slider--item-active').css('opacity', '1');
                    imageViewSliderCheck = false;
                }, 300)
            }
            else {
                setTimeout(function () {
                    $('.services__slider--img-active').attr('src', elemForView.find('.services__slider--img').attr('src'))
                    $('.services__slider--item-active').css('opacity', '1');
                    imageViewSliderCheck = false;
                }, 300)
            }
        }
    }
    var sliderItem;
    function lazyLoadSliderImg(e) {
        sliderItem = $(e).find('.slick-active').find('[data-src]');
        $.each(sliderItem, function () {
            if (!$('html').hasClass('not-supported')) {
                if (!$(this).hasClass('loaded')) {
                    $(this).parent().find('[data-srcset]').attr('srcset', $(this).parent().find('[data-srcset]').data('srcset'));
                    $(this).removeAttr('data-src').prev('source').removeAttr('data-srcset');
                }
            }
            else {
                if (!$(this).hasClass('loaded')) {
                    $(this).attr('src', $(this).data('src'));
                }
            }
        });
        $('.slider-image').on('load', function () {
            $(this).addClass('loaded');
        })
    }

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
    $('.reviews__slider').slick({
        slidesToShow: 3,
        infinite: false,
        arrows: false,
        dots: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    })
    var sliderBtnTab = $('.services__nav--tab');

    let lazyImgCheck, lazyElemSlider = $('.slick-active').find('.slider-image'), supportedWebp = undefined;

        function imgLazyActive(e) {
            
            lazyElemSlider = $('.slick-active').find('.slider-image')
            lazyImgCheck = $(e).offset().top + $(window).height() + 200;
            $.each($('.slick-active .slider-image'), function () {
                
                if (lazyImgCheck >= $(this).offset().top && !$(this).hasClass('loaded')) {
                    console.log('active')        
                    if(supportedWebp == true) {
                        console.log('active2')
                        $(this).parent().find('[data-srcset]').attr('srcset', $(this).parent().find('[data-srcset]').data('srcset'));
                        $('.slider-image').on('load', function () {
                            $(this).addClass('loaded');
                        })
                    }
                    else if (supportedWebp == false) {
                        $('html').addClass('not-supported');
                        $(this).attr('src', $(this).data('src'));
                        $('.slider-image').on('load', function () {
                            $(this).addClass('loaded');
                        })
                    }
                }
                if ($('.slick-active .slider-image .loaded').length == $('.slick-active .img-lazy-load').length) {
                    //console.log($('.slick-active .slider-image.loaded').length + ' ' + $('.slick-active .img-lazy-load').length);
                    //return false
                }
            });
        }

    $('.services__slider--list').slick(sliderSevicesSettings())
    let sliderItemStart, firstInit = true;
    $('.services__nav--tab').on('click', function () {
        sliderBtnTab = $('.services__nav--tab');
        if ($(sliderBtnTab[1]).attr('id') == $(this).attr('id')) { }
        else {
            firstInit = false;
        }

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
                    else if (sliderBtnTab.attr('id') == 'slider-all') {

                        $(this).appendTo('.services__slider--list')
                    }
                });
                $('.services__slider--list').slick(sliderSevicesSettings())
                sliderItemStart = $('.services__slider--list').find('.services__slider--item');
                $('.services__slider--item').removeClass('active')
                imageViewSlider(sliderItemStart[0])
                $('.services__slider--list').css('opacity', '1')
            }, 200)

            $('.services__slider--list').on('init', function () {
                if (supportedWebp == undefined) {
                    ThisIsWebP().then(function () {
                        supportedWebp = true;
                        imgLazyActive($('.header'))
                    }, function () {
                        supportedWebp = false;
                        imgLazyActive($('.header'))
                    });
                }
                $('.services__slider--item-img').css('opacity', '0')
                let sliderItemFirst = $(this).find('.slick-active').find('.services__slider--item');
                ThisIsWebP().then(function () {
                    $(sliderItemFirst[0]).addClass('active');
                    if (firstInit == false) {
                        $.each(sliderItemFirst, function () {
                            $(this).find('[data-srcset]').attr('srcset', $(this).find('[data-srcset]').data('srcset'));
                            $('.services__slider--item-active').find('source').attr('srcset', $(sliderItemFirst[0]).find('source').data('srcset'))//.parent().css('opacity', '1').find('img').css('opacity', '1');
                        })

                        $('.services__slider--img').on('load', function () {
                            $(this).addClass('loaded');
                        })

                        $('.services__slider--img-active').on('load', function () {
                            $('.services__slider--item-img, .services__slider--item-active').css('opacity', '1')
                        })

                    }

                }, function () {
                    $(sliderItemFirst[0]).addClass('active');
                    $('html').addClass('not-supported');
                    $.each(sliderItemFirst, function () {
                        $(this).attr('src', $(this).data('src'));
                        $('.services__slider--img-active').attr('src', $(sliderItem[0]).find('.services__slider--img').attr('src'))
                    })
                    $('.services__slider--img').on('load', function () {
                        $(this).addClass('loaded');
                    })
                });

                $('.services__slider--item').on('click', function (e) {
                    if ($('html').hasClass('mobile')) {
                        if (!$(this).hasClass('active') && $(window).width() > 525) {
                            e.preventDefault()
                            imageViewSlider($(this))
                            $('.services__slider--item').removeClass('active')
                            $(this).addClass('active')
                        }
                    }
                });
                $('.services__slider--item').hover(function () {
                    if ($('html').hasClass('desktop') && !$(this).hasClass('active')) {
                        imageViewSlider($(this))
                        $('.services__slider--item').removeClass('active')
                        $(this).addClass('active')
                    }
                }, function () {

                });

                $('.services__slider--list, .reviews__slider').on('afterChange', function () {
                    lazyLoadSliderImg($(this))
                });



            });

        }


    });
    sliderBtnTab[1].click();





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

        
        
        if (typeof settings.loaded == 'string') {
            let classLoaded = settings.loaded;
            $(header).addClass(classLoaded);
        }
        else if (settings.loaded == true && typeof settings.loaded == 'boolean') {
            $(header).addClass('loaded');
        }
        
        
        
        $(window).scroll(function () {
            scrolled = $(window).scrollTop();
            if (scrolled == 0) {
                $(header).removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
            imgLazyActive($(header));
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