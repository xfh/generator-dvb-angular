(function() {
    'use strict';

    angular.module('<%= _.camelize(name) %>', []);
    angular.module('<%= _.camelize(name) %>').config(<%= _.camelize(name) + 'Config' %>);

    <% if (!uirouter) { %>
        function <%= _.camelize(name) + 'Config' %>($routeProvider) {

            /* Add New Routes Above */

        }
    <% } %><% if (uirouter) { %>
        function <%= _.camelize(name) + 'Config' %>($stateProvider) {

            /* Add New States Above */

        }
    <% } %>
})();
