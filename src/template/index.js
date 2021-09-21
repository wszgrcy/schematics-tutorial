"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
function default_1(options) {
    return function (tree, context) {
        var source = (0, schematics_1.apply)((0, schematics_1.url)('./template'), [
            (0, schematics_1.applyTemplates)({
                getCode: function (a) {
                    return "let a=0;console.log(a);" + a;
                },
                inputValue: false,
                value: "<div></div>"
            }),
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(source)]);
    };
}
exports.default = default_1;
