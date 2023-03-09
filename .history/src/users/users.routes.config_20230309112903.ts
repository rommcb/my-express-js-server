import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

}

// ongoing tutorial: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1