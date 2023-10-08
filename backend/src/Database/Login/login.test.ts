import { create, read, update, deleteOne, search } from './API';
import { CreateLogin, SearchSchema, UpdateLogin } from 'src/zodTypes';

describe('Login CRUD operations', () => {
  const testLogin: CreateLogin = {
      email: 'supertest@email.com',
      password: 'supertest',
      role: 'CUSTOMER',
      userId: 0
  };

  let createdLoginId: number;

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
      searchString: "supertestupdate@email.com",
    };
    const result = await search(searchCriteria);
    expect(result).toBeDefined();
  });

  it('should delete a login', async () => {
    const result = await deleteOne(createdLoginId);
    expect(result.message).toBe('Login deleted successfully');
  });
});
