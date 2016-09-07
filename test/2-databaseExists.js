describe('databaseExists', function () {

    it('should returns false when database does not exists', function () {
        return util
            .databaseExists({ server, name: 'db1' })
            .then(exists => expect(exists).to.be.equal(false));
    });

    it('should returns true when database exists', function () {
        return util
            .databaseExists({ server, name: 'db' })
            .then(exists => expect(exists).to.be.equal(true));
    });

});