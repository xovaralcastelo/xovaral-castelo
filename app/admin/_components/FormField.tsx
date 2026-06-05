import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function FormField({ label, hint, error, children, htmlFor }: BaseProps) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-xv-gray-700 mb-1.5">
        {label}
      </span>
      {children}
      {hint && !error ? (
        <span className="block mt-1 text-xs text-xv-gray-500">{hint}</span>
      ) : null}
      {error ? (
        <span className="block mt-1 text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border-2 border-xv-gray-200 px-4 py-2.5 text-sm text-xv-navy outline-none focus:border-xv-orange transition ${props.className ?? ""}`}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border-2 border-xv-gray-200 px-4 py-2.5 text-sm text-xv-navy outline-none focus:border-xv-orange transition resize-y min-h-[100px] ${props.className ?? ""}`}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border-2 border-xv-gray-200 px-4 py-2.5 text-sm text-xv-navy outline-none focus:border-xv-orange transition bg-white ${props.className ?? ""}`}
    />
  );
}
