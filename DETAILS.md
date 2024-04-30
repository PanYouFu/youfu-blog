> 由于开发的时候，没有一边写一边记笔记，导致小总结的时候写得不好。现在来回顾下开发过程中的一些细节，和填坑的过程

*ps: 想到哪写到哪吧*

## Next.js 相关

从next.js 13开始，算是与之前版本大不同，因为 RSC 的出现。

1. 使用新的APP router后，需要新建page.tsx对应访问到的页面组件

2. Layout.tsx为布局组件，同一个文件夹下的可以继承，对于统一布局很有帮助

3. 默认为服务端组件，如果是客户端组件，需要在文件顶部天剑 use client

4. 对于不会因外部而改变的文件，打包默认成static文件。包含API下的接口文件。

   基于此遇到一个问题：博客列表页删除某篇博客后，刷新页面，内容却未更新，因为对应的API文件被打包成了静态文件。

   即代码块中的：/api/blog/search    /blogs  

   ```shell
    Creating an optimized production build  .Route (app)                              Size     First Load JS
   ┌ ○ /                                    228 B          82.3 kB
   ├ ○ /_not-found                          869 B          82.9 kB
   ├ λ /api/auth/[...nextauth]              0 B                0 B
   ├ λ /api/blog/delete                     0 B                0 B
   ├ λ /api/blog/publish                    0 B                0 B
   ├ ○ /api/blog/search                     0 B                0 B
   ├ ○ /auth/sign-in                        637 B           191 kB
   ├ λ /blog/[id]                           553 B           323 kB
   ├ ○ /blogs                               1.03 kB        83.1 kB
   ├ λ /management                          150 B          82.2 kB
   ├ λ /management/blog                     1.83 kB         124 kB
   ├ λ /management/blog/create              3.49 kB         366 kB
   ├ λ /management/blog/edit/[id]           150 B          82.2 kB
   ├ λ /management/user                     150 B          82.2 kB
   └ ○ /tag                                 150 B          82.2 kB
   + First Load JS shared by all            82.1 kB
     ├ chunks/938-c178a083a8eff66e.js       26.7 kB
     ├ chunks/fd9d1056-dabef86ae4aaf510.js  53.3 kB
     ├ chunks/main-app-97d6a94ae83ee09f.js  220 B
     └ chunks/webpack-e2f2c09c42424edb.js   1.88 kB
   
   
   ○  (Static)   prerendered as static content
   λ  (Dynamic)  server-rendered on demand using Node.js
   
   ```

   此时我们需要在这两个文件中增加代码，确保其强制转换为ssr

   ```typescript
   export const dynamic = "force-dynamic";
   ```

   此时再打包结果如下，/api/blog/search  /blogs  已转为ssr

   ```she
      Creating an optimized production build  .Route (app)                              Size     First Load JS
   ┌ ○ /                                    228 B          82.3 kB
   ├ ○ /_not-found                          869 B          82.9 kB
   ├ λ /api/auth/[...nextauth]              0 B                0 B
   ├ λ /api/blog/delete                     0 B                0 B
   ├ λ /api/blog/publish                    0 B                0 B
   ├ λ /api/blog/search                     0 B                0 B
   ├ ○ /auth/sign-in                        637 B           191 kB
   ├ λ /blog/[id]                           553 B           323 kB
   ├ λ /blogs                               1.03 kB        83.1 kB
   ├ λ /management                          150 B          82.2 kB
   ├ λ /management/blog                     1.83 kB         124 kB
   ├ λ /management/blog/create              3.49 kB         366 kB
   ├ λ /management/blog/edit/[id]           150 B          82.2 kB
   ├ λ /management/user                     150 B          82.2 kB
   └ ○ /tag                                 150 B          82.2 kB
   + First Load JS shared by all            82.1 kB
     ├ chunks/938-c178a083a8eff66e.js       26.7 kB
     ├ chunks/fd9d1056-dabef86ae4aaf510.js  53.3 kB
     ├ chunks/main-app-97d6a94ae83ee09f.js  220 B
     └ chunks/webpack-e2f2c09c42424edb.js   1.88 kB
   
   
   ○  (Static)   prerendered as static content
   λ  (Dynamic)  server-rendered on demand using Node.js
   ```

