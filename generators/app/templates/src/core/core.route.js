(function () {
    'use strict';

    angular
        .module('<%= appname %>.core').run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /* Add New States Above */
        ];
    }
})();
