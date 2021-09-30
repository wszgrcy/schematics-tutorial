import { chain, mergeWith, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RepositoryInitializerTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { parse } from 'url';
import { of } from 'rxjs';
export default function (options: any) {
  return async (tree: Tree, context: SchematicContext) => {
    // 安装依赖包
    // let content = tree.read('/package.json')?.toString()!;
    // let packageJson = JSON.parse(content);
    // packageJson.dependencies.jquery = '*';
    // tree.overwrite('/package.json', JSON.stringify(packageJson));
    // context.addTask(new NodePackageInstallTask());
    // 初始化仓库
    // tree.create('/abc/1.log','')
    // context.addTask(new RepositoryInitializerTask('/abc', { message: '首次提交', name: 'chen', email: 'wszgrcy@gmail.com' }));
    // 运行原理图
    // context.addTask(new RunSchematicTask('@angular-devkit/schematics-cli','blank',{name:'sdfsdffd'}))
    // 调用自己
    // context.logger.info('正在执行')
    // await context.schematic.call(options, of(tree), context).toPromise();
    // 调用同集合的其他原理图
    //    let schematic= context.schematic.collection.createSchematic('hello-world');
    //  await schematic.call(options,of(tree),context).toPromise()
    // 调用其他集合的原理图
    let collection = context.engine.createCollection(require.resolve('../collection.json'));
    let schematic = context.engine.createSchematic('hello-world', collection);
    // await schematic.call(options, of(tree), context).toPromise();
    let helloCreate = context.engine.createContext(schematic, { interactive: true });
    let hintSchematic = context.engine.createSchematic('hint', collection);
    // await hintSchematic.call(options, of(tree), helloCreate).toPromise();
    // url规则的底层实现
    // return chain([mergeWith(context.engine.createSourceFromUrl(parse('./template'), context))]);
    // 手动调用原理图 输入与执行
    let options = await context.engine.transformOptions(hintSchematic, {}, context).toPromise();

    await hintSchematic.call(options, of(tree), helloCreate).toPromise();
    // 底层方法执行原理图
    // try {
    //     context.engine
    //   await context.engine.workflow!
    //     .execute({ collection: '@angular-devkit/schematics-cli', schematic: 'blank', options: { name: 'sdfsd' } })
    //     .toPromise();
    // } catch (error) {
    //   console.log(error);
    // }
  };
}
