import { Router, Request, Response } from "express";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.send("Server is running!");
});

router.use(verifyJWT);
router.get("/authstatus", (req: Request, res: Response) => {
  res.send({ status: "authorized" });
});

export default router;
