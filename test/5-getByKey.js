var collection = database.collection('myCollection');

describe('getByKey', function () {

    it('should returns null when a document does not exists.', function () {
        return util
            .getByKey({ key: 'dont-exists', collection })
            .then(doc => expect(doc).to.be.an('null'));
    });

    it('should returns a document.', function () {
        return collection
            .save({ _key: 'exists', value: 'test' })
            .then(_ => util.getByKey({ key: 'exists', collection }))
            .then(doc => expect(doc.value).to.equal('test'));
    });

});