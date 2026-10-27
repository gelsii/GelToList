import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import currentlyUser from "@/contexts/currentUser";
import { LogOutIcon, Settings2, User2 } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import useOnFetch from "@/hooks/useOnFetch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const navigate = useNavigate();

  const { fetchAPI, isLoading } = useOnFetch({
    url: "/auth/logout",
    method: "DELETE",
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/", { replace: true });
    },
    onError: (error) => toast.error(error.response?.data.detail),
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="w-38">
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <LogOutIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to end your current session. You will need to log in
            again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => fetchAPI()}
            disabled={isLoading}
          >
            {isLoading ? "Logouting..." : "Logout"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Settings = () => {
  const userInfo = React.useContext(currentlyUser);
  return (
    <section className="w-full h-full flex justify-start items-start flex-col">
      <h1 className="flex gap-2 items-center">
        <Settings2 /> Settings
      </h1>

      <Separator className="my-4" />

      <div className="w-full grid gap-4">
        <h1 className="flex gap-2 items-center">
          <User2 /> Private Information
        </h1>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            className="w-full"
            value={userInfo?.user?.username}
            disabled={true}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="w-full"
            value={userInfo?.user?.email}
            disabled={true}
          />
        </div>
      </div>

      <Separator className="my-4" />

      <LogoutModal />
    </section>
  );
};

export default Settings;
