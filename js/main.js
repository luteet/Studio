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
        $.each($(lazyBg), function () {
            $(lazyBg).removeAttr('data-src-not-webp');
            console.log("E")
        })
        $(lazyBg).lazy({
            afterLoad: function (e) {
                $(e).addClass('loaded');
            }
        })


    }, function () {
        $.each($(lazyBg), function () {
            $(this).attr('data-src', $(this).data('src-not-webp')).removeAttr('data-src-not-webp');
        })
        $(lazyBg).lazy()
        $(lazyBg).addClass('loaded')

    });




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
        $('header')
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
        ifHeaderTop: ['top', 50],
        classAnchorForTop: true,
        loaded: 'loaded'
    });


    $('[data-placeholder]').focus(function () {
        $(this).attr('placeholder', '');
    }).blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });


});