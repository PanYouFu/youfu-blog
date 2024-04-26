import prisma from "@/lib/prisma";

export const getPublishedBlogs = async () => {
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

  const count = await prisma.blog.count({
    where: {
      published: true,
    },
  });

  const total = count ?? 0;

  return {
    blogs: blogs.map((item) => {
      const { body, ...rest } = item;
      return rest;
    }),
    total,
  };
};

export const getPublishedBlog = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      published: true,
      id: id,
    },
  });

  return blog;
};
