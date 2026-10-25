import React, { useEffect } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Search } from "lucide-react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchListComponent = () => {
  const [filterList, setFilterList] = React.useState("");

  

  return (
    <form method="GET" className="w-full flex items-center  gap-2">
      <Select onValueChange={(value) => setFilterList(value)}>
        <SelectTrigger className="w-45 h-10 ">
          <SelectValue className="h-10" placeholder="Filter..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="date">Date</SelectItem>
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
      />

      <Button className="h-10" type="submit">
        <Search />
      </Button>
    </form>
  );
};

export default SearchListComponent;
