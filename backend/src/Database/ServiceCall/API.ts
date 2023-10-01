import { serviceCallDB } from '../../../prisma/db/ServiceCall';
import { tankDB } from '../../../prisma/db/TankMetadata';
import {
  CreateServiceCall,
  UpdateServiceCall,
  tankMetaDataSchema,
} from '../../zodTypes';

export async function create(serviceCall: CreateServiceCall) {
  // Update Tank's "lastDateServiced" to serviceCall's "createdOn" and upload ServiceCall
  try {
    const readTank = await tankDB.read(serviceCall.tankId);
    if (!readTank) {
      throw new Error(`No tankId of ${serviceCall.tankId} found.`);
    }
    const updateTank = tankMetaDataSchema.parse(readTank);
    updateTank.lastDateServiced = serviceCall.createdOn;
    await serviceCallDB.create(serviceCall);
    const createdId = await tankDB.update(updateTank);
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
  endDate?: Date,
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
      endDate,
    );
    if (serviceCalls === null) {
      throw new Error(`Service Calls for id: ${tankId} not found.`);
    }

    const returnData: ReturnDataSchema = {
      tankId: tankId,
      alkalinity: [],
      calcium: [],
      nitrate: [],
      phosphate: [],
    };

    serviceCalls.forEach((serviceCall) => {
      returnData.alkalinity.push([
        serviceCall.alkalinity,
        serviceCall.createdOn,
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
      isApproved,
    );
    if (!serviceCalls) {
      throw new Error(
        `Service Calls for id: ${tankId} and isApproved: ${isApproved} not found.`,
      );
    }

    // sort by datetime (I hate typescript/javascript sorting)
    serviceCalls.sort((a, b) => {
      const dateA = new Date(a.createdOn);
      const dateB = new Date(b.createdOn);
      return dateA.getTime() - dateB.getTime();
    });

    return serviceCalls;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(
      `An error occurred during readAllByTankId: ${errorMessage}`,
    );
  }
}

export async function update(serviceCall: UpdateServiceCall) {
  try {
    await serviceCallDB.update(serviceCall);
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

export async function search(
  page: number,
  size: number,
  searchString?: string,
  searchBool?: boolean,
  minNum?: number,
  maxNum?: number,
  minDate?: Date,
  maxDate?: Date
) {
  try {
    const searchData = serviceCallDB.search(
      page,
      size,
      searchString,
      searchBool,
      minNum,
      maxNum,
      minDate,
      maxDate
    );
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
