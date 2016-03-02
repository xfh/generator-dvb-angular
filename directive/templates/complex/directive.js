(function () {
    'use strict';

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', <%= _.camelize(name) %>);

    function <%= _.camelize(name) %>() {
        //noinspection UnnecessaryLocalVariableJS
        var directive = {
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

        return directive;

        function <%= _.capitalize(_.camelize(name)) %>() {
            var vm = this;

        }
    }
})();
