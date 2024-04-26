import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

// 删除一篇新blog
export async function POST(request: NextRequest) {
  const params: { id: string } = await request.json();

  // 根据id 向数据库中插入一条新数据
  await prisma.blog.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({
    data: "删除成功",
  });
}
