import {Request,Response} from "express";
import { prisma } from "../libs/PrismaDb";

export const  createPlayList = async (req: Request, res: Response): Promise<any> => {
    try {
        const {name ,description} = req.body;
        const userId = req.user?.id; // Assuming you have user ID in req.user

        const playlist= await prisma.playlist.create({
            // @ts-ignore
            data:{
                name,
                description,
                userId
            }
        });

        return res.status(201).json({
            success: true,
            message: "Playlist created successfully",
            playlist
        });
    } catch (error) {
        console.error("Error in creating playlist:", error);
        return res.status(500).json({
            success: false,
            message: "Error in creating playlist",
            error: error
        });

    }

        
  
}


export const getPlayListById = async (req: Request, res: Response): Promise<any> => {}


export const getAllListDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const playlist =await prisma.playlist.findMany({
            where:{
                userId:req.user?.id 
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })

        return res.status(200).json({
            success: true,
            message: "Playlists fetched successfully",
            playlists: playlist
        })
        
    } catch (error) {
        console.error("Error in fetching playlists:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching playlists",
            error: error
        });
        
    }


}



export const addProblemToPlaylist = async (req: Request, res: Response): Promise<any> => {}

export const deletePlaylist = async (req: Request, res: Response): Promise<any> => {}

export const removeProblemFromPlaylist = async (req: Request, res: Response): Promise<any> => {}
