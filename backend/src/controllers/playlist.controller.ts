import { Request, Response } from "express";
import { prisma } from "../libs/PrismaDb";

export const createPlayList = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description } = req.body;
        const userId = req.user?.id; // Assuming you have user ID in req.user

        const playlist = await prisma.playlist.create({
            // @ts-ignore
            data: {
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


export const getPlayListById = async (req: Request, res: Response): Promise<any> => {
    const { playlistId } = req.params;

    try {
        const playList = await prisma.playlist.findUnique({
            where: { id: playlistId, userId: req.user?.id },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });

        if (!playList) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        res.status(200).json({
            success: true,
            message: "Playlist fetched successfully",
            playList,
        });
    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json({ error: "Failed to fetch playlist" });
    }
}


export const getAllListDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const playlist = await prisma.playlist.findMany({
            where: {
                userId: req.user?.id
            },
            include: {
                problems: {
                    include: {
                        problem: true
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



export const addProblemToPlaylist = async (req: Request, res: Response): Promise<any> => {
    const { playlistId } = req.params;
    const { problemId } = req.body;

    try {
        if (!Array.isArray(problemId) || problemId.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Problem ID is required and should be an array"
            });
        }

        // ✅ Step 1: Validate existence of problems in DB
        const existingProblems = await prisma.problem.findMany({
            where: {
                id: {
                    in: problemId
                }
            },
            select: { id: true }
        });

        const existingProblemIds = existingProblems.map(p => p.id);
        const missing = problemId.filter(id => !existingProblemIds.includes(id));

        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Some problem IDs do not exist in the database",
                missingProblemIds: missing
            });
        }

        // ✅ Step 2: Insert into ProblemInPlaylist
        const problemsInPlaylist = await prisma.problemInPlaylist.createMany({
            data: problemId.map((id: string) => ({
                playlistId,
                problemId: id
            }))
        });

        return res.status(201).json({
            success: true,
            message: "Problems added to playlist successfully",
            problemsInPlaylist
        });

    } catch (error) {
        console.error("Error in adding problem to playlist:", error);
        return res.status(500).json({
            success: false,
            message: "Error in adding problem to playlist",
            error
        });
    }


}

export const deletePlaylist = async (req: Request, res: Response): Promise<any> => {
    const { playlistId } = req.params;
    try {
        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id: playlistId
            }
        });
        return res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            deletedPlaylist
        });
    } catch (error) {
        console.error("Error in deleting playlist:", error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting playlist",
            error: error
        });
    }
}

export const removeProblemFromPlaylist = async (req: Request, res: Response): Promise<any> => {
    const { playlistId } = req.params;
    const { problemId } = req.body;
    try {
        if (!Array.isArray(problemId) || problemId.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Problem ID is required and should be an array"
            });
        }
        const deleteProblems = await prisma.problemInPlaylist.deleteMany({
            where: {
                playlistId,
                problemId: {
                    in: problemId
                },
            },
        });
        return res.status(200).json({
            success: true,
            message: "Problem removed from playlist successfully",
            deleteProblems
        });


    } catch (error) {
        console.error("Error in removing problem from playlist:", error);
        return res.status(500).json({
            success: false,
            message: "Error in removing problem from playlist",
            error: error
        });
    }
}
