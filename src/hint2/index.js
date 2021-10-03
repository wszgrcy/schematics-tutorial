"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular-devkit/core");
var inquirer = __importStar(require("inquirer"));
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
function default_1(options) {
    console.log('传入参数', options);
    return function (tree, context) {
        tree.getDir('/').subfiles;
        var schemaRegistry = new core_1.schema.CoreSchemaRegistry();
        schemaRegistry.usePromptProvider(function (definitions) {
            console.log(definitions);
            var questions = definitions.map(function (definition) {
                var question = {
                    name: definition.id,
                    message: definition.message,
                    default: definition.default,
                };
                var validator = definition.validator;
                if (validator) {
                    question.validate = function (input) { return validator(input); };
                }
                switch (definition.type) {
                    case 'confirmation':
                        return __assign(__assign({}, question), { type: 'confirm' });
                    case 'list':
                        return __assign(__assign({}, question), { type: definition.multiselect ? 'checkbox' : 'list', choices: definition.items &&
                                definition.items.map(function (item) {
                                    if (typeof item == 'string') {
                                        return item;
                                    }
                                    else {
                                        return {
                                            name: item.label,
                                            value: item.value,
                                        };
                                    }
                                }) });
                    default:
                        return __assign(__assign({}, question), { type: definition.type });
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
        schemaRegistry.useXDeprecatedProvider(function (message) {
            console.log(message);
            console.log('字段废弃了');
        });
        schemaRegistry.registerUriHandler(function (uri) {
            console.log(uri);
            return (0, rxjs_1.of)({
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
                        items: tree.getDir('/').subfiles.map(function (item) { return ({ label: item, value: item }); }),
                        message: '选择数组',
                    },
                },
            },
            // required: ['string1'],
        })
            .pipe((0, operators_1.switchMap)(function (validator) { return validator({}); }))
            .subscribe(function (result) {
            console.log(result);
        });
        return tree;
    };
}
exports.default = default_1;
