import * as Prisma from "@prisma/client";
import { serviceCallDB } from "prisma/db/ServiceCall";
import { TRPCError } from "@trpc/server";



export async function uploadServiceCall(serviceCall: Omit<Prisma.ServiceCall, "id">) {
  

}

// run checks on the service call and make sure parameters are valid
export function checkServiceCall(serviceCall: Omit<Prisma.ServiceCall, "id">){

    

}


// const for valid parameters

