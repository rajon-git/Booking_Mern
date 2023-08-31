
const Hotel=require("../../models/Hotel");


//create hotel
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


//update hotel 

const updateHotel =async(req,res)=>{
    try{
        const updatedHotel= await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedHotel);
    }catch(error){
        res.status(500).json(error)
    }
}


module.exports={createHotel,updateHotel}