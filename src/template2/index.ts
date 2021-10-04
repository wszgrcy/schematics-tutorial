import { apply, chain, mergeWith, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
export default function () {
  return (tree: Tree,context:SchematicContext) => {
    return chain([
      mergeWith(
        apply(url('./template'), [
          template({
            ...strings,
            name:'testClass'
          }),
        ])
      ),
    ]);
  };
}
