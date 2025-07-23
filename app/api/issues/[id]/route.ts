import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest } from "next";
import type { NextRequest as AppNextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: AppNextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
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
