"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return function (tree, context) {
        context.logger.info('hello-world');
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)((0, schematics_1.url)('./template'))]);
    };
}
exports.default = default_1;
