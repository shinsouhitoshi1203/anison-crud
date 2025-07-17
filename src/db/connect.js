const { default: mongoose } = require("mongoose");

async function connect(dbName) {
	const dbServer = process.env.DB_ADDR + dbName;

	try {
		await mongoose.connect(dbServer);

		console.log("Server is connected to the database");
	} catch (e) {
		console.error(e);
	}
}

module.exports = connect;
