import React, { useEffect, type SubmitEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { Pen, Trash, Trash2Icon } from "lucide-react";
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
import type { notes } from "@/types/notes";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";

const CardDeleteModal = ({ noteID }: { noteID: string }) => {
  const navigate = useNavigate();

  const { fetchAPI } = useOnFetch({
    url: `/notes?id=${noteID}`,
    method: "DELETE",
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/todoList", { replace: true });
    },
    onError: (error) => toast.error(error.response?.data.detail),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        <Button className="w-full" variant={"destructive"}>
          <Trash /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Todo?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this Todo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => fetchAPI()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type UpdateNoteModalProps = {
  id: string;
  title: string;
  typeTodo: string;
  content: string;
};

const UpdateNoteModal = (props: UpdateNoteModalProps) => {
  const navigate = useNavigate();

  const { fetchAPI, isLoading } = useOnFetch({
    url: "/notes",
    method: "PUT",
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/", { replace: true });
    },
    onError: (error) => toast.error(error.response?.data.detail),
    dataAxios: {
      id: props.id,
      title: props.title,
      typeTodo: props.typeTodo,
      content: props.content,
    },
  });

  const handleSubmitUpdate = (e: SubmitEvent) => {
    e.preventDefault();
    fetchAPI();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className=" items-center w-full">
          <Pen />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Note</SheetTitle>
        </SheetHeader>

        <form className="grid gap-4 px-4" onSubmit={handleSubmitUpdate}>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" placeholder="ex.CodeToday" id="title" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Input type="text" placeholder="ex.Code" id="Type" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              placeholder="content here."
              className="h-100 resize-none"
              id="content"
            ></Textarea>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating" : "Update"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

const CardListComponent = (props: notes) => {
  const date = new Date(props.createdAt).toLocaleDateString("en-US", {
    dateStyle: "long",
  });

  useEffect(() => {
    const d = new Date(date);

    console.log(d);
  }, []);
  return (
    <Card className="w-full max-w-sm h-fit mb-6">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{date}</CardDescription>
        <CardDescription>Type: {props.typeTodo}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.content}</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <UpdateNoteModal {...props} id={props._id} />

        <CardDeleteModal noteID={props._id} />
      </CardFooter>
    </Card>
  );
};

export default CardListComponent;
