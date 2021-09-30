import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

describe('context-demo', () => {
  it('run', async () => {
    let runner = new SchematicTestRunner('test', require.resolve('../collection.json'));

    let tree = await runner.runSchematicAsync('context-demo').toPromise();
    console.log('执行完毕')
  });
});
