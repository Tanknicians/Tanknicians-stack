import { CreateLogin, CreateServiceCall, CreateTankMetaData, CreateUser } from "src/zodTypes"

import * as UserService from './User/API';
import * as LoginService from './Login/API';
import * as TankMetadataService from './TankMetadata/API';
import * as ServiceCallService from './ServiceCall/API';

const newUserData = "1234567890"
const newEmployeeData = "0987654321"

const loginEmail = "deletethisemail@email.com"
const loginPassword = "testpassword";

let customerId: number = 0;
let employeeId: number = 0;
let tankId: number = 0;
let serviceCallId: number = 0;

// we are using a linear set of integers to avoid 
const newCustomer: CreateUser = {
    firstName: newUserData,
    middleName: newUserData,
    lastName: newUserData,
    address: newUserData,
    phone: newUserData,
    isEmployee: false
}

const newEmployee: CreateUser = {
    firstName: newEmployeeData,
    middleName: newEmployeeData,
    lastName: newEmployeeData,
    address: newEmployeeData,
    phone: newEmployeeData,
    isEmployee: true
}

const newLogin: CreateLogin = {
    email: loginEmail,
    password: loginPassword,
    role: "EMPLOYEE",
    userId: 0
}

const newTank: CreateTankMetaData = {
    type: "FRESH",
    volume: 0,
    qrSymbol: 0,
    tanknicianSourcedOnly: false,
    lastDateServiced: new Date(),
    customerId: 0
}

const newServiceCall: CreateServiceCall = {
    createdOn: new Date(),
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
    employeeId: 0
}

describe('Create DB Heirarchy',  () => {

    it ('Creates a Customer', async () => {
        const result = await UserService.create(newCustomer);
        expect(result.message).toBe('User created successfully');
        expect(typeof result.id).toBe('number');
        customerId = result.id;
    });

    it ('Creates an Employee', async () => {
        const result = await UserService.create(newEmployee);
        expect(result.message).toBe('User created successfully');
        expect(typeof result.id).toBe('number');
        employeeId = result.id;
    });

    it ('Creates an Employee Login', async () => {
        newLogin.userId = employeeId;
        const result = await LoginService.create(newLogin);
        expect(result.message).toBe('Login created successfully');
        expect(typeof result.id).toBe('number');
    });

    it ('Creates a Tank Metadata', async () => {
        newTank.customerId = customerId;
        const result = await TankMetadataService.create(newTank);
        expect(result.message).toBe('TankMetadata created successfully');
        expect(typeof result.id).toBe('number');
        tankId = result.id;
    });

    it ('Creates a Service Call', async () => {
        newServiceCall.employeeId = employeeId;
        newServiceCall.tankId = tankId;
        const result = await ServiceCallService.create(newServiceCall);
        expect(result.message).toBe('Service Call created successfully');
        expect(typeof result.id).toBe('number');
        serviceCallId = result.id;
    });
});

describe('Delete DB Heirarchy',  () => {
    it ('Deletes a Service Call', async () => {

    })

    it ('Deletes a Tank Metadata', async () => {
        
    })

    it ('Deletes a Login', async () => {
        
    })

    it ('Deletes an Employee', async () => {
        
    })

    it ('Deletes a Customer', async () => {
        
    })
});