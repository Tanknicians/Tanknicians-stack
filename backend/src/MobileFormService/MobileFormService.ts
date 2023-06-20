import * as Prisma from "@prisma/client";
import { serviceCallDB } from "prisma/db/ServiceCall";

export async function uploadServiceCall(serviceCall: Omit<Prisma.ServiceCall, "id">): Promise<void> {
  const submitServiceCall = checkServiceCall(serviceCall);
  try {
    await serviceCallDB.create(submitServiceCall);
  } catch (e) {
    throw new Error("An error occurred during create.");
  }
}

// run checks on the service call and make sure parameters are valid
function checkServiceCall(
  serviceCall: Omit<Prisma.ServiceCall, "id">,
): Omit<Prisma.ServiceCall, "id"> {
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
  phosphateMax: 0.24,
};


// currently unused code
// Standard deviation calculations, takes in an array of Service Calls without "id"
function calculateStandardDeviation(data: Omit<Prisma.ServiceCall, "id">[]): {
  nitrate: number;
  phosphate: number;
  calcium: number;
  alkalinity: number;
} {
  // Calculate the mean values for nitrate, phosphate, calcium, and alkalinity
  const meanValues = data.reduce(
    (params, current) => {
      params.alkalinity += current.alkalinity;
      params.calcium += current.calcium;
      params.nitrate += current.nitrate;
      params.phosphate += current.phosphate;
      return params;
    },
    { alkalinity: 0, calcium: 0, nitrate: 0, phosphate: 0 },
  );

  meanValues.nitrate /= data.length;
  meanValues.phosphate /= data.length;
  meanValues.calcium /= data.length;
  meanValues.alkalinity /= data.length;

  // Calculate the sum of squared differences from the mean
  const squaredDifferences = data.reduce(
    (params, current) => {
      const nitrateDiff = current.nitrate - meanValues.nitrate;
      const phosphateDiff = current.phosphate - meanValues.phosphate;
      const calciumDiff = current.calcium - meanValues.calcium;
      const alkalinityDiff = current.alkalinity - meanValues.alkalinity;
      params.nitrate += nitrateDiff * nitrateDiff;
      params.phosphate += phosphateDiff * phosphateDiff;
      params.calcium += calciumDiff * calciumDiff;
      params.alkalinity += alkalinityDiff * alkalinityDiff;
      return params;
    },
    { nitrate: 0, phosphate: 0, calcium: 0, alkalinity: 0 },
  );

  // Calculate the standard deviation using the non-population formula
  const standardDeviation = {
    // note: this is where we need 2 or more pieces of data, due to "data.length-1", cannot divide by 0.
    nitrate: Math.sqrt(squaredDifferences.nitrate / (data.length - 1)),
    phosphate: Math.sqrt(squaredDifferences.phosphate / (data.length - 1)),
    calcium: Math.sqrt(squaredDifferences.calcium / (data.length - 1)),
    alkalinity: Math.sqrt(squaredDifferences.alkalinity / (data.length - 1)),
  };
  return standardDeviation;
}

/* This code used to be part of the MobileFormService "checkServiceCall" code, may be recycled later.
// No error checking needed if previous do not exist. New customers won't have previous service call forms.
  const previousServiceCalls = await serviceCallDB.readLatest(
    serviceCall.tankId,
  );
  // need at least 2 service calls to find deltas
  if (previousServiceCalls.length > 1) {
    const i = previousServiceCalls.length;
    const averages = {
      alkalinity:
        previousServiceCalls.reduce(
          (total, serviceCall) => total + serviceCall.alkalinity,
          0,
        ) / i,
      calcium:
        previousServiceCalls.reduce(
          (total, serviceCall) => total + serviceCall.calcium,
          0,
        ) / i,
      nitrate:
        previousServiceCalls.reduce(
          (total, serviceCall) => total + serviceCall.nitrate,
          0,
        ) / i,
      phosphate:
        previousServiceCalls.reduce(
          (total, serviceCall) => total + serviceCall.phosphate,
          0,
        ) / i,
    };
    // calculate standard deviation of previous service calls
    const standardDeviation = calculateStandardDeviation(previousServiceCalls);
    // if there are any deltas that are greater than the standard deviation, flag the service call
    if (
      Math.abs(averages.alkalinity - serviceCall.alkalinity) >
        standardDeviation.alkalinity ||
      Math.abs(averages.calcium - serviceCall.calcium) >
        standardDeviation.calcium ||
      Math.abs(averages.nitrate - serviceCall.nitrate) >
        standardDeviation.nitrate ||
      Math.abs(averages.phosphate - serviceCall.phosphate) >
        standardDeviation.phosphate
    ) {
      serviceCall.isApproved = false;
    }
  }

*/
