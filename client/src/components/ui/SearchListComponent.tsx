import React from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Search } from "lucide-react";

const SearchListComponent = () => {
  return (
    <form method="GET" className="w-full flex  gap-2">
      <Input
        type="text"
        className="h-10 max-w-sm"
        placeholder="Search todolist..."
        required
      />
      <Button className="h-10" type="submit">
        <Search />
      </Button>
    </form>
  );
};

export default SearchListComponent;
