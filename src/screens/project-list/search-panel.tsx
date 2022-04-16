/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { User } from "../../types/User";
import { Project } from "../../types/project";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form
      css={{
        marginBottom: "2rem",
      }}
      layout={"inline"}
    >
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item
        css={{
          marginBottom: "2rem",
        }}
      >
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
