import CardListComponent from "@/components/ui/CardListComponent";
import useFetch from "@/hooks/useFetch";
import type { responseNotes } from "@/types/notes";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

const Todos = () => {
  const { data, isLoading } = useFetch<responseNotes>({
    url: "/notes",
    method: "GET",
  });

  return (
    <div className="w-full h-full">
      {isLoading && <h1>Loading data....</h1>}
      <div className="w-full h-fit place-items-center columns-1 gap-4 sm:columns-2 xl:columns-4">
        {data?.notes?.map((item, index) => (
          <CardListComponent {...item} key={index} />
        ))}
      </div>

      {data?.notes?.length == 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>
              <NotebookPen />
            </EmptyTitle>
            <EmptyTitle>No Notes Yet</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <EmptyDescription>
              You haven't created any notes yet. Start organizing your thoughts
              by creating your first note!
            </EmptyDescription>

            <Button className="w-38">Create Note</Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};

export default Todos;
