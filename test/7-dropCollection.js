var collection = database.collection('collectionExists');

describe('dropCollection', function () {
    it('should returns true when collection is removed', function () {
        return collection
            .create()
            .then(_ => util.dropCollection(collection))
            .then(removed => expect(removed).to.be.true);
    });

    it('should returns false when collection does not exists', function () {
        return util.dropCollection(collection)
            .then(removed => expect(removed).to.be.false);
    });

    it('should have delete the collection.', function () {
        return util
            .collectionExists(collection)
            .then(e => expect(e).to.be.false);
    });
});