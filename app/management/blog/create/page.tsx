import { Create } from "@/features/management/pages/create";
import { auth } from "@/lib/auth";
import type { NextPage } from "next";

const Home: NextPage = async () => {
  const session = await auth();

  return (
    <main>
      <Create session={session} />
    </main>
  );
};

export default Home;
