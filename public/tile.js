/* eslint-disable no-var */
var tile = {
    str: {},
    data: {},
    tileConfig: {},
    getNav: function () {
        return document.getElementById("AppNavigator");
      },
      popPanel: function () {
        tile.getNav().popPage();
      },
    SSOProcess: function () {
        const params = {};
        console.log("location.hostname", location.hostname)
        // Updated conditional to check for 127.0.0.1 if using Live Server extension.
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            // removed param array and removed object syntax of added params. Removed name param.
            // These parameters not being added correctly were causing an error in deserializing the connector message
                params.url = "http://localhost/api/"
        }

        container.connectors.sendRequest("SSOConnector", "1.0", "GetToken", params, function (response) {
            console.log("Respone in sendRequest", response);
            if (response.success && response.data.success) {

                setTimeout(() => {
                    container.device.openWebLink("http://www.google.com?q=token:" + response.data.data.token)
                    //document.querySelector('ons-progress-bar').indeterminate = false
                    $("#progress").hide();
                }, 2000);
            }
        });
},
      stickyHeaderInit: function (pageName) {
        var $stickies;
    
        var stickies = $("#" + pageName + " .sticky");
        // console.log(stickies);
    
        if (stickies.length > 0) {
          // console.log("sticky length greater than zero")
          $stickies = stickies.each(function () {
    
            let $thisSticky;
    
            if (!$(this).parent().hasClass("followWrap")) {
              $thisSticky = $(this).wrap('<div class="followWrap" />');
            } else {
              // console.log("parent found")
              $thisSticky = $(this)
            }
            $thisSticky
              .data('originalPosition', $thisSticky.offset().top)
              .data('originalHeight', $thisSticky.outerHeight())
              .parent()
              .height($thisSticky.outerHeight());
    
          });
    
    
        }
        return $stickies;
      },
      stickyHeaderScroll: function (pageName, heroHeight, stickies) {
        var scrollingPosition = $("#" + pageName + " .cdp_page_container ").scrollTop();
        var smallHeroHeight = document.querySelector(".cdp_hero").offsetHeight;
    
        if (scrollingPosition != 0) {
          stickies.each(function (i) {
    
    
            var $thisSticky = $(this);
            var $stickyPosition = $thisSticky.data('originalPosition');
            if ($stickyPosition <= (heroHeight + scrollingPosition)) {
    
              var $nextSticky = stickies.eq(i + 1);
    
              var $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
    
    
              // TODO figure out why this isn't dynamically setting the top value ?
              // create an "override" for native and desktop for the stickyFixed css class and add the top value there
              // the hero is a fixed height for each so that ok
              $thisSticky.addClass("stickyFixed");
              // $thisSticky.css("top", heroHeight); // this works everywhere but here!!
    
    
              if ($nextSticky.length > 0 && (scrollingPosition + $thisSticky.offset().top + heroHeight) >= $nextStickyPosition) {
    
                $thisSticky.addClass("stickyAbsolute")
                  .css("top", smallHeroHeight);
    
              }
    
            } else {
              var $prevSticky = stickies.eq(i - 1);
    
              $thisSticky.removeClass("stickyFixed");
    
              if ($prevSticky.length > 0 && (scrollingPosition + smallHeroHeight) <= ($thisSticky.data('originalPosition') - $thisSticky.data('originalHeight'))) {
                $prevSticky.removeClass("stickyAbsolute").removeAttr("style");
              }
            }
          });
        } else {
          stickies.each(function () {
            var $thisSticky = $(this);
            $thisSticky.removeClass("stickyFixed").removeClass("stickyAbsolute").removeAttr("style");
          });
        }
      }
};