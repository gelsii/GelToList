import React, { type SubmitEvent } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router";
import useAuthFetch from "../hooks/useAuthFetch";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signInUser = useAuthFetch({
    url: "/signin",
    auth: {
      username: formData.email,
      password: formData.password,
    },
    onError: (err) => toast.error(err.response?.data?.detail),
    onSuccess: (data) => {
      navigate("/todoList", { replace: true });
      toast.success(data);
    },
  });

  const handleClientSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    signInUser.fetchAPI();
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center mb-2 text-red-400">
          <LayoutDashboard />
          GelToList
        </CardTitle>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            onClick={() => navigate("/signup", { replace: true })}
          >
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleClientSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="h-10"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input
                id="password"
                type="password"
                className="h-10"
                required
                placeholder="*********"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={signInUser.isLoading}
            >
              {signInUser.isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
