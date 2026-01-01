import React from 'react'
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <div className="list-group list-group-flush">
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add">
            <i className='bi bi-plus-circle me-2'></i>Add Food
        </Link>
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/listFood">
            <i className='bi bi-list me-2'></i>List All Food
        </Link>
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orderFood">
            <i className='bi bi-cart me-2'></i>Order
        </Link>
   </div>
  )
}
export default SideMenu