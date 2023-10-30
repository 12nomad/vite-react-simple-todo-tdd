import { ReactNode } from "react";

interface Layout {
  children: ReactNode;
}

const Layout = ({ children }: Layout) => {
  return (
    <main className="max-w-screen-md mx-auto my-10 py-5 px-20 border border-slate-100 rounded-md">
      <h1 className="text-2xl text-center font-medium">📘 Simple To-Do TDD</h1>

      <div className="my-5">{children}</div>
    </main>
  );
};

export default Layout;
