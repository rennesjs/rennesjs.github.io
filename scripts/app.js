'use strict';

(function($, Raven) {

  Raven.config('https://aa63c1bdcb3d4f438df399d5c22c2f07@sentry.io/158785').install();

  $(function() {
    // init nav
    $(".button-collapse").sideNav();
  });

})(jQuery, Raven);