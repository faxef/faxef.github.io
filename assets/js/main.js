$(document).ready(function(){

    showMenuMore();

    setDetailsFixed();

    setPaymentFixed();

    getTypesHeight();



    $(window).resize(function(){

        setDetailsFixed();

        setPaymentFixed();

        getTypesHeight();

    });
// Мобильный показ фильтра товаров

var arr = ['Скрыть фильтр', 'Показать фильтр'],
i = 0;
var btnFilter = $('a.btn_filter');
btnFilter.on('click', function(e){
    $(this).html(arr[i++ % 2])
        $(this).siblings('.layout__sidebar').toggleClass('active');
        e.preventDefault()
        return false;
    })

if(window.matchMedia('(min-width: 993px)').matches)
{
	$(window).resize(function(){
    $(".filter").sticky({
        bottomSpacing: 342,
        topSpacing: 106
    })
 })
}
    $("header").sticky({
        zIndex :  9999 
    })
    var $range = $('#range');

    $range.ionRangeSlider({
        type: "double",
        min: 0,
        max: 9999,
        grid: false,
        hide_min_max: true,
        min_interval: 20,
        false_edges: true
    })
    $('#price-from').on('change', function(){
        var $this = $(this);
        value = $this.val();
        var rangeData =  $range.data("ionRangeSlider");
        rangeData.update({
            from: value,
        })
    })
    $('#price-to').on('change', function(){
        var $this = $(this);
        value = $this.val();
        var rangeData =  $range.data("ionRangeSlider");
        rangeData.update({
            to: value,
        })
    })
    $range.on("change", function () {
        var $this = $(this),
        value = $this.prop("value").split(";");
        $('#price-from').val(value[0])
        $('#price-to').val(value[1])
    });
    if($('.payment__value').length){

        var price = $($('.payment__value > span')[0]).text();

    }



    $('.js-slider').slick({

        dots: true,

        appendDots: '.slider__dots',

        infinite: true,

        speed: 500,

        fade: true,

        cssEase: 'linear',

        autoplay: true,

        autoplaySpeed: 6000,

        appendArrows: '.slider__arrows',

        prevArrow: '<span class="slick-prev"><i><svg><use xlink:href="#arrow-slider" class="icon"></use></svg></i></span>',

        nextArrow: '<span class="slick-next"><i><svg><use xlink:href="#arrow-slider" class="icon"></use></svg></i></span>'

    });



    $('.js-call').on('click', function(e){

        e.preventDefault();

        $('.modal').hide();

        $('.js-callback-form').fadeIn(300);

    });



    $('.js-login').on('click', function(e){

        e.preventDefault();

        $('.modal').hide();

        $('.js-login-form').fadeIn(300);

    });



    $('.js-question').on('click', function(e){

        e.preventDefault();

        $('.modal').hide();

        $('.js-question-form').fadeIn(300);

    });



    $('.js-rec').on('click', function(e){

        e.preventDefault();

        $('.modal').hide();

        $('.js-rec-form').fadeIn(300);

    });



    $('.js-reg').on('click', function(e){

        e.preventDefault();

        $('.modal').hide();

        $('.js-reg-form').fadeIn(300);

    });



    $('.js-click').on('click', function(e){

        e.preventDefault();

        $('.modal').hide();

        $('.js-click-form').fadeIn(300);

    });



    $('.modal__close').on('click', function(){

        $('.modal').fadeOut(300);

    });



    $('.popular__tabs > span').on('click', 'a', function(event) {

        event.preventDefault();

        $(this).parent('span').addClass('active').siblings('span').removeClass('active');

        var element = $(this).parents('.popular').find('.popular__content').eq($(this).parent('span').index());

        var link = $(this).parents('.popular').find('.popular__more').eq($(this).parent('span').index());



        link.addClass('active').siblings('.popular__more').removeClass('active');

        element.fadeIn(300).addClass('active').siblings('.popular__content').hide().removeClass('active');

    });



    $('.tabs__nav > span').on('click', 'a', function(event) {

        event.preventDefault();

        $(this).parent('span').addClass('active').siblings('span').removeClass('active');

        var element = $(this).parents('.tabs').find('.tabs__content').eq($(this).parent('span').index());

        var link = $(this).parents('.tabs').find('.tabs__more').eq($(this).parent('span').index());



        link.addClass('active').siblings('.tabs__more').removeClass('active');

        element.fadeIn(300).addClass('active').siblings('.tabs__content').hide().removeClass('active');

    });



    $('body').click(function (e) {

        var container = $('.js-tooltip');

        var trigger = $('.js-icon-tooltip, .form__select');

        if (!container.is(e.target) && container.has(e.target).length === 0 && !trigger.is(e.target)) {

            container.fadeOut(200);

            $('.js-icon-tooltip').removeClass('active');

        }

    });



    $('.js-icon-tooltip').on('click', function(){

        var tooltip = $(this).parents('.js-tooltip-parent').find('.js-tooltip');

        $('.tooltip-opened').removeClass('tooltip-opened').hide();



        if(!$(this).hasClass('active')) {

            $(this).addClass('active');



            tooltip.addClass('tooltip-opened').fadeIn(250);



            if(!tooltip.hasClass('js-tooltip-simple')){

                var $element = $(this).parents('.js-tooltip-parent').find('.js-tooltip'),

                $parentWidth = $(this).parents('.js-tooltip-parent').outerWidth(),

                cords = $element.get(0).getBoundingClientRect();



                if(cords.top < 0){

                    $element.addClass('down');

                }



                if(cords.right > $(window).width()){

                    $element.addClass('right');

                    $(this).parents('.js-tooltip-parent').find('.form__tooltip > .form__triangle').css('right', $parentWidth - $(this).position().left - 11);

                }

                else if(!$element.hasClass('right')) {

                    $(this).parents('.js-tooltip-parent').find('.form__tooltip > .form__triangle').css('left', $(this).position().left + 4);

                }

            }

        }

        else {

            $('.js-icon-tooltip.active').removeClass('active');

            tooltip.addClass('tooltip-opened').fadeOut(250);

        }

    });



    if($('.fotorama').length){

        var $fotoramaDiv = $('.fotorama').fotorama({

            nav: 'thumbs',

            transition: 'crossfade',

            thumbmargin: 6,

            shadows: false,

            allowfullscreen: true,

            width: '100%',

            height: 270,

            thumbheight: 63,

            thumbwidth: 63,

            fit: 'scaledown',

            click: false

        });

    }



    $('.form__tabs').on('click', '.form__tab:not(.active)', function() {

        $(this)

        .addClass('active').siblings().removeClass('active')

        .closest('.form').find('.form__content').removeClass('active').eq($(this).index()).addClass('active');

    });



    $(window).scroll(function(){

        setDetailsFixed();

        setPaymentFixed();

    });



    if($('.layout__sidebar .details').length){

        var detailsTop = $('.layout__sidebar .details').offset().top;

    }



    if($('.content').hasClass('content_state_collapsed')){

        $('.content__category').on('click', function(){

            $(this).toggleClass('active').parents('.content').find('.content__list').slideToggle();

        })

    }



    var expandedFilterText = $('.filter__more').text();



    $('.js-filter-more').on('click', function(){

        var collapsedText = $(this).attr('data-collapsed');

        var currText = $(this).text();

        currText = currText == collapsedText ? expandedFilterText : collapsedText;



        $(this).parents('.filter__fieldset').find('.filter__list').slideToggle();

        $(this).text(currText);

    });



    function setDetailsFixed(){

        var details = $('.layout__sidebar .details');

        var checkWidth = $(window).width();



        if(checkWidth > 999 ){

            if(window.pageYOffset > detailsTop){

                details.addClass('fixed');

            }

            else {

                details.removeClass('fixed');

            }

        }

        else if(checkWidth < 1000){

            details.removeClass('fixed');

        }

    }



    if($('.layout__sidebar .payment_type_small').length){

        var paymentTop = $('.layout__sidebar .payment_type_small').offset().top - 20;

    }



    function setPaymentFixed(){

        var payment = $('.layout__sidebar .payment_type_small');

        var checkWidth = $(window).width();



        if(checkWidth > 999 ){

            if(window.pageYOffset > paymentTop){

                payment.addClass('fixed');

            }

            else {

                payment.removeClass('fixed');

            }

        }

        else if(checkWidth < 1000){

            payment.removeClass('fixed');

        }

    }





    $('.js-to-order').on('click', function(){

        $('.order__form').fadeIn(250);



        $(this).hide();



        var target = $(this.hash);

        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {

            $('html, body').animate({

                scrollTop: target.offset().top

            }, 500);

            return false;

        }

    });



    $('.js-scroll-to').click(function() {        

        var target = $(this.hash);

        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {

            $('html, body').animate({

                scrollTop: target.offset().top

            }, 700);

            return false;

        }       

    });



    $('.js-plus').on('click', function(){

        var element = $(this).parent('.counter').find('.js-input');

        var newValue = parseInt(element.val(), 10) + 1;

        element.val(newValue);

        calcPaymentValue(newValue);

    });



    $('.js-minus').on('click', function(){

        var element = $(this).parent('.counter').find('.js-input');

        var newValue = parseInt(element.val(), 10) - 1;

        if(newValue < 0) {

            newValue = 0;

        }

        element.val(newValue);

        calcPaymentValue(newValue);

    });



    function calcPaymentValue(count){

        $('.payment__value > span').each(function(){

            $(this).text(price * count);

        });

    }



    $('.faq__question').on('click', function(){

        $(this).parents('.faq__item').toggleClass('opened').find('.faq__answer').slideToggle(250);

    });



    function getTypesHeight(){

        if($('.types').length){

            var height = $('.types').find('.types__list').height();



            if(height > 152) {

                $('.types__holder').css('height', 152);

                $('.types__more').css('display', 'inline-block');

            }

            else {

                $('.types__holder').css('height', height);

                $('.types__more').hide();

            }



            return height;

        }

    }



    var typesLink = $('.js-types-more');

    var expandedText = typesLink.text();



    typesLink.on('click', function(){

        var currText = $(this).text();

        var collapsedText = $(this).attr('data-collapsed');

        var holder = $('.types').find('.types__holder');



        console.log(expandedText);



        if($('.types').hasClass('opened')){

            $('.types').removeClass('opened');

            holder.animate({               

                height: 152

            }, 400, function(){

                typesLink.text(expandedText);

            });

        }

        else {

            var height = getTypesHeight();



            $('.types').addClass('opened');

            holder.animate({

                height: height

            }, 400, function(){

                typesLink.text(collapsedText);

            });            

        }

    });





    $('.js-tocart').on('click', function (e) {

        e.preventDefault();

        var $this = $(this);

        var cart = $('.cart__icon');

        var imgtodrag = $('.fotorama__active > img').eq(0);



        console.log(imgtodrag);



        if (imgtodrag) {

            var imgclone = imgtodrag.clone()

            .offset({

                top: imgtodrag.offset().top,

                left: imgtodrag.offset().left

            })

            .css({

                'opacity': '0.5',

                'position': 'absolute',

                'height': '270',

                'width': '270',

                'z-index': '100'

            })

            .appendTo($('body'))

            .animate({

                'top': cart.offset().top,

                'left': cart.offset().left,

                'width': 75,

                'height': 75

            }, 700);



            imgclone.animate({

                'width': 0,

                'height': 0

            }, function () {

                $(this).detach()

            });

        }        



        // $this.prop('disabled', true);

        // $.post('/order/shopcart-add/'+$this.data('id'), {options: options}, function(response){

        //     $this.prop('disabled', false);

        //     if(response.result == 'success' || response.code == 3){

        //         $this.hide();

        //         $('.buy__text').hide();

        //         $('.buy__sizes').hide();

        //         $('.buy__cart').fadeIn();

        //

        //         if(!response.error  || response.code != 3) {

        //             cartList.append(renderCartItem(response.item));

        //             $('.shopcart-count').text(response.count + ' ' + response.plural + ', ');

        //             $('.shopcart-cost').text(response.cost + ' р.');

        //             $('.shopcart-total').text(response.cost);

        //

        //             checkCartState();

        //         }

        //     } else {

        //         alert(response.error);

        //     }

        // });



    });



    /* Changing view of catalog list */



    $('.sorting__icon').on('click', function(e) {   

        var listClass = 'catalog_type_list';

        $('.sorting__icon').siblings().removeClass('active');

        $(this).addClass('active');

        if ($(this).hasClass('sorting__icon_type_list')) {

            $('.catalog').addClass(listClass);

        } else {

            $('.catalog').removeClass(listClass);

        }

    });



    /* Sorting catalog list */



    $('.sorting__category').on('click', 'a', function(e) {

        e.preventDefault();

        if($(this).hasClass('active')) {

            if($(this).find('.sorting__arrow').hasClass('sorting__arrow_type_up')) {

                $(this).find('.sorting__arrow').removeClass('sorting__arrow_type_up');

            }

            else {

                $(this).find('.sorting__arrow').addClass('sorting__arrow_type_up');

            }

        }

        else {

            $('.sorting__category a').removeClass('active');

            $(this).addClass('active');

        }

    });



    $(window).resize(function(){

        if($(window).width() > 1130) {

            $('.menu-top__sublist').removeAttr('style');

        }

    });



    function showMenuMore(){

        if($(window).width() < 1131){

            $('.js-menu-more').on('click', function(){

                $(this).siblings('.menu-top__sublist').fadeToggle(200);

            });

        }

    }

});