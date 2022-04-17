import React from "react";
import { useKanbans } from "utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsLoding } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoding || kanbanIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn key={kanban.id} kanban={kanban} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow: scroll;
  flex: 1;
`;
