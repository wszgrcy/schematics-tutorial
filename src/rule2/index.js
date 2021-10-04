"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
function default_1() {
    return function (tree, context) {
        return (0, schematics_1.chain)([
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
            (0, schematics_1.externalSchematic)('@angular-devkit/schematics-cli', 'blank', { name: 'rule2test' }),
            (0, schematics_1.applyToSubtree)('/rule2test', [
                function (tree) {
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
exports.default = default_1;
