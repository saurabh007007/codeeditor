import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/PrismaDb";

export const authMiddeware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unathorized - no token provided",
        success: false,
      });
    }
    let decoded;
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error(" JWT IS NOT DEFINED");
      }
      decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token ",
        success: false,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error in authentication", error);
    res.status(500).json({
      message: "Error in authentication user",
    });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        message:
          "Forbidden - You do not have permission to access this resource NOT ADMIN",
        success: false,
      });
    }
    next();
  } catch (error: any) {
    console.log("Error in isAdmin middleware", error);
    res.status(500).json({
      message: "Error in isAdmin middleware",
    });
  }
};
