import { callRule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function rule1(tree: Tree, schematicsContext: SchematicContext) {
  tree.overwrite('/unit-name/package.json', `{"change":true}`);
  return tree;
}
