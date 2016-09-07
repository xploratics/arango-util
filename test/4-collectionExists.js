describe('collectionExists', function () {

    it('should returns false when collection does not exists', function () {
        return util
            .collectionExists({ server, name: 'myCollection1' })
            .then(exists => expect(exists).to.be.equal(false));
    });

    it('should returns true when collection exists', function () {
        return util
            .collectionExists({ server, name: 'myCollection' })
            .then(exists => expect(exists).to.be.equal(true));
    });

});