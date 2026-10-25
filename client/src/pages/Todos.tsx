import CardListComponent from "@/components/ui/CardListComponent";
import useFetch from "@/hooks/useFetch";
import type { responseNotes } from "@/types/notes";

const Todos = () => {
  const { data, isLoading } = useFetch<responseNotes>({
    url: "/notes",
    method: "GET",
  });

  return (
    <div className="w-full h-full">
      {isLoading && <h1>Loading data....</h1>}
      <div className="w-full h-full place-items-center columns-1 gap-4 sm:columns-2 xl:columns-4">
        {data?.notes.map((item, index) => (
          <CardListComponent {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
