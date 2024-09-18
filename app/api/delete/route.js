import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
export async function POST(request) {
    
    
    let body = await request.json();
 
        // Replace the uri string with your connection string.
        const uri = "mongodb+srv://ozar:r9V5uiNxw9sF44MA@mongocloud.rhcri.mongodb.net";
        
        const client = new MongoClient(uri);
        console.log(body.slug);
        
          try {
            const database = client.db('Inventory');
            const inventory = database.collection('products');
        
            // Query for a movie that has the title 'Back to the Future'
            const filter = { slug: body.slug };
          
        
            const result = await inventory.deleteOne({ slug: body.slug });
          
        console.log(result) 
           
            return NextResponse.json({ body,ok:true})
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
        }