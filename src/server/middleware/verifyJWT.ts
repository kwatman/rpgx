import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string;
  roles?: string[];
}

export default (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = (req.headers.authorization ||
    req.headers.Authorization) as any;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user = decoded.user_info.username;
      req.roles = decoded.user_info.roles;
      next();
    }
  );
};
