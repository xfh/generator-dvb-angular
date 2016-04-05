(function () {
    'use strict';

    angular.module('<%= appname %>').filter('<%= _.camelize(name) %>', <%= _.camelize(name) %>);

    <%= _.camelize(name) %>.$inject = [];

    function <%= _.camelize(name) %>() {

        return function (input, arg) {

            return 'output';
        }
    }
})();
