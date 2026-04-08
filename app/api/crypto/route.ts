import { NextResponse } from "next/server";
import { getTopCryptos } from "@/lib/api/coingecko";

// Cache API responses for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const data = await getTopCryptos();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    );
  }
}
