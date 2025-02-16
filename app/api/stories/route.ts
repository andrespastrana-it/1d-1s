export const dynamic = 'force-static'

import { stories } from "@/data/story-data";
import {  NextResponse } from "next/server";
// TODO
// Only allow request from my app domain
// Secret key in request



// Get all stories (SORTED BY DATE)
export async function GET() {
    
    // Check the secret key in the Req Auth
    // Query the database
    // Return the data
     return NextResponse.json({ success:true,error: false,data: stories})
}


