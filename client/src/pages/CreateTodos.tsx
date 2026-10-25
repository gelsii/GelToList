import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { type SubmitEvent } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useOnFetch from "@/hooks/useOnFetch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateTodos = () => {
  const navigate = useNavigate();

  const [formTodosData, setFormTodosData] = React.useState({
    title: "",
    typeTodo: "",
    content: "",
  });

  const { fetchAPI, isLoading } = useOnFetch({
    url: "/notes",
    method: "POST",
    dataAxios: formTodosData,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/todoList", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data.detail);
    },
  });

  const handleCreateNote = (e: SubmitEvent) => {
    e.preventDefault();
    fetchAPI();
  };

  return (
    <section className="w-full h-full flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Todos</CardTitle>
          <CardDescription>Fill Up below of this.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleCreateNote}>
            <div className="grid gap-2">
              <Label htmlFor="Title">Title:</Label>
              <Input
                type="text"
                placeholder="ex.CodeToday"
                id="Title"
                required
                onChange={(e) =>
                  setFormTodosData({ ...formTodosData, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="Type">Type</Label>
              <Input
                type="text"
                maxLength={25}
                id="Type"
                required
                placeholder="ex.Coding"
                onChange={(e) =>
                  setFormTodosData({
                    ...formTodosData,
                    typeTodo: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="Content">Content:</Label>
              <Textarea
                id="Content"
                className="resize-none h-80"
                placeholder="Message here."
                onChange={(e) =>
                  setFormTodosData({
                    ...formTodosData,
                    content: e.target.value,
                  })
                }
              ></Textarea>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateTodos;
