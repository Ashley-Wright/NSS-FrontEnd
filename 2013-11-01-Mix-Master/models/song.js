
var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title: {type: String, required: [true, 'Song title is required.']},
  duration: {type: Number, required: [true, 'Song duration is required'], min: 1},
  genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  art: {type: String, required: [true, 'Cover art is required'], match: [/^.*[.](jpeg|jpg|gjf|png)$/, 'Not a supported file format']},
  filename: {type: String, required: [true, 'Cover art is required'], match: [/^\S.*[mp3]$/]},
  lyrics: {type: String, required: [true, 'Lyrics are required.']},
  createdAt: {type: Date, default: Date.now}
});


mongoose.model('Song', Song);