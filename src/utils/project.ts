import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // //这里面包含retry
  // const { run, ...result } = useAsync<Project[]>();
  //
  // //请求函数 返回值为请求获得的Promise对象
  // const fetchProjects = useCallback(
  //   () => client("projects", { data: cleanObject(param || {}) }),
  //   [client, param]
  // );
  //
  // // useEffect每次渲染时都会执行 包括第一次
  // useEffect(() => {
  //   // 每次param更新就会调用
  //   // 发起请求，配置也是一样的发起请求的函数
  //   // 第一个参数是回调函数返回的值，第二个参数是 回调函数
  //   console.log("我useEffect调用了捏");
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [param, run, fetchProjects]);
  // return result;

  //当param改变时，就会重新查询一次
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const queryClient = useQueryClient();
  // const mutate = (params?: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params?.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params?.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params?: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id, //只有id有值的时候才调用这个函数
    }
  );
};
