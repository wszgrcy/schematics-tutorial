import { chain, mergeWith, SchematicContext, Tree, url } from '@angular-devkit/schematics';

export default function () {
  return (tree: Tree, context: SchematicContext) => {
    tree.overwrite('/unit-name/package.json', `{"change":true}`);
    return chain([mergeWith(url('./template')!)]);
  };
}
