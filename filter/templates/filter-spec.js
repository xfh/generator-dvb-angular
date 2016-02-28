describe('<%= _.camelize(name) %>', function () {

    beforeEach(module('<%= appname %>'));

    describe('<%= _.camelize(name) %>', function () {
        var filter;

        beforeEach(inject(function (_$filter_) {
            filter = _$filter_('<%= _.camelize(name) %>');
        }));
    });
});
