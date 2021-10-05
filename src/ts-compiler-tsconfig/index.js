"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = __importDefault(require("typescript"));
var ts_parsed_config_1 = require("./ts-parsed-config");
function default_1() {
    return function (tree) {
        var fileName = 'tsconfig.json';
        var tsconfig = tree.read(fileName);
        var jsonScourceFile = typescript_1.default.parseJsonText(fileName, tsconfig.toString());
        var schematicsTsconfigHost = new ts_parsed_config_1.SchematicsTsconfigHost(tree);
        var config = typescript_1.default.parseJsonSourceFileConfigFileContent(jsonScourceFile, schematicsTsconfigHost, '');
        console.log(config);
    };
}
exports.default = default_1;
