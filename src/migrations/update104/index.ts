import { Tree } from '@angular-devkit/schematics';

export default function () {
  return (tree: Tree, context: Tree) => {
      tree.delete('f/hello-world')
      return tree
  };
}
