import type { NextPage } from "next";
import { KuaiLe } from "@/app/ui/fonts";
import styles from "./index.module.scss";

const Home: NextPage = () => {
  return (
    <div className={`${KuaiLe.className} ${styles.home}`}>
      <span>哟~</span>
      <br />
      <span style={{ color: "#7cb305" }}>稀客呀!~</span>
      <br />
      <span style={{ fontSize: "60px" }}>Hi~ o(*￣▽￣*)ブ </span>
    </div>
  );
};

export default Home;
