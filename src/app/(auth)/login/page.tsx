import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/5 p-8">
        <div className="mb-6 text-center">
          <div className="font-mono text-sm text-blue-400">ashish@pawade:~$</div>
          <h1 className="mt-2 text-lg font-semibold text-white">Dashboard sign in</h1>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
