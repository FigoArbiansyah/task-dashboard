"use client";

import Heading1 from "@/components/Heading/1";
import { checkIsLogin, getToken, setToken } from "@/helpers/cookie";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const { useState, useEffect } = React;

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [isOnSubmit, setIsOnSubmit] = useState(false);
  const [error, setError] = useState<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_BASE_API_URL;
    setIsOnSubmit(true);
    setError(null);
    try {
      await axios
        .post(`${url}/auth/login`, {
          email,
          password,
        })
        .then((res) => {
          // console.log(res);
          setToken(res?.data?.data?.access_token);
          const token = getToken();
          if (token) {
            router.push("/");
          }
        });
    } catch (error: any) {
      // console.log(error);
      setError(error?.message);
    } finally {
      setIsOnSubmit(false);
    }
  };

  useEffect(() => {
    if (checkIsLogin()) {
      router.push("/");
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);

  if (!loading) {
    return (
      <section className="h-screen grid place-items-center">
        <div className="md:w-[26rem] mx-auto">
          <div className="text-center mb-4">
            <Heading1 title="Login" />
            {error && (
              <p className="mt-2 font-light text-yellow-500">{error}</p>
            )}
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="grid gap-2 m-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="outline-none border rounded p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 m-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="outline-none border rounded p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2 px-3 pt-2">
              <SubmitButton text="Sign In" loading={isOnSubmit} />
              <Link href="/register" className="text-sm text-emerald-600">
                Register account?
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
  }
};

const SubmitButton = ({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) => {
  return (
    <button
      type="submit"
      className="py-2 border rounded border-black bg-black text-white hover:bg-opacity-80 transition-all ease disabled:bg-opacity-50"
      disabled={loading ? true : false}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Login;
