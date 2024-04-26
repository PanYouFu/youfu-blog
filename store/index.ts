import { create } from "zustand";

interface BlogInfo {
  title: string;
  desc: string;
  tag: string;
  content: string;
}
interface CurBlogState {
  blogInfo: BlogInfo | null | undefined;
  setBlogInfo: (blogInfo: BlogInfo | null | undefined) => void;
  updateBlogInfo: (blogInfo: Partial<BlogInfo>) => void;
}

export const useBlogStore = create<CurBlogState>((set, get) => ({
  blogInfo: null,
  setBlogInfo: (blogInfo) => {
    if (blogInfo) {
      set({ blogInfo: blogInfo });
      return;
    }
    set({ blogInfo: null });
  },
  updateBlogInfo: (blogInfo) => {
    const oldBlogInfo = get().blogInfo;
    if (!oldBlogInfo) return;
    const newBlogInfo = { ...oldBlogInfo, ...blogInfo };
    set({ blogInfo: newBlogInfo });
  },
}));
