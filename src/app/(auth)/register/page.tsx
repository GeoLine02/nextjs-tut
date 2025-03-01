/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

const Register = () => {
  const [state, action, isPending] = useActionState(register, undefined);

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
            <div className="error">
              <p>password must:</p>
              <ul className="list-disc list-inside ml-4">
                {state.errors?.password.map((error: any) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="repeatPassword">Repeat password</label>
          <input type="password" name="repeatPassword" />
          {state?.errors?.repeatPassword && (
            <p className="error">{state.errors.repeatPassword}</p>
          )}
        </div>
        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "loading..." : "Register"}
          </button>

          <Link href={"/login"} className="text-link">
            or login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
