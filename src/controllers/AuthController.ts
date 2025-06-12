import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}
class AuthController {
  static async login(request: Request, response: Response) {
    // Trying to find the user if avilable
    try {
      const body: LoginPayloadType = request.body;

      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        await prisma.user.create({
          data: body,
        });
      }

      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      let token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return response.json({
        message: "Logged In Succesfully!",

        user: {
          ...findUser,
          token: `Brarer ${token}`,
        },
      });
    } catch (error) {
      response
        .status(500)
        .json({ message: "Something went wrong in Login!... Try again" });
    }
  }
}

export default AuthController;
