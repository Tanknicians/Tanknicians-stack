import { create, read, update, deleteOne, search } from './API';
import { create as createUser, deleteOne as deleteUser } from '../User/API';
import {
  CreateLogin,
  CreateUser,
  SearchSchema,
  UpdateLogin
} from '../../zodTypes';

/* 
This test requires a specific hierarchy before testing a Login:

1. 1 User: 1 Customer
2. 1 Login: Tied to previous User

This relation for a single Login is required:
User -> Login
*/

const testLogin: CreateLogin = {
  email: 'supertest@email.com',
  password: 'supertest',
  role: 'CUSTOMER',
  userId: 0
};

const testUser: CreateUser = {
  firstName: 'LOGIN_TEST',
  middleName: 'LOGIN_TEST',
  lastName: 'LOGIN_TEST',
  address: 'LOGIN_TEST',
  phone: '1111111111',
  email: 'LOGIN_TEST@email.com',

  isEmployee: false
};

let createdLoginId: number;
let createdUserId: number;

describe('Login CRUD operations', () => {
  describe('pre-test setup:', () => {
    it('should create a user', async () => {
      const result = await createUser(testUser);
      createdUserId = result.id;
    });
    it('should assign userId to login', async () => {
      testLogin.userId = createdUserId;
    });
  });

  describe('Login CRUD tests:', () => {
    it('should create a login', async () => {
      const result = await create(testLogin);
      expect(result.message).toBe('Login created successfully');
      expect(result.id).toBeDefined();
      createdLoginId = result.id;
    });

    it('should read a login', async () => {
      const result = await read(testLogin.email);
      expect(result).toBeDefined();
    });

    it('should update a login', async () => {
      const updateData: UpdateLogin = {
        email: 'supertestupdate@email.com',
        password: 'supertest',
        role: 'CUSTOMER',
        userId: 0
      };
      const result = await update(createdLoginId, updateData);
      expect(result.message).toBe('Login updated successfully');
    });

    it('should search for logins', async () => {
      const searchCriteria: SearchSchema = {
        page: 1,
        size: 5,
        searchString: 'supertestupdate@email.com'
      };
      const result = await search(searchCriteria);
      expect(result).toBeDefined();
    });

    it('should delete a login', async () => {
      const result = await deleteOne(createdLoginId);
      expect(result.message).toBe('Login deleted successfully');
    });
  });

  describe('post-test cleanup:', () => {
    it('should delete a user', async () => {
      await deleteUser(createdUserId);
    });
  });
});
