const express=require("express");
const {updateUser,getUsers,getUser,deleteUser}=require("../controllers/UserController/user")
const {verifyAdmin, verifyToken, verifyUser}=require("../utils/verifyToken")
const router=express.Router();
router.put("/:id",verifyUser,updateUser )
router.delete("/:id",verifyUser,deleteUser )
router.get("/:id",verifyUser,getUser )
router.put("/",verifyAdmin,getUsers )

module.exports=router;