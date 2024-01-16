"use client";

import Heading1 from "@/components/Heading/1";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

const { useState } = React;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_BASE_API_URL;
    setIsLoading(true);
    setError(null);
    try {
      await axios
        .post(`${url}/auth/register`, {
          name,
          email,
          password,
        })
        .then((res) => {
          setMessage(
            "Register successfully, will be redirected to the login page in 3 seconds."
          );
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        });
    } catch (error: any) {
      // console.log(error);
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="md:w-[26rem] mx-auto">
        <div className="text-center mb-4">
          <Heading1 title="Register" />
          {error && <p className="mt-2 font-light text-yellow-500">{error}</p>}
          {message && (
            <p className="mt-2 font-light text-slate-700">{message}</p>
          )}
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div className="grid gap-2 m-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="outline-none border rounded p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <SubmitButton text="Sign Up" loading={isLoading} />
            <Link href="/login" className="text-sm text-emerald-600">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
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

export default Register;
