"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
var cyia_code_util_1 = require("cyia-code-util");
function default_1() {
    return function (tree, context) {
        return (0, schematics_1.chain)([
            (0, schematics_1.mergeWith)((0, schematics_1.url)('./template')),
            function (tree, context) {
                var _a, _b, _c;
                var tsDemo = (_a = tree.read('/ts-demo.ts')) === null || _a === void 0 ? void 0 : _a.toString();
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
                var jsonDemo = (_b = tree.read('/json-demo.json')) === null || _b === void 0 ? void 0 : _b.toString();
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
                var htmlDemo = (_c = tree.read('/html-demo.html')) === null || _c === void 0 ? void 0 : _c.toString();
                // let parser = new HtmlParser();
                // let parseTreeResult = parser.parse(htmlDemo, '');
                // parseTreeResult
                var selector = (0, cyia_code_util_1.createCssSelectorForHtml)(htmlDemo);
                var result = selector.queryOne('html body div');
                var recorder = tree.beginUpdate('/html-demo.html');
                var htmlChange = new cyia_code_util_1.HtmlChange();
                var change = htmlChange.replaceTag(result, "<div>\u4FEE\u6539\u5185\u5BB9</div>");
                recorder.remove(change.start, change.length);
                recorder.insertLeft(change.start, change.content);
                // recorder.remove(result.startSourceSpan.end.offset, result.endSourceSpan?.start.offset!-result.startSourceSpan.end.offset);
                // recorder.insertLeft(result.startSourceSpan.end.offset, '修改内容');
                tree.commitUpdate(recorder);
            },
        ]);
    };
}
exports.default = default_1;
// function tsNodeVisit(node: ts.Node, fn: (node: ts.Node) => unknown) {
//   ts.forEachChild(node, (node) => {
//     fn(node);
//     tsNodeVisit(node, fn);
//   });
// }
function jsonNodeVisit(node, fn) {
    if (node.children) {
        node.children.forEach(function (node) {
            fn(node);
            jsonNodeVisit(node, fn);
        });
    }
}
