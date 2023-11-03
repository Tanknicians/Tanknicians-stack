import { tankDB } from '../../prisma/db/TankMetadata';
import { serviceCallDB } from '../../prisma/db/ServiceCall';
import {
  CreateServiceCall,
  MobileServiceCall,
  RefreshToken,
} from '../zodTypes';
import { ServiceCall } from '@prisma/client';
import { generateToken, verifyRefreshToken } from '../Token/Generator';
import { loginDB } from '../../prisma/db/Login';

const paramLimits = {
  /*
    a.    Calcium at or below 400 and at or above 500 
    b.    Alkalinity at or below 6.5 and at or above 11
    c.    Nitrate at or below 1 and at or above 20
    d.    Phosphate at or below .03 and at or above .24
  */
  calciumMin: 400,
  calciumMax: 500,
  alkalinityMin: 6.5,
  alkalinityMax: 11,
  nitrateMin: 1,
  nitrateMax: 20,
  phosphateMin: 0.03,
  phosphateMax: 0.24
};

export async function uploadServiceCall(data: MobileServiceCall) {
  const createServiceCall: Omit<ServiceCall, 'id'> = {
    ...data,
    notApprovedNotes: '',
    isApproved: true
  };

  checkTankId(createServiceCall);
  checkParameterLimits(createServiceCall);
  const approvedMessage = createServiceCall.isApproved
    ? 'approved'
    : 'not approved';
  // Update Tank's "lastDateServiced" to serviceCall's "createdOn" and upload ServiceCall
  try {
    const updateTank = await tankDB.read(createServiceCall.tankId);
    if (!updateTank) {
      throw new Error(`No tankId of ${createServiceCall.tankId} found.`);
    }
    updateTank.lastDateServiced = createServiceCall.createdOn;
    await serviceCallDB.create(createServiceCall);
    await tankDB.update(updateTank);
    return approvedMessage;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during create: ${errorMessage}`);
  }
}

// make sure the Tank ID exists in the service call
function checkTankId(serviceCall: CreateServiceCall) {
  if (
    serviceCall.tankId == null ||
    serviceCall.tankId === undefined ||
    serviceCall.tankId < 1
  ) {
    serviceCall.tankId = 0;
    serviceCall.isApproved = false;
    serviceCall.notApprovedNotes +=
      'No tankID was recorded. Check QR code for damage.';
  }
}

// run checks on the service call and make sure parameters are valid
function checkParameterLimits(serviceCall: CreateServiceCall) {
  const { alkalinity, calcium, nitrate, phosphate } = serviceCall;
  if (
    alkalinity < paramLimits.alkalinityMin ||
    alkalinity > paramLimits.alkalinityMax ||
    calcium < paramLimits.calciumMin ||
    calcium > paramLimits.calciumMax ||
    nitrate < paramLimits.nitrateMin ||
    nitrate > paramLimits.nitrateMax ||
    phosphate < paramLimits.phosphateMin ||
    phosphate > paramLimits.phosphateMax
  ) {
    serviceCall.isApproved = false;
    serviceCall.notApprovedNotes +=
      'One or more of the parameters (Alkalinity, Calcium, Nitrate, and/or Phosphate) outside of acceptable range.';
  }
}

export async function mobileRefresh(refreshToken: string) {

  let decryptToken: RefreshToken;

  try {
    decryptToken = verifyRefreshToken(refreshToken);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during decrypt token: ${errorMessage}`);
  }

  const foundCredentials = await loginDB.read(decryptToken.data.email);

  if (!foundCredentials) {
    throw new Error(`Credentials not found.`);
  }

  try {
    return generateToken(foundCredentials);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error.';
    console.error(errorMessage);
    throw new Error(`An error occurred during generate token: ${errorMessage}`);
  }
}