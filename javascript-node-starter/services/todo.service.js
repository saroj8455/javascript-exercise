import { Todo } from '../models/todo.model';

export const findAll = async () => {
  try {
    const todos = await Todo.find({});
    return todos;
  } catch (error) {
    return error;
  }
};

export const saveTodo = async (todo) => {
  try {
    const newTodo = new Todo(todo);
    const savedTodo = await newTodo.save();
    return savedTodo;
  } catch (error) {
    return error;
  }
};
