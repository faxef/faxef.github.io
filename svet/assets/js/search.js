/* ===== 'scripts.js' ===== */

// -->

"use strict";

// -->

var oDomSad = {

    nActiveBreakPoint: undefined,
    $activeLayoutPopup: undefined,

    init: function(){
//        console.info("oDomSad: init");
        this.searchResults.init();
        this.layoutPopups.init();
    },

    searchResults: {
        $element: null,
        $searchResults: null,

        init: function() {
//          console.info("oDomSad.searchResults: init");

            oDomSad.searchResults.$element = $("#SearchActionFormInput");
            oDomSad.searchResults.$searchResults = $("#"+oDomSad.searchResults.$element.data("target").selector);

            this._eKeyResults();
            this._eMouseResults();
        },

        _eKeyResults: function(){
//           console.info("oDomSad.searchResults: _eKeyResults");

            $(document).on("keydown.oDomSad_searchResults_eKeyResults", function(e) {
//              console.info("keydown.keydown.oDomSad_searchResults_eKeyResults", e);

                var $searchResultsList = $("ul li", oDomSad.searchResults.$searchResults),
                    searchResultsVisibility = oDomSad.searchResults.$searchResults.is(":visible");

                var move = function(direction) {
                    var activeRow = -1,
                        rowLength = $searchResultsList.length-1;

                    $searchResultsList.each(function(i, el){
                        if ( $(el).hasClass("active") ) {
                            activeRow = i;
                            return false;
                        }
                    });

                    oDomSad.searchResults.$element.blur();
                    $searchResultsList.removeClass("active");

                    if ( direction === "up" ) {
                        activeRow--;
                        activeRow = activeRow < 0 ? 0 : activeRow;
                    } else if ( direction === "down" ) {
                        activeRow++;
                        activeRow = activeRow > rowLength ? rowLength : activeRow;
                    }

                    $searchResultsList.eq(activeRow).addClass("active");
                };

                var action = function() {
                    if (!oDomSad.searchResults.$element.is(":focus")) {
                        window.location = $("a", $searchResultsList.filter(".active")).attr("href");
                    }
                };

                if ( $searchResultsList.length && searchResultsVisibility ) {
                    switch (event.which) {
                        case 38:
                            move("up");
                            e.preventDefault();
                            break;
                        case 40:
                            move("down");
                            e.preventDefault();
                            break;
                        case 13:
                            action();
                            break;
                        default:
                            break;
                    }
                }
            });
        },

        _eMouseResults: function(){
//            console.info("oDomSad.searchResults: _eMouseResults");

            var $searchResultsList = $("ul li", oDomSad.searchResults.$searchResults);

            if ($searchResultsList.length) {
                $searchResultsList.on("mouseenter", function(e){
                    //console.info("mouseenter", e);

                    oDomSad.searchResults.$element.blur();
                    oDomSad.searchResults._resetSearchResults();
                    $(this).addClass("active");
                });
            }
        },

        _resetSearchResults: function(){
//            console.info("oDomSad.searchResults: _resetSearchResults");

            var $searchResultsList = $("ul li", oDomSad.searchResults.$searchResults);

            if ($searchResultsList.length) {
                $searchResultsList.removeClass("active");
            }
        }
    },

    layoutPopups: {
        nMouseleaveTimer: [],
        nMouseleaveDelay: 1000,

        init: function(){
//            console.info("oDomSad.layoutPopups: init");

            this._setInputEvents();
            this._setRemoveEvent();
        },

        _setInputEvents: function() {
//            console.info("oDomSad.layoutPopups: _setInputEvents");

            var $element = $("#SearchActionFormInput");

            $element.on("focusin click", function (e) {
//                console.info("focusin click", e);

                oDomSad.searchResults._resetSearchResults();

                if (oDomSad.$activeLayoutPopup && (oDomSad.$activeLayoutPopup !== $element)) {
                    oDomSad.layoutPopups._toggle("remove", oDomSad.$activeLayoutPopup);
                    oDomSad.$activeLayoutPopup = undefined;
                }

                if (!oDomSad.$activeLayoutPopup) {
                    console.log('add');
                    oDomSad.layoutPopups._toggle("add", $element);
                    oDomSad.$activeLayoutPopup = $element;
                }

                e.preventDefault();
                e.stopPropagation();
            });
        },

        _setRemoveEvent: function(){
//            console.info("oDomSad.layoutPopups: _setRemoveEvent");

            $(document).on("click.oDomSad_layoutPopups_setRemoveEvent", function(e) {
//                console.info("click.oDomSad_layoutPopups_setRemoveEvent", e);

                if (oDomSad.$activeLayoutPopup) {
                    var oElementData = oDomSad.$activeLayoutPopup.data("target"),
                    //sElementDataType = oElementData.type,
                        sElementDataSelector = oElementData.selector,
                        $target = $("#"+sElementDataSelector);

                    if ( $(e.target).closest($target).length === 0 ) {
                        oDomSad.layoutPopups._toggle( "remove", oDomSad.$activeLayoutPopup );
                        oDomSad.$activeLayoutPopup = undefined;
                    }
                }
            });
        },

        _toggle: function( sMethod, $element ){
//            console.info("oDomSad.layoutPopups: _toggle", sMethod, $element);
            console.log('toggle');

            var oElementData = $element.data("target"),
                sElementDataType = oElementData.type,
                sElementDataSelector = oElementData.selector,
                $target = $("#"+sElementDataSelector),
                $content = $("#MainContent");

            if ( sMethod === "add" ) {
                if ( sElementDataType === "singular" ) {
                    $element.addClass("active");
                }

                if ( $target.hasClass("hide") ) {
                    $target.removeClass("hide");
                    $target.data("defaultClass", "hide");
                } else {
                    $target.css( "display", "block" );
                }
            } else if ( sMethod === "remove" ) {
                if ( sElementDataType === "singular" ) {
                    $element.removeClass("active");
                }

                if ($target.data("defaultClass") === "hide") {
                    $target.addClass("hide");
                    $target.removeData("defaultClass");
                } else {
                    $target.removeAttr("style");
                }

                if (oDomSad.layoutPopups.nMouseleaveTimer.length) {
                    clearTimeout(oDomSad.layoutPopups.nMouseleaveTimer[0]);
                    oDomSad.layoutPopups.nMouseleaveTimer = [];

                    if ( oDomSad.nActiveBreakPoint === 1 || oDomSad.nActiveBreakPoint === 2 ) {
                        $content.removeAttr("style");
                        $content.css( $content.data("defaultCSS") );
                    }
                }
            }
        }
    }
};


$(document).ready(function(){
    oDomSad.init();
});

/* --- В© Tarik, 2014 --- */

/* ===== // 'scripts.js' // ===== */