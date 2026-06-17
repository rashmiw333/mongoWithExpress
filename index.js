const express = require("express");
const app = express();

const {initializeDatabase} = require("./db/db.connect");
const Hotel = require("./models/hotel.models");

app.use(express.json());

initializeDatabase();

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
  if(hotels){
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
            if(hotel){
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
        if(hotels){
            res.json(hotels);
        }else{
            res.status(404).json({error:"Hotel Not Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred While Fetching Data"});
    }
})


const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
})