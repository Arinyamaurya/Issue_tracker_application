import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Context = {
  params: {
    id: string;
  };
};

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  const { id } = params;
  const { status } = await request.json();

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json(
      { message: "Failed to update issue" },
      { status: 500 }
    );
  }
}
