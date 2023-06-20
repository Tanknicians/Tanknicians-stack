import express from 'express';
import { uploadServiceCall } from './MobileFormService';
import { authenticateRoleMiddleWare } from 'src/Authentication/AuthService';

const mobileFormRouter = express.Router();
mobileFormRouter.use(express.json());

// Create Login
mobileFormRouter.post("/uploadForm", authenticateRoleMiddleWare(["ADMIN", "EMPLOYEE"]), async (req, res) => {
  try {
    const input = req.body; // should probably add a types.ts object here 
    await uploadServiceCall(input);
    res.status(200).json({ success: "Form uploaded."});
  } catch (error) {
    res.status(500).json({ error: "Failed to create Login" });
  }
});

export default mobileFormRouter;
