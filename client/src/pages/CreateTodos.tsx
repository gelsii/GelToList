import { Input } from "@/components/ui/input";
import React, { type SubmitEvent } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useOnFetch from "@/hooks/useOnFetch";
import { toast } from "sonner";
//import { useNavigate } from "react-router-dom";

const CreateTodos = () => {
  //const navigate = useNavigate();

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
      //navigate("/todoList", { replace: true });
      location.reload();
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
    <section className="w-full h-full flex flex-col gap-4 py-4 ">
      {/* <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Todos</CardTitle>
          <CardDescription>Fill Up below of this.</CardDescription>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card> */}
      <h1 className="text-2xl font-bold">Create a Note!</h1>

      <form
        className="flex flex-col h-full gap-8 justify-around w-full"
        onSubmit={handleCreateNote}
      >
        <div className="grid gap-2">
          <Label htmlFor="Title">Title:</Label>
          <Input
            type="text"
            placeholder="ex.CodeToday"
            id="Title"
            className="h-10"
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
            className="h-10"
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
            required
            onChange={(e) =>
              setFormTodosData({
                ...formTodosData,
                content: e.target.value,
              })
            }
          ></Textarea>
        </div>

        <Button type="submit" disabled={isLoading} className="w-48">
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </section>
  );
};

export default CreateTodos;
