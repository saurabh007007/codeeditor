import bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
import { prisma } from "../libs/PrismaDb"
import { UserRole } from '@prisma/client';
import jwt from 'jsonwebtoken';

//register Routes
export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
        const exuistingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(exuistingUser){
            res.status(400).json({
                message:"User already exists"
    
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            
            }
        })
        const token =jwt.sign({id:newUser.id},process.env.JWT_SECRET as string,{
            expiresIn:"7d"
        })
        
        res.cookie("jwt",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Adjust as necessary
            maxAge:7*24*60*60*1000 // 7 days in milliseconds
        })

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                image: newUser.image || null, // Handle optional image field
            },
        })



    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }





}




//login Routes
export const login = async (req: Request, res: Response) => { }



//logout routes 
export const logout = async (req: Request, res: Response) => { }



// check routes
export const check = async (req: Request, res: Response) => { }