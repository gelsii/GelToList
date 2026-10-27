import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Todos from "@/pages/Todos";
import SearchListComponent from "./SearchListComponent";
import CreateTodos from "@/pages/CreateTodos";
import Settings from "@/pages/Settings";
import { Separator } from "./separator";
import useFetch from "@/hooks/useFetch";
import currentlyUser from "@/contexts/currentUser";
import type { responseUser } from "@/types/currentlyUser";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TabsNavsComponent = () => {
  const userInfo = React.useContext(currentlyUser);
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, errorMessage } = useFetch({
    url: "/auth/token",
    method: "POST",
    onFetching: React.useCallback((data: responseUser) => {
      userInfo?.setUser(data.info_user);
    }, []),
  });
  
  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {isSuccess && (
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
            <Separator className="mb-8" />
            <Todos />
          </TabsContent>
          <TabsContent value="createList">
            <CreateTodos />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      )}
      {isError && (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{errorMessage}</EmptyTitle>
            <EmptyDescription>
              You are not authenticated. Please log in to your account to access
              this resource.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              className="w-38 "
              onClick={() => navigate("/", { replace: true })}
            >
              login
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </>
  );
};

export default TabsNavsComponent;
