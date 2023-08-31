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

const updateRoomAvailability = async (req, res) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
        res.status(400).json(err.message)
    }
  };

const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        res.status(400).json(err.message)
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
        res.status(400).json(err.message)
    }
  };

const getRoom = async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
        res.status(400).json(err.message)
    }
  };
const getRooms = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
        res.status(400).json(err.message)
    }
  }
  
  module.exports={createRoom,updateRoom, updateRoomAvailability, deleteRoom, getRoom}