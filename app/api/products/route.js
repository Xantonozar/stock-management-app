import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
export async function GET(response) {
    

// Replace the uri string with your connection string.
const uri = "mongodb+srv://ozar:r9V5uiNxw9sF44MA@mongocloud.rhcri.mongodb.net";

const client = new MongoClient(uri);

  try {
    const database = client.db('Inventory');
    const inventory = database.collection('products');

    // Query for a movie that has the title 'Back to the Future'
    const query = { };
    const products = await inventory.find(query).toArray();

    console.log(products);
    return NextResponse.json({ success:true, products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
export async function POST(request) {
    
let body = await request.json();

    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://ozar:r9V5uiNxw9sF44MA@mongocloud.rhcri.mongodb.net";
    
    const client = new MongoClient(uri);
    
      try {
        const database = client.db('Inventory');
        const inventory = database.collection('products');
    
        // Query for a movie that has the title 'Back to the Future'
        const query = {  };
        const product= await inventory.insertOne(body);
    
        console.log(product);
        return NextResponse.json({ product,ok:true})
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }