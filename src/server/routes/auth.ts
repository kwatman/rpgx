import { Router, Request, Response } from "express";
import { User } from "../models/User";
import AuthController from "../controllers/AuthController";
import jwt, { Secret } from "jsonwebtoken";
const router = Router();
import dotenv from "dotenv";
import UserController from "../controllers/UserController";
dotenv.config();

router.post("/register", (req: Request, res: Response) => {
  const user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  AuthController.register(user);
  res.send("User registered!");
});

//TODO change secure from false to true on both login and refresh
router.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await UserController.getByUsername(username);
  if (user === null) {
    res.status(401).send("Invalid credentials!");
    return;
  }
  if (await AuthController.login(user, password)) {
    const accessToken = jwt.sign(
      {
        user_info: {
          username: user.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.status(401).send("Invalid credentials!");
    return;
  }
});

router.get("/refresh", (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret,
    (err: any, decoded: any) => {
      if (err) {
        console.log("expired refresh token");
      }
      const accessToken = jwt.sign(
        {
          user_info: {
            username: decoded.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: "10m" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    }
  );
});

export default router;
