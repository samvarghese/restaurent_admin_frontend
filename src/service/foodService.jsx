import axios from 'axios';
import { toast } from "react-toastify"


const Domain = "http://localhost:8080";

const API_URL_ADD_FOOD =  Domain+"/api/addFood";
const API_URL_LIST_FOOD = Domain+"/api/getAllFood";
const API_URL_DELETE_FOOD = Domain+"/api/deleteFoodById/";


export const addFoodService = async (foodData,image)=>{
    const formData = new FormData();
    formData.append(
        "foodRequest",
        new Blob([JSON.stringify(foodData)], { type: "application/json" })
      );
    formData.append('file',image)
    try{
         const response = await axios.post(API_URL_ADD_FOOD,formData)
         return response;
       }
    catch(error){
        console.log("Error"+error)
        toast.error("Error on Adding Food"); 
    } 
}
    export const listFoodService = async ()=>{     
        try{
             const response = await axios.get(API_URL_LIST_FOOD)
             return response;
           }
        catch(error){
            console.log("Error"+error)
            toast.error("Error on Loading Food"); 
        }

}

export const deleteFoodService = async (id)=>{     
    try{
         const response = await axios.get(`${API_URL_DELETE_FOOD}${id}`)
         return response;
       }
    catch(error){
        console.log("Error"+error)
        toast.error("Error on Loading Food"); 
    }

}
