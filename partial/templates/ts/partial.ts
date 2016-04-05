/// <reference path="../../../../typings/browser.d.ts" />
module app.<%= _.capitalize(_.camelize(name)) %> {
    'use strict';

    class <%= ctrlname %>  {
        public static $inject = [];
        /* @ngInject */
        constructor() {
            var vm = this;
        }
    }

    angular.module('<%= appname %>').controller('<%= ctrlname %>', <%= ctrlname %>);

}
