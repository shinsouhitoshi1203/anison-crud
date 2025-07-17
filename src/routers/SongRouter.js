const express = require("express");
const SongController = require("@controllers/SongController");

const SongRouter = express.Router();

SongRouter.get("/", SongController.index);
SongRouter.post("/", SongController.index);

SongRouter.get("/view/:slug", SongController.viewSong);

SongRouter.get("/add", SongController.addSongView);
SongRouter.post("/add", SongController.addSong);

SongRouter.get("/edit/:slug", SongController.editSongView);
SongRouter.put("/edit/:slug", SongController.editSong);

SongRouter.delete("/delete/:slug", SongController.deleteSong);

SongRouter.delete("/delete-many/", SongController.deleteMany);
module.exports = SongRouter;
