"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return function (tree, context) {
        tree.delete('f/hello-world');
        return tree;
    };
}
exports.default = default_1;
