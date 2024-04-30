# 前言

使用`Next.js14`全栈开发个人博客项目，并使用Vercel进行部署。由于`React18`提出了服务端组件：`React Server Components`。而`Next.js13`对这部分功能进行了集成，更加方便使用，且目前`React`已更新至19，`Next.js`也已经更新至14，所以咱们直接选14版本开始。同时`Vercel`提供了线上数据库，与一键部署`Next.js`项目功能。因此，很方便前端同学，自研全栈项目，废话不多说，直接开始。

# 项目概览

### 功能与技术栈

#### 功能：

*ps: 因为目前vercel提供的域名被墙了，所以访问需要科学上网。*

*pps：但ip没有，所以可以通过购买阿里云域名解析来解决，购买域名，解析到项目的ip上，就能正常访问了。只是需要 钱钱 啦，罢辽*

	1. [浏览与阅读文章模块](https://youfu-blog-panyoufus-projects.vercel.app/)
	2. [文章增删改查控制台](https://youfu-blog-panyoufus-projects.vercel.app/management)

#### 技术栈：

1. 全栈框架： `Next.js14`
2. 语言：`TypeScript`
3. 状态管理工具：`Zustand`
4. 数据库&数据库工具：`Postgres` + `Prisma`
5. 登录：`NextAuth.js`
6. 部署：`Vercel`

#### 项目代码

[youfu-blog](https://github.com/PanYouFu/youfu-blog)

# 初始化项目

### 项目创建

1. 环境准备：`Node.js`最低的版本要求是` 18.17.0`

2. 初始化: `npx create-next-app@latest`

   注意：本次项目使用`TypeScript` 和 `App Router` 

   *APP Router 是新版Next.js推荐使用的路由方式*

### 关联Git

因为使用`Vercal`部署，因此需要此步骤

1. 首先将项目上传至 GitHub，创建仓库并链接远程地址，然后推送代码。
2. 进入 vercel 官网 [vercel.com/](https://link.juejin.cn/?target=https%3A%2F%2Fvercel.com%2F)，登录并选择 GitHub 进行绑定。上传项目时，在 Configure Project 保持默认设置，直接点击 Deploy。环境变量可以在需要的时候进行调整。静等自动部署完成。
3. 分支管理，除了`main`分支外，我们可以建立`develop`和`feature/sth-todo`分支，当本地推送远端时，`Vercel`会自动部署，feat 分支代码。当mr合并时，会自动部署develop分支。这有助于我们在测试环境调试，而不是直接上生产。

### 初始页面开发

经过上一步，项目已经可以部署。我们可以对项目进行一些简单的开，并熟悉下 `APP router`。下面是对`APP Router`的简单介绍

1. 路径：页面存放在app文件夹下，每个文件夹即为一个页面路由，如`app/(site)/blog/[id]/page.tsx` 对应的页面路由为：`https://your-domain/blog/clvklh16h0000skf8hzssxz5w` 
   *可以看到，小括号中的内容不会在路由中呈现，中括号中的内容，可以进行匹配*


2. 每个文件下，默认有两个文件，page.tsx即为当前页面的内容组件；layout.tsx当前页面的布局组件，可以继承，方便同一个模块的页面使用同一种布局。
3. APP router 对应的组件默认为服务端组件，若该组件需要存在交互，需要改成客户端组件，需要在文件头部加上`'use client'`

# 连接数据库

本项目是一个全栈项目，故需要使用数据库，本次使用的是Vercel自带的Postgres数据库，省去了我们部署的烦恼。同时我们使用Prisma为其对应的数据库ORM

1. 在 vercel 平台上，点击storage，申请数据库。（免费用户，有256m的额度）

2. 点击projects，关联上自己的项目

3. 并将这些环境变量，copy到自己项目的 .env环境中 ：POSTGRES_DATABASE、POSTGRES_HOST、POSTGRES_PASSWORD等

4. 安装Prisma、@prisma/client；

   *[Prisma](https://link.juejin.cn/?target=https%3A%2F%2Fwww.prisma.io%2F)  ORM 工具，主要是为了方便于我们在项目中操作数据库，而不用却写繁琐的sql*

5. 设计 Prisma Schema（数据库信息和模型）有了这些模型我们可以生成我们对应的表

6. 通过`npx prisma db push `同步数据库。需确保我们的环境变量准确

*可参考这篇[文章](https://juejin.cn/post/7231152303583100988)*

# NextAuth认证登录

我们通常使用一个应用的时候，可以通过微信登录，git登录等，这里的鉴权逻辑基本差不多。同事NextAuth.js已经帮我集成好了，在Next.js项目中使用，非常方便。

1. 安装相关依赖：

   ```javascript
   npm i next-auth
   npm i @auth/prisma-adapter
   ```

2. 在github的settings/developers 中 new Auth app 配置需要授权登录的项目，即本次项目。Homepage URL 和 Authorization callback URL 的域名先配置为 localhost:3000，便于本地测试。等部署成功后，改为生产域名。

3. 将AUTH_GITHUB_ID AUTH_GITHUB_SECRET AUTH_SECRET配置至项目的env文件中

4. 创建auth.ts

   ```javascript
   import NextAuth from "next-auth";
   import GithubProvider from "next-auth/providers/github"; // 使用github登录
   
   import { PrismaAdapter } from "@auth/prisma-adapter"; // 数据库适配器
   import prisma from "./prisma"; // 导出的数据库实例
   
   // 相关配置项
   export const { handlers, auth, signIn, signOut } = NextAuth({
     adapter: PrismaAdapter(prisma) as any,
     providers: [
       GithubProvider({
         clientId: process.env.AUTH_GITHUB_ID || "",
         clientSecret: process.env.AUTH_GITHUB_SECRET || "",
       }),
     ],
     secret: process.env.AUTH_SECRET,
     pages: {
       signIn: "/auth/sign-in", // 登录页面
       signOut: "/blogs", // 登出后跳转的页面
       error: "/",
     },
     events: {
       signIn(message) { // 登录时触发
         console.log("message----", message);
       },
     },
     callbacks: { // 调用 getSession 和 useSession 时会触发
       session: ({ session, token }) => {},
     },
   });
   ```

5. 在合适的地方使用导出的 signIn signOut等方法；如在跳转控制台的时候，若未查询到session。则跳转登录页。调用登录方法。

# 功能完善

### 配置Zustand

为什么使用zustand进行状态管理工具，因为使用起来简单，简单，还是特么的简单。

1. 安装依赖

2. 创建store

   ```typescript
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
   ```

3. 使用

   ```typescript
   import { useBlogStore } from "@/store";
   ...
   const [setBlogInfo] = useBlogStore((state) => [state.setBlogInfo]);
   ```

### 配置request

1. 为啥需要?如果我们在使用 Rsc （服务端组件），的确可以在其中直接调用数据库，但是我们在客户端组件中，还是要正常调用后端API的，还是有必要集成下request.ts

2. 使用fetch发送请求，封装后的 [request.ts](https://github.com/PanYouFu/youfu-blog/blob/develop/utils/request.ts)

3. APP router 模式中，在API模块下即为对应的API路由。可以在其文件下创建route.ts来接受请求。上代码：

   ```typescript
   // app/api/blog/publish/route.ts 发布文章接口
   
   import { NextRequest } from "next/server";
   import prisma from "@/lib/prisma";
   import { BlogInfo } from "@/features/management/pages/create";
   
   // 发布一篇新blog
   export async function POST(request: NextRequest) {
     const params: BlogInfo = await request.json();
   
     // 根据body 向数据库中插入一条新数据
     const blog = await prisma.blog.create({
       data: {
         body: params.content,
         description: params.desc,
         published: true,
         title: params.title,
         tags: {
           create: [{ name: params.tag }],
         },
       },
     });
     return Response.json({
       id: blog.id,
     });
   }
   
   // 使用 
   const data: any = await request.post("/api/blog/publish", {
     params: curInfo,
   });
   ```

### 文章列表&文章浏览

1. 这两个因为没有前端交互，可以使用Rsc实现。
2. 实现查询文章列表，文章详情方法。
3. 将获得内容作为props传递给组件

### 控制台

*控制台涉及页面，都为客户端组件*

1. 写文章：引入bytemd，实现线上编辑md。并引入相关插件，优化使用体验
2. 文章列表功能

# 部署

1. 代码推送到GitHub时，会触发Vercel的自动部署

# 后记

本次项目对Next.js14有了个初探，同时尝试了一些平时用不到技术栈。当然需要做的还有很多。目前只实现博文的增删查，改这部分还未实现。标签管理功能也未实现。同时，还需要优化在线md的使用体验。

ps: 这篇写得太粗了，详细的不如直接看代码吧