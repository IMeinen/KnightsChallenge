const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const knightSchema = new Schema({
  name: String,
  nickname: String,
  birthday: Date,
  isHero: {
    type: Boolean,
    default: false,
  },
  weapons: [
    {
      name: String,
      mod: Number,
      attr: String,
      equipped: Boolean,
    },
  ],
  attributes: {
    strength: {
      type: Number,
      default: 0,
    },
    dexterity: {
      type: Number,
      default: 0,
    },
    constitution: {
      type: Number,
      default: 0,
    },
    intelligence: {
      type: Number,
      default: 0,
    },
    wisdom: {
      type: Number,
      default: 0,
    },
    charisma: {
      type: Number,
      default: 0,
    },
  },
  keyAttribute: String,
});

module.exports = mongoose.model("Knight", knightSchema);
