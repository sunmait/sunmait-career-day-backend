import path from 'path';
import express from 'express';
import fs = require('fs');
import bodyParser = require('body-parser');

import { InversifyExpressServer } from 'inversify-express-utils';

import './controllers/index';
import { container } from './infrastructure/di/Container';

import { ErrorHandler, ValidationErrorHandler } from './middlewares/ErrorHandlers';

import { AuthProvider } from './providers';

export default () => {
  const server = new InversifyExpressServer(container, null, null, null, AuthProvider);

  server.setConfig((application) => {
    application.use(bodyParser.urlencoded({ extended: false }));
    application.use(bodyParser.json());
  });

  const app = server.build();

  const STATIC_PATH = path.join(__dirname, 'public', process.env.NODE_ENV || 'development');
  app.use(express.static(STATIC_PATH));

  app.get('*', (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    fs.readFile(`${STATIC_PATH}/index.html`, (error, html) => {
      if (error) {
        return next(error);
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    });
  });

  app.use(ValidationErrorHandler);
  app.use(ErrorHandler);

  return app;
};
