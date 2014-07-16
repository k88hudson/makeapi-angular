var makeApiAngularTemplates = {};

makeApiAngularTemplates["make-gallery.html"] = "<div ng-class=\"containerClass\" ng-repeat=\"make in makes\">\n" +
  "  <div make-data=\"make\"></div>\n" +
  "</div>\n" +
  "";

makeApiAngularTemplates["make.html"] = "<div class=\"make thumbnail\">\n" +
  "  <div class=\"thumbnail-wrapper\" ng-style=\"{'background-image':'url(' + make.thumbnail + ')'}\"></div>\n" +
  "  <div class=\"caption\">\n" +
  "    <h3>{{make.title}}</h3>\n" +
  "    <p class=\"text-muted\">Created by @{{make.username}}</p>\n" +
  "    <p>{{make.description}}</p>\n" +
  "    <p>\n" +
  "      <a href=\"{{make.remixUrl}}\" class=\"btn btn-primary\" role=\"button\">\n" +
  "        <span class=\"fa fa-code-fork\"></span> Remix\n" +
  "      </a>\n" +
  "      <a href=\"{{make.url}}\" class=\"btn btn-info\" role=\"button\">\n" +
  "        Details\n" +
  "      </a>\n" +
  "    </p>\n" +
  "  </div>\n" +
  "</div>\n" +
  "";
