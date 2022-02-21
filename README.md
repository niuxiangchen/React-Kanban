- 当运行npm start的时候 webpack读env.development中的变量
- 当运行npm run build的时候 webpack读env中的变量
- hook不可以在普通函数中运行 只能 1.其他hook中 2.组件中
- 自定义hook时一定要以use开头
- useEffect() 的第二个参数说明  
  有时候，我们不希望useEffect()每次渲染都执行，这时可以使用它的第二个参数，使用一个数组指定副效应函数的依赖项，只有依赖项发生变化，才会重新渲染。
