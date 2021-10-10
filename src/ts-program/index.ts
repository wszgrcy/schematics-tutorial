import { Tree } from '@angular-devkit/schematics';
import * as fs from 'fs';
import ts, { ExpressionStatement, factory } from 'typescript';
import { SchematicsTsconfigHost } from './ts-parsed-config';

export default function () {
  return (tree: Tree) => {
    let fileName = 'tsconfig.json';
    let tsconfig = tree.read(fileName);
    let jsonScourceFile = ts.parseJsonText(fileName, tsconfig!.toString());
    let schematicsTsconfigHost = new SchematicsTsconfigHost(tree);
    let config = ts.parseJsonSourceFileConfigFileContent(jsonScourceFile, schematicsTsconfigHost, '');
    console.log(config);
    ts.sys;
    let host = ts.createCompilerHost(config.options);
    host.readFile = (filePath: string) => {
      return tree.read(filePath)?.toString();
    };
    host.fileExists = (filePath) => {
      return tree.exists(filePath);
    };
    host.directoryExists = (filePath: string) => {
      if (filePath.includes('node_modules')) {
        return false;
      }
      try {
        let dir = tree.getDir(filePath);
        return !!dir.subdirs.length || !!dir.subfiles.length;
      } catch (error) {
        return false;
      }
    };
    host.getCanonicalFileName = (filePath) => filePath;
    host.getCurrentDirectory = () => '/';
    let program = ts.createProgram({ rootNames: config.fileNames, options: config.options, host: host });
    let list = program
      .getSourceFiles()
      .filter((sf) => !sf.isDeclarationFile)
      .filter((sf) => !sf.fileName.includes('node_modules'));
    list;
    let sf = program.getSourceFile('test.ts')!;
    let statement = sf?.statements[1]!;
    console.log(ts.SyntaxKind[statement.kind]);

    if (ts.isExpressionStatement(statement)) {
      console.log('是VariableStatement');

      let node = (statement.expression as ts.PropertyAccessExpression).expression;
      if (ts.isIdentifier(node)) {
        // sf=ts.createSourceFile(sf.fileName,sf.text,sf.languageVersion,true)
        // 正常更新节点
        // let value = factory.createNumericLiteral(456789);
        // // let originNode=node
        // node = factory.updateVariableDeclaration(node, node.name, node.exclamationToken, node.type, value);
        // let printer = ts.createPrinter();
        // let nodeString = printer.printNode(ts.EmitHint.Unspecified, node, sf);
        // console.log(nodeString);
        // let recorder = tree.beginUpdate('test.ts');
        // recorder.remove(node.pos + 1, node.end - (node.pos + 1));
        // recorder.insertLeft(node.pos + 1, nodeString);
        // tree.commitUpdate(recorder);
        // let file = tree.read('test.ts')?.toString();
        // console.log('内容', file);
        // 注释
        // let checker = program.getTypeChecker();
        // node = ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, '这是一个注释', false);
        // let printer = ts.createPrinter();
        // let nodeString = printer.printNode(ts.EmitHint.Unspecified, node, sf);
        // console.log(nodeString);

        // let comments=  ts.getSyntheticLeadingComments(node)
        // console.log(comments);
        //  let comment=   ts.getLeadingCommentRanges(sf.getFullText(),node.getFullStart())

        //  comment
        // 检查标识符类型
        let checker = program.getTypeChecker();
        // let type = checker.getTypeAtLocation(node);
        // console.log(checker.typeToString(type));
        // 检查表示来源
        let symbol = checker.getSymbolAtLocation(node);
        let declarationNode = symbol?.declarations![0];
        console.log(ts.SyntaxKind[declarationNode?.kind!]);
        
      }
    }
  };
}
