import { Form } from "@prisma/client";
import { Request, Response } from "express";
import * as formDB from "../../prisma/db/Form";
import { all } from "./DataRoutes";

// this is for my own use, can be deleted later
const defaultForm: Form = {
    id: 0,
    approved: false,
    created: new Date(),
    request: null,
    customerId: 0,
    employeeId: 0
};

export async function getAllFormsService(req: Request, res: Response){

    // add auth function here so data isn't sent freely ?

    let allForms = await formDB.getAllForms()

    if (allForms[0] != null) {
        res.send(allForms)
    } else {
        res.send("No forms can be sent.")
    }
}


export async function findFormService(req: Request, res: Response){

    // add auth function here so data isn't sent freely ?

    const emptyForm: Form = {
        id: req.body.id,
        approved: false,
        created: new Date(),
        request: "",
        customerId: 0,
        employeeId: 0
    };

    let foundForm = formDB.findForm(emptyForm)

    if (foundForm != null) {
        res.send(foundForm)
    } else {
        res.send("Form not found.")
    }
}




