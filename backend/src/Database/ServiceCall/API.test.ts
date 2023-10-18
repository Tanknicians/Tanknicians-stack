/* 
This test requires a specific hierarchy before testing a service call:

1. 2 User: 1 Customer, 1 Employee
2. 1 TankMetadata: tied to previous Customer
3. 1 ServiceCall: tied to previous Tank and previous Employee

The relation for a single ServiceCall goes as follows:

User(Employee) -> ServiceCall
User(Customer) -> Tank -> ServiceCall

We want to create this data and upload it to the database. We delete them at the end of the test. 
Though this test may appear redundant due to other tests (TankMetadata/User) being run, we cannot control the flow
of tests and assume that they run in-order. Thus, we must run Create and Delete ops on non-ServiceCall models. 
At the very least, this allows for double-checking the integrity of previous tests. 
*/

import { create, read, update, deleteOne, search } from './API';

import { create as createUser, deleteOne as deleteUser } from './../User/API';

import {
  create as createTank,
  deleteOne as deleteTank
} from './../TankMetadata/API';

import {
  SearchSchema,
  CreateUser,
  CreateTankMetaData,
  CreateServiceCall,
  UpdateServiceCall
} from '../../zodTypes';

// we need to keep track of the id of the creations to delete them later
let createCustomerId: number;
let createEmployeeId: number;
let createTankId: number;
let createServiceCallId: number;

const createServiceCall: CreateServiceCall = {
  isApproved: false,
  createdOn: new Date(),
  customerRequest: 'SC_TEST',
  employeeNotes: 'SC_TEST',
  notApprovedNotes: 'SC_TEST',
  notesUpdated: new Date(),
  alkalinity: 0,
  calcium: 0,
  nitrate: 0,
  phosphate: 0,
  ATOOperational: false,
  ATOReservoirFilled: false,
  chemFilterAdjusted: false,
  doserAdjustementOrManualDosing: false,
  dosingReservoirsFull: false,
  floorsCheckedForSpillsOrDirt: false,
  glassCleanedInside: false,
  glassCleanedOutside: false,
  mechFilterChanged: false,
  pumpsClearedOfDebris: false,
  saltCreepCleaned: false,
  skimmerCleanedAndOperational: false,
  waterChanged: false,
  waterTestedRecordedDated: false,
  pestAPresent: false,
  pestBPresent: false,
  pestCPresent: false,
  pestDPresent: false,
  employeeId: 0, // update on pre-test setup
  tankId: 0 // update on pre-test setup
};

const createTankMetadata: CreateTankMetaData = {
  type: 'FRESH',
  nickname: 'SC_TEST',
  volume: 0,
  tanknicianSourcedOnly: false,
  customerId: 0
};

const commonUserData: Omit<CreateUser, 'isEmployee'> = {
  firstName: 'SC_TEST',
  middleName: 'SC_TEST',
  lastName: 'SC_TEST',
  address: 'SC_TEST',
  phone: '11111111111',
  email: 'SC_TEST@email.com'
};

// ServiceCall CRUD testing suite can now be run:
describe('ServiceCall CRUD operations', () => {
  describe('ServiceCall pre-test setup operations', () => {
    it('create a customer and set the global id', async () => {
      const customerResponse = await createUser({
        ...commonUserData,
        isEmployee: false
      });
      createCustomerId = customerResponse.id;
    });

    it('create an employee and set the global id', async () => {
      const employeeResponse = await createUser({
        ...commonUserData,
        isEmployee: true
      });
      createEmployeeId = employeeResponse.id;
    });

    it('set the tankMetaData customerId and create the tank; set tank global id', async () => {
      createTankMetadata.customerId = createCustomerId;
      const tankMetadataResponse = await createTank(createTankMetadata);
      createTankId = tankMetadataResponse.id;
    });

    it('update the createServiceCall to the required ids', () => {
      createServiceCall.employeeId = createEmployeeId;
      createServiceCall.tankId = createTankId;
    });

    it('pre-test setup complete', () => {});
  });

  describe('ServiceCall CRUD testing suite can now be run:', () => {
    it('should create a service call', async () => {
      const result = await create(createServiceCall);
      expect(result.message).toBe('Service Call created successfully');
      expect(result.id).toBeDefined();
      createServiceCallId = result.id;
    });

    it('should read a service call', async () => {
      const result = await read(createServiceCallId);
      expect(result).toBeDefined();
    });

    it('should update a service call', async () => {
      // Update Service Call object
      const { isApproved, employeeNotes, ...serviceCallData } =
        createServiceCall;
      const updateData: UpdateServiceCall = {
        ...serviceCallData,
        employeeNotes: 'SC_TEST',
        isApproved: true
      };
      const result = await update(createServiceCallId, updateData);
      expect(result.message).toBe('Service Call updated successfully');
    });

    it('should search for service calls', async () => {
      const searchCriteria: SearchSchema = {
        page: 1,
        size: 5,
        searchString: 'SC_TEST'
      };
      const result = await search(searchCriteria);
      expect(result).toBeDefined();
    });

    it('should delete a service call', async () => {
      const result = await deleteOne(createServiceCallId);
      expect(result.message).toBe('Service Call deleted successfully');
    });

    describe('Post-test cleanup:', () => {
      it('delete extraneous testing data', async () => {
        await deleteTank(createTankId);
        await deleteUser(createEmployeeId);
        await deleteUser(createCustomerId);
      });
    });
  });
});
