"use client";

import styles from "./index.module.scss";
import { MDEditorRef, MarkdownEditor } from "../../components/mdEditor";
import { useRef, useState } from "react";
import { message } from "antd";
import { useBlogStore } from "@/store";
import request from "@/utils/request";
import { Session } from "next-auth/types";
export interface BlogInfo {
  title: string;
  desc: string;
  tag: string;
  content: string;
}

export type WithSession = { session: Session | null };

export const Create = ({ session }: WithSession) => {
  const tagList: string[] = [];
  const [showForm, setShowForm] = useState(false);
  const [curInfo, setCurInfo] = useState({} as BlogInfo);
  const [messageApi, contextHolder] = message.useMessage();

  const [setBlogInfo] = useBlogStore((state) => [state.setBlogInfo]);

  const saveBlog = () => {
    if (!checkPermission()) return;

    if (!editorRef?.current?.content) {
      messageApi.open({
        type: "error",
        content: "请输入正文内容",
      });
    } else {
      setCurInfo({
        ...curInfo,
        content: editorRef?.current?.content || "",
      });
    }
  };

  const checkPermission = () => {
    console.log("--checkPermission---");
    if (!(session?.user as any).permission) {
      console.log("--checkPermission--false-");
      message.error("暂无权限");
      return false;
    } else {
      return true;
    }
  };

  const commitBlog = () => {
    if (!checkPermission()) return;

    if (!editorRef?.current?.content) {
      messageApi.open({
        type: "error",
        content: "请输入正文内容",
      });
    } else {
      setCurInfo({
        ...curInfo,
        content: editorRef?.current?.content || "",
      });
      setShowForm(true);
    }
  };

  const confirm = async () => {
    if (!checkPermission()) return;

    if (curInfo.content && curInfo.desc && curInfo.tag) {
      // 保存blog信息；1.前端store；2.后端数据库
      setBlogInfo(curInfo);
      const data = await request.post("/api/blog/publish", {
        params: curInfo,
      });
      console.log("data:", data);
      message.success("上传成功");
    } else {
      console.log("curInfo", curInfo);
      messageApi.open({
        type: "error",
        content: "请输入完整信息",
      });
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurInfo({
      ...curInfo,
      title: event.target.value,
    });
  };
  const changeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurInfo({
      ...curInfo,
      desc: event.target.value,
    });
  };
  const changeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurInfo({
      ...curInfo,
      tag: event.target.value,
    });
  };

  const editorRef = useRef<MDEditorRef>(null);
  return (
    <>
      {contextHolder}
      <div className={styles.create}>
        <div style={{ filter: showForm ? `blur(5px)` : "unset" }}>
          <MarkdownEditor ref={editorRef} />
          <div className={styles.operation}>
            <button className={styles.save} onClick={saveBlog}>
              保存
            </button>
            <button className={styles.confirm} onClick={commitBlog}>
              提交
            </button>
          </div>
        </div>
        {showForm && (
          <div
            className={styles.form}
            onClick={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
          >
            <form
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className={styles.info}>
                <div className={styles.line}>
                  文章标题：
                  <input
                    placeholder="请输入文章标题"
                    onChange={changeTitle}
                  ></input>
                </div>
                <div className={styles.line}>
                  文章描述：
                  <textarea
                    placeholder="请描述文章大概内容"
                    onChange={changeDesc}
                  ></textarea>
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
                  <input
                    placeholder="新增你需要的标签"
                    onChange={changeTag}
                  ></input>
                </div>
              </div>
              <div className={styles.btn} onClick={confirm}>
                确认
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
