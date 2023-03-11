import { Customer } from "@prisma/client";
import { Request, Response } from "express";
import * as formDB from "../../prisma/db/Customer";
import { all } from "./DataRoutes";

// this is for my own use, can be deleted later
const defaultForm: Customer = {
  id: 0,
  firstName: null,
  middleName: null,
  lastName: null,
  address: null,
  email: null,
  phone: null,
};

export async function getAllCustomersService(req: Request, res: Response) {
  // add auth function here so data isn't sent freely ?

  let allCustomers = await formDB.getAllCustomers();

  if (allCustomers[0] != null) {
    res.send(allCustomers);
  } else {
    res.send("No forms can be sent.");
  }
}

export async function findCustomerService(req: Request, res: Response) {
  // add auth function here so data isn't sent freely ?

  const customer: Customer = {
    id: req.body.id,
    firstName: null,
    middleName: null,
    lastName: null,
    address: null,
    email: null,
    phone: null,
  };

  let foundCustomer = formDB.findCustomer(customer);

  if (foundCustomer != null) {
    res.send(foundCustomer);
  } else {
    res.send("Customer not found.");
  }
}
