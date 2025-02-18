
import { Story } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";


// Get all stories (SORTED BY DATE)
export async function GET(request: NextRequest,   { params }: { params: Promise<{ id: string }> }) {
    // Check the autorization in the headers
    
    const id = (await params).id
    // Validate params  as a mongo id

     const story = await Story.findById(id)
    
     //    Query the database


    //  Return the response
     return NextResponse.json({success: true,error:false,data: story})
}