import React from "react";
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

const CardDeleteModal = () => {
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
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type CardListComponentProps = {
  content: string;
};

const CardListComponent = (props: CardListComponentProps) => {
  return (
    <Card className="w-full max-w-sm h-fit mb-6">
      <CardHeader>
        <CardTitle>Code Today!</CardTitle>
        <CardDescription>Type: Code</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.content}</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">
          {" "}
          <Pen />
          Edit
        </Button>
        <CardDeleteModal />
      </CardFooter>
    </Card>
  );
};

export default CardListComponent;
