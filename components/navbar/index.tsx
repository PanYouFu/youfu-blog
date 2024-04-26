import type { NextPage } from "next";
import Link from "next/link";

import styles from "./index.module.scss";
import { navs } from "./config";
import { KuaiLe } from "@/app/ui/fonts";
import Icon from "../ui/icons";

const MG_URL = "/management";

const Navbar: NextPage = () => {
  return (
    <div className={`${styles.navbar} ${KuaiLe.className}`}>
      <p>Youfu-BLOG</p>
      <section>
        {navs?.map((nav) => (
          <Link key={nav.label} href={nav.value}>
            {nav.label}
          </Link>
        ))}
      </section>
      <Link href={MG_URL} legacyBehavior>
        <a target="_blank">
          <Icon name="FileCog" />
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
