import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {
  //  * creating the data
  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;

      const group = await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });

      return res.json({
        message: "Chat Group created successfully",
        data: group,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. please try again!" });
    }
  }

  // * find all data of group
  static async index(req: Request, res: Response) {
    try {
      const user = req.user;

      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return res.json({
        message: "Chat Groups fetch successfully",
        data: groups,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. please try again!" });
    }
  }

  // * find the unique
  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const groups = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });

      return res.json({
        message: "Chat Group fetch successfully",
        data: groups,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. please try again!" });
    }
  }
  // * updated the data
  static async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const { id } = req.params;

      const groups = await prisma.chatGroup.update({
        data: {
          title: body.title,
          passcode: body.passcode,
        },
        where: {
          id: id,
        },
      });

      return res.json({
        message: "Chat Group updated successfully",
        data: groups,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. please try again!" });
    }
  }
  // * deleting the group chat
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });

      return res.json({
        message: "Chat Group delete successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. please try again!" });
    }
  }
}

export default ChatGroupController;
