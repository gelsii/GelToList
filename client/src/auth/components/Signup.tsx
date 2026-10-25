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
import { useNavigate } from "react-router-dom";
import useAuthFetch from "../hooks/useAuthFetch";
import { toast } from "sonner";

const Signup = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const SignUpUser = useAuthFetch({
    url: "/signup",
    data: formData,
    onSuccess: (data) => toast.success(data),
    onError: (err) => toast.error(err.response?.data.detail),
  });

  const handleSignUpClient = (e: SubmitEvent) => {
    e.preventDefault();
    SignUpUser.fetchAPI();
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl" onSubmit={handleSignUpClient}>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center mb-2 text-red-400">
          <LayoutDashboard />
          GelToList
        </CardTitle>
        <CardTitle>Sign Up Account!</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            onClick={() => navigate("/", { replace: true })}
          >
            Sign In
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Gel.example"
                required
                className="h-10"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
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
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="********"
                className="h-10"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={SignUpUser.isLoading}
            >
              {SignUpUser.isLoading ? "loading..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
