import { NextResponse } from "next/server";

interface ContactRequestBody {
    name: string;
    email: string;
    message: string;
}

export async function POST( request: Request ) {
    try {
        await request.json() as ContactRequestBody;
        return NextResponse.json({
            message: 'Contact request received successfully',
        }, {
            status: 200,
        }
        );
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return NextResponse.json(
        {
            message: errorMessage,

        },
        {
            status: 500,
        })
    }

}
