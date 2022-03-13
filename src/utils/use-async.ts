import { useCallback, useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

export const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };

  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();
  //useState直接传入函数的含义是：惰性初始化，所以要用useState保存函数，不能直接传入函数
  //页面加载时函数就已经了执行一次 此时retry被初始化为：空函数 ()=>{}
  const [retry, setRetry] = useState(() => () => {});

  //成功时的回调
  const setData = useCallback((data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  }, []);

  //失败时的回调
  const setError = useCallback((error: Error) => {
    setState({ error: error, stat: "error", data: null });
  }, []);

  //run用来触发异步请求
  //页面加载时会执行一次run
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }

      //每次调用时把函数保存下来 而不是执行函数体内部的代码
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      //prevState此时此刻的state
      setState((prevState) => ({ ...prevState, stat: "loading" }));

      return promise
        .then((data) => {
          //组件已经被挂载
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          // catch会消化异常,如果不主动抛出,外面是接收不到异常的
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry被调用时 重新跑一遍，让state刷新一遍
    retry,
    ...state,
  };
};