5. 客户端组件可以作为子组件插在服务端组件中

6. 在服务端组件中，可以通过<link />标签实现路由跳转

7. 在客户端组件中，可以通过使用"next/navigation"来实现路由跳转

   ```ts
   "use client";
   import { useRouter } from "next/navigation";
   ...
   const router = useRouter();
   const goDetail = (id: string) => {
     router.push(`/blog/${id}`);
   };
   ```

8. nextConfig配置，去掉严格模式，阻止渲染两次；配置image标签允许访问的协议和域名

   ```js
   const nextConfig = {
     // Next.js 开发模式默认会开启 React Strict Mode，会渲染2次，我们不需要
     reactStrictMode: false,
     images: {
       remotePatterns: [
         {
           protocol: "https",
           hostname: "avatars.githubusercontent.com",
         },
         {
           protocol: "http",
           hostname: "localhost",
         },
       ],
     },
   };
   module.exports = nextConfig;
   ```



## 登录

1. 可以在NextAuth中的 events 或者 callbacks中配置简单的权限校验

   ```typescript
   export const { handlers, auth, signIn, signOut } = NextAuth({
     ...
     events: {
       signIn(message) { console.log("message----", message); },
     },
     callbacks: {
       // 调用 getSession 和 useSession 时会触发
       session: ({ session, token }) => {
         if (session.user && token?.sub) {
           (session.user as any).id = token.sub;
         }
         // 添加权限
         if (session.user?.email === "18860976892@163.com") {
           (session.user as any).permission = true;
         } else {
           (session.user as any).permission = false;
         }
         return session;
       },
       async signIn({ profile }) {
         // 只允许163邮箱登录
         if (!profile?.email?.endsWith("@163.com")) {
           return false;
         } else {
           return true;
         }
       },
     },
   });
   
   ```

2. 或得到的登录态信息，可以通过props由服务端组件传递给它的子组件



## 数据库与请求

