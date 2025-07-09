import express from "express";
import { authMiddeware } from "../middleware/auth.middleware";
import { addProblemToPlaylist, createPlayList, deletePlaylist, getAllListDetails, getPlayListById, removeProblemFromPlaylist } from "../controllers/playlist.controller";

const playListRoutes = express.Router();

playListRoutes.get("/",authMiddeware,getAllListDetails);

playListRoutes.get("/:playlistId",authMiddeware,getPlayListById);

playListRoutes.post("/create-playlist",authMiddeware,createPlayList);

playListRoutes.post("/:playlistId/add-problem",authMiddeware,addProblemToPlaylist);

playListRoutes.delete("/:playlistId",authMiddeware,deletePlaylist );

playListRoutes.delete("/:playlistId/remove-problem/:problemId",authMiddeware,removeProblemFromPlaylist);

export default playListRoutes;