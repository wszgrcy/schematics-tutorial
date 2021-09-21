import { chain, mergeWith, SchematicContext, Tree, url } from '@angular-devkit/schematics';
export default function (options: any) {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('hello-world');
    return chain([mergeWith(url('./template'))]);
  };
}
