import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { BlogInfo } from "@/features/management/pages/create";

// 发布一篇新blog
export async function POST(request: NextRequest) {
  const params: BlogInfo = await request.json();

  console.log("params-------------------", params);

  // 根据body 向数据库中插入一条新数据
  const blog = await prisma.blog.create({
    data: {
      body: params.content,
      description: params.desc,
      published: true,
      title: params.title,
      tags: {
        create: [{ name: params.tag }],
      },
    },
  });
  return Response.json({
    id: blog.id,
  });
}
