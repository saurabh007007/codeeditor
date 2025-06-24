import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import { prisma } from "../libs/PrismaDb";
import { UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";


//register Routes
export const register = async (
  req: Request,
  res: Response
):Promise<any> => {
  const { email, password, name } = req.body;

  try {
    const exuistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exuistingUser) {
     return  res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token,{httpOnly:true,
      sameSite: "strict", // Adjust as necessary
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds

    } )

   return  res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image || null, // Handle optional image field
      },
    });
  } catch (error: any) {
    console.log(error.message);
   return  res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//login Routes
export const login = async (
  req: Request,
  res: Response
) :Promise<any>  => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User Not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token,{
      httpOnly:true,
      sameSite: "strict", // Adjust as necessary
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      
    } )
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image || null, // Handle opti`onal image field
      },
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      message: "Error In login",
      error: error.message,
    });
  }
};

//logout routes
export const logout = async (req: Request, res: Response):Promise<any> => {
  try{
    res.clearCookie("jwt",{
      httpOnly:true,
      sameSite:"strict",
      secure:process.env.NODE_ENV!== "development"
    })

    return res.status(204).json({
      message:"User Logout succesfully ",
      success:true
    })

  }catch(error: any) {
    console.log(error.message);
    return res.status(500).json({
      message: "Error in logout",
      error: error.message,
    });
  }



};

// check routes
export const check = async (req: Request, res: Response):Promise<any> => {
  try{
    res.status(200).json({
      success:true,
      message:"User authenticated successfully"
    })

  }catch(error:any){

  }
};
