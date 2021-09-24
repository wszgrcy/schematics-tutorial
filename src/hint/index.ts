import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
export default function (options: HintType): Rule {
  console.log('传入参数',options);
  return (tree: Tree, context: SchematicContext) => {
    return tree;
  };
}
