import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuFolderKanban, LuCheck } from "react-icons/lu";

import Input from "../../components/ui/Input/Input";
import { PasswordInput } from "../../components/auth";
import Button from "../../components/ui/Button";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "demoUser",
      JSON.stringify({
        userName: userName.trim(),
        email: email.trim(),
      })
    );

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 items-center gap-12 lg:gap-20">

        {/* Brand section */}
        <div className="hidden lg:flex flex-col justify-center max-w-lg">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <LuFolderKanban size={27} />
            </div>

            <span className="text-3xl font-bold tracking-tight text-heading">
              FlowBoard
            </span>
          </div>

          <span className="text-sm font-semibold tracking-widest uppercase text-primary mb-5">
            Your workspace, organized
          </span>

          <h1 className="text-4xl xl:text-5xl font-bold leading-tight text-heading">
            Turn your ideas into
            <span className="block text-primary mt-2">
              meaningful progress.
            </span>
          </h1>

          <p className="text-body text-base leading-7 mt-6 max-w-md">
            Bring your projects and tasks together.
            Plan your work, track progress, and stay focused
            on what matters.
          </p>

          <div className="mt-10 space-y-5">
            {[
              "Organize projects and tasks",
              "Track progress with Kanban boards",
              "Manage deadlines with your calendar",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <LuCheck size={21} className="text-primary shrink-0" />
                <span className="text-sm text-body">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registration form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-surface border border-border rounded-2xl p-7 sm:p-9 shadow-xl shadow-black/5">

            {/* Mobile branding */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-9">
              <LuFolderKanban size={29} className="text-primary" />
              <span className="text-2xl font-bold text-heading">
                FlowBoard
              </span>
            </div>

            <div className="mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Get started
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-heading mt-3">
                Create your account
              </h2>

              <p className="text-sm text-muted mt-2 leading-6">
                Start organizing your projects and managing
                your work in one place.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">

              <Input
                id="userName"
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                minLength={2}
                className="transition-colors focus:border-primary"
              />

              <Input
                id="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-colors focus:border-primary"
              />

              <PasswordInput />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full h-12 rounded-lg font-semibold tracking-wide shadow-md shadow-primary/15 hover:shadow-lg transition-all"
                >
                  Create Account
                </Button>
              </div>
            </form>

            <div className="border-t border-border mt-7 pt-6 text-center">
              <p className="text-sm text-muted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted mt-6">
            FlowBoard · Organize work. Make progress.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
