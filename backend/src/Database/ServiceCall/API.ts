import { serviceCallDB } from '../../../prisma/db/ServiceCall';
import { tankDB } from '../../../prisma/db/TankMetadata';
import {
  CreateServiceCall,
  UpdateServiceCall,
  UpdateTankMetaData,
  tankMetaDataSchema,
} from '../../zodTypes';

export async function create(serviceCall: CreateServiceCall) {
  // Update Tank's "lastDateServiced" to serviceCall's "createdOn" and upload ServiceCall
  try {
    const readTank = await tankDB.read(serviceCall.tankId);
    if (!readTank) {
      throw new Error(`No tankId of ${serviceCall.tankId} found.`);
    }
    const updateTank: UpdateTankMetaData = tankMetaDataSchema.parse(readTank);
    updateTank.lastDateServiced = serviceCall.createdOn;
    await serviceCallDB.create(serviceCall);
    await tankDB.update(updateTank);
    return { message: 'Service Call created successfully' };
  } catch (e) {
    throw new Error('An error occurred during create.');
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
    throw new Error('An error occurred during read.');
  }
}

export async function readAll(isApproved: boolean) {
  try {
    const serviceCalls = await serviceCallDB.getAll(isApproved);
    if (!serviceCalls) {
      throw new Error(`No service calls of isApproved = ${isApproved} found.`);
    }
    return serviceCalls;
  } catch (e) {
    throw new Error('An error occured during readAll.');
  }
}

export async function readAllByDate(
  tankId: number,
  startDate: Date,
  endDate: Date,
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
    throw new Error('An error occurred during read of range.');
  }
}

export async function readAllByTankId(tankId: number, isApproved: boolean) {
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
    console.log(e);
    throw new Error('An error occured during readAllByTankId');
  }
}

export async function update(serviceCall: UpdateServiceCall) {
  try {
    await serviceCallDB.update(serviceCall);
    return { message: 'Service Call updated successfully' };
  } catch (e) {
    throw new Error('An error occurred during update.');
  }
}

export async function deleteOne(id: number) {
  try {
    await serviceCallDB.deleteServiceCall(id);
    return { message: 'Service Call deleted successfully' };
  } catch (e) {
    throw new Error('An error occurred during delete.');
  }
}

export async function search(search: string, page: number) {
  try {
    const searchData = serviceCallDB.searchByString(search, page);
    if (!searchData) {
      throw new Error('No Service Call from search found.');
    }
    return searchData;
  } catch (e) {
    throw new Error('An error occurred during search.');
  }
}
