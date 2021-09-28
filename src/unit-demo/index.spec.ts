import { callRule, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { rule1 } from './rule1';
describe('unit-demo', () => {
  //   it('运行内部原理图', async () => {
  //     let runner = new SchematicTestRunner('test', require.resolve('../collection.json'));

  //     let tree = await runner.runSchematicAsync('unit-demo').toPromise();
  //     expect(tree).toBeTruthy();
  //     expect(tree.exists('/1.log')).toBeTruthy();
  //     expect(tree.readContent('/1.log')).toEqual('111');
  //   });
  it('运行外部原理图', async () => {
    let runner = new SchematicTestRunner('test', require.resolve('../collection.json'));
    let tree = await runner.runExternalSchematicAsync('@angular-devkit/schematics-cli', 'blank', { name: 'unit-name' }).toPromise();
    expect(tree).toBeTruthy();
    tree = await runner.runSchematicAsync('unit-demo', undefined, tree).toPromise();
    expect(tree.readContent('/unit-name/package.json')).toEqual(`{"change":true}`);
  });
  it('运行runner规则', async () => {
    let runner = new SchematicTestRunner('test', require.resolve('../collection.json'));
    let tree: Tree = await runner.runExternalSchematicAsync('@angular-devkit/schematics-cli', 'blank', { name: 'unit-name' }).toPromise();

    tree = await runner.callRule(rule1, tree).toPromise();
    expect(tree.read('/unit-name/package.json')?.toString()).toEqual(`{"change":true}`);
  });
  it('单独调用规则', async () => {
    let runner = new SchematicTestRunner('test', require.resolve('../collection.json'));
    let tree: Tree = await runner.runExternalSchematicAsync('@angular-devkit/schematics-cli', 'blank', { name: 'unit-name' }).toPromise();
    let context = runner.engine.createContext(
      runner.engine.createSchematic('unit-demo', runner.engine.createCollection(require.resolve('../collection.json')))
    );
    tree = await callRule(rule1, tree, context).toPromise();
  });
});
