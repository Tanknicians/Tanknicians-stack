import * as Prisma from "@prisma/client";
import { serviceCallDB } from "prisma/db/ServiceCall";
import { TRPCError } from "@trpc/server";

export async function uploadServiceCall(
  serviceCall: Omit<Prisma.ServiceCall, "id">,
) {
  const submitServiceCall = await checkServiceCall(serviceCall);
  try {
    await serviceCallDB.create(submitServiceCall);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during create.",
      cause: e,
    });
  }
}

// run checks on the service call and make sure parameters are valid
export async function checkServiceCall(
  serviceCall: Omit<Prisma.ServiceCall, "id">,
) {
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
  // return the flagged/unflagged service call
  return serviceCall;
}

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
