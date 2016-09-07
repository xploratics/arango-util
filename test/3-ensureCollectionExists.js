describe('ensureCollectionExists', function () {

    it('should returns true when collection is created', function () {
        return util
            .ensureCollectionExists({ server, name: 'myCollection' })
            .then(created => expect(created).to.be.equal(true));
    });

    it('should returns false when collection already exists', function () {
        return util
            .ensureCollectionExists({ server, name: 'myCollection' })
            .then(created => expect(created).to.be.equal(false));
    });

});