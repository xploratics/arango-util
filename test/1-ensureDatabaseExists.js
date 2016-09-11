describe('ensureDatabaseExists', function () {
    
    it('should returns true when database is created', function () {
        return util
            .ensureDatabaseExists(database)
            .then(created => expect(created).to.be.equal(true));
    });

    it('should returns false when database already exists', function () {
        return util
            .ensureDatabaseExists(database)
            .then(created => expect(created).to.be.equal(false));
    });

});