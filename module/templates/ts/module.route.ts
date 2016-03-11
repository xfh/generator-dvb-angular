/// <reference path="../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    angular.module('<%= _.camelize(name) %>').run(appRun);

    /* @ngInject */
    function appRun(routerHelper: any) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /* Add New States Above */
        ];
    }
}
