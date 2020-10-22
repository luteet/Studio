$(function(){

    $('.btn').hover(function() {
        $(this).removeClass('off-hover').addClass('on-hover')
    },
    function() {
        $(this).removeClass('on-hover').addClass('off-hover')
    });

    $('.burger').on('click', function() {
        $('.burger, .header__nav--menu').toggleClass('active');
        
    });

    function customMeidaEvents(e) {
        if(e <= 992) {
            if(!$('.header__nav--menu').hasClass('anim-effect')) {
                $('.header__nav--menu').addClass('anim-effect')
            }
        }
        else if(e >= 992) {
            if($('.header__nav--menu').hasClass('anim-effect')) {
                $('.header__nav--menu').removeClass('anim-effect')
            }
        }
    }
    customMeidaEvents($(window).width());
    $(window).resize(function() {
        customMeidaEvents($(this).width());
    });

});