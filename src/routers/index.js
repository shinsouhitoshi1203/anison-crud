const SongRouter = require("./SongRouter");

function router(app) {
	app.use("/songs", SongRouter);
}

module.exports = router;
