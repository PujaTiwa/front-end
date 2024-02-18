import React, { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => { 
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        // console.warn(params);
        getProductDetails();
    },[]);

    const getProductDetails = async()=>{
        console.warn(params);
        let result = await fetch(`http://localhost:4500/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        // console.log(result);
        setName(result.name)
        setName(result.price)
        setName(result.category)
        setName(result.company)
    }

    const UpdateProductFun = async()=>{

        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:4500/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        navigate('/')
    }

    return (
        <div className="add-product">
            <h1 className="reg">Update Product</h1>
            <input className="inputBox" type="text" placeholder="Enter product name"
            onChange={(e)=>setName(e.target.value)} value={name} 
            />

            <input className="inputBox" type="text" placeholder="Enter product price"
            onChange={(e)=>setPrice(e.target.value)} value={price}
            />

            <input className="inputBox" type="text" placeholder="Enter product category"
            onChange={(e)=>setCategory(e.target.value)} value={category}
            />

            <input className="inputBox" type="text" placeholder="Enter product company"
            onChange={(e)=>setCompany(e.target.value)} value={company}
            />

            <button onClick={UpdateProductFun} type="button">Update Product</button>
        </div>
    )
}

export default UpdateProduct;