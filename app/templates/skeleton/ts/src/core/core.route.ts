/// <reference path="../../typings/browser.d.ts" />
module <%= appname %>.routes {
    'use strict';

    angular.module('<%= appname %>.core').run(appRun);

    /* @ngInject */
    export function appRun(routerHelper : IRouterHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /* Add New States Above */
        ];
    }
}
