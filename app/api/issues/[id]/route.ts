import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await request.json();

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: { status },
    });


    return NextResponse.json(updatedIssue);
  } catch{
    console.error("Error updating issue:");
    return NextResponse.json(
      { message: "Failed to update issue" },
      { status: 500 }
    );
  }
}
