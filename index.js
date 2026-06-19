const express = require("express");
const app = express();

const {initializeDatabase} = require("./db/db.connect");
const Hotel = require("./models/hotel.models");

app.use(express.json());

initializeDatabase();

async function createHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveHotel = await hotel.save();
        return saveHotel;
    }catch(error){
        throw error;
    }

}

//post call
app.post("/hotels", async(req,res)=>{
    try{
        const hotelSaved = await createHotel(req.body);
        res.status(201).json({message:"Hotel added Successfully.",hotel:hotelSaved});
    }catch(error){
        res.status(500).json({error:"Failed to add hotel."})
    }
})

//Task1

async function readAllHotels(){
    try{
    const hotels = await Hotel.find();
      return hotels;
    }catch(error){
        throw error;
    }
}

app.get("/hotels", async(req,res)=>{
    try{
  const hotels = await readAllHotels();
  if(hotels.length !=0){
    res.json(hotels);
  }else{
    res.status(400).json({error:"Hotel Not Found."})
  }
    }catch(error){
    res.status(500).json({error:"Error Ocurred while Fetching Data"})
    }
})

//Task2

async function readHotelByName(hotelName){
    try{
        const hotels = await Hotel.findOne({name:hotelName});
        return hotels;
    }catch(error){
        throw error;
    }
}

app.get("/hotels/:hotelName", async(req,res)=>{
    try{
        const hotel = await readHotelByName(req.params.hotelName)
        if(hotel){
            res.json(hotel);
        }else{
        res.status(404).json({error:"Hotel Not Found"});
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While loading Data"})
    }
})

//Task 3

async function hotelsByPhone(phoneNumber){
    try{
        const hotels = await Hotel.findOne({phoneNumber});
        return hotels;
    }catch(error){
        throw error;
    }
}

app.get("/hotels/directory/:phoneNumber", async(req,res)=>{
    try{
        const hotels = await hotelsByPhone(req.params.phoneNumber)
        if(hotels){
            res.json(hotels)
        }else{
            res.status(404).json({error:"Hotel Not Found."})
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While Fetching Data"})
    }
})

//Task 4

async function hotelsByRating(hotelRating){
    try{
        const hotels = await Hotel.find({rating:hotelRating});
        return hotels;
    }catch(error){
        throw error;
    }
}

app.get("/hotels/rating/:hotelRating", async(req,res)=>{
        try{
            const hotel = await hotelsByRating(req.params.hotelRating);
            if(hotel.length !=0){
                res.json(hotel)
            }else{
                res.status(400).json({error:"Hotel Not Found"})
            }
        }catch(error){
            res.status(500).json({error:"Error Occurred while fetching Data"})
        }
})


//Task5:

async function hotelsByCategory(hotelCategory){
        try{
            const hotelsByCategory = await Hotel.find({category:hotelCategory});
            return hotelsByCategory;
        }catch(error){
            throw error;
        }
}

app.get("/hotels/category/:hotelCategory", async(req,res)=>{
    try{
        const hotels = await hotelsByCategory(req.params.hotelCategory)
        if(hotels.length !=0){
            res.json(hotels);
        }else{
            res.status(404).json({error:"Hotel Not Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While Fetching Data"});
    }
})

//Delete function and API
async function deleteHotel(hotelId){
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
        return deleteHotel;
    }catch(error){
        console.log(error);
    }
}

app.delete("/hotels/:hotelId",async(req,res)=>{
    try{
        const deletedHotel = await deleteHotel(req.params.hotelId)
        if(deletedHotel){
         res.status(200).json({message:"Hotel deleted Successfully."})
        }else{
        res.status(404).json({error:"Hotel not Found"});
        }
       
    }catch(error){
        res.status(500).json({error:"Failed to delete Hotel"})
    }
})

const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
})