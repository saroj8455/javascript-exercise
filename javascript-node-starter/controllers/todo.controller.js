import { StatusCodes } from 'http-status-codes';
import { Todo } from '../models/todo.model';
import { findAll, saveTodo } from '../services/todo.service';

export const getTodos = async (req, res, next) => {
  console.log(req.queryParams);
  let pageNo = parseInt(req.params.page) | 0;
  let perPage = 3,
    page = Math.max(0, pageNo); // req.params.page like 1,2,3

  try {
    const todos = await findAll(perPage, page);
    return res.status(StatusCodes.CREATED).jsonp({
      count: todos.length,
      todos,
    });
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
