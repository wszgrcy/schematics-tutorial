import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { schema } from '@angular-devkit/core';
import * as inquirer from 'inquirer';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
export default function (options: HintType): Rule {
  console.log('传入参数', options);
  return (tree: Tree, context: SchematicContext) => {
    tree.getDir('/').subfiles;
    let schemaRegistry = new schema.CoreSchemaRegistry();
    schemaRegistry.usePromptProvider((definitions) => {
      console.log(definitions);

      const questions: inquirer.QuestionCollection = definitions.map((definition) => {
        const question: inquirer.Question = {
          name: definition.id,
          message: definition.message,
          default: definition.default,
        };

        const validator = definition.validator;
        if (validator) {
          question.validate = (input) => validator(input);
        }

        switch (definition.type) {
          case 'confirmation':
            return { ...question, type: 'confirm' };
          case 'list':
            return {
              ...question,
              type: definition.multiselect ? 'checkbox' : 'list',
              choices:
                definition.items &&
                definition.items.map((item) => {
                  if (typeof item == 'string') {
                    return item;
                  } else {
                    return {
                      name: item.label,
                      value: item.value,
                    };
                  }
                }),
            };
          default:
            return { ...question, type: definition.type };
        }
      });
      console.log(questions);

      return inquirer.prompt(questions);
    });
    // schemaRegistry.addPreTransform((value, pointer, schema) => {
    //   console.log(value, pointer, schema);
    //   if (pointer === '/string1') {
    //     return `5666`;
    //   }
    //   return value;
    // });
    // schemaRegistry.addPostTransform((value, pointer, schema) => {
    //   if (pointer === '/number1') {
    //     return 99999999;
    //   }
    //   return value;
    // });
    // schemaRegistry.addFormat({
    //   name: 'custom-xx',
    //   formatter: (value) => {
    //     return false;
    //   },
    // });
    // schemaRegistry.addSmartDefaultProvider('custom-default',() => '默认的')
    schemaRegistry.useXDeprecatedProvider((message) => {
      console.log(message);
      console.log('字段废弃了');
    });
    schemaRegistry.registerUriHandler((uri) => {
      console.log(uri);
      return of({
        $schema: 'http://json-schema.org/draft-07/schema',
        $id: 'XXX',
        properties: {},
        definitions: {
          base: {
            type: 'string',
            'x-prompt': '请输入string222',
          },
        },
      });
    });
    schemaRegistry
      .compile({
        $schema: 'http://json-schema.org/draft-07/schema',
        $id: 'custom://a/b.json',
        properties: {
          // string1: {
          //   type: 'string',
          //   description: 'string类型',
          //   // $default: {
          //   //   $source: 'custom-default',
          //   //   index: 0,
          //   // },
          //   // format: 'custom-xx',
          //   "x-deprecated":"测试字段废弃",
          //   'x-prompt': '请输入string',
          // },
          // custom: {
          //   $ref: './a.json#/definitions/base',
          // },
          'multi-value': {
            type: 'string',
            description: 'string类型',

            'x-prompt': {
              type: 'list',
              items: tree.getDir('/').subfiles.map((item) => ({ label: item, value: item })),
              message: '选择数组',
            },
          },
        },
        // required: ['string1'],
      })
      .pipe(switchMap((validator) => validator({})))
      .subscribe((result) => {
        console.log(result);
      });
    return tree;
  };
}
