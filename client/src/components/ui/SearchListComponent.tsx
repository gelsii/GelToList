import React, { type SubmitEvent } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { LogOut, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useOnFetch from "@/hooks/useOnFetch";
import type { notes, searchResponseType } from "@/types/notes";
import CardListComponent from "./CardListComponent";

const OpenSearchModal = React.memo(
  (props: {
    searched_note?: notes[];
    setClosed: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <section className="fixed top-0 left-0 bg-[#00000091] p-8 w-full h-full">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-lg text-white font-bold">Searched: </h1>
          <Button
            className="w-20"
            variant={"secondary"}
            onClick={() => props.setClosed(false)}
          >
            <LogOut />
            Exit
          </Button>
        </div>

        {props.searched_note?.length == 0 && (
          <h1 className="text-lg text-white">Not Found...</h1>
        )}
        <div className="w-full place-items-center gap-4 h-full py-10 columns-1 sm:p-12 sm:columns-2 lg:columns-3 xl:columns-4">
          {props.searched_note?.map((note, index) => (
            <CardListComponent {...note} key={index} />
          ))}
        </div>
      </section>
    );
  },
);

const SearchListComponent = () => {
  const [filterList, setFilterList] = React.useState("title");
  const [searchedClient, setSearchedClient] = React.useState("");
  const [isClosed, seIsClosed] = React.useState(false);

  const { fetchAPI, isLoading, data, isSuccess } =
    useOnFetch<searchResponseType>({
      url: "/notes/search",
      method: "GET",
      params: {
        filterType: filterList,
        searchNote: searchedClient,
      },
      onSuccess: () => seIsClosed(true),
    });

  const handleSearchSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    fetchAPI();
  };

  if (isSuccess) {
    console.log(data);
  }

  return (
    <>
      <form
        method="GET"
        className="w-full flex items-center  gap-2"
        onSubmit={handleSearchSubmit}
      >
        <Select
          onValueChange={(value) => setFilterList(value)}
          defaultValue="title"
        >
          <SelectTrigger className="w-45 h-10">
            <SelectValue className="h-10" placeholder="Filter..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="typeTodo">TypeTodo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          type="text"
          className="h-10 max-w-sm"
          placeholder="Search todolist..."
          required
          onChange={(e) => setSearchedClient(e.target.value)}
        />

        <Button className="h-10" type="submit" disabled={isLoading}>
          <Search />
        </Button>
      </form>

      {isClosed && isSuccess && (
        <OpenSearchModal {...data} setClosed={seIsClosed} />
      )}
    </>
  );
};

export default SearchListComponent;
