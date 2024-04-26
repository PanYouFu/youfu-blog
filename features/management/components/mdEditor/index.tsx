"use client";

import { Editor } from "@bytemd/react";
import zh_Hans from "bytemd/locales/zh_Hans.json";
import { forwardRef, useImperativeHandle, useState } from "react";
import frontmatter from "@bytemd/plugin-frontmatter";
import highlightSSR from "@bytemd/plugin-highlight-ssr";

import "highlight.js/styles/monokai-sublime.css";
import { BytemdPlugin } from "bytemd";

export const plugins: BytemdPlugin[] = [highlightSSR(), frontmatter()];

export interface MDEditorProps {}
export interface MDEditorRef {
  content: string;
}

export const MarkdownEditor = forwardRef<MDEditorRef, MDEditorProps>(
  ({}, ref) => {
    const [value, setValue] = useState("");
    useImperativeHandle(ref, () => ({
      content: value,
    }));

    const onChange = (v: string) => {
      if (v !== value) {
        setValue(v);
      }
    };
    return (
      <>
        <Editor
          value={value}
          onChange={onChange}
          locale={zh_Hans}
          plugins={plugins}
          placeholder="开始创作"
        />
      </>
    );
  }
);
