const express = require("express")
const app = express();

const {initializeDatabase} = require("./db/db.connect");
 const Restaurant = require("./models/restaurant.models");

 app.use(express.json());

initializeDatabase();

//Task 1 and Task2 to add data in db 
        const newRestaurant = {
            name: "Yo China",
            cuisine: ["Chinese", "Italian"],
            location: "MG Road, Bangalore",
            rating: 3.9,
            reviews: [],
            website: "https://yo-example.com",
            phoneNumber: "+1288997392",
            openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
            priceRange: "$$$ (31-60)",
            reservationsNeeded: true,
            isDeliveryAvailable: false,
            menuUrl: "https://yo-example.com/menu",
            photos: ["https://example.com/yo-photo1.jpg", "https://example.com/yo-photo2.jpg", "https://example.com/yo-photo3.jpg"]
};

        async function createRestaurant(newRestaurant){
            try{
                const restaurant = new Restaurant(newRestaurant);
                const saveRestaurant= await restaurant.save();
                return saveRestaurant;
            }catch(error){
                throw error;
            }
        }
           

//post call

app.post("/restaurants", async(req,res)=>{
    try{
    const restaurantSaved = await createRestaurant(req.body);
       res.status(201).json({message:"Restaurant added Successfully.",restauarant:restaurantSaved})
    }catch(error){
        res.status(500).json({error:"Failed to add Restaaurant"});
    }
})

async function readAllRestaturantsData(){
    try{
        const allRestaurants = await Restaurant.find();
        return allRestaurants;
    }catch(error){
        throw error;
    }
}
//Task1
app.get("/restuarants", async(req,res)=>{
    try{
        const restauarants = await readAllRestaturantsData()
        if(restauarants.length !=0){
            res.json(restauarants)
        }else{
            res.status(404).json({error:" Restaurant Not Found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch Restaurants."})
    }
})


//Task 2
async function readRestaurantsByname(restaurantName){
    try{
        const restaurantByName = await Restaurant.find({name:restaurantName});
        return restaurantByName;
    }catch(error){
        throw error;
    }
}

app.get("/restaurants/:restaurantName",async(req,res)=>{
    try{
        const restaurant = await readRestaurantsByname(req.params.restaurantName);
        if(restaurant.length !=0){
            res.json(restaurant);
        }else{
            res.status(404).json({error:"Restaurant Not Found"});
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch restaurants"})
    }
})

//Task 3: function to read phoneNumber

async function restaurantWithPhoneNumber(phoneNum){
    try{    
        const restaurantWithPhoneNum = await Restaurant.findOne({phoneNumber:phoneNum});
        return restaurantWithPhoneNum;
    }catch(error){
        throw error;
    }
}

app.get("/restaurants/directory/:phoneNumber",async(req,res)=>{
    try{
        const restaurant = await restaurantWithPhoneNumber(req.params.phoneNumber);
        if(restaurant){
            res.json(restaurant)
        }else{
            res.status(404).json({error:" Restaurant not Found"});
        }

    }catch(error){
        res.status(500).json({error:"Error caused while fetching error"})
    }
})

//Task 4: Read all restaurants by uisine ("Italian").

async function restaurantsWithCuisine(cuisineName){
    try{
        const restaurants = await Restaurant.find({cuisine:cuisineName})
        return restaurants;
    }catch(error){
        throw error;
    }
}

app.get("/restaurants/cuisine/:cuisineName",async(req,res)=>{
        try{
    const restaurants = await restaurantsWithCuisine(req.params.cuisineName);
    if(restaurants.length !=0){
        res.json(restaurants)
    }else{
        res.status(404).json({error:"Restaurant Not Found."})
    }
   }catch(error){
        res.status(500).json({error:"Error Occured while Fetching Data"});
   }
})

//Task5
async function readRestaurantsWithLocation(restaurantLocation){
    try{
    const restaurants = await Restaurant.find({location:restaurantLocation});
     return restaurants;
    }catch(error){
        throw error;
    }
}

app.get("/restaurants/location/:restaurantLocation", async(req,res)=>{
    try{
        const restaurant = await readRestaurantsWithLocation(req.params.restaurantLocation)
        if(restaurant.length !=0){
            res.json(restaurant);
        }else{
            res.status(404).json({error:"Restaurant Not Found."});
        }
    }catch(error){
        res.status(500).json({error:"Error Occurred while fetching Data"});
    }
})



const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})