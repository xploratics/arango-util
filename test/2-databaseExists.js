describe('databaseExists', function () {

    it('should returns false when database does not exists', function (done) {
        util.databaseExists({ server, name: 'db1' })
            .then(function (exists) {
                expect(exists).to.be.equal(false);
                done();
            }, fail)
            .catch(done);
    });

    it('should returns true when database exists', function (done) {
        util.databaseExists({ server, name: 'db' })
            .then(function (exists) {
                expect(exists).to.be.equal(true);
                done();
            }, fail)
            .catch(done);
    });

});