import { apply, chain, mergeWith, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import ts, { JsxEmit, ScriptTarget } from 'typescript';
import { createCssSelectorForJson, createCssSelectorForTs, JsonChange, TsChange, createCssSelectorForHtml, HtmlChange } from 'cyia-code-util';
import { parseTree, Node as jsonNode } from 'jsonc-parser';
import { json } from 'stream/consumers';
import { HtmlParser } from '@angular/compiler';
export default function () {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      mergeWith(url('./template')),
      (tree: Tree, context: SchematicContext) => {
        let tsDemo = tree.read('/ts-demo.ts')?.toString()!;
        // ts 节点查询
        // let ast = ts.createSourceFile('ts-demo', tsDemo, ScriptTarget.Latest, true);
        // tsNodeVisit(ast, (node) => {
        //   if (ts.isClassDeclaration(node)) {
        //     tsNodeVisit(node, (node) => {
        //       if (ts.isDecorator(node)) {
        //         tsNodeVisit(node, (node) => {
        //           if (ts.isObjectLiteralExpression(node)) {
        //             let strNode = (node.properties[0] as ts.PropertyAssignment).initializer;
        //             let recorder = tree.beginUpdate('/ts-demo.ts');
        //             recorder.remove(strNode.pos, strNode.end - strNode.pos);
        //             recorder.insertLeft(strNode.pos, '"name2"');
        //             tree.commitUpdate(recorder);
        //             console.log(tree.read('/ts-demo.ts')?.toString());
        //           }
        //         });
        //       }
        //     });
        //   }
        // });
        // let ast = ts.createSourceFile('ts-demo', tsDemo, ScriptTarget.Latest, true);

        // let selector = createCssSelectorForTs(ast);
        // // + > ~ [~=]
        // let result = selector.queryOne(
        //   `ClassDeclaration Decorator CallExpression ObjectLiteralExpression PropertyAssignment[initializer="name1"]`
        // ) as ts.PropertyAssignment;
        // let strNode = result.initializer;
        // let tsChange = new TsChange(ast);
        // let change = tsChange.replaceNode(strNode, '"name2"');
        // let recorder = tree.beginUpdate('/ts-demo.ts');
        // recorder.remove(change.start, change.length);
        // recorder.insertLeft(change.start, change.content);
        // tree.commitUpdate(recorder);
        // console.log(tree.read('/ts-demo.ts')?.toString());
        // json 语法节点解析
        // 默认
        let jsonDemo = tree.read('/json-demo.json')?.toString()!;
        // let demo = JSON.parse(jsonDemo);
        // demo.a = 666;
        // tree.overwrite('/json-demo.json', JSON.stringify(demo));
        // 通过语法节点查询
        // let parseTreeResult = parseTree(jsonDemo, []);
        // // let property = parseTreeResult?.children![0];
        // // property;
        // jsonNodeVisit(parseTreeResult!, (node) => {
        //   if (node.children && node.children[0] && node.children![0].value == 'a') {
        //     console.log(node);
        //     console.log(node.children![1]);
        //     let valueNode = node.children![1];
        //     let recorder = tree.beginUpdate('/json-demo.json');
        //     recorder.remove(valueNode.offset, valueNode.length);
        //     recorder.insertLeft(valueNode.offset, '666');
        //     tree.commitUpdate(recorder);
        //     console.log(tree.read('/json-demo.json')?.toString());
        //   }
        // });
        // 使用 cyia-code-util
        // let selector = createCssSelectorForJson(jsonDemo);
        // let result = selector.queryOne('a b c');
        // let jsonChange = new JsonChange();
        // let change = jsonChange.replaceValue(result, '666');
        // let recorder = tree.beginUpdate('/json-demo.json');
        // recorder.remove(change.start, change.length);
        // recorder.insertLeft(change.start, change.content);
        // tree.commitUpdate(recorder);
        // console.log(tree.read('/json-demo.json')?.toString());
        // html
        let htmlDemo = tree.read('/html-demo.html')?.toString()!;

        // let parser = new HtmlParser();
        // let parseTreeResult = parser.parse(htmlDemo, '');
        // parseTreeResult
        let selector = createCssSelectorForHtml(htmlDemo);
        let result = selector.queryOne('html body div');
        let recorder = tree.beginUpdate('/html-demo.html');
        let htmlChange=new HtmlChange()
       let change= htmlChange.replaceTag(result,`<div>修改内容</div>`)
        recorder.remove(change.start,change.length)
        recorder.insertLeft(change.start,change.content)
        // recorder.remove(result.startSourceSpan.end.offset, result.endSourceSpan?.start.offset!-result.startSourceSpan.end.offset);
        // recorder.insertLeft(result.startSourceSpan.end.offset, '修改内容');

        tree.commitUpdate(recorder);
      },
    ]);
  };
}

// function tsNodeVisit(node: ts.Node, fn: (node: ts.Node) => unknown) {
//   ts.forEachChild(node, (node) => {
//     fn(node);
//     tsNodeVisit(node, fn);
//   });
// }
function jsonNodeVisit(node: jsonNode, fn: (node: jsonNode) => unknown) {
  if (node.children) {
    node.children.forEach((node) => {
      fn(node);
      jsonNodeVisit(node, fn);
    });
  }
}
