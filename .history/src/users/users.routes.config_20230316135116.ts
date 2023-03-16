import {CommonRoutesConfig} from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/users`)
        .get(UsersController.listUsers)
        .post(                
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateSameEmailDoesntExist,
            UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);


        this.app
            .route(`/users/:userId`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.userId}`);
            })

            return this.app;    
        }

}

// ongoing tutorial: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1