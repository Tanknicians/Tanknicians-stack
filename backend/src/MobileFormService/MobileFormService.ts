import * as Prisma from "@prisma/client";
import { serviceCallDB } from "prisma/db/ServiceCall";
import { TRPCError } from "@trpc/server";



export async function uploadServiceCall(serviceCall: Omit<Prisma.ServiceCall, "id">) {
  

}

// run checks on the service call and make sure parameters are valid
export async function checkServiceCall(serviceCall: Omit<Prisma.ServiceCall, "id">) {

    // No error checking needed if previous do not exist. New customers won't have previous service call forms.
    const previousServiceCalls = await serviceCallDB.readLatest(serviceCall.tankId)

    if (previousServiceCalls.length > 0) {
        const i = previousServiceCalls.length;
        const averages = {
          alkalinity: previousServiceCalls.reduce((total, serviceCall) => total + serviceCall.alkalinity, 0) / i,
          calcium: previousServiceCalls.reduce((total, serviceCall) => total + serviceCall.calcium, 0) / i,
          nitrate: previousServiceCalls.reduce((total, serviceCall) => total + serviceCall.nitrate, 0) / i,
          phosphate: previousServiceCalls.reduce((total, serviceCall) => total + serviceCall.phosphate, 0) / i
        };
      
        if (Math.abs(averages.alkalinity - serviceCall.alkalinity) > delta.alkalinity
          || Math.abs(averages.calcium - serviceCall.calcium) > delta.calcium
          || Math.abs(averages.nitrate - serviceCall.nitrate) > delta.nitrate
          || Math.abs(averages.phosphate - serviceCall.phosphate) > delta.phosphate) {
          serviceCall.isApproved = false;
        }
      }
      

    /* 
        the function could also be generating a log of which of the specified parameters are out of range ?

        primary goal: compare to 'reasonable' min-max ranges and set the "isApproved" boolean to true/false

            make sure EmployeeID and TankMetadataID exist both in the object and serverside, else it will be thrown into a void of non-relation and lost forever

    */
}


// const for valid parameters

// const for valid delta (0.1 delta off average okay? etc)
// this needs to be updated for actual proper deltas 
const delta = {
    alkalinity: 0.1,
    calcium: 0.1,
    nitrate: 0.1,
    phosphate: 0.1,
}

/*
min, max, and previous?

  alkalinity Float
  calcium    Float
  nitrate    Float
  phosphate  Float

*/