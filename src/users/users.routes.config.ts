import {CommonRoutesConfig} from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';

export class UsersRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/users`)
        .get(
            jwtMiddleware.validJWTNeeded,
            permissionMiddleware.permissionFlagRequired(
                PermissionFlag.ADMIN_PERMISSION
            ),
            UsersController.listUsers
            )
        .post(                
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validateSameEmailDoesntExist,
            UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);

        this.app
            .route(`/users/:userId`)
            .all(
                UsersMiddleware.validateUserExists,
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.onlySameUserOrAdminCanDoThisAction
                )
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersMiddleware.userCantChangePermission,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            body('firstName').isString().optional(),
            body('lastName').isString().optional(),
            body('permissionFlags').isInt().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validatePatchEmail,
            UsersMiddleware.userCantChangePermission,
            UsersController.patch,
        ]);

            return this.app;    
        }

}

// ongoing tutorial: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1