"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

interface IRestaurant {
  restaurant_id: string;
  name: string;
  cuisine: string;
  address: {
    building: string;
    street: string;
    zipcode: string;
  };
  borough: string;
  grades: {
    score: number;
  }[];
}
const Card: React.FC<{ res: IRestaurant }>  = ({ res }: { res: IRestaurant }) => {
  return (
    <div>
      <p>{res.restaurant_id}</p>
      <h4>Restaurant Name: {res.name}</h4>
      <p className="font-bold text-lg">Cuisine: {res.cuisine}</p>
      <p>
        {res.address.building} - {res.address.street} -- zipCode:{" "}
        {res.address.zipcode}
      </p>
      <p className="text-gray-600">
        {res.grades.length > 0 &&
          `Average Score: ${
            res.grades.reduce((acc: any, item:any) => acc + item.score, 0) /
            res.grades.length
          }`}
      </p>
      <h4>Borough: {res.borough}</h4>
    </div>
  );
};
const Page: React.FC = () => {

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [selectedCuisine,setSelectedCuisine] = useState<string | "">("")
  const fetchRestaurant = async () => {
    try {
      const response = await fetch("/assets/restaurants.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("result");
      console.log(result);
      setRestaurants(result);
    } catch (err) {
      console.log("Failed to fetch restaurants:: ", err);
    }
  };
 
  useEffect(() => {
    fetchRestaurant();
  }, []);
  let resCuisines = restaurants.map((el) => el.cuisine);
  resCuisines = [...new Set(resCuisines)].sort();
  console.log(resCuisines);
  const handleSelectedCuisine = ()=>{}
  return (
    <div>
      <div>
        <NavBar />
      </div>
      {/* restaurant */}
      <div className="m-8">        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <select className="w-80 rounded-sm" id="" onChange={handleSelectedCuisine} value={selectedCuisine}>
              {/* Add your select options here */}
              <option value="">--Select Your Cuisine--</option>
              {resCuisines.length >0 && resCuisines.map((el)=>(
                <option key={el} value={el}>{el}</option>
              ))}
              
            </select>
          </div>
          <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {restaurants.length > 0 &&
              restaurants.map((res: IRestaurant) => (
                <div
                  key={res.restaurant_id}
                  className="gap-4 bg-white p-4 m-2 rounded-md shadow-md"
                >
                  <div className=""><Card res={res} /></div>
                </div>
              ))}
          </div>
          </div>
        </div>
      </div>
      <div className="">footer</div>
    </div>
  );
};

export default Page;
