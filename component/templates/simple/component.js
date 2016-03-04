(function () {
    'use strict';

    var componentConfig = {
        bindings: {},
        controller: <%= _.capitalize(_.camelize(name)) %>,
        controllerAs: 'vm'
    };

    angular.module('<%= appname %>').component('<%= _.camelize(name) %>', componentConfig);

    function <%= _.capitalize(_.camelize(name)) %>() {
        var vm = this;

    }
})();
