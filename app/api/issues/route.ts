import {NextRequest, NextResponse} from "next/server";
import { createIssueSchema } from "@/app/validationSchemas";
import  {PrismaClient}  from "@prisma/client";


const prisma=new PrismaClient();

export async function POST(request:NextRequest){
    const body = await request.json();
    const validation=createIssueSchema.safeParse(body);
    if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}