import * as React from "react";
import Head from "next/head";
import styles from "./auth.module.scss";
import form from "styles/form.module.scss";
import { login } from "lib/actions/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await login(email, password);

    if (data instanceof Error) {
      // todo: throw error to user
      console.log(data);
    }

    if (data) {
      router.push("/");
    }
  }

  return (
    <>
      <Head>
        <title>Login - Discord clone</title>
      </Head>

      <div className={styles.authContainer}>
        <form onSubmit={onSubmit} className={styles.authForm}>
          <h1>Welcome back!</h1>
          <p>We&apos;re so excited to see you again!</p>

          <div className={form.formGroup}>
            <label htmlFor="email">email</label>
            <input
              className={form.formInput}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "1rem" }} className={form.formGroup}>
            <label htmlFor="password">password</label>
            <input
              className={form.formInput}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button style={{ width: "100%" }} className={form.formBtn}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
