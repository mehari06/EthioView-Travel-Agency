"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn-primary disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
