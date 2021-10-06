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
        typescript_1.default.sys;
        var host = typescript_1.default.createCompilerHost(config.options);
        host.readFile = function (filePath) {
            var _a;
            return (_a = tree.read(filePath)) === null || _a === void 0 ? void 0 : _a.toString();
        };
        host.fileExists = function (filePath) {
            return tree.exists(filePath);
        };
        host.directoryExists = function (filePath) {
            try {
                var dir = tree.getDir(filePath);
                return !!dir.subdirs.length || !!dir.subfiles.length;
            }
            catch (error) {
                return false;
            }
        };
        host.getCanonicalFileName = function (filePath) { return filePath; };
        host.getCurrentDirectory = function () { return '/'; };
        var program = typescript_1.default.createProgram({ rootNames: config.fileNames, options: config.options, host: host });
        var list = program
            .getSourceFiles()
            .filter(function (sf) { return !sf.isDeclarationFile; })
            .filter(function (sf) { return !sf.fileName.includes('node_modules'); });
        list;
    };
}
exports.default = default_1;
