// required imports: Express and Prisma Database
import express, { Request, Response } from "express";
import { findFormService, getAllFormsService } from "./FormService";
import { findCustomerService, getAllCustomersService } from "./CustomerService";

const dataRouter = express.Router();

// REQUIRED TO INTERPRET JSON FROM HTTP REQUEST BODY
dataRouter.use(express.json());

dataRouter.post("/form/getall", async (req: Request, res: Response) => {
  console.log("Form.GetAll invoked.");
  await getAllFormsService(req, res);
});

dataRouter.post("/form/find", async (req: Request, res: Response) => {
  console.log("Form.Find invoked.");
  await findFormService(req, res);
});

dataRouter.post("/customer/getall", async (req: Request, res: Response) => {
  console.log("Customer.GetAll invoked.");
  await getAllCustomersService(req, res);
});

dataRouter.post("/customer/find", async (req: Request, res: Response) => {
  console.log("Customer.Find invoked.");
  await findCustomerService(req, res);
});

// export the routes
export = dataRouter;
