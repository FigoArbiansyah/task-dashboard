import Heading1 from "@/components/Heading/1";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <div className="md:w-[26rem] mx-auto">
        <div className="text-center mb-4">
          <Heading1 title="Register" />
        </div>
        <form method="post">
          <div className="grid gap-2 m-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="outline-none border rounded p-2"
            />
          </div>
          <div className="grid gap-2 m-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="outline-none border rounded p-2"
            />
          </div>
          <div className="grid gap-2 m-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="outline-none border rounded p-2"
            />
          </div>
          <div className="grid gap-2 px-3 pt-2">
            <button
              type="submit"
              className="py-2 border rounded border-black bg-black text-white hover:bg-opacity-80 transition-all ease"
            >
              Sign Up
            </button>
            <Link href="/login" className="text-sm text-emerald-600">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
