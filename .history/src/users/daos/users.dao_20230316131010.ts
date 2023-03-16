import { CreateUserDto } from '../dtos/create.user.dto';
import { PatchUserDto } from '../dtos/patch.user.dto';
import { PutUserDto } from '../dtos/put.user.dto';
import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<CreateUserDto> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(user: CreateUserDto) {
        user.id = shortid.generate();
        this.users.push(user);
        return user.id;
    }
}

export default new UsersDao();