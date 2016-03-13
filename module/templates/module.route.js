(function () {
    'use strict';

    angular
        .module('<%= _.camelize(name) %>').run(runBlock);

    runBlock.$inject = ['routerHelper'];
    /* @ngInject */
    function runBlock(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /* Add New States Above */
        ];
    }
})();
