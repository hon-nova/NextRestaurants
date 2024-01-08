'use client'
import React,{useState,useEffect} from 'react'
import NavBar from '@/components/NavBar'

const page = () => {
  type IRestaurant = {
    restaurant_id:string;
    name:string;
    cuisine:string;
    address: {
      building:string;
      street:string;
      zipcode:string;
    };  
    borough:string;
    grades: {
      score: number;
    }    
  }[];
  const [restaurants, setRestaurants] =useState<IRestaurant[]>([])
  const fetchRestaurant = async()=>{
    try {
      const response = await fetch("/assets/restaurants.json",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const result = await response.json()
      console.log("result")
      console.log(result)
      setRestaurants(result)  
    } catch(err){
      console.log("Failed to fetch restaurants:: ",err)
    }   
  }
  useEffect(()=>{
    fetchRestaurant()
  },[])
  let resCuisines = restaurants.map((el)=>el.cuisine)
  resCuisines = [...new Set(resCuisines)]
  console.log(resCuisines)
  return (
    <div>
      <div><NavBar/></div>
      {/* restaurant */}
      <div className='m-8'>
          {/* restaurant */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">        
      {restaurants.length >0 && restaurants.map((res:IRestaurant)=>(
        <div key={res.restaurant_id} className="bg-white p-4 rounded-md shadow-md">
          <p>{res.restaurant_id}</p>
          <h4>Restaurant Name: {res.name}</h4>
          <p className="font-bold text-lg">Cuisine: {res.cuisine}</p>
          <p>{res.address.building} - {res.address.street} -- zipCode: {res.address.zipcode}</p>         
          <p className="text-gray-600">
          {res.grades.length > 0 &&
            `Average Score: ${
              res.grades.reduce(
                (acc, item) => acc + item.score,
                0
              ) / res.grades.length
            }`}
         </p> 
         <h4>Borough: {res.borough}</h4>         
        </div>
      ))}
      </div>
      </div>
      <div className=''>footer</div>
     
    </div>
  )
}

export default page
