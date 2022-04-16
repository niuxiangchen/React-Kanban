import React from "react";
import { useKanbans } from "utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnContainer>
    </ScreenContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  overflow: scroll-x;
  flex: 1;
`;
