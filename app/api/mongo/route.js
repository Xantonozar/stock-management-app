
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
// Replace the uri string with your connection string.
export async function GET(response) {
const uri = "mongodb+srv://ozar:r9V5uiNxw9sF44MA@mongocloud.rhcri.mongodb.net";

const client = new MongoClient(uri);


  try {
    const database = client.db('Inventory');
    const movies = database.collection('products');

    // Query for a movie that has the title 'Back to the Future'
    const query = { };
    const movie = await movies.find(query).toArray();
return NextResponse.json({"a":34 , movie});
   
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}