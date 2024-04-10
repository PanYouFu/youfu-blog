'use client'

import { Editor } from '@bytemd/react'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import { useState } from 'react'
import frontmatter from '@bytemd/plugin-frontmatter'
import highlightSSR from '@bytemd/plugin-highlight-ssr'

import 'highlight.js/styles/monokai-sublime.css'
import { BytemdPlugin } from 'bytemd'

const plugins: BytemdPlugin[] = [highlightSSR(), frontmatter()]

export const MarkdownEditor = () => {
  const [value, setValue] = useState('')

  const onChange = (v: string) => {
    setValue(v)
  }
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
  )
}
