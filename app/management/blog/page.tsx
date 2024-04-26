import { BlogList } from "@/features/management/components/bloglist";

import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return <BlogList session={session} />;
}
