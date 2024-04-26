"use client";
import Link from "next/link";
import styles from "./index.module.scss";
import { signInWithGithub } from "../actions/sign-in";
import Icon from "@/components/ui/icons";

export const SignIn = () => {
  const handleSignInWithGithub = async () => {
    await signInWithGithub();
  };
  return (
    <div className={styles.signIn}>
      <div>
        <header>
          <p>登录youfu-blog控制台</p>
          <Link href={"/"}>回首页</Link>
        </header>
        <br />
        <div>
          <Icon name="LogIn" color="#ffffff" />
          <span onClick={handleSignInWithGithub}>使用 Github 登录</span>
        </div>
      </div>
    </div>
  );
};
