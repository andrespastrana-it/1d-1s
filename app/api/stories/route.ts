

import { Story } from "@/lib/models";
import {  NextResponse } from "next/server";


// Get all stories (SORTED BY DATE)
export async function GET() {
    const stories = await Story.find({})
     return NextResponse.json({ success:true,error: false,data: stories})
}


