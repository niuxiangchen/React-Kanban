import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { Button, Row } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ErrorBox } from "../../components/lib";

export const ProjectListScreen = (props: {}) => {
  useDocumentTitle("项目列表", false);

  //每当搜索栏里的数据改变，就会去调用useProjects里的useEffect进而调用run
  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));

  const { data: users } = useUsers();

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      {/*搜索框数据改变会调用setParam改变param的值触发重新渲染  */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
