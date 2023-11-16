import { StatusCodes } from 'http-status-codes';
import { Todo } from '../models/todo.model';
import { findAll, saveTodo } from '../services/todo.service';

export const getTodos = async (req, res, next) => {
  try {
    const todos = await findAll();
    return res.status(StatusCodes.CREATED).jsonp(todos);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  console.log(req.body);
  try {
    const todos = await saveTodo(req.body);
    return res.status(StatusCodes.CREATED).jsonp(todos);
  } catch (error) {
    next(error);
  }
};
