const mongoose = require('mongoose')
const { Schema } = mongoose

const RecipeSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  }
})

const RecipeModal = mongoose.model('Recipe', RecipeSchema)
module.exports = RecipeModal
