import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        // (we'll add the actual route configuration here next)
        return this.app;    
    }

}

// ongoing tutorial: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1