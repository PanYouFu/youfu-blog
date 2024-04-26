"use client";
import styles from "./index.module.scss";
import { message } from "antd";
import { getDateStr } from "@/utils/tools";

import request from "@/utils/request";
import { Session } from "next-auth/types";
import { useEffect, useState } from "react";
export interface BlogInfo {
  title: string;
  desc: string;
  tag: string;
  content: string;
}

export type BlogListProps = {
  session: Session | null;
};

export const BlogList = ({ session }: BlogListProps) => {
  const [blogs, setBlogs] = useState<any[]>([]);

  const checkPermission = () => {
    if (!(session?.user as any).permission) {
      message.error("暂无权限");
      return false;
    } else {
      return true;
    }
  };

  const deleteBlog = async (id: string) => {
    if (!checkPermission()) return;
    await request.post("/api/blog/delete", {
      params: { id },
    });

    const curBlogs = blogs.filter((item: any) => item.id !== id);
    setBlogs(curBlogs);
    message.success("删除成功");
  };

  const editBlog = () => {
    if (!checkPermission()) return;

    message.info("开发中···");
  };

  useEffect(() => {
    request.get(`/api/blog/search`).then((data) => {
      const { blogs } = data as { blogs: any[] };

      setBlogs(blogs as any[]);
    });
  }, []);

  return (
    <>
      <div className={styles.blogList}>
        {blogs.length > 0 && (
          <>
            <header>
              共计 <span>{blogs.length}</span> 篇博客
            </header>

            <ul>
              {blogs?.map((item) => (
                <li key={item.id}>
                  <div className={styles.left}>
                    <header>
                      <p>{item.title}</p>
                      <span>{getDateStr(item.updatedAt)}</span>
                    </header>
                    <div>{item.description}</div>
                  </div>
                  <div className={styles.tag}>
                    {item.tags.map((tag: any) => (
                      <span key={tag.name}>{tag.name}</span>
                    ))}
                  </div>
                  <div className={styles.operation}>
                    <span onClick={() => deleteBlog(item.id)}>delete</span>
                    <span onClick={() => editBlog()}>edit</span>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
