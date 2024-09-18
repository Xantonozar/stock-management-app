"use client";
import Header from "@/components/Header";
import MyNavbar from "@/components/Navbar";
import Image from "next/image";
import {Footer } from "flowbite-react";
import MyFooter from "@/components/Footer";
import { useEffect, useState } from "react";
export default function Home() {
  // Dummy data for the table

  const [productForm, setproductForm] = useState({});
  const [products, setproducts] = useState([]);
  const [alert, setalert] = useState("");
  const [query, setquery] = useState("")
  const [dropdown, setdropdown] = useState([
  ])
  useEffect(() => {
 const fetchProducts = async () => {
  const response = await fetch("/api/products");
  let rjson = await response.json();
  console.log(rjson);
  setproducts(rjson.products);
  
 }
  fetchProducts();
  
  }, [])
  const onDropdown = async (e) => {
    setquery(e.target.value);
    console.log(e.target.value);
    const response = await fetch(`/api/search?query=`+query);
    let rjson = await response.json();
    if(e.target.value==0){
      setalert("No results found");
      setdropdown([]);
    }
    else{
      setalert("");
    }
    setdropdown(rjson.products);
  }
  
  // Function to handle form submission
  const addProduct = async (e) => {
    e.preventDefault(); // Prevent page refresh
 

    // const productForm = {
    //   name: productName,
    //   quantity: quantity,
    //   price: price,
    // };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        console.log("Product added successfully!");
        setalert("Product added successfully!");
       
          const response = await fetch("/api/products");
          let rjson = await response.json();
          console.log(rjson);
          console.log("waiting")
          setproducts(rjson.products);
          
         
        setproductForm({});
        // Reset form fields
        // setProductName("");
        // setQuantity("");
        // setPrice("");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
const handleChange = (e)=>{ 
  setproductForm({...productForm, [e.target.name]:e.target.value});
  console.log(productForm);
  
};
const onAction= async (action,slug,quantity)=>{
  console.log(action,slug,quantity);
  let index=products.findIndex(p=>p.slug==slug);
  console.log(index);
  let newProducts= JSON.parse(JSON.stringify(products));
  let newQuantity=action=="plus"?( parseInt(quantity) + 1):(  parseInt(quantity) - 1);
  
  newProducts[index].quantity=newQuantity;
  
  setproducts(newProducts);
   const response=await  fetch("/api/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({action,slug,quantity}),
      });
   let r = await response.json();
   console.log(r);
   
      setalert("Product updated successfully!");
      // setproductForm({});
}
const onAction2= async (action,slug,price)=>{
  
  let index=products.findIndex(p=>p.slug==slug);
  console.log(index);
  let newProducts= JSON.parse(JSON.stringify(products));

  let newPrice=action=="plus"?( parseInt(price) + 1):(  parseInt(price) - 1);
 
  newProducts[index].price=newPrice;
  setproducts(newProducts);
   const response=await  fetch("/api/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({action,slug,price}),
      });
   let r = await response.json();
   console.log(r);
   
      setalert("Product updated successfully!");
      // setproductForm({});
}
const deleteIt = async (slug) => {
  const response = await fetch("/api/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
  // onDropdown();
  console.log("deleted");
  const response1 = await fetch("/api/products");
  let rjson = await response1.json();
  console.log(rjson);
  console.log("waiting")
  setproducts(rjson.products);
  
}
  return (
    <>
  <Header></Header>  
    

    
      
      <div className="container mx-auto p-6">
      <div className=" text-green-500 text-center ">{alert}</div>
                        {/* Search a Product */}
                        <h1 className="text-3xl font-bold mb-4 text-gray-800 flex items-center bg-red-50 p-4 rounded-md">
          Search a Product </h1>
          <div  className="flex w-full max-w-none items-center">
            <input onChange={onDropdown}
              type="text"
              placeholder="Enter a product name"
              className="border p-2 w-full rounded-l-md"
            />
        
            <select className="border p-2 rounded-r-md bg-white">
              <option>Category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Furniture</option>
            </select>
          </div>
          <table  className="min-w-full bg-white border border-gray-200">
          <tbody >
       {
              dropdown.map((dropdown, index) => (
                
         
                  <tr   className=" mt-10 min-w-14 flex-row justify-items-center " key={index}>

                  <td className="px-4 py-2 border-b">{dropdown.slug}</td>
                  <td className="px-4 py-2 border-b "><div className="flex gap-4" ><button onClick={()=>{onAction("minus",dropdown.slug, dropdown.quantity)}}  className=" flex justify-center items-center w-6 h-6 bg-sky-400 p-2">- </button> <div className="w-8 flex justify-items-center">{dropdown.quantity} </div><button onClick={()=>{onAction("plus",dropdown.slug,dropdown.quantity)}} className=" w-6 flex justify-center items-center h-6 bg-sky-400 p-2"> +</button></div></td>
                  <td className="px-4 py-2 border-b"><div className="flex gap-4" ><button onClick={()=>{onAction2("minus",dropdown.slug,dropdown.price)}}  className=" w-6 flex justify-center items-center h-6 bg-sky-400 p-2">- </button> <div className="w-8 flex justify-items-center text-center" >{dropdown.price}</div> <button onClick={()=>{onAction2("plus",dropdown.slug,dropdown.price)}}  className=" w-6 flex justify-center items-center h-6 bg-sky-400 p-2"> +</button></div></td>
                  <td ><button className=" bg-blue-600 p-1  text-center   border-b"  onClick={()=>{deleteIt(dropdown.slug)}}>❌</button></td>
                </tr>
            
              ))
          }
       </tbody>
          </table>
         <div>
         <br/>  <br/>
         </div>

        {/* Form for adding a product */}
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add a Product</h1>
        <div className="bg-red-50 p-6 rounded-md">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Slug</label>
            <input value={productForm?.slug || ""} name="slug" onChange = {handleChange}
              type="text"
              placeholder="Product Name"
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input value={productForm?.quantity || ""} name="quantity" onChange = {handleChange}
              type="number"
              placeholder="Quantity"
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input value={productForm?.price || ""} name="price" onChange = {handleChange}
              type="text"
              placeholder="Price"
              className="border p-2 w-full rounded"
            />
          </div>
          <button onClick={(e)=>{addProduct(e)}} className="bg-blue-500 text-white p-2 rounded w-full">
            Add Product
          </button>
        </div>

        {/* Display Current Stock */}
        <h1 className="text-3xl font-semibold mt-10 mb-6 text-gray-800">Display Current Stock</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Product Name</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{product.slug}</td>
                  <td className="px-4 py-2 border-b "><div className="flex gap-4" ><button onClick={()=>{onAction("minus",product.slug, product.quantity)}}  className=" flex justify-center items-center w-6 h-6 bg-sky-400 p-2">- </button> <div className="w-8 flex justify-items-center">{product.quantity} </div><button onClick={()=>{onAction("plus",product.slug,product.quantity)}} className=" w-6 flex justify-center items-center h-6 bg-sky-400 p-2"> +</button></div></td>
                  <td className="px-4 py-2 border-b"><div className="flex gap-4" ><button onClick={()=>{onAction2("minus",product.slug,product.price)}}  className=" w-6 flex justify-center items-center h-6 bg-sky-400 p-2">- </button> <div className="w-8 flex justify-items-center text-center" >{product.price}</div> <button onClick={()=>{onAction2("plus",product.slug,product.price)}}  className=" w-6 flex justify-center items-center h-6 bg-sky-400 p-2"> +</button></div></td>
                  <td onClick={()=>{deleteIt(product.slug)}} className=" bg-blue-600 w-0 p-0 text-center   border-b"><button>❌</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
      </div>


    </>
  );
}

