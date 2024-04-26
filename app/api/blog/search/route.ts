import { getPublishedBlogs } from "@/services/blogs";

// 查询所有博客
export async function GET() {
  const { blogs } = await getPublishedBlogs();

  console.log("blogs--", blogs);

  return Response.json({
    blogs,
  });
}
