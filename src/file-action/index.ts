import { Tree, SchematicContext, MergeStrategy, url } from '@angular-devkit/schematics';

export default function () {
  return (/**传入主tree*/ tree: Tree, context: SchematicContext) => {
    console.log(tree.root);
    console.log(tree.root.subdirs);
    console.log(tree.root.subfiles);
    let dir = tree.getDir('/src');
    console.log(dir.subdirs);
    console.log(dir.subfiles);
    let file1 = tree.get('/package.json');
    console.log(file1);
    console.log(file1?.path);
    console.log(file1?.content?.toString());
    console.log(tree.exists('/package.json'));
    console.log(tree.exists('/sdfsdf'));
    // tree.visit((path,entry) => {
    //     if (!path.includes('node_modules')) {

    //         console.log(path,entry);
    //     }

    // })
    // 文件修改
    // tree.create('/file-action-folder/create-file.js', `console.log("创建文件")`);
    // tree.overwrite('/file-action-folder/create-file.js',`{}`)
    // // tree.rename('/file-action-folder/rename.js','/root-rename.js')
    // let recorder = tree.beginUpdate('/file-action-folder/create-file.js');
    // recorder.insertRight(27, `;console.log('插入');`);
    // // recorder.remove(0,27)
    // tree.commitUpdate(recorder)
    // 树修改
    // /** 主tree分出来的子tree */
    // // let tree2 = tree.branch();
    // // tree2.create('/file-action-folder/create-file.js', `console.log("创建文件")`);
    // tree.create('/create-file.js', `console.log("创建文件")111`);
    // let source1 = url('./tempalte');
    // /** url传入tree */
    // let tree3 = source1(context) as Tree;
    // tree.merge(tree3,MergeStrategy.AllowCreationConflict);
    // 删除
    // tree.delete('/package.json');
    tree.create('/file-action-folder/rename.js', 'abc');
    tree.overwrite('/file-action-folder/rename.js', 'abc1');
    tree.delete('/file-action-folder/rename.js');
    console.log(tree.actions);

    return tree;
  };
}
