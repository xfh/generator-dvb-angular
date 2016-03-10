describe('<%= _.camelize(name) %>', function () {

    beforeEach(module('<%= appname %>'));

    var component, scope, $componentController;

    beforeEach(inject(function (_$componentController_, $rootScope) {
        $componentController = _$componentController_;
        scope = $rootScope.$new();
    }));

    it('should be defined', function () {
        /*
         To initialise your component controller you have to setup your (mock) bindings and
         pass them to $componentController.
         */
        var bindings = {};
        component = $componentController('<%= _.camelize(name) %>', {$scope: scope}, bindings);
        expect(component).toBeDefined();
    });
});
