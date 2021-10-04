import {
  apply,
  applyToSubtree,
  asSource,
  branchAndMerge,
  chain,
  empty,
  externalSchematic,
  filter,
  forEach,
  mergeWith,
  noop,
  partitionApplyMerge,
  schematic,
  SchematicContext,
  source,
  Tree,
} from '@angular-devkit/schematics';
import random from '@angular-devkit/schematics/src/rules/random';
import { rename } from '@angular-devkit/schematics/src/rules/rename';

export default function () {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      //   forEach((entry) => {
      //     if (!entry.path.includes('node_modules')) {
      //       console.log(entry.path);
      //     }
      //     return entry;
      //     // return null
      //   }),
      // (tree) => {
      //     console.log(tree);

      // },
      //   partitionApplyMerge(
      //     (path, entry) => {
      //       if (path.length % 2) {
      //           if (!path.includes('node_modules')) {

      //               console.log('true',path);
      //           }

      //         return true;
      //       }
      //       return false;
      //     },
      //     (tree) => {
      //         console.log('true');

      //       console.log(tree.getDir('/').subfiles);
      //     },
      //     (tree) => {
      //         console.log('false');

      //       console.log(tree.getDir('/').subfiles);
      //     }
      //   ),
      //   branchAndMerge((tree) => {
      //     console.log(tree.getDir('/').subfiles);
      //   }),
      //   mergeWith(
      //     apply(
      //       asSource((tree) => {
      //         tree.create('abc', '123');
      //       }),
      //       [
      //         (tree) => {
      //           console.log(tree.read('abc')?.toString());
      //         },
      //       ]
      //     )
      //   ),
      // noop()
      //   mergeWith(
      //     apply(empty(), [
      //       (tree: Tree) => {
      //         console.log(tree.getDir('/').subfiles);
      //       },
      //     ])
      //   ),
      //   mergeWith(
      //     apply(source(tree), [
      //       (tree: Tree) => {
      //         console.log(tree.getDir('/').subfiles);
      //       },
      //     ])
      //   ),

      externalSchematic('@angular-devkit/schematics-cli', 'blank', { name: 'rule2test' }),
      applyToSubtree('/rule2test', [
        (tree) => {
          console.log(tree.getDir('/').subfiles);
        },
      ]),
      //   filter((path, entry) => {
      //     if (path.includes('rule2test')) {
      //       return false;
      //     }
      //     return true;
      //   }),
      //   schematic('hello-world', {}),
      //   rename(
      //     (path, entry) => {
      //       if (!path.includes('node_modules') && path.includes('rule2test')) {
      //         console.log(path, entry);
      //         return true;
      //       }
      //       return false;
      //     },
      //     (path, entry) => {

      //       return `test/${path}`;
      //     }
      //   ),
      //   mergeWith(
      //     apply(random({ root: 'random', multiFiles: 6 }), [
      //       (tree: Tree, context: SchematicContext) => {
      //         console.log(tree.getDir('random').subfiles);
      //       },
      //     ])
      //   ),
    ]);
  };
}
