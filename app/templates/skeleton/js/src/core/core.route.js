(function () {
    'use strict';

    angular
        .module('<%= appname %>.core').run(runBlock);

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
