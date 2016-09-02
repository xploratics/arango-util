describe('ensureCollectionExists', function () {
    it('should returns true when collection is created', function (done) {
        util.ensureCollectionExists({ server, name: 'myCollection' })
            .then(function (created) {
                expect(created).to.be.equal(true);
                done();
            }, fail)
            .catch(done);
    });

    it('should returns false when collection already exists', function (done) {
        util.ensureCollectionExists({ server, name: 'myCollection' })
            .then(function (created) {
                expect(created).to.be.equal(false);
                done();
            }, fail)
            .catch(done);
    });

});