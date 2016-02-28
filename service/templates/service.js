(function () {
    'use strict';

    angular.module('<%= appname %>').factory('<%= _.camelize(name) %>', <%= _.camelize(name) %>);

    function <%= _.camelize(name) %>() {
        //noinspection UnnecessaryLocalVariableJS
        var srv = {
            // Public API
        };

        return srv;

        ////////////

    }
})();
