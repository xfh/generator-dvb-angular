(function () {
    'use strict';

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', <%= _.camelize(name) %>);

    function <%= _.camelize(name) %>() {
        //noinspection UnnecessaryLocalVariableJS
        var directive = {
            restrict: 'A',
            link: function (scope, element, attrs, ctrl) {

            }
        };

        return directive;
    }
})();
