(function () {
    'use strict';

    angular
        .module('<%= appname %>.<%= _.camelize(name) %>').run(<%= _.camelize(name) + 'Run' %>);

    /* @ngInject */
    function <%= _.camelize(name) + 'Run' %>(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            /* Add New States Above */
        ];
    }
})();
