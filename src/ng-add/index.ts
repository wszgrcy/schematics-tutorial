import { asSource, chain, mergeWith, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { of } from 'rxjs';
export default function (options: any) {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('hello-world');
    context.schematic.collection.createSchematic('ng-new');
    let collection = context.engine.createCollection('@schematics/angular');
    let schematic = context.engine.createSchematic('ng-new', collection);
    let ngContext = context.engine.createContext(schematic, context, { interactive: true });
    tree.create(`${options.name}/hello-world`, 'hello-world');
    return schematic.call({name:options.name,version:"12.0.0"}, of(tree), ngContext,{interactive:true});
  };
}
