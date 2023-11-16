import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: String,
  isComplete: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model('Todo', todoSchema);
