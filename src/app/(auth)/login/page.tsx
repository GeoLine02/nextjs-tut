"use client";

import { login } from "@/actions/auth";
import Link from "next/link";
import React, { useActionState } from "react";

const Login = () => {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
      <form className="space-y-4" action={action}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            defaultValue={state?.email as string}
          />
          {state?.errors?.email && (
            <p className="error">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          {state?.errors?.password && (
            <p className="error">{state.errors.password}</p>
          )}
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "loading..." : "Login"}
          </button>

          <Link href={"/register"} className="text-link">
            or register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
