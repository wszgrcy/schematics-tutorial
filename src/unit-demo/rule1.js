"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule1 = void 0;
function rule1(tree, schematicsContext) {
    tree.overwrite('/unit-name/package.json', "{\"change\":true}");
    return tree;
}
exports.rule1 = rule1;
