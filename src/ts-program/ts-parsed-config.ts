import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { ParseConfigHost } from 'typescript';
import minimatch from 'minimatch';
import { join, normalize } from '@angular-devkit/core';
export class SchematicsTsconfigHost implements ParseConfigHost {
  constructor(private tree: Tree) {}
  useCaseSensitiveFileNames = true;
  readDirectory(
    rootDir: string,
    extensions: readonly string[],
    excludes: readonly string[] | undefined,
    includes: readonly string[],
    depth?: number
  ) {
    return this._readDirectory(rootDir, extensions, excludes, includes, depth);
  }
  _readDirectory(
    rootDir: string,
    extensions: readonly string[],
    excludes: readonly string[] | undefined,
    includes: readonly string[],
    depth?: number
  ): string[] {
    let dir = this.tree.getDir(rootDir);
    let files = dir.subfiles as string[];

    return files
      .map((item) => join(normalize(rootDir), item) as string)
      .filter((file) => extensions.some((extension) => file.endsWith(extension)))
      .filter((file) => !excludes?.some((exclude) => minimatch(file, exclude)))
      .filter((file) => includes.some((include) => minimatch(file, include)))
      .concat(
        ...dir.subdirs
          .filter((item) => item !== 'node_modules')
          .map((subdir) => join(normalize(rootDir), subdir))
          .map((filepath) => this._readDirectory(filepath, extensions, excludes, includes))
          .reduce((pre, cur) => {
            pre.push(...cur);
            return pre;
          }, [])
      );
  }

  fileExists(filePath: string) {
    return this.tree.exists(filePath);
  }

  readFile(filePath: string) {
    return this.tree.read(filePath)?.toString();
  }
}
