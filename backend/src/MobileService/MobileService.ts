import { serviceCallDB } from "../../prisma/db/ServiceCall";
import { ServiceCall } from "../zodTypes";

export async function uploadServiceCall(serviceCall: ServiceCall) {
  const submitServiceCall = checkServiceCall(serviceCall);
  const approvedMessage = serviceCall.isApproved ? 'approved' : 'not approved';
  try {
    await serviceCallDB.create(submitServiceCall);
    return approvedMessage;
  } catch (e) {
    throw new Error('An error occurred during create.');
  }
}

// run checks on the service call and make sure parameters are valid
function checkServiceCall(serviceCall: ServiceCall): ServiceCall {
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
  }
  // return the flagged/unflagged service call
  return serviceCall;
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
  phosphateMax: 0.24
};

// removed unused code
