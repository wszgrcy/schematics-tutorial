"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var schematics_1 = require("@angular-devkit/schematics");
var testing_1 = require("@angular-devkit/schematics/testing");
var rule1_1 = require("./rule1");
describe('unit-demo', function () {
    //   it('运行内部原理图', async () => {
    //     let runner = new SchematicTestRunner('test', require.resolve('../collection.json'));
    //     let tree = await runner.runSchematicAsync('unit-demo').toPromise();
    //     expect(tree).toBeTruthy();
    //     expect(tree.exists('/1.log')).toBeTruthy();
    //     expect(tree.readContent('/1.log')).toEqual('111');
    //   });
    it('运行外部原理图', function () { return __awaiter(void 0, void 0, void 0, function () {
        var runner, tree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    runner = new testing_1.SchematicTestRunner('test', require.resolve('../collection.json'));
                    return [4 /*yield*/, runner.runExternalSchematicAsync('@angular-devkit/schematics-cli', 'blank', { name: 'unit-name' }).toPromise()];
                case 1:
                    tree = _a.sent();
                    expect(tree).toBeTruthy();
                    return [4 /*yield*/, runner.runSchematicAsync('unit-demo', undefined, tree).toPromise()];
                case 2:
                    tree = _a.sent();
                    expect(tree.readContent('/unit-name/package.json')).toEqual("{\"change\":true}");
                    return [2 /*return*/];
            }
        });
    }); });
    it('运行runner规则', function () { return __awaiter(void 0, void 0, void 0, function () {
        var runner, tree;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    runner = new testing_1.SchematicTestRunner('test', require.resolve('../collection.json'));
                    return [4 /*yield*/, runner.runExternalSchematicAsync('@angular-devkit/schematics-cli', 'blank', { name: 'unit-name' }).toPromise()];
                case 1:
                    tree = _b.sent();
                    return [4 /*yield*/, runner.callRule(rule1_1.rule1, tree).toPromise()];
                case 2:
                    tree = _b.sent();
                    expect((_a = tree.read('/unit-name/package.json')) === null || _a === void 0 ? void 0 : _a.toString()).toEqual("{\"change\":true}");
                    return [2 /*return*/];
            }
        });
    }); });
    it('单独调用规则', function () { return __awaiter(void 0, void 0, void 0, function () {
        var runner, tree, context;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    runner = new testing_1.SchematicTestRunner('test', require.resolve('../collection.json'));
                    return [4 /*yield*/, runner.runExternalSchematicAsync('@angular-devkit/schematics-cli', 'blank', { name: 'unit-name' }).toPromise()];
                case 1:
                    tree = _a.sent();
                    context = runner.engine.createContext(runner.engine.createSchematic('unit-demo', runner.engine.createCollection(require.resolve('../collection.json'))));
                    return [4 /*yield*/, (0, schematics_1.callRule)(rule1_1.rule1, tree, context).toPromise()];
                case 2:
                    tree = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
