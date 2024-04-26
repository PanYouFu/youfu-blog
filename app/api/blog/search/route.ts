import prisma from "@/lib/prisma";
// import { getPublishedBlogs } from "@/services/blogs";

// 查询所有博客
export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    },
    where: {
      published: true,
    },
  });

  console.log("blogs--", blogs);

  return Response.json({
    blogs: blogs.map((item) => {
      const { body, ...rest } = item;
      return rest;
    }),
  });
}
