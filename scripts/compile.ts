import * as fs from 'fs';
import ts from 'typescript';
let fileName = require.resolve('../tsconfig.json');
let tsconfig = fs.readFileSync(fileName);
let jsonScourceFile = ts.parseJsonText(fileName, tsconfig.toString());
let config = ts.parseJsonSourceFileConfigFileContent(jsonScourceFile, ts.sys, process.cwd());
let program = ts.createProgram({
  rootNames: config.fileNames,
  options: config.options,
});

program.emit();
