import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  //这里面包含retry
  const { run, ...result } = useAsync<Project[]>();

  //请求函数 返回值为请求获得的Promise对象
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  // useEffect每次渲染时都会执行 包括第一次
  useEffect(() => {
    // 每次param更新就会调用
    // 发起请求，配置也是一样的发起请求的函数
    // 第一个参数是回调函数返回的值，第二个参数是 回调函数
    console.log("我useEffect调用了捏");
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params?: Partial<Project>) => {
    return run(
      client(`projects/${params?.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params?: Partial<Project>) => {
    return run(
      client(`projects/${params?.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
