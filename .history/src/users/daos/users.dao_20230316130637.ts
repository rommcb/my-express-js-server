import { CreateUserDto } from '../dtos/create.user.dto';
import { PatchUserDto } from '../dtos/patch.user.dto';
import { PutUserDto } from '../dtos/put.user.dto';
import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');