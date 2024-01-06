import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (request: NextRequest, response: NextResponse) => {
  const path = request.nextUrl.pathname;
  const parameterId = path.split("parameters/")[1];
  console.log("parameterId vaut:", parameterId);

  try {
    const parameter = await prisma.parameter.findUnique({
      where: {
        name: parameterId,
      },
    });

    console.log("READ parameter:", parameter);

    return NextResponse.json({ message: "OK", parameter }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (request: NextRequest, response: NextResponse) => {
  const path = request.nextUrl.pathname;
  const parameterId = path.split("parameters/")[1];

  const { value } = await request.json();

  try {
    const parameter = await prisma.parameter.update({
      where: {
        name: parameterId,
      },
      data: {
        value: value,
      },
    });

    console.log("READ parameter:", parameter);

    return NextResponse.json({ message: "OK", parameter }, { status: 200 });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
