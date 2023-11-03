import { ServiceCall } from '@prisma/client';
import { serviceCallDB } from '../../../prisma/db/ServiceCall';
import { tankDB } from '../../../prisma/db/TankMetadata';
import {
  CreateServiceCall,
  SearchSchema,
  UpdateServiceCall,
  tankMetaDataSchema
} from '../../zodTypes';

export async function create(data: CreateServiceCall) {
  // Update Tank's "lastDateServiced" to serviceCall's "createdOn" and upload ServiceCall

  // Convert from Zod to Prisma
  const createServiceCall: Omit<ServiceCall, 'id'> = {
    ...data
  };

  try {
    const updateTank = await tankDB.read(createServiceCall.tankId);
    if (!updateTank) {
      throw new Error(`No tankId of ${createServiceCall.tankId} found.`);
    }
    updateTank.lastDateServiced = createServiceCall.createdOn;
    const createdId = await serviceCallDB.create(createServiceCall);
    await tankDB.update(updateTank);
    return { message: 'Service Call created successfully', id: createdId };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during create: ${errorMessage}`);
  }
}

export async function read(id: number) {
  try {
    const serviceCall = await serviceCallDB.read(id);
    if (!serviceCall) {
      throw new Error(`Service Call with id: ${id} not found.`);
    }
    return serviceCall;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during read: ${errorMessage}`);
  }
}

export async function readAll(isApproved?: boolean) {
  try {
    const serviceCalls = await serviceCallDB.getAll(isApproved);
    if (!serviceCalls) {
      throw new Error(`No service calls of isApproved = ${isApproved} found.`);
    }
    // newest -> oldest
    serviceCalls.sort((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      return dateB.getTime() - dateA.getTime();
    });
    return serviceCalls;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during readAll: ${errorMessage}`);
  }
}

export async function readAllByDate(
  tankId: number,
  startDate?: Date,
  endDate?: Date
) {
  interface ReturnDataSchema {
    tankId: number;
    alkalinity: [number, Date][];
    calcium: [number, Date][];
    nitrate: [number, Date][];
    phosphate: [number, Date][];
  }

  try {
    const serviceCalls = await serviceCallDB.readByDateTime(
      tankId,
      startDate,
      endDate
    );
    if (serviceCalls === null) {
      throw new Error(`Service Calls for id: ${tankId} not found.`);
    }

    // oldest -> newest
    serviceCalls.sort((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      return dateA.getTime() - dateB.getTime();
    });

    const returnData: ReturnDataSchema = {
      tankId: tankId,
      alkalinity: [],
      calcium: [],
      nitrate: [],
      phosphate: []
    };

    serviceCalls.forEach((serviceCall) => {
      returnData.alkalinity.push([
        serviceCall.alkalinity,
        serviceCall.createdOn
      ]);
      returnData.calcium.push([serviceCall.calcium, serviceCall.createdOn]);
      returnData.nitrate.push([serviceCall.nitrate, serviceCall.createdOn]);
      returnData.phosphate.push([serviceCall.phosphate, serviceCall.createdOn]);
    });

    return returnData;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during readAllByDate: ${errorMessage}`);
  }
}

export async function readAllByTankId(tankId: number, isApproved?: boolean) {
  try {
    const serviceCalls = await serviceCallDB.readAllByTankId(
      tankId,
      isApproved
    );
    if (!serviceCalls) {
      throw new Error(
        `Service Calls for id: ${tankId} and isApproved: ${isApproved} not found.`
      );
    }

    // sort by datetime (I hate typescript/javascript sorting)
    // newest -> oldest
    serviceCalls.sort((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      return dateB.getTime() - dateA.getTime();
    });

    return serviceCalls;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(
      `An error occurred during readAllByTankId: ${errorMessage}`
    );
  }
}

export async function update(id: number, data: UpdateServiceCall) {
  // Convert from Zod to Prisma
  const updateServiceCall: ServiceCall = {
    id,
    ...data
  };

  try {
    await serviceCallDB.update(updateServiceCall);
    return { message: 'Service Call updated successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during update: ${errorMessage}`);
  }
}

export async function deleteOne(id: number) {
  try {
    await serviceCallDB.deleteServiceCall(id);
    return { message: 'Service Call deleted successfully' };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during deleteOne: ${errorMessage}`);
  }
}

export async function search(searchBody: SearchSchema) {
  try {
    const searchData = serviceCallDB.search(searchBody);
    if (!searchData) {
      throw new Error('No Service Call from search found.');
    }
    return searchData;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during search: ${errorMessage}`);
  }
}