1. 首先需要配置数据库模型，schema.prisma，用于生成表

   ```
   generator client {
     provider = "prisma-client-js"
   }
   
   // 使用 postgresql 作为数据库
   datasource db {
     provider = "postgresql"
     url = env("POSTGRES_PRISMA_URL") // uses connection pooling
     directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
   }
   
   model Account {
     id                String  @id @default(cuid()) // @id()为主键；@default() 用来设置默认值
     userId            String
     type              String
     provider          String
     providerAccountId String
     refresh_token     String? @db.Text
     access_token      String? @db.Text
     expires_at        Int?
     token_type        String?
     scope             String?
     id_token          String? @db.Text
     session_state     String?
   
     user User @relation(fields: [userId], references: [id], onDelete: Cascade)
   
     @@unique([provider, providerAccountId])
   }
   
   model Session {
     id           String   @id @default(cuid())
     sessionToken String   @unique
     userId       String
     expires      DateTime
     user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
   }
   
   model User {
     id            String    @id @default(cuid())
     name          String?
     password      String?
     email         String?   @unique
     emailVerified DateTime?
     image         String?
     accounts      Account[]
     sessions      Session[]
   }
   
   model VerificationToken {
     identifier String
     token      String   @unique
     expires    DateTime
   
     @@unique([identifier, token])
   }
   
   enum TagTypeEnum {
     // 通用
     ALL
     // 仅用于blog
     BLOG
   }
   
   model Tag {
     name     String      @unique
     blogs    Blog[]
     type     TagTypeEnum @default(ALL)
   
     id        String   @id @default(cuid())
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   
   model Blog {
     title       String  @unique
     description String
     body        String  @db.Text
     cover       String?
     author      String?
     published   Boolean @default(false)
     tags        Tag[]
   
     id        String   @id @default(cuid())
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

2. 导出Prisma实例

   ```typescript
   // 这段代码用于配置并导出一个 Prisma 实例。在生产环境中，每次请求都会创建一个新的 PrismaClient 实例，
   // 而在开发环境中，它会重复使用全局的实例以防止数据连接数耗尽。这样的设置可以有效提高性能并减少资源占用。
   import { PrismaClient } from '@prisma/client'
   let prisma: PrismaClient
   if (process.env.NODE_ENV === 'production') {
     prisma = new PrismaClient()
   } else {
     if (!(global as any).prisma) {
       (global as any).prisma = new PrismaClient()
     }
     prisma = (global as any).prisma
   }
   export default prisma
   ```

3. prisma的一些操作命令

   | 命令     | 说明                                                  |
   | -------- | ----------------------------------------------------- |
   | init     | 在应用中初始化 Prisma                                 |
   | generate | 主要用来生成 Prisma Client                            |
   | db       | 管理数据库的模式和生命周期                            |
   | migrate  | 迁移数据库                                            |
   | studio   | 启动一个Web 端的工作台来管理数据                      |
   | validate | 检查 Prisma 的模式文件的语法是否正确                  |
   | format   | 格式化Prisma的模式文件，默认就是 prisma/schema.prisma |

4. 可以将上述命令，放置package.json中

   ```json
   {
     "name": "youfu-blog",
     "version": "0.1.0",
     "private": true,
     "scripts": {
       "dev": "next dev",
       "build": "prisma generate && next build",
       "start": "next start",
       "lint": "next lint",
       "lint:fix": "next lint --fix",
       "db:gen": "prisma generate",
       "db:dev": "prisma migrate dev",
       "db:studio": "prisma studio",
       "db:push": "prisma db push"
     },
   }
   ```

5. 由于 `Prisma Client`是根据schema定制的，因此每次 `Prisma Schema`文件发生更改时，您都需要通过运行以下命令来更新它

6. 在服务端组件中，若不需要请求第三方服务器，我们可以直接操作数据库，而不用发请求

7. next.js推荐使用 fetch 发送请求，且会默认对请求使用缓存。我们可以通过封装请求，去手动修改缓存设置

   ```typescript
   class Request {
     /**
      * 请求拦截器
      */
     interceptorsRequest({ url, method, params, cacheTime }: Props) { 
       const config: Config = cacheTime || cacheTime === 0
       	? 
       	cacheTime > 0 ? { next: { revalidate: cacheTime } } : { cache: "no-store" }
       	: 
       	{ cache: "no-store" };
   
       return {
         url,
         options: {
           ...config,
         },
       };
     }
   }
   ```

8. API 文件的路径和写法为

   ```typescript
   import { NextRequest } from "next/server";
   import prisma from "@/lib/prisma";
   export async function POST(request: NextRequest) {
    const params: BlogInfo = await request.json();  
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
    return Response.json({ id: blog.id });}
   ```

## 环境变量

一般来说，只需要一个 .env.local 文件。但是，有时您可能希望为开发（next dev）或生产（next start）环境添加一些默认值。

Next.js 允许您在 .env（所有环境）、.env.development（开发环境）和 .env.Production（生产环境）中设置默认值。

.env.local 始终覆盖默认设置。

- `.env.local`: 可以覆盖其他`.env`文件中的变量，不会被git版本控制系统跟踪，通常用于包含敏感信息。
- `.env.development`: 只在`next dev`（即开发环境）中被加载。
- `.env.production`: 只在`next start`（即生产环境）中被加载。
- `.env.test`: 在执行自动化测试时使用，需要自己配置加载机制。
- `.env`: 默认的环境变量文件，无论何种环境都会被加载，但会被以上特定环境的配置覆盖。

## 其他配置

todo···

