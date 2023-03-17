/*

import { Form } from "@prisma/client";
import { Request, Response } from "express";
import * as formDB from "../../prisma/db/Form";

export async function getAllFormsService(req: Request, res: Response) {
  // add auth function here so data isn't sent freely ?

  const allForms = await formDB.getAllForms();

  if (allForms[0] != null) {
    res.send(allForms);
  } else {
    res.send("No forms can be sent.");
  }
}

export async function findFormService(req: Request, res: Response) {
  // add auth function here so data isn't sent freely ?

  const emptyForm: Form = {
    id: req.body.id,
    approved: false,
    created: new Date(),
    request: "",
    customerId: 0,
    employeeId: 0,
    parametersId: 0,
    tankId: 0,
  };

  const foundForm = formDB.findForm(emptyForm);

  if (foundForm != null) {
    res.send(foundForm);
  } else {
    res.send("Form not found.");
  }
}

*/