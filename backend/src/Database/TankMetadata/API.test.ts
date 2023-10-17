/* 
This test requires a specific hierarchy before testing a Tank Metadata:

1. 1 User: 1 Customer
2. 1 TankMetadata: tied to previous Customer

This relation for a single TankMetadata is required:
Customer -> TankMetadata

*/

import { create, read, update, deleteOne, search } from './API';
import { create as createUser, deleteOne as deleteUser } from './../User/API';
import {
  SearchSchema,
  CreateUser,
  CreateTankMetaData,
  UpdateTankMetaData
} from '../../zodTypes';

// we need to keep track of the id of the creations to delete them later
let createCustomerId: number;
let createTankMetadataId: number;

const createTankMetadata: CreateTankMetaData = {
  nickname: 'TM_TEST',
  volume: 0,
  type: 'FRESH',
  tanknicianSourcedOnly: false,
  customerId: 0 // change this after setting up pre-test
};

const createCustomer: CreateUser = {
  firstName: 'TM_TEST',
  middleName: 'TM_TEST',
  lastName: 'TM_TEST',
  address: 'TM_TEST',
  phone: '11111111111',
  isEmployee: false
};

// ServiceCall CRUD testing suite can now be run:
describe('TankMetadata CRUD operations', () => {
  describe('TankMetadata pre-test setup operations', () => {
    it('create a customer and set the global id', async () => {
      const customerResponse = await createUser(createCustomer);
      createCustomerId = customerResponse.id;
    });

    it('update the TankMetadata to the required ids', () => {
      createTankMetadata.customerId = createCustomerId;
    });

    it('pre-test setup complete', () => {});
  });

  describe('TankMetadata CRUD testing suite can now be run:', () => {
    it('should create a Tank Metadata', async () => {
      const result = await create(createTankMetadata);
      expect(result.message).toBe('TankMetadata created successfully');
      expect(result.id).toBeDefined();
      createTankMetadataId = result.id;
    });

    it('should read a Tank Metadata', async () => {
      const result = await read(createTankMetadataId);
      expect(result).toBeDefined();
    });

    it('should update a Tank Metadata', async () => {
      // Update Tank Metadata object
      const { tanknicianSourcedOnly, ...data } = createTankMetadata;
      const updateData: UpdateTankMetaData = {
        tanknicianSourcedOnly: true,
        ...data,
        qrSymbol: 1,
        lastDateServiced: new Date()
      };
      const result = await update(createTankMetadataId, updateData);
      expect(result.message).toBe('TankMetadata updated successfully');
    });

    it('should search for Tank Metadatas', async () => {
      const searchCriteria: SearchSchema = {
        page: 1,
        size: 5,
        searchString: 'TM_TEST'
      };
      const result = await search(searchCriteria);
      expect(result).toBeDefined();
    });

    it('should delete a Tank Metadata', async () => {
      const result = await deleteOne(createTankMetadataId);
      expect(result.message).toBe('TankMetadata deleted successfully');
    });

    describe('Post-test cleanup:', () => {
      it('delete extraneous testing data', async () => {
        await deleteUser(createCustomerId);
      });
    });
  });
});
