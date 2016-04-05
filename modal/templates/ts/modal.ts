/// <reference path="../../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    class <%= ctrlname %> {

        static $inject = ['$scope'];
        /* @ngInject */
        constructor($scope) {
            var vm = this;
        }
    }

    angular.module('<%= appname %>').controller('<%= _.camelize(name) %>', <%= ctrlname %>);

}
