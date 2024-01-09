import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../model/userModel";

interface AuthRequest extends Request {
  user?: IUser;
}

const secretKey = "TechMateSecret";

export const authCheck = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  try {
    const decoded = (await jwt.verify(
      tokenWithoutBearer,
      secretKey
    )) as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const freshUser: IUser | null = await User.findById(decoded.userId);

    if (!freshUser) {
      return res
        .status(401)
        .json({ error: "This token does not belong to any user" });
    }

    req.user = freshUser;
    next();
  } catch (error: any) {
    return res.status(401).json({ error: "Token verification failed" });
  }
};
