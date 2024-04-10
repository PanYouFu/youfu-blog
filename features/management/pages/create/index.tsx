'use client'

import styles from './index.module.scss'
import { MarkdownEditor } from '../../components/mdEditor'

export const Create = () => {
  const tagList: string[] = []
  return (
    <div className={styles.create}>
      <form>
        <div className={styles.info}>
          <div className={styles.line}>
            文章标题：
            <input placeholder="请输入文章标题"></input>
          </div>
          <div className={styles.line}>
            文章描述：
            <textarea placeholder="请描述文章大概内容"></textarea>
          </div>
          {tagList?.length > 0 && (
            <>
              <div className={styles.line}>文章标签</div>
              {tagList.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </>
          )}
          <div className={styles.line}>
            新增标签：
            <input placeholder="新增你需要的标签"></input>
          </div>
        </div>
        <MarkdownEditor />
      </form>
    </div>
  )
}
