const express=require("express");
const {createRoom}=require("../controllers/RoomController/room")
const { verifyAdmin } =require ("../utils/verifyToken");
const router=express.Router();
router.post("/:hotelid",verifyAdmin, createRoom )

module.exports=router;