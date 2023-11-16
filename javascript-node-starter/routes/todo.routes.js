import express from 'express';
// import * as TodoController from '../controllers/todo.controller.js';
import { StatusCodes } from 'http-status-codes';
import * as TodoController from '../controllers/todo.controller.js';
import { Todo } from '../models/todo.model.js';

const todoRouter = express.Router();

todoRouter.get('/', TodoController.getTodos);
todoRouter.post('/', TodoController.createTodo);

export default todoRouter;
