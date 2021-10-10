# 总结

## 原理图是什么?


- 这里引用一个在 `Angular` 中的定义`原理图是一个基于模板的支持复杂逻辑的代码生成器.`
  > `A schematic is a template-based code generator that supports complex logic. It is a set of instructions for transforming a software project by generating or modifying code. Schematics are packaged into collections and installed with npm.`  
  > [https://angular.cn/guide/schematics](https://angular.cn/guide/schematics)
- 所以相比狭义的脚手架来讲,原理图也可以称为智能代码生成器
## 特性

### 原子性

- `Angular`开发的原理图框架对文件的操作使用的是虚拟文件系统,所以对文件的任何处理都不会即时的反应到项目中,只有在所有操作结束,没有异常时,才会写入到代码中

### 通用性

- 虽然为`Angular`开发的原理图,但是实现不局限于`Angular`,不局限于`前端`,甚至不局限语言
- 只要是文件,皆可操作

### 可测试性

- 由于对文件的操作都在虚拟文件系统中,所以可以建立单元测试,保证每一个原理图执行符合预期

### 交互性

- 通过定义`JSON Schema`定义原理图传入字段,可以设置在命令行中的提示输入
- 支持`输入`,`单选`,`多选`,`判断`等不同输入方式

### 版本控制

- 并不是所有修改都直接生效,保存在虚拟文件系统中
- `Angular`在其中实现了一个类似`git`的简化系统
- 单文件的修改(非覆盖)只有在`commit`时才会变更
- 非`主tree`中文件的修改只有在`merge`后才会生效
  > 可以通过`branch`创建另一个`tree`

## 功能

### 模板生成

- 也就是最传统的脚手架开发,只需要调用两个方法就能实现

### 文件操作

- 可以对当前工作空间内的文件进行`create`,`overwrite`,`rename`,`delete`
  > `create`在工作空间内创建文件
  > `overwrite`覆盖工作空间已有文件
  > `rename`重命名工作空间文件,在这里路径就是名字,因此重命名也可以用来移动文件
  > `delete`删除工作空间内的文件
- 内置了文件操作`规则`,更方便的对文件处理

### 代码操作

- 当项目中的文件有配套的语法解析工具,就可以对代码进行处理
- 对代码的处理可以更加精确,比如按`类型`,`变量名`,`值`的不同,进行不同的修改
  > 现有前端推荐`.ts`->`typescript`,`.html`->`@angular/compiler`,`.json`->`jsonc-parser`  
  > 对于其他类型语言,语法解析工具可以参考这里[https://astexplorer.net/](https://astexplorer.net/)

### 链式调用

- 当前原理图可以去调用其他原理图,作为一个`规则`,其他原理图可以处理之后返回,为下一个规则提供处理好的文件

### 自动化任务处理

- 如果指定过添加任务,那么在原理图的文件修改结束,并写入到硬盘后,会自动执行
  > 目前内置的任务包括`初始化仓库`,`npm安装`,`执行其他原理图`

## 可以用来做什么

### 项目初始化

- 这个也是最基础,应用最广泛的,只需要保存文件并执行就可以自动生成

### 项目更新

- 对于项目中部分代码需要更新(如依赖更新引发的废弃),可以通过语言解析替换相关节点内容
- 通过其他代码,进行语法解析获得元数据生成相关逻辑
  > 这里的元数据由于非 json 格式,所以需要语法解析获得

### 源码工厂

- 一个猜想,通过复杂的规则及逻辑,把文件视为模块,通过输入的参数,生成符合要求的源码
- 由于生产的源码是又原理图生成的,所以可读性与正常开发人员写的一致,并且不会出现开发人员犯的低级错误
- 源码作为生成产品,不用担心泄露,因为`真正的源码`是原理图的源码工厂,而不是生成的源码

## 名称解释

### workflow

- 集合及原理图工作的唯一环境
- 初始化集合
- 使用`engine`创建并执行原理图

### engine

- 用来创建`collection`,`schematic`,`SchematicContext`
- 读取文件(模板),转换参数等底层方法

### collection

- `collection.json`的实例
- 初始化原理图

### schematic

- 在`collection`中的`schematic`实例
- 调用规则处理传递进去的文件

### Tree

- 一个虚拟机文件树
- 原理图的第一个规则(默认执行的第一个),传入的`Tree`为当前工作空间
- 主要用于传入给`Rule`中,进行处理

### SchematicContext

- 原理图上下文
- 当前原理图实例
- `engine`

### Rule

- 处理传入的`Tree`
- 返回的`Tree`会给予下一个`Rule`继续进行处理

### Source

- 与`rxjs`类似,`Angular`的原理图引入了`Source(来源)`与`Rule(规则)`
  > `Source`相当于`rxjs`中的创建操作符,`Rule`相当于管道符
- `Source`可以由规则转换为`Tree`,然后提供给`Rule`进行处理
- 由于规则是处理传入的文件,所以`Source`的作用就是限定文件

## 原理图入门教程
- [https://www.bilibili.com/video/BV13h411J7mU](https://www.bilibili.com/video/BV13h411J7mU)

