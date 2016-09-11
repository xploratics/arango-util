var collection = database.collection('myCollection');

describe('removeByKey', function () {

    it('should returns false when a document does not exists.', function () {
        return util
            .removeByKey({ key: 'dont-exists', collection })
            .then(e => expect(e).to.equal(false));
    });

    it('should returns true when a document exists.', function () {
        return collection
            .save({ _key: 'exists2', value: 'test' })
            .then(_ => util.removeByKey({ key: 'exists2', collection }))
            .then(e => expect(e).to.equal(true));
    });

    it('should have delete the document from the collection.', function () {
        return util
            .getByKey({ key: 'exists2', collection })
            .then(doc => expect(doc).to.be.an('null'));
    });

});