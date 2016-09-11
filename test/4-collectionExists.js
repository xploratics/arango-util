describe('collectionExists', function () {

    it('should returns false when collection does not exists', function () {
        return util
            .collectionExists(database.collection('myCollection1'))
            .then(exists => expect(exists).to.be.equal(false));
    });

    it('should returns true when collection exists', function () {
        return util
            .collectionExists(database.collection('myCollection'))
            .then(exists => expect(exists).to.be.equal(true));
    });

});