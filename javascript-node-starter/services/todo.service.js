import { Todo } from '../models/todo.model';

export const findAll = async (perPage, page) => {
  // console.log(page);
  try {
    const todos = await Todo.find({})
      .limit(perPage)
      .skip(perPage * page);
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
