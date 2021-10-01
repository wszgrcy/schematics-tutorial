# Angular专有依赖1(@schematics/angular)
- 钦定模块的后缀

```ts
export const MODULE_EXT = ".module.ts";
export const ROUTING_MODULE_EXT = "-routing.module.ts";
```

- 文本变更时使用到的一些工具类
- ng 环境下的一些封装
- 本依赖并没有导出任何方法,所有使用按照 Angular 官方来说都是`非法`,所以存在不稳定性

# change

## InsertChange/RemoveChange/ReplaceChange

- 变更实例,使用 apply 可以直接修改文件

## applyToUpdateRecorder

- 使用 recorder 更新

# ast-utils(无法使用/不推荐使用)

## insertImport

- 插入 import 声明时使用

## findNodes

- 递归搜索节点

## getSourceNodes

- 拍平文件节点

## findNode

- 也是递归搜索

## insertAfterLastOccurrence

- 在给定节点中选择最后面的中内部符合条件的最后一个插入相关

## getDecoratorMetadata

- 返回装饰器的元数据(可以指定是个那个包里的哪个装饰器)

## getMetadataField

- 获得装饰器元数据的哪个字段

## addSymbolToNgModuleMetadata

- ngModule 中插入声明(包括 Import)

## addDeclarationToModule

- `addSymbolToNgModuleMetadata`的包装

## addImportToModule

- `addSymbolToNgModuleMetadata`的包装

## addProviderToModule

## addExportToModule

## addBootstrapToModule

## isImported

- 判断有没有某个引入

## getEnvironmentExportName

- 获得环境变量导出(写死为 environment)

## getRouterModuleDeclaration

- 获得路由模块的声明

## addRouteDeclarationToModule

- 添加路由声明

# dependencies

## addPackageJsonDependency

- 添加 package.json 使用,可以指定路径
- 使用的 jsonc-parser

## removePackageJsonDependency

- - 会从 4 个地方找这个依赖,如果 4 个都有,都会删除

## getPackageJsonDependency

- 会从 4 个地方找这个依赖,所以如果定义了多个不会都找到

# find-module

## findModuleFromOptions

- 按照条件查符合条件的最近的的那个模块

## findModule

- 查找离某个路径最近的一个 module
- 会跳过路由模块

## buildRelativePath

- 一个文件到另一个文件的相对路径
- from 中引入 to,to 的相对路径
- 与`@angular-devkit/core`中的`relative`功能类似
- 先计算文件夹路径,再加上文件名

# json-file

## JSONFile(内部类)

- 修改 json 用的(比如依赖相关)

# latest-version

## latestVersions

- ng 一些库的当前版本

## applyLintFix(未找到-可能移除)

- 返回一个 rule,用来对变更的 ts 进行 lint?

# ng-ast-utils(可以使用)

## findBootstrapModuleCall(返回类型会产生冲突,因为 ts)

- 查找 bootstrapModule(也就是第一个用于启动的 module)`方法`

```ts
platformBrowserDynamic()
  .bootstrapModule(AppModule) //就是这个
  .catch((err) => console.error(err));
```

## findBootstrapModulePath

- paths 指的是 tsconfig 中的
- 查询 bootstrapModule 路径(相对路径,也不完全,如果设置 paths 的话)

## getAppModulePath

- bootstrapModule 绝对路径(可能出错,比如 paths)

# parse-name

## parseName

- 路径组合,返回名字和路径
- 第二个参数返回名字,两个路径先 json 再 dirname

# paths

## relativePathToWorkspaceRoot

- 退回到根需要什么样的路径
- 路径变成../../......

# validation

## validateName

- 验证组件名(开始不能是数字)

## validateHtmlSelector

- 验证选择器

## validateProjectName

- 验证项目名

# workspace

- 即 angular.json

## updateWorkspace

- 全都加 proxy 即时修改变更
- 返回的是一个规则
- 更新

## getWorkspace

- read 的封装
- 只读取,不更新

## buildDefaultPath

- 构建项目的默认路径(应用 app,链接 lib)

## createDefaultPath

- `buildDefaultPath`的封装

## allWorkspaceTargets

- 从`getWorkspace`返回的工作空间传入
- 获得所有项目的目标

## allTargetOptions

- 参数来自`getWorkspace`
- 某个目标的所有配置
