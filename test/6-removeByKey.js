describe('removeByKey', function () {

    it('should returns false when a document does not exists.', function () {
        return util
            .removeByKey({ key: 'dont-exists', server, collection: 'myCollection' })
            .then(e => expect(e).to.equal(false));
    });

    it('should returns true when a document exists.', function () {
        return server
            .collection('myCollection')
            .save({ _key: 'exists2', value: 'test' })
            .then(_ => util.removeByKey({ key: 'exists2', server, collection: 'myCollection' }))
            .then(e => expect(e).to.equal(true));
    });

    it('should have delete the document from the collection.', function () {
        return util
            .getByKey({ key: 'exists2', server, collection: 'myCollection' })
            .then(doc => expect(doc).to.be.an('null'));
    });

    it('should be able to use directly a collection.', function () {
        var collection = server.collection('myCollection');

        return util
            .removeByKey({ key: 'dont-exists', collection })
            .then(e => expect(e).to.equal(false));
    });

});