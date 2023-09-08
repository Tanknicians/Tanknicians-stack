import { serviceCallDB } from '../../prisma/db/ServiceCall';
import { ServiceCall } from '../zodTypes';

export async function uploadServiceCall(serviceCall: ServiceCall) {
  if (!serviceCall.notApprovedNotes) {
    serviceCall.notApprovedNotes = "";
  }
  checkTankId(serviceCall);
  checkParameterLimits(serviceCall);
  const approvedMessage = serviceCall.isApproved ? 'approved' : 'not approved';
  try {
    await serviceCallDB.create(serviceCall);
    return approvedMessage;
  } catch (e) {
    throw new Error('An error occurred during create.');
  }
}

// make sure the Tank ID exists in the service call
function checkTankId(serviceCall: ServiceCall) {

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
function checkParameterLimits(serviceCall: ServiceCall) {
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
  phosphateMax: 0.24,
};

// removed unused code
