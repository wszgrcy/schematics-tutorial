import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';
import { applyToUpdateRecorder, InsertChange } from '@schematics/angular/utility/change';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { buildRelativePath, findModule, findModuleFromOptions } from '@schematics/angular/utility/find-module';

import { findBootstrapModuleCall, findBootstrapModulePath, getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { parseName } from '@schematics/angular/utility/parse-name';
import { relativePathToWorkspaceRoot } from '@schematics/angular/utility/paths';
import {
  allTargetOptions,
  allWorkspaceTargets,
  buildDefaultPath,
  getWorkspace,
  updateWorkspace,
} from '@schematics/angular/utility/workspace';
export default function () {
  return async (tree: Tree, context: SchematicContext) => {
    // change变更
    // let recorder = tree.beginUpdate('/入门1.md');
    // let change = new InsertChange('/入门1.md', 0, '测试添加');
    // // recorder.insertLeft(change.pos, change.toAdd);
    // applyToUpdateRecorder(recorder,[change])
    // tree.commitUpdate(recorder)
    // 添加依赖
    // addPackageJsonDependency(tree, { name: 'jquery', version: '*', type: NodeDependencyType.Default });
    // let path = findModuleFromOptions(tree, { name: 'ABC', path: '/src/app' });
    // console.log(path);
    // let path2 = findModule(tree, '/src/app');
    // console.log(path2);
    // 相对路径
    // let relativePath = buildRelativePath('/src/app/app.module', '/src/app/test1/test1.component');
    // console.log(relativePath);
    // 启动模块路径查找
    // let callExpression = findBootstrapModuleCall(tree, 'src/main.ts');
    // console.log(callExpression);
    // console.log(callExpression?.pos);
    // console.log(callExpression?.end);
    // console.log(callExpression?.getText());
    // let path = findBootstrapModulePath(tree, 'src/main.ts');
    // console.log(path);
    // let appModulePath = getAppModulePath(tree, 'src/main.ts');
    // console.log(appModulePath);
    // 路径解析
    //    let location= parseName('/src','app/app.module.ts');
    //    console.log(location);
    // 路径?
    //   let str=  relativePathToWorkspaceRoot('sdf/dsfs/sfdfds/sdsf');
    //   console.log(str);
    // 更新工作空间
    // return chain([
    //   updateWorkspace((workspace) => {
    //     let ng12Demo = workspace.projects.get('ng12-demo');
    //     ng12Demo!.root = '///';
    //   }),
    // ]);
    let workspace = await getWorkspace(tree);
    // workspace.projects.get('ng12-demo')!.root = '///';

    
    
  };
}
