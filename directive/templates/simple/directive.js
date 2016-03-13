(function () {
    'use strict';

    angular.module('<%= appname %>').directive('<%= _.camelize(name) %>', directiveConfig);

    function <%= _.camelize(name) %>() {
        //noinspection UnnecessaryLocalVariableJS
        var directive = {
            restrict: 'A'
        };

        return directive;
    }
})();
