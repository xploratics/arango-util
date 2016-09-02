describe('ensureDatabaseExists', function () {
    it('should returns true when database is created', function (done) {
        util.ensureDatabaseExists({ server, name: 'db' })
            .then(function (created) {
                expect(created).to.be.equal(true);
                done();
            }, fail)
            .catch(done);
    });

    it('should returns false when database already exists', function (done) {
        util.ensureDatabaseExists({ server, name: 'db' })
            .then(function (created) {
                expect(created).to.be.equal(false);
                done();
            }, fail)
            .catch(done);
    });

});