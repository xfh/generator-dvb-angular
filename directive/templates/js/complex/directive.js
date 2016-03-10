(function () {
    'use strict';

    var directiveConfig = {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: '<%= htmlPath %>',
        controller: <%= _.capitalize(_.camelize(name)) %>,
        controllerAs: 'vm',
        bindToController: true,
        link: function (scope, element, attrs, ctrl) {

        }
    };

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', directiveConfig);

    <%= _.capitalize(_.camelize(name)) %>.$inject = [];

    function <%= _.capitalize(_.camelize(name)) %>() {
        var vm = this;

    }
})();
