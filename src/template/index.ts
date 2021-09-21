import {
  apply,
  applyPathTemplate,
  applyTemplates,
  chain,
  mergeWith,
  move,
  renameTemplateFiles,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
export default function (options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let source = apply(url('./template'), [
      applyTemplates({
        getCode: (a: string) => {
          return `let a=0;console.log(a);${a}`;
        },
        inputValue:false,
        value:`<div></div>`
      }),
    ]);
    return chain([mergeWith(source)]);
  };
}
