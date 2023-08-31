const Room =require("../../models/Room");
const Hotel =require("../../models/Hotel.js");
const createRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err) {
        res.status(400).json(err.message)
      }
      res.status(200).json(savedRoom);
    } catch (err) {
        res.status(400).json(err.message)
    }
  };

const updateRoom = async (req, res) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(400).json(err.message)
    }
  };
  

  module.exports={createRoom,updateRoom}