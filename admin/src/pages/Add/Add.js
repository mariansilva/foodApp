import React, { useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { foodSchema } from './FoodSchema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Add = () => {
  const url = "http://localhost:4000";

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "Salad",
      image: null,
    },
    validationSchema: foodSchema,
    onSubmit: async (value, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", value.name)
      formData.append("description", value.description)
      formData.append("price", Number(value.price))
      formData.append("category", value.category)
      formData.append("image", value.image)
      try {
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
          resetForm();
          toast.success(response.data.message)
        } else {
          console.error(response.data.message)
        }
      }
      catch (error) {
        console.error("Error adding food item:", error);
      }
    },
  });

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={formik.handleSubmit} noValidate>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={formik.values.image ? URL.createObjectURL(formik.values.image) : assets.upload_area} alt='' />
          </label>
          <input onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} type='file' id='image' hidden />
          {formik.touched.image && formik.errors.image && (
            <span className='error-text'>{formik.errors.image}</span>)}
        </div>
        <div className='add-product-name flex-col' >
          <p>Product Name</p>
          <input className={formik.touched.name && formik.errors.name ? 'input-error' : ''} onChange={formik.handleChange} value={formik.values.name} type='text' name='name' placeholder='Type here' />
          {formik.touched.name && formik.errors.name && (
            <span className='error-text'>{formik.errors.name}</span>
          )}

        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea className={formik.touched.name && formik.errors.name ? 'input-error' : ''} onChange={formik.handleChange} value={formik.values.description} name='description' rows='6' placeholder='Write content here' ></textarea>
          {formik.touched.description && formik.errors.description && (
            <span className='error-text'>{formik.errors.description}</span>
          )}
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={formik.handleChange} name='category' value={formik.values.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>

            </select>
            {formik.touched.category && formik.errors.category && (
              <span className='error-text'>{formik.errors.category}</span>
            )}
          </div>
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input onChange={formik.handleChange} value={formik.values.price} type='Number' name='price' placeholder='$20' />{
              formik.touched.price && formik.errors.price && (
                <span className='error-text'>{formik.errors.price}</span>
              )
            }
          </div>


        </div>
        <button type='submit' className='add-btn'>ADD</button>
        <ToastContainer />

      </form>

    </div>
  )
}

export default Add
