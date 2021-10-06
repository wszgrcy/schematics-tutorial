import { Tree } from '@angular-devkit/schematics';
import * as fs from 'fs';
import ts from 'typescript';
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
  };
}
