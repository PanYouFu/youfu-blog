import { getPublishedBlog } from "@/services/blogs";
import { getDateStr } from "@/utils/tools";
import MdViewer from "./components/viewer";
import styles from "./index.module.scss";

const Blog = async ({ params }: { params: { id: string } }) => {
  const blogInfo = await getPublishedBlog(params.id);

  console.log(blogInfo);

  return (
    <div className={styles.blog}>
      <header>
        <p>{blogInfo?.title}</p>
        {blogInfo?.updatedAt && <span>{getDateStr(blogInfo?.updatedAt)}</span>}
      </header>
      <MdViewer body={blogInfo?.body || ""} />
    </div>
  );
};

export default Blog;
