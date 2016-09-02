describe('collectionExists', function () {

    it('should returns false when collection does not exists', function (done) {
        util.collectionExists({ server, name: 'myCollection1' })
            .then(function (exists) {
                expect(exists).to.be.equal(false);
                done();
            }, fail)
            .catch(done);
    });

    it('should returns true when collection exists', function (done) {
        util.collectionExists({ server, name: 'myCollection' })
            .then(function (exists) {
                expect(exists).to.be.equal(true);
                done();
            }, fail)
            .catch(done);
    });

});