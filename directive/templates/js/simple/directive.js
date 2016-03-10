(function () {
    'use strict';

    var directiveConfig = {
        restrict: 'A'
    };

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', directiveConfig);

    <%= _.camelize(name) %>.$inject = [];
})();
