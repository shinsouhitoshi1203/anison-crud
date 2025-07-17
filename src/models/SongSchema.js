const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const unidecode = require("unidecode");
mongoose.plugin(slug);

const SongSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		artist: {
			type: String,
			required: true,
			default: "V.A."
		},
		thumb: {
			type: String,
			required: true
		},
		year: {
			type: Number,
			required: true,
			default: new Date().getFullYear(),
			min: 1900
		},
		album: {
			type: String
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			slug: "title",
			transform: (x) => unidecode(x, Math.random().toString())
		},
		lyric: String
	},
	{
		virtuals: {
			ytThumb: {
				get() {
					return `https://i3.ytimg.com/vi/${this.thumb}/maxresdefault.jpg`;
				}
			},
			ytLink: {
				get() {
					return `http://www.youtube.com/watch?v=${this.thumb}`;
				}
			},
			lyrics: {
				get() {
					if (!this.lyric) return [];
					return this.lyric.split("\n");
				}
			},
			viewURL: {
				get() {
					return "/songs/view/" + this.slug;
				}
			},
			editURL: {
				get() {
					return "/songs/edit/" + this.slug;
				}
			}
		}
	}
);

module.exports = SongSchema;
// https://i3.ytimg.com/vi/WSJQcgBAyys/maxresdefault.jpg
