import React from 'react'
import { useEffect } from 'react'
import { listFoodService ,deleteFoodService} from '../../service/foodService'
import { useState } from 'react'
import { toast } from "react-toastify"
import './ListFood.css';


const ListFood = () => {

  const [data,setData] = useState([])

  const [previewImg, setPreviewImg] = useState(null);

  const openModal = (url) => setPreviewImg(url);
  const closeModal = () => setPreviewImg(null);

    // Common function to fetch food data
    const fetchData = async () => {
      try {
        const response = await listFoodService();
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };
  
 
  useEffect(() => {
    fetchData();
  }, []); // E


  const handleDelete = async (id)=>{
    try {
      const response = await deleteFoodService(id);
      if (response.status === 200) {
        toast.success("Food deleted")
        fetchData();
      }
     
    } catch (error) {
      toast.error("Food deleted")("Error Delete food:");
    }
  }

  return (
    <div className="mx-2 mt-2">
    <div className="row">
      <div className="card col-md-10">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Delete</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <tr>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                
                <td>
                  <button 
                    className="btn btn-sm"
                    onClick={() => handleDelete(item.id)} // call a delete function
                  >
                  <i className="bi bi-trash"></i> {/* Bootstrap trash icon */}
                </button>
              </td>
              <td>
                <button
                    className="btn btn-sm btn-primary"
                         data-bs-toggle="collapse"
                         data-bs-target={`#desc-${item.id}`}
                         aria-expanded="false"
                     >
                    Details
                 </button>
                </td>
              </tr>
              <tr>
              <td colSpan="5" className="p-0 border-0 position-relative">
                  <div
                    id={`desc-${item.id}`}
                    className="collapse"
                  >
                    <div className="p-3 bg-light">
                      <strong>Description:</strong> {item.description}
                    </div>
                    <div className="img-wrapper">
                     <img src={item.imageUrl} alt="upload"  className="food-img"
                     onClick={() => openModal(item.imageUrl)}
                     />
                    </div>
                  </div>
                </td>
              </tr>
           </React.Fragment>
          ))}
        </tbody>
      </table>
     {previewImg && (
        <div className="modal fade show d-block" onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <img src={previewImg} className="img-fluid" />
            </div>
          </div>
        </div>
      )}
    </div>
</div>
</div>
  )
}

export default ListFood