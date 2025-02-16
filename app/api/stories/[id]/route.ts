import { stories } from "@/data/story-data";
import { NextRequest, NextResponse } from "next/server";


// Get all stories (SORTED BY DATE)
export async function GET(request: NextRequest,   { params }: { params: Promise<{ id: string }> }) {
    // Check the autorization in the headers
    
    //Valdiate params  
    const id = (await params).id
    
     //    Query the database


    //  Return the response
     return NextResponse.json({success: true,error:false,data: stories[Number(id)]})
}