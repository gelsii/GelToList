import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Todos from "@/pages/Todos";
import SearchListComponent from "./SearchListComponent";
import CreateTodos from "@/pages/CreateTodos";

const TabsNavsComponent = () => {
  return (
    <>
      <Tabs defaultValue="lists" className="w-full h-full gap-8">
        <TabsList className="w-full">
          <TabsTrigger value="lists">lists</TabsTrigger>
          <TabsTrigger value="createList">Create</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="lists">
          <div className="mb-8">
            <SearchListComponent />
          </div>
          <Todos />
        </TabsContent>
        <TabsContent value="createList">
          <CreateTodos />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TabsNavsComponent;
