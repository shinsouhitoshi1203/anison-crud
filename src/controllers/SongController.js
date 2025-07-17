const { default: mongoose, ObjectId, Types } = require("mongoose");
const SongSchema = require("@schemas/SongSchema");
const db = require("@db/helper");

const songModel = mongoose.model("songs", SongSchema, "songs");

const fields = [
	{
		name: "title",
		type: "text",
		label: "Title",
		required: true,
		icon: "fa-solid fa-music",
		defaultValue: "untitled"
	},
	{
		name: "artist",
		type: "text",
		label: "Artist",
		required: true,
		icon: "fa-solid fa-user",
		defaultValue: "V.A."
	},
	{
		name: "thumb",
		type: "text",
		label: "YouTube Thumb ID",
		required: true,
		icon: "fa-solid fa-image",
		defaultValue: ""
	},
	{
		name: "year",
		type: "number",
		label: "Year",
		required: true,
		icon: "fa-solid fa-calendar",
		defaultValue: new Date().getFullYear()
	},
	{
		name: "album",
		type: "text",
		label: "Album",
		required: false,
		icon: "fa-solid fa-compact-disc",
		defaultValue: ""
	},
	{
		name: "lyric",
		type: "textarea",
		label: "Lyric",
		required: false,
		icon: "fa-solid fa-file-lines",
		defaultValue: ""
	}
];

const view = {
	add: "pages/songs/add.pug",
	edit: "pages/songs/edit.pug"
};

async function renderSongs(errorHandler, order = "asc") {
	try {
		console.log(order);
		const data = await songModel.find({}).sort({ title: order });
		return db.toObjectCollection(data);
	} catch (e) {
		errorHandler(e);
	}
}

async function getSongBySlug(slug, errorHandler) {
	try {
		const data = await songModel.findOne({
			slug: slug
		});
		return db.toObject(data);
	} catch (error) {
		errorHandler(error);
	}
}

const handleError = (error, req, res, page) => {
	switch (error.code) {
		case 11000:
			res.status(400).render(page, {
				error: "Song with this slug already exists",
				fields,
				dataInput: req.body
			});
			break;
		case -1:
			res.status(400).render(page, {
				error: "Invalid data input. Please check your input.",
				fields,
				dataInput: req.body
			});
			break;
		default:
			res.status(500).json({ error: "Internal server error" });
	}
};

class SongController {
	// GET /
	async index(req, res, next) {
		const { orderSort = "asc" } = req.body ?? {};
		const retrievedData = await renderSongs(next, orderSort);
		res.status(200).render("pages/songs/all", {
			songs: retrievedData,
			orderSort
		});
	}

	// GET songs/view/:id
	async viewSong(req, res, next) {
		const { slug } = req.params ?? {};
		if (!slug) {
			res.status(304).redirect("/songs");
		} else {
			try {
				const retrieveData = await getSongBySlug(slug, next);
				res.status(200).render("pages/songs/viewSong", {
					song: retrieveData
				});
			} catch (e) {
				next(e);
			}
		}
	}

	// GET songs/add
	addSongView(req, res, next) {
		res.render(view.add, { fields });
	}

	// POST songs/add
	async addSong(req, res, next) {
		const songData = req.body;
		const song = new songModel({ ...songData });
		const hasError = await song.validateSync();

		if (hasError) {
			handleError({ code: -1 }, req, res, view.add);
		} else {
			try {
				await song.save();
				res.status(201).redirect("/songs");
			} catch (error) {
				handleError(error, req, res, next, view.add);
			}
		}
	}

	// GET songs/edit/:hash
	async editSongView(req, res, next) {
		const { slug } = req.params ?? {};
		if (slug) {
			try {
				const dataSong = await getSongBySlug(slug, next);
				if (dataSong) {
					res.render(view.edit, {
						fields,
						dataInput: {
							...dataSong
						},
						siteTitle: "Edit " + dataSong.title
					});
				} else {
					res.status(400).redirect("/songs");
				}
			} catch (error) {
				res.status(304).redirect("/songs");
			}
		} else {
			res.status(304).redirect("/songs");
		}
	}

	async editSong(req, res, next) {
		const { slug } = req.params ?? {};
		const updatedMeta = { ...req.body };
		try {
			await songModel.updateOne({ slug: slug }, updatedMeta);
			res.redirect("/songs");
		} catch (error) {
			handleError(error, req, res, view.edit);
		}
	}

	async deleteSong(req, res, next) {
		const { slug } = req.params ?? {};
		if (!slug) {
			res.status(404).redirect("/songs");
		} else {
			try {
				await songModel.deleteOne({ slug: slug });
				res.status(200).redirect("/songs");
			} catch (error) {
				res.status(400).redirect("/songs");
			}
		}
	}

	async deleteMany(req, res, next) {
		const { list = "" } = req.body ?? {};
		const items = list.split(" ").map((id) => new Types.ObjectId(id));
		try {
			await songModel.deleteMany({
				_id: { $in: items }
			});
			res.redirect("/songs");
		} catch (error) {
			res.json(error);
		}
	}
}

module.exports = new SongController();
