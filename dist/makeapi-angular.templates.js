angular.module('templates-makeApiAngular', ['make-gallery.html', 'make.html']);

angular.module("make-gallery.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("make-gallery.html",
    "<div ng-class=\"containerClass || 'col-sm-4 col-md-3'\" ng-repeat=\"make in makes\">\n" +
    "  <div user_id=\"{{ userId }}\" csrf_token=\"{{ csrfToken }}\" make-data=\"{{ make }}\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("make.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("make.html",
    "<div id=\"make-{{make._id}}\" class=\"make\">\n" +
    "  <div class=\"make-thumbnail\" ng-style=\"{'background-image':'url(' + make.thumbnail + ')'}\"></div>\n" +
    "  <div class=\"caption\">\n" +
    "    <h3 class=\"make-title\">{{make.title}}</h3>\n" +
    "    <p class=\"make-author text-muted\">By @{{make.username}}</p>\n" +
    "    <p class=\"make-description\">{{make.description}}</p>\n" +
    "    <p>\n" +
    "    <a href=\"{{make.remixurl}}\" class=\"btn btn-primary\" role=\"button\">\n" +
    "      <span class=\"fa fa-code-fork\"></span> Remix\n" +
    "    </a>\n" +
    "    <a href=\"{{make.url}}\" class=\"btn btn-info\" role=\"button\">\n" +
    "      Details\n" +
    "    </a>\n" +
    "\n" +
    "    <span class=\"make-like-toggle details-page-icon make-like-details\" ng-click=\"toggleLike()\" ng-class=\"{ 'fa fa-heart': +liked, 'fa fa-heart-o': !+liked }\" ></span>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
