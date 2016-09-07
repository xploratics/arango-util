describe('getByKey', function () {

    it('should returns null when a document does not exists.', function () {
        return util
            .getByKey({ key: 'dont-exists', server, collection: 'myCollection' })
            .then(doc => expect(doc).to.be.an('null'));
    });

    it('should returns a document.', function () {
        return server
            .collection('myCollection')
            .save({ _key: 'exists', value: 'test' })
            .then(_ => util.getByKey({ key: 'exists', server, collection: 'myCollection' }))
            .then(doc => expect(doc.value).to.equal('test'));
    });

    it('should be able to use directly a collection.', function () {
        var collection = server.collection('myCollection');

        return util.getByKey({ key: 'exists', collection })
            .then(doc => expect(doc.value).to.equal('test'));
    });

});