import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { KanbanScreen } from "../Kanban";
import { EpicScreen } from "../epic";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        {/*若上面两个匹配不到则跳转到看板*/}
        <Route
          path="*"
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
      </Routes>
    </div>
  );
};
