import { useEffect, useState } from "react";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { useAddTask } from "../../utils/kanban";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);
  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }
  //输入模式
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做什么"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
