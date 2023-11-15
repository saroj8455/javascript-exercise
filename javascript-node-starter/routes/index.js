import express from 'express';
import { StatusCodes } from 'http-status-codes';

const routerTemplate = express.Router();

/**
 * @method GET
 * @url http://localhost:3001/api/v1/
 * @author Saroj
 */
routerTemplate.get('/', (req, res, next) => {
  res.status(StatusCodes.OK).jsonp({
    message: 'Welcome to the API',
  });
});

/**
 * @method GET
 * @url http://localhost:3001/api/v1/101
 * @argument Id
 * @author Saroj
 */
routerTemplate.get('/:Id', (req, res, next) => {
  res.status(StatusCodes.OK).jsonp({
    message: 'Welcome to the API',
    params: `${req.params.Id}`,
  });
});

/**
 * @url http://localhost:3001/api/v1/
 * @method POST,
 * @argument { "customer":"Dave", "tag":"Seller"}
 * @author Saroj
 */
routerTemplate.post('/', (req, res, next) => {
  const { customer, tag } = req.body;
  res.status(StatusCodes.CREATED).jsonp({
    message: 'Data is created',
    data: {
      customer,
      tag,
    },
  });
});

/**
 * @url http://localhost:3001/api/v1/update
 * @method POST,
 * @argument { "customer":"Dave Gray", "tag":"Seller"}
 * @author Saroj
 */
routerTemplate.post('/update', (req, res, next) => {
  const { customer, tag } = req.body;
  res.status(StatusCodes.OK).jsonp({
    message: 'Data is updated',
    data: {
      customer,
      tag,
    },
  });
});

/**
 * @method DELETE
 * @argument Id
 * @url http://localhost:3001/api/v1/101
 * @author Saroj
 */
routerTemplate.delete('/:Id', (req, res, next) => {
  res.status(StatusCodes.OK).jsonp({
    message: 'Welcome to the delete API',
    params: `${req.params.Id}`,
  });
});

export default routerTemplate;
