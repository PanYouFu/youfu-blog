"use client";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import { getDateStr } from "@/utils/tools";

type BlogListProps = {
  blogs: any[];
  total: number;
};

const BlogList = ({ blogs, total }: BlogListProps) => {
  const router = useRouter();

  if (total < 1) {
    return <div>暂无</div>;
  }

  const goDetail = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className={styles.blogs}>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} onClick={() => goDetail(blog.id)}>
            <div className={styles.title}> {blog.title}</div>
            <p className={styles.desc}> {blog.description}</p>
            <span className={styles.date}>{getDateStr(blog.updatedAt)}</span>
            <div className={styles.tags}>
              {blog.tags.map((tag: any) => (
                <span key={tag.id}>{tag.name}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
