"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app.route(`/users`)
            .get(users_controller_1.default.listUsers)
            .post((0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password')
            .isLength({ min: 5 })
            .withMessage('Must include password (5+ characters)'), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail().optional(),
            (0, express_validator_1.body)('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            (0, express_validator_1.body)('firstName').isString().optional(),
            (0, express_validator_1.body)('lastName').isString().optional(),
            (0, express_validator_1.body)('permissionFlags').isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validatePatchEmail,
            users_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
// ongoing tutorial: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2Vycy91c2Vycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFrRTtBQUNsRSxzRkFBNkQ7QUFDN0QscUZBQTREO0FBRTVELGlIQUF1RjtBQUN2Rix5REFBeUM7QUFFekMsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBRS9DLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUN2QixHQUFHLENBQUMsMEJBQWUsQ0FBQyxTQUFTLENBQUM7YUFDOUIsSUFBSSxDQUNELElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDdkIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQzthQUNYLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNwQixXQUFXLENBQUMsdUNBQXVDLENBQUMsRUFDekQsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLDBCQUFlLENBQUMsNEJBQTRCLEVBQzVDLDBCQUFlLENBQUMsVUFBVSxDQUN6QixDQUFDO1FBRU4sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLDBCQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUFDLDBCQUFlLENBQUMsa0JBQWtCLENBQUM7YUFDdkMsR0FBRyxDQUFDLDBCQUFlLENBQUMsV0FBVyxDQUFDO2FBQ2hDLE1BQU0sQ0FBQywwQkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzNCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQztpQkFDWCxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BCLFdBQVcsQ0FBQyx1Q0FBdUMsQ0FBQztZQUN6RCxJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBQSx3QkFBSSxFQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFO1lBQy9CLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQywwQkFBZSxDQUFDLGlDQUFpQztZQUNqRCwwQkFBZSxDQUFDLEdBQUc7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0IsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDO2lCQUNYLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDcEIsV0FBVyxDQUFDLGdDQUFnQyxDQUFDO2lCQUM3QyxRQUFRLEVBQUU7WUFDZixJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdEMsSUFBQSx3QkFBSSxFQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzFDLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQywwQkFBZSxDQUFDLGtCQUFrQjtZQUNsQywwQkFBZSxDQUFDLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO1FBRUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FFUjtBQXpERCxrQ0F5REM7QUFFRCxzRkFBc0YifQ==