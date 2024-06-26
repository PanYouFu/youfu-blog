import type { NextPage } from "next";
import BlogList from "./components/blog-list";
import { getPublishedBlogs } from "@/services/blogs";

export const dynamic = "force-dynamic";

const Blogs: NextPage = async () => {
  const { blogs, total } = await getPublishedBlogs();

  return <BlogList blogs={blogs} total={total} />;
};

export default Blogs;
