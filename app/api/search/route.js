import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
export async function GET(request) {
    

// Replace the uri string with your connection string.
const uri = "mongodb+srv://ozar:r9V5uiNxw9sF44MA@mongocloud.rhcri.mongodb.net";

const client = new MongoClient(uri);

const query = request.nextUrl.searchParams.get("query");
  try {
    const database = client.db('Inventory');
    const inventory = database.collection('products');

    // Query for a movie that has the title 'Back to the Future'
  const products = await  inventory.aggregate([
        {
          $match: {
            $or: [
              { slug: { $regex: query, $options: 'i' } },  // Case-insensitive partial match on 'name'
              { quantity: { $regex: query, $options: 'i' } },  // Case-insensitive partial match on 'quantity'
              { price: { $regex: query, $options: 'i' } }  // Case-insensitive partial match on 'price'
            ]
          }
        }]).toArray();
    // const products = await inventory.find(query).toArray();

    console.log(products);
    return NextResponse.json({ success:true, products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
