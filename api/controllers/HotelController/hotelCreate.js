
const Hotel=require("../../models/Hotel");

const createHotel = async (req, res) => {
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(201).json(saveHotel);
    } catch (error) {
        console.error("Error creating hotel:", error);
        res.status(500).json(error);
    }
}


module.exports={createHotel}