const mongoose = require('mongoose');
const { regularUrl } = require('../constants/regularUrl');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,

  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => regularUrl.test(url),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
