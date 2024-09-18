import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
export async function POST(request) {
    
    
    let body = await request.json();
 
        // Replace the uri string with your connection string.
        const uri = "mongodb+srv://ozar:r9V5uiNxw9sF44MA@mongocloud.rhcri.mongodb.net";
        
        const client = new MongoClient(uri);
        
          try {
            const database = client.db('Inventory');
            const inventory = database.collection('products');
        
            // Query for a movie that has the title 'Back to the Future'
            const filter = { slug: body.slug };
           
        
         
            if (body.quantity!==undefined||body.quantity!==null){
                const newQuantity= body.action=="plus"?(parseInt(body.quantity) + 1):(parseInt(body.quantity) - 1);
                const updateQuantity = {
                    $set: {
                        quantity:newQuantity

                          },
                };
                const result = await inventory.updateOne(filter, updateQuantity);
            }
           if (body.Price!==undefined||body.Price!==null){
            const newPrice= body.action=="plus"?(parseInt(body.Price) + 1):(parseInt(body.Price) - 1);
            const updatePrice = {
                $set: {
                    Price:newPrice

                      },
            };
            const result = await inventory.updateOne(filter, updatePrice);
          
           }
           
            return NextResponse.json({ body,ok:true})
          } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
          }
        }