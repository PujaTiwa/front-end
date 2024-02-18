import React from "react";

const AddProduct = () => { 
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [err, setErr] = React.useState(false);

    const addProductFun = async()=>{

        console.log(name);
        if(!name || !price || !category || !company) {
            setErr(true)
            return false;
        }
//
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:4500/add', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
    }
    return (
        <div className="add-product">
            <h1 className="reg">Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter product name"
            onChange={(e)=>setName(e.target.value)} value={name} 
            />
            {err && !name && <span>Enter Valid Name</span>}

            <input className="inputBox" type="text" placeholder="Enter product price"
            onChange={(e)=>setPrice(e.target.value)} value={price}
            />
            {err && !price && <span>Enter Valid Price</span>}

            <input className="inputBox" type="text" placeholder="Enter product category"
            onChange={(e)=>setCategory(e.target.value)} value={category}
            />
            {err && !category && <span>Enter Valid Category</span>}

            <input className="inputBox" type="text" placeholder="Enter product company"
            onChange={(e)=>setCompany(e.target.value)} value={company}
            />
            {err && !company && <span>Enter Valid Company</span>}

            <button onClick={addProductFun} type="button">Add</button>
        </div>
    )
}

export default AddProduct;