/// <reference path="../../typings/browser.d.ts" />
module <%= appname %>.config {
    'use strict';

    angular
        .module('<%= appname %>.core').config(configure);

    /* @ngInject */
    export function configure() {

    }

}
