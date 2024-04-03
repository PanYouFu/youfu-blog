type BlogListProps = {
  blogs: any[],
  total: number,
}

const BlogList = ({ blogs, total }: BlogListProps) => {
  if (total < 1) {
    return <div>暂无</div>
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <div>{blog.title}</div>
          <div>{blog.description}</div>
          <div>
            {blog.tags.map((tag: any) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BlogList
