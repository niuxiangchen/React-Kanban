import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //  依赖项加上callback会造成无限循环，这个和useCallback以及useMemo有关系
  }, []);
};

// const debounce = (func, delay) => {
//   let timeout;
//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function () {
//       func();
//     }, delay);
//   };
// };

//后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useDocumentTitle = (
  title: string,
  keepOnUnMount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  //页面加载时：oldTitle
  //加载后：新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnMount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnMount, oldTitle]);
};

//重置路由状态并刷新页面
export const resetRoute = () => (window.location.href = window.location.origin);

// 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    //页面加载完调用
    mountedRef.current = true;
    //页面卸载调用
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
