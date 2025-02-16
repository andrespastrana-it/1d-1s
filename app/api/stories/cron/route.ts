import { NextRequest, NextResponse } from "next/server";

export  async function GET(request:NextRequest){
  console.log("Cron job trigerd");
  
    // Check for the cron job secret key
  return NextResponse.json({cron: true})
}