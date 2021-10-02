"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
function default_1(options) {
    return function (tree, context) {
        context.logger.info('hello-world');
        context.schematic.collection.createSchematic('ng-new');
        var collection = context.engine.createCollection('@schematics/angular');
        var schematic = context.engine.createSchematic('ng-new', collection);
        var ngContext = context.engine.createContext(schematic, context, { interactive: true });
        tree.create(options.name + "/hello-world", 'hello-world');
        return schematic.call({ name: options.name, version: "12.0.0" }, (0, rxjs_1.of)(tree), ngContext, { interactive: true });
    };
}
exports.default = default_1;
