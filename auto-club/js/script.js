jQuery(document).ready(function ($) {
    $('.bg-picture-2').parallax("50%", 0.3);
    $('.bg-picture-3').parallax("50%", 0.3);
    $('.bg-picture-4').parallax("50%", 0.3);
    $('.bg-picture-5').parallax("50%", 0.3);

    function heightUpdate() {
        // Offset for body
        $('body:not(.admin-bar)').css('padding-top', parseInt($('.navbar-fixed-top').css("height")));
        // Offset for .page-content
        var height = parseInt($('.float-buttons').css("height"));
        $('.page-content').css('padding-top', height);
        $('.page-intro').css('margin-top', -height);
    }

    $(window).on('resize', heightUpdate);
    heightUpdate();

    $('#close-modal, #modal-bg').click(function () {
        $('#login-modal')
        .animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('#modal-bg').fadeOut(400);
            }
            );
    });
    // аккордеон
    $(".tab_content").hide();
    $(".tab_content:first").show();
    /* в режиме вкладок */
    $("ul.tabs li").click(function () {
        $(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab_accordion").removeClass("d_active");
        $(".tab_accordion[rel^='" + activeTab + "']").addClass("d_active");
    });
    /* в режиме аккордеона */
    $(".tab_accordion").click(function () {
        $(".tab_content").hide();
        var d_activeTab = $(this).attr("rel");
        $("#" + d_activeTab).fadeIn();
        $(".tab_accordion").removeClass("d_active");
        $(this).addClass("d_active");
        $("ul.tabs li").removeClass("active");
        $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
    });

    // скрытый текст
    $('.description-show').click(function() {
      $(this).toggleClass('active').next()[$(this).next().is(':hidden') ? "slideDown" : "slideUp"](400);
  });
    // скрытый текст

    // POP-UP
    function pop_up() {
        $('.pop-up').removeClass('hidden')
        $('.overlay').animate({opacity: 1}, 300,function(){
            $('.pop-up .pop-up_race').animate({opacity: 1},600)
        });
    }
    setTimeout(pop_up, 30000);   
    $('.overlay, .close').click(function () {
        $('.pop-up .pop-up_race').animate({opacity: 0}, 600,function(){
            $('.overlay').animate({opacity: 0},300,function(){
                $('.pop-up').addClass('hidden')
            })
        });
    })

    $('#close-modal, #modal-bg').click(function () {
        $('#subscribe-modal')
        .animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('#modal-bg').fadeOut(400);
            }
            );
    });
    $('ul.tabs li').last().addClass("tab_last");
    $('#close-modal, #modal-bg').click(function () {
        $('#subscribe-modal')
        .animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('#modal-bg').fadeOut(400);
            }
            );
    });
    $('#subscribe-form').submit(function () {
        var $form = $(this);
        var $inputs = $form.find('[type=submit],[type=email],[type=text]');
        var $message = $('#message');
        var data = $form.serialize();

        $inputs.prop('disabled', true);
        $message.text($form.data('textSending')).addClass('message--info').removeClass('message--success message--error');

        $.post($form.attr('action'), data).then(function (res) {
            if (res.success) {
                $message.removeClass('message--info').text($form.data('textSuccess')).addClass('message--success');
                setTimeout(function () {
                    $('#close-modal').click();
                    $message.removeClass('message--info message--success');
                }, 1000);
            } else {
                $message.removeClass('message--info').text($form.data('textFailure')).addClass('message--error');
            }
        }).always(function () {
            $inputs.prop('disabled', false);
        });

        return false
    });

    $('#login-form').submit(function () {
        var $form = $(this);
        var data = $form.serialize();

        $.post($form.attr('action'), data).then(function (data) {
            if (data.success === false) {
                alert(data.data.message);
            } else {
                window.location.assign(data.data);
            }
        });

        return false
        
    });

    (function () {
        var totalSupply = '';
        var totalBought = '';
        var replaceValue = $('.stage-item--replace-value .value');
        var maxStageValue = $('.stage-item--max-value .value').text();
        var maxStageValueNumber = parseInt(maxStageValue.replace(/\s+/g, ''),10);
        var userAuth = $.trim($('#user-email').text());

        function prettyNumber(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }

        function getUserTokens() {
            if ($('.balance').length) {
                var EthAddress = $.trim($('.balance-eth .balance-value').text());

                if (EthAddress) {
                    $.ajax({
                        url: "/api/autotoken/getBalance",
                        data: {
                            address: EthAddress
                        },
                        method: "POST",
                        success: function (data) {
                            var userTokens = data.data.balance * 0.0001;
                            $('.balance-summary .balance-value').text(userTokens);
                        }
                    });
                }
            }
        }

        if (userAuth) {
            getUserTokens();
        }

        // Get minpurshuase
        var getMinPurshuase = function () {
            $.getJSON({
                url: '/crypto/getMinPurchase',
                success: function (data) {
                    var minPurshuase = '$' + data.data.minpurchase;
                    var minPurshuaseBuyTokens = data.data.minpurchase + '.00';
                    $('.tokens-sale-box:last-of-type .tokens-sale-value').text(minPurshuase);
                    $('.highlighted #min-purshuase').text(minPurshuaseBuyTokens);
                }
            });
        };
        getMinPurshuase();

        // Get total tokens
        var getTotalSupply = function () {
            $.getJSON({
                url: '/api/autotoken/getTotalSupply',
                success: function (data) {
                    totalSupply = Math.floor(data.data.totalSupply * 0.0001);
                    $('#tokens-total').text(totalSupply);
                }
            });
        };
        getTotalSupply();

        // Get bought tokens
        var getTotalBought = function () {
            $.getJSON({
                url: '/api/autotoken/getTotalBought',
                success: function (data) {
                    totalBought = Math.floor(data.data.totalBought * 0.0001);
                    $('#tokens-bought-desktop').text(prettyNumber(totalBought));
                    $('#tokens-bought-mobile').text(prettyNumber(totalBought));
                    replaceValue.text(prettyNumber(totalBought));
                }
            });
        };
        getTotalBought();

        window.setInterval(getTotalBought, 10000);

        // Set percent for progress-bar
        function setProgressBarPercent() {
            var stageTitle = $('.stage-title').text();
            var getPercent = Math.ceil((totalBought / maxStageValueNumber) * 100) + '%';
            $('.progress-bar-container--desktop .progress-bar--active .progress-bar__inner').css('width', getPercent).text(getPercent);
            $('.progress-bar-container--mobile .progress-bar--active').css('width', getPercent).text(getPercent);
            // $('.progress-bar-container--desktop .progress-bar--active .progress-bar__inner').css('width', getPercent).text(stageTitle); //временное решение до старта этапа
            // $('.progress-bar-container--mobile .progress-bar--active').css('width', getPercent).text(stageTitle);
            // $('.progress-bar-container--mobile .progress-bar--active').text(stageTitle);
        }

        window.setInterval(setProgressBarPercent, 1000);
        setProgressBarPercent();

    })();

    // Toggle main menu
    $(function () {
        $('.toggle').on("click", function () {
            $(this).toggleClass('active');
            $('#navCollapse').fadeToggle().css('top', parseInt($('.navbar-fixed-top').css("height")));
            return false;
        });
    });

    $(document).on('click', function () {
        var $toggle = $('.toggle');

        if ($toggle.hasClass('active')) {
            $('#navCollapse').fadeOut().css('top', '0');
            $toggle.removeClass('active');
        }
    });

    // Smooth anchor scrolling
    function scrollNav() {
        $('.menu-top-menu-container a.nav-link').click(function () {
            $('html, body').stop().animate({
                scrollTop: $(this).attr('href').offset().top - 100
            }, 800);
            return false;
        });
    }

    scrollNav();

    var $userForm = $('#user-info-form');
    $('#activate-form').on('click', function () {
        $userForm.find('input:not([type=hidden])').each(function () {
            $(this).prop('disabled', false)
        });

        $userForm.parent().addClass('user-info--edit');

        return false;
    });
    $('#deactivate-form').on('click', function () {
        $userForm.find('input:not([type=hidden])').each(function () {
            $(this).prop('disabled', true)
        });

        $userForm.parent().removeClass('user-info--edit');

        return false;
    });

    $('.close-dialog').on('click', function () {
        $.magnificPopup.close();
        window.location.reload();
    });

    $('#buy-eth').submit(function () {
        var $form = $(this);
        var $inputs = $form.find('[type=submit],[type=text]');
        var data = $form.serialize();
        $inputs.prop('disabled', true);

        $.post($form.attr('action'), data).then(function (res) {
            if (res.success) {
                $('#buy-eth .copy-address').removeClass('hidden');
                $('#buy-eth .close-dialog').removeClass('hidden');
                $('#buy-eth-button').addClass('hidden');
            } else {
                alert('Error');
            }
        }).always(function () {
            $inputs.prop('disabled', false);
        });

        return false
    });

    $('#buy-btc').submit(function () {
        var $form = $(this);
        var enterEthAddress = $form.find('input[type=text]').val();
        var $inputs = $form.find('[type=submit],[type=text]');
        var formData = $form.serialize();
        $inputs.prop('disabled', true);

        if (enterEthAddress) {
            $.ajax({
                url: '/eth/verifyethaddress/' + enterEthAddress,
                method: "GET",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("X-Api-Key", "oM9dPVofnG3BPIgaa3hpb3pGqrMGYgoI6kixB6yu");
                },
                success: function (data) {
                    if (data.result === true) {
                        $.ajax({
                            url: "/eth/getbtcaddress/" + enterEthAddress,
                            method: "GET",
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.setRequestHeader("X-Api-Key", "oM9dPVofnG3BPIgaa3hpb3pGqrMGYgoI6kixB6yu");
                            },
                            success: function (data) {
                                var newBtcAddress = data.address;
                                $('#btc-address').text(newBtcAddress);
                                // $('#btc-copy-button').attr('data-clipboard-text', newBtcAddress);
                                $.ajax({
                                    url: $form.attr('action'),
                                    data: formData,
                                    method: "POST",
                                    success: function (data) {
                                        $('#buy-btc .copy-address').removeClass('hidden');
                                        $('#buy-btc .close-dialog').removeClass('hidden');
                                        $('#buy-btc-button').addClass('hidden');
                                    },
                                    error: function (data) {
                                        alert(data)
                                    }
                                });
                            }
                        });
                    }
                }
            }).always(function () {
                $inputs.prop('disabled', false);
            });
        }

        return false
    });

    $('#buy-fiat').submit(function () {
        var $form = $(this);
        var $inputs = $form.find('[type=submit],[type=text]');
        var data = $form.serialize();
        $inputs.prop('disabled', true);

        $.post('/bzz/api.php', {
            key: 'lkfJKWeKdlaj11kfuhdkls756968dSDf',
            func: 'activateCoupon',
            code: $form.find('[name=code]').val()
        }).then(function (r) {
            if (r && r.status === 'success') {
                $.post($form.attr('action'), data).then(function (res) {
                    if (res.success) {
                        $('#form-body').addClass('hidden');
                        $('#form-success').removeClass('hidden');                
                    } else {
                        alert('Error');
                    }
                });
            } else {
             alert('Coupon code not found');
         }
     }).always(function () {
        $inputs.prop('disabled', false);
    });

     return false
 });

    var $couponForm = $('#coupon-activation');
    $couponForm.on('submit', function () {
        $.post('/bzz/api.php', {
            key: 'lkfJKWeKdlaj11kfuhdkls756968dSDf',
            func: 'activateCoupon',
            code: $couponForm.find('[name=code]').val()
        }).then(function (r) {
            if (r && r.status === 'success') {
                var t = String(r.tokens);
                if (t.length > 0) {
                    while(t.length < 5) {
                        t = '0' + t;
                    }
                    var i = t.slice(0, -4),
                    f = t.slice(-4),
                    d = (document.documentElement.lang.substr(0,2) === 'ru' ? ',' : '.');
                    t = i + d + f;
                } else {
                    t = (document.documentElement.lang.substr(0,2) === 'ru'
                        ? 'запрошенное количество'
                        : 'requested amount of');
                }
                $('#coupon-activation-result-text').text($couponForm.data('textSuccess').replace('XXX', t));
                $('#coupon-activation-input').val('')
            } else {
                $('#coupon-activation-result-text').text($couponForm.data('textFailure'))
            }
            $.magnificPopup.open({items: {src: '#coupon-activation-error-modal'}})
        }, function () {
            $('#coupon-activation-result-text').text($couponForm.data('textFailure'));
            $.magnificPopup.open({items: {src: '#coupon-activation-error-modal'}})
        });
        return false;
    });

    new Clipboard('.copy-button');

    $('#copy-button').on('click', function () {
        $('.contract-address__message').fadeToggle();
        setTimeout(function () {
            $('.contract-address__message').fadeToggle();
        }, 1000);
    });

    $('#btc-copy-button').on('click', function () {
        $('#buy-btc .copy-message span').fadeToggle();
        setTimeout(function () {
            $('#buy-btc .copy-message span').fadeToggle();
        }, 1000);
    });

    $('#eth-copy-button').on('click', function () {
        $('#buy-eth .copy-message span').fadeToggle();
        setTimeout(function () {
            $('#buy-eth .copy-message span').fadeToggle();
        }, 1000);
    });

    $('.js-show-register-form').on('click', function () {
        $('#login-form').addClass('hidden');
        $('#register-form').removeClass('hidden')
        .find('input:not([type=hidden])').first().focus();
        $('#reset-password-form').addClass('hidden');
        return false;
    });

    $('.js-show-reset-password-form').on('click', function () {
        $('#login-form').addClass('hidden');
        $('#register-form').addClass('hidden');
        $('#reset-password-form').removeClass('hidden')
        .find('.message').removeClass('message--info message--success message--error').end()
        .find('input:not([type=hidden])').first().focus();
        return false;
    });

    $('.js-show-login-form').on('click', function () {
        $('#login-form').removeClass('hidden')
        .find('.message').removeClass('message--info message--success message--error').end()
        .find('input:not([type=hidden])').first().focus();
        $('#register-form').addClass('hidden');
        $('#reset-password-form').addClass('hidden');
        return false;
    });

    $('#login-button').on('mfpOpen', function () {
        $('#login-form').removeClass('hidden').find('.message').removeClass('message--info message--success message--error');
        $('#register-form').addClass('hidden');
        $('#reset-password-form').addClass('hidden');
    });

    $('#show-register-form').on('click', function () {
        $.magnificPopup.open({items: {src: '#login-modal'}})
        $('#login-form').addClass('hidden');
        $('#register-form').removeClass('hidden')
        .find('input:not([type=hidden])').first().focus();
        $('#reset-password-form').addClass('hidden');
    });

    $('#buy-btc-link').on('click', function () {
        $.magnificPopup.open({items: {src: '#buy-tokens-form'}})
        $('#buy-eth').addClass('hidden');
        $('#buy-btc').removeClass('hidden')
        .find('input:not([type=hidden])').first().focus();
        $('#buy-fiat').addClass('hidden');
    });

    $('#buy-eth-link').on('click', function () {
        $.magnificPopup.open({items: {src: '#buy-tokens-form'}})
        $('#buy-btc').addClass('hidden');
        $('#buy-eth').removeClass('hidden')
        .find('input:not([type=hidden])').first().focus();
        $('#buy-fiat').addClass('hidden');
    });

    $('.buy-fiat-link').on('click', function () {
        $.magnificPopup.open({items: {src: '#buy-tokens-form'}})
        $('#buy-btc').addClass('hidden');
        $('#buy-fiat').removeClass('hidden')
        .find('input:not([type=hidden])').first().focus();
        $('#buy-eth').addClass('hidden');
    });

    $('#reset-password-form').on('submit', function () {
        var $form = $(this);
        var $submit = $form.find('button[type=submit]');

        $form.find('.message').removeClass('message--info message--success message--error');
        $submit.prop('disabled', true);
        $.post($form.attr('action'), $form.serialize()).then(function (res) {
            if (res && res.success) {
                $form.find('.message').text($form.data('textSuccess')).addClass('message--success');
                $form.find('input[type=text],input[type=email]').val('')
            } else {
                $form.find('.message').text($form.data('textFailure')).addClass('message--error');
            }
        }, function () {
            $form.find('.message').text($form.data('textFailure')).addClass('message--error');
        }).always(function () {
            $submit.prop('disabled', false);
        });

        return false
    });

    $('.js-popup').magnificPopup({focus: 'input:not([type=hidden])'});

    $('#show-instruction').on('click', function () {
        $('#instruction').removeClass('hidden');
    });
});
