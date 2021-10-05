import { Tree } from '@angular-devkit/schematics';
import * as fs from 'fs';
import ts from 'typescript';
import { SchematicsTsconfigHost } from './ts-parsed-config';

export default function () {
  return (tree: Tree) => {
    let fileName ='tsconfig.json';
    let tsconfig = tree.read(fileName)
    let jsonScourceFile = ts.parseJsonText(fileName, tsconfig!.toString());
    let schematicsTsconfigHost = new SchematicsTsconfigHost(tree);
    let config = ts.parseJsonSourceFileConfigFileContent(jsonScourceFile, schematicsTsconfigHost, '');
    console.log(config);
  };
}
