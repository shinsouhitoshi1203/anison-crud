function toObject(doc) {
	return doc.toObject({ virtuals: true });
}

function toObjectCollection(docs) {
	return docs.map((doc) => toObject(doc));
}

const db = {
	toObject,
	toObjectCollection
};

module.exports = db;
