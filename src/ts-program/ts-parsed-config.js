"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicsTsconfigHost = void 0;
var minimatch_1 = __importDefault(require("minimatch"));
var core_1 = require("@angular-devkit/core");
var SchematicsTsconfigHost = /** @class */ (function () {
    function SchematicsTsconfigHost(tree) {
        this.tree = tree;
        this.useCaseSensitiveFileNames = true;
    }
    SchematicsTsconfigHost.prototype.readDirectory = function (rootDir, extensions, excludes, includes, depth) {
        return this._readDirectory(rootDir, extensions, excludes, includes, depth);
    };
    SchematicsTsconfigHost.prototype._readDirectory = function (rootDir, extensions, excludes, includes, depth) {
        var _a;
        var _this = this;
        var dir = this.tree.getDir(rootDir);
        var files = dir.subfiles;
        return (_a = files
            .map(function (item) { return (0, core_1.join)((0, core_1.normalize)(rootDir), item); })
            .filter(function (file) { return extensions.some(function (extension) { return file.endsWith(extension); }); })
            .filter(function (file) { return !(excludes === null || excludes === void 0 ? void 0 : excludes.some(function (exclude) { return (0, minimatch_1.default)(file, exclude); })); })
            .filter(function (file) { return includes.some(function (include) { return (0, minimatch_1.default)(file, include); }); }))
            .concat.apply(_a, __spreadArray([], __read(dir.subdirs
            .filter(function (item) { return item !== 'node_modules'; })
            .map(function (subdir) { return (0, core_1.join)((0, core_1.normalize)(rootDir), subdir); })
            .map(function (filepath) { return _this._readDirectory(filepath, extensions, excludes, includes); })
            .reduce(function (pre, cur) {
            pre.push.apply(pre, __spreadArray([], __read(cur), false));
            return pre;
        }, [])), false));
    };
    SchematicsTsconfigHost.prototype.fileExists = function (filePath) {
        return this.tree.exists(filePath);
    };
    SchematicsTsconfigHost.prototype.readFile = function (filePath) {
        var _a;
        return (_a = this.tree.read(filePath)) === null || _a === void 0 ? void 0 : _a.toString();
    };
    return SchematicsTsconfigHost;
}());
exports.SchematicsTsconfigHost = SchematicsTsconfigHost;
