- 当运行npm start的时候 webpack读env.development中的变量
- 当运行npm run build的时候 webpack读env中的变量
- hook不可以在普通函数中运行 只能 1.其他hook中 2.组件中
- 自定义hook时一定要以use开头
- useEffect() 的第二个参数说明  
  有时候，我们不希望useEffect()每次渲染都执行，这时可以使用它的第二个参数，使用一个数组指定副效应函数的依赖项，只有依赖项发生变化，才会重新渲染。
- d.ts文件就相当于说明书，是给js文件打补丁用的
- js中的typeof是在js运行中执行的
- ts中的typeof是在静态环境中运行的 typeof是用来操作类型的
- rem 相对根元素html,r就是root的意思
- em相对于父元素的font-size
- grid和flex各自的应用场景
  1. 要考虑是一维布局还是二维布局 一般一维布局用flex，二维布局用grid
  2. 是从内容出发还是从布局出发？ 从内容出发(flex)：先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的共关键 从布局出发(grid)：先规划网格(数量一般比较固定),然后在把元素往里填充
