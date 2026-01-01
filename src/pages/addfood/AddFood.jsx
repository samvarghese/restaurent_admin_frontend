import React from 'react'
import { useState } from 'react'
import { asset } from '../../assets/assets'
import axios from 'axios';
import { toast } from "react-toastify"
import { addFoodService } from '../../service/foodService';


const AddFood = () => {

  const [image,setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data,setData] = useState({
    name:'',
    category:'',
    price:'',
    description:''
  });

  const onChangehandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  //Add Food Service API call
  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    if(!image){
        toast.error("Please Select an image");
        return;
    }
    try {
        setLoading(true);
    
        const response = await addFoodService(data, image);
    
        if (response.status === 200) {
          toast.success("Food Added Successfully");
          setData({
            name: '',
            category: '',
            price: '',
            description: ''
          });
          setImage(null);
        }
      } catch (error) {
        toast.error("Error adding food");
      } finally {
        setLoading(false); // 🔴 always stop spinner
      }
    };

  return (
    <div className="mx-2 mt-2">
    <div className="row">
        <div className="card col-md-4">
            <form className="card-body" onSubmit={onSubmitHandler}>
                <h2 className="text-center mb-4">Add Food</h2>
                <div className="mb-3">
                    <label htmlFor="foodImage" className="form-label">
                        <img src={image?URL.createObjectURL(image):asset.upload} alt="upload" width={98}/>
                    </label>
                    <input type="file" className="form-control" name="foodImage" id="foodImage" required hidden onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="foodName" className="form-label">Food Item Name</label>
                    <input type="text" className="form-control" name="name"  id="name" required onChange={onChangehandler} value={data.name}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="foodcategory" className="form-label">Category</label>
                    <select className="form-select" id="category"  name="category"  onChange={onChangehandler} value={data.category}>
                        <option value="">Please Select the value</option>
                        <option value="Briyani">Briyani</option>
                        <option value="Meals">Meals</option>
                        <option value="Chappatti">Chappatii</option>
                    </select>
             
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price"  required onChange={onChangehandler} value={data.price}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description"  name="description" rows="5" required onChange={onChangehandler} value={data.description}></textarea>
                </div>
                <div className="d-grid">
                <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                         disabled={loading}
                >
                     {loading ? (
                     <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                        </>
                    ) : (
                     "Save"
                     )}
                </button>

                </div>
            </form>
        </div>
    </div>
</div>
  )
}
export default AddFood