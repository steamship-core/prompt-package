#!/usr/bin/env node
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7678:
/***/ ((module, exports) => {

"use strict";

/// <reference lib="es2018"/>
/// <reference lib="dom"/>
/// <reference types="node"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
const { toString } = Object.prototype;
const isOfType = (type) => (value) => typeof value === type;
const getObjectType = (value) => {
    const objectName = toString.call(value).slice(8, -1);
    if (objectName) {
        return objectName;
    }
    return undefined;
};
const isObjectOfType = (type) => (value) => getObjectType(value) === type;
function is(value) {
    switch (value) {
        case null:
            return "null" /* null */;
        case true:
        case false:
            return "boolean" /* boolean */;
        default:
    }
    switch (typeof value) {
        case 'undefined':
            return "undefined" /* undefined */;
        case 'string':
            return "string" /* string */;
        case 'number':
            return "number" /* number */;
        case 'bigint':
            return "bigint" /* bigint */;
        case 'symbol':
            return "symbol" /* symbol */;
        default:
    }
    if (is.function_(value)) {
        return "Function" /* Function */;
    }
    if (is.observable(value)) {
        return "Observable" /* Observable */;
    }
    if (is.array(value)) {
        return "Array" /* Array */;
    }
    if (is.buffer(value)) {
        return "Buffer" /* Buffer */;
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return "Object" /* Object */;
}
is.undefined = isOfType('undefined');
is.string = isOfType('string');
const isNumberType = isOfType('number');
is.number = (value) => isNumberType(value) && !is.nan(value);
is.bigint = isOfType('bigint');
// eslint-disable-next-line @typescript-eslint/ban-types
is.function_ = isOfType('function');
is.null_ = (value) => value === null;
is.class_ = (value) => is.function_(value) && value.toString().startsWith('class ');
is.boolean = (value) => value === true || value === false;
is.symbol = isOfType('symbol');
is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = Array.isArray;
is.buffer = (value) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d !== void 0 ? _d : false; };
is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
is.object = (value) => !is.null_(value) && (typeof value === 'object' || is.function_(value));
is.iterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]); };
is.asyncIterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.asyncIterator]); };
is.generator = (value) => is.iterable(value) && is.function_(value.next) && is.function_(value.throw);
is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value) => isObjectOfType("Promise" /* Promise */)(value);
const hasPromiseAPI = (value) => {
    var _a, _b;
    return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.then) &&
        is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
};
is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
is.generatorFunction = isObjectOfType("GeneratorFunction" /* GeneratorFunction */);
is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction" /* AsyncGeneratorFunction */;
is.asyncFunction = (value) => getObjectType(value) === "AsyncFunction" /* AsyncFunction */;
// eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty('prototype');
is.regExp = isObjectOfType("RegExp" /* RegExp */);
is.date = isObjectOfType("Date" /* Date */);
is.error = isObjectOfType("Error" /* Error */);
is.map = (value) => isObjectOfType("Map" /* Map */)(value);
is.set = (value) => isObjectOfType("Set" /* Set */)(value);
is.weakMap = (value) => isObjectOfType("WeakMap" /* WeakMap */)(value);
is.weakSet = (value) => isObjectOfType("WeakSet" /* WeakSet */)(value);
is.int8Array = isObjectOfType("Int8Array" /* Int8Array */);
is.uint8Array = isObjectOfType("Uint8Array" /* Uint8Array */);
is.uint8ClampedArray = isObjectOfType("Uint8ClampedArray" /* Uint8ClampedArray */);
is.int16Array = isObjectOfType("Int16Array" /* Int16Array */);
is.uint16Array = isObjectOfType("Uint16Array" /* Uint16Array */);
is.int32Array = isObjectOfType("Int32Array" /* Int32Array */);
is.uint32Array = isObjectOfType("Uint32Array" /* Uint32Array */);
is.float32Array = isObjectOfType("Float32Array" /* Float32Array */);
is.float64Array = isObjectOfType("Float64Array" /* Float64Array */);
is.bigInt64Array = isObjectOfType("BigInt64Array" /* BigInt64Array */);
is.bigUint64Array = isObjectOfType("BigUint64Array" /* BigUint64Array */);
is.arrayBuffer = isObjectOfType("ArrayBuffer" /* ArrayBuffer */);
is.sharedArrayBuffer = isObjectOfType("SharedArrayBuffer" /* SharedArrayBuffer */);
is.dataView = isObjectOfType("DataView" /* DataView */);
is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value) => isObjectOfType("URL" /* URL */)(value);
is.urlString = (value) => {
    if (!is.string(value)) {
        return false;
    }
    try {
        new URL(value); // eslint-disable-line no-new
        return true;
    }
    catch (_a) {
        return false;
    }
};
// TODO: Use the `not` operator with a type guard here when it's available.
// Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
is.truthy = (value) => Boolean(value);
// Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
is.falsy = (value) => !value;
is.nan = (value) => Number.isNaN(value);
const primitiveTypeOfTypes = new Set([
    'undefined',
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol'
]);
is.primitive = (value) => is.null_(value) || primitiveTypeOfTypes.has(typeof value);
is.integer = (value) => Number.isInteger(value);
is.safeInteger = (value) => Number.isSafeInteger(value);
is.plainObject = (value) => {
    // From: https://github.com/sindresorhus/is-plain-obj/blob/master/index.js
    if (getObjectType(value) !== "Object" /* Object */) {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
};
const typedArrayTypes = new Set([
    "Int8Array" /* Int8Array */,
    "Uint8Array" /* Uint8Array */,
    "Uint8ClampedArray" /* Uint8ClampedArray */,
    "Int16Array" /* Int16Array */,
    "Uint16Array" /* Uint16Array */,
    "Int32Array" /* Int32Array */,
    "Uint32Array" /* Uint32Array */,
    "Float32Array" /* Float32Array */,
    "Float64Array" /* Float64Array */,
    "BigInt64Array" /* BigInt64Array */,
    "BigUint64Array" /* BigUint64Array */
]);
is.typedArray = (value) => {
    const objectType = getObjectType(value);
    if (objectType === undefined) {
        return false;
    }
    return typedArrayTypes.has(objectType);
};
const isValidLength = (value) => is.safeInteger(value) && value >= 0;
is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.inRange = (value, range) => {
    if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
    }
    if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }
    throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
const NODE_TYPE_ELEMENT = 1;
const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue'
];
is.domElement = (value) => is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) &&
    !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every(property => property in value);
is.observable = (value) => {
    var _a, _b, _c, _d;
    if (!value) {
        return false;
    }
    // eslint-disable-next-line no-use-extend-native/no-use-extend-native
    if (value === ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        return true;
    }
    if (value === ((_d = (_c = value)['@@observable']) === null || _d === void 0 ? void 0 : _d.call(_c))) {
        return true;
    }
    return false;
};
is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value) => value === Infinity || value === -Infinity;
const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value) => is.array(value) && value.length === 0;
is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
is.emptyString = (value) => is.string(value) && value.length === 0;
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyString = (value) => is.string(value) && value.length > 0;
const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
// TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
// - https://github.com/Microsoft/TypeScript/pull/29317
is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value) => is.set(value) && value.size === 0;
is.nonEmptySet = (value) => is.set(value) && value.size > 0;
is.emptyMap = (value) => is.map(value) && value.size === 0;
is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
const predicateOnArray = (method, predicate, values) => {
    if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
    if (values.length === 0) {
        throw new TypeError('Invalid number of values');
    }
    return method.call(values, predicate);
};
is.any = (predicate, ...values) => {
    const predicates = is.array(predicate) ? predicate : [predicate];
    return predicates.some(singlePredicate => predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value) => {
    if (!condition) {
        throw new TypeError(`Expected value which is \`${description}\`, received value of type \`${is(value)}\`.`);
    }
};
exports.assert = {
    // Unknowns.
    undefined: (value) => assertType(is.undefined(value), "undefined" /* undefined */, value),
    string: (value) => assertType(is.string(value), "string" /* string */, value),
    number: (value) => assertType(is.number(value), "number" /* number */, value),
    bigint: (value) => assertType(is.bigint(value), "bigint" /* bigint */, value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (value) => assertType(is.function_(value), "Function" /* Function */, value),
    null_: (value) => assertType(is.null_(value), "null" /* null */, value),
    class_: (value) => assertType(is.class_(value), "Class" /* class_ */, value),
    boolean: (value) => assertType(is.boolean(value), "boolean" /* boolean */, value),
    symbol: (value) => assertType(is.symbol(value), "symbol" /* symbol */, value),
    numericString: (value) => assertType(is.numericString(value), "string with a number" /* numericString */, value),
    array: (value) => assertType(is.array(value), "Array" /* Array */, value),
    buffer: (value) => assertType(is.buffer(value), "Buffer" /* Buffer */, value),
    nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined" /* nullOrUndefined */, value),
    object: (value) => assertType(is.object(value), "Object" /* Object */, value),
    iterable: (value) => assertType(is.iterable(value), "Iterable" /* iterable */, value),
    asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable" /* asyncIterable */, value),
    generator: (value) => assertType(is.generator(value), "Generator" /* Generator */, value),
    asyncGenerator: (value) => assertType(is.asyncGenerator(value), "AsyncGenerator" /* AsyncGenerator */, value),
    nativePromise: (value) => assertType(is.nativePromise(value), "native Promise" /* nativePromise */, value),
    promise: (value) => assertType(is.promise(value), "Promise" /* Promise */, value),
    generatorFunction: (value) => assertType(is.generatorFunction(value), "GeneratorFunction" /* GeneratorFunction */, value),
    asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), "AsyncGeneratorFunction" /* AsyncGeneratorFunction */, value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (value) => assertType(is.asyncFunction(value), "AsyncFunction" /* AsyncFunction */, value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (value) => assertType(is.boundFunction(value), "Function" /* Function */, value),
    regExp: (value) => assertType(is.regExp(value), "RegExp" /* RegExp */, value),
    date: (value) => assertType(is.date(value), "Date" /* Date */, value),
    error: (value) => assertType(is.error(value), "Error" /* Error */, value),
    map: (value) => assertType(is.map(value), "Map" /* Map */, value),
    set: (value) => assertType(is.set(value), "Set" /* Set */, value),
    weakMap: (value) => assertType(is.weakMap(value), "WeakMap" /* WeakMap */, value),
    weakSet: (value) => assertType(is.weakSet(value), "WeakSet" /* WeakSet */, value),
    int8Array: (value) => assertType(is.int8Array(value), "Int8Array" /* Int8Array */, value),
    uint8Array: (value) => assertType(is.uint8Array(value), "Uint8Array" /* Uint8Array */, value),
    uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), "Uint8ClampedArray" /* Uint8ClampedArray */, value),
    int16Array: (value) => assertType(is.int16Array(value), "Int16Array" /* Int16Array */, value),
    uint16Array: (value) => assertType(is.uint16Array(value), "Uint16Array" /* Uint16Array */, value),
    int32Array: (value) => assertType(is.int32Array(value), "Int32Array" /* Int32Array */, value),
    uint32Array: (value) => assertType(is.uint32Array(value), "Uint32Array" /* Uint32Array */, value),
    float32Array: (value) => assertType(is.float32Array(value), "Float32Array" /* Float32Array */, value),
    float64Array: (value) => assertType(is.float64Array(value), "Float64Array" /* Float64Array */, value),
    bigInt64Array: (value) => assertType(is.bigInt64Array(value), "BigInt64Array" /* BigInt64Array */, value),
    bigUint64Array: (value) => assertType(is.bigUint64Array(value), "BigUint64Array" /* BigUint64Array */, value),
    arrayBuffer: (value) => assertType(is.arrayBuffer(value), "ArrayBuffer" /* ArrayBuffer */, value),
    sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), "SharedArrayBuffer" /* SharedArrayBuffer */, value),
    dataView: (value) => assertType(is.dataView(value), "DataView" /* DataView */, value),
    urlInstance: (value) => assertType(is.urlInstance(value), "URL" /* URL */, value),
    urlString: (value) => assertType(is.urlString(value), "string with a URL" /* urlString */, value),
    truthy: (value) => assertType(is.truthy(value), "truthy" /* truthy */, value),
    falsy: (value) => assertType(is.falsy(value), "falsy" /* falsy */, value),
    nan: (value) => assertType(is.nan(value), "NaN" /* nan */, value),
    primitive: (value) => assertType(is.primitive(value), "primitive" /* primitive */, value),
    integer: (value) => assertType(is.integer(value), "integer" /* integer */, value),
    safeInteger: (value) => assertType(is.safeInteger(value), "integer" /* safeInteger */, value),
    plainObject: (value) => assertType(is.plainObject(value), "plain object" /* plainObject */, value),
    typedArray: (value) => assertType(is.typedArray(value), "TypedArray" /* typedArray */, value),
    arrayLike: (value) => assertType(is.arrayLike(value), "array-like" /* arrayLike */, value),
    domElement: (value) => assertType(is.domElement(value), "Element" /* domElement */, value),
    observable: (value) => assertType(is.observable(value), "Observable" /* Observable */, value),
    nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream" /* nodeStream */, value),
    infinite: (value) => assertType(is.infinite(value), "infinite number" /* infinite */, value),
    emptyArray: (value) => assertType(is.emptyArray(value), "empty array" /* emptyArray */, value),
    nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array" /* nonEmptyArray */, value),
    emptyString: (value) => assertType(is.emptyString(value), "empty string" /* emptyString */, value),
    nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string" /* nonEmptyString */, value),
    emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace" /* emptyStringOrWhitespace */, value),
    emptyObject: (value) => assertType(is.emptyObject(value), "empty object" /* emptyObject */, value),
    nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object" /* nonEmptyObject */, value),
    emptySet: (value) => assertType(is.emptySet(value), "empty set" /* emptySet */, value),
    nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set" /* nonEmptySet */, value),
    emptyMap: (value) => assertType(is.emptyMap(value), "empty map" /* emptyMap */, value),
    nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map" /* nonEmptyMap */, value),
    // Numbers.
    evenInteger: (value) => assertType(is.evenInteger(value), "even integer" /* evenInteger */, value),
    oddInteger: (value) => assertType(is.oddInteger(value), "odd integer" /* oddInteger */, value),
    // Two arguments.
    directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T" /* directInstanceOf */, instance),
    inRange: (value, range) => assertType(is.inRange(value, range), "in range" /* inRange */, value),
    // Variadic functions.
    any: (predicate, ...values) => assertType(is.any(predicate, ...values), "predicate returns truthy for any value" /* any */, values),
    all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values" /* all */, values)
};
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_
    },
    function: {
        value: is.function_
    },
    null: {
        value: is.null_
    }
});
Object.defineProperties(exports.assert, {
    class: {
        value: exports.assert.class_
    },
    function: {
        value: exports.assert.function_
    },
    null: {
        value: exports.assert.null_
    }
});
exports.default = is;
// For CommonJS default export support
module.exports = is;
module.exports.default = is;
module.exports.assert = exports.assert;


/***/ }),

/***/ 8097:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const defer_to_connect_1 = __webpack_require__(6214);
const util_1 = __webpack_require__(1669);
const nodejsMajorVersion = Number(process.versions.node.split('.')[0]);
const timer = (request) => {
    if (request.timings) {
        return request.timings;
    }
    const timings = {
        start: Date.now(),
        socket: undefined,
        lookup: undefined,
        connect: undefined,
        secureConnect: undefined,
        upload: undefined,
        response: undefined,
        end: undefined,
        error: undefined,
        abort: undefined,
        phases: {
            wait: undefined,
            dns: undefined,
            tcp: undefined,
            tls: undefined,
            request: undefined,
            firstByte: undefined,
            download: undefined,
            total: undefined
        }
    };
    request.timings = timings;
    const handleError = (origin) => {
        const emit = origin.emit.bind(origin);
        origin.emit = (event, ...args) => {
            // Catches the `error` event
            if (event === 'error') {
                timings.error = Date.now();
                timings.phases.total = timings.error - timings.start;
                origin.emit = emit;
            }
            // Saves the original behavior
            return emit(event, ...args);
        };
    };
    handleError(request);
    const onAbort = () => {
        timings.abort = Date.now();
        // Let the `end` response event be responsible for setting the total phase,
        // unless the Node.js major version is >= 13.
        if (!timings.response || nodejsMajorVersion >= 13) {
            timings.phases.total = Date.now() - timings.start;
        }
    };
    request.prependOnceListener('abort', onAbort);
    const onSocket = (socket) => {
        timings.socket = Date.now();
        timings.phases.wait = timings.socket - timings.start;
        if (util_1.types.isProxy(socket)) {
            return;
        }
        const lookupListener = () => {
            timings.lookup = Date.now();
            timings.phases.dns = timings.lookup - timings.socket;
        };
        socket.prependOnceListener('lookup', lookupListener);
        defer_to_connect_1.default(socket, {
            connect: () => {
                timings.connect = Date.now();
                if (timings.lookup === undefined) {
                    socket.removeListener('lookup', lookupListener);
                    timings.lookup = timings.connect;
                    timings.phases.dns = timings.lookup - timings.socket;
                }
                timings.phases.tcp = timings.connect - timings.lookup;
                // This callback is called before flushing any data,
                // so we don't need to set `timings.phases.request` here.
            },
            secureConnect: () => {
                timings.secureConnect = Date.now();
                timings.phases.tls = timings.secureConnect - timings.connect;
            }
        });
    };
    if (request.socket) {
        onSocket(request.socket);
    }
    else {
        request.prependOnceListener('socket', onSocket);
    }
    const onUpload = () => {
        var _a;
        timings.upload = Date.now();
        timings.phases.request = timings.upload - ((_a = timings.secureConnect) !== null && _a !== void 0 ? _a : timings.connect);
    };
    const writableFinished = () => {
        if (typeof request.writableFinished === 'boolean') {
            return request.writableFinished;
        }
        // Node.js doesn't have `request.writableFinished` property
        return request.finished && request.outputSize === 0 && (!request.socket || request.socket.writableLength === 0);
    };
    if (writableFinished()) {
        onUpload();
    }
    else {
        request.prependOnceListener('finish', onUpload);
    }
    request.prependOnceListener('response', (response) => {
        timings.response = Date.now();
        timings.phases.firstByte = timings.response - timings.upload;
        response.timings = timings;
        handleError(response);
        response.prependOnceListener('end', () => {
            timings.end = Date.now();
            timings.phases.download = timings.end - timings.response;
            timings.phases.total = timings.end - timings.start;
        });
        response.prependOnceListener('aborted', onAbort);
    });
    return timings;
};
exports.default = timer;
// For CommonJS default export support
module.exports = timer;
module.exports.default = timer;


/***/ }),

/***/ 2068:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);

const colorConvert = __webpack_require__(6931);

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ 3415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Packages
var retrier = __webpack_require__(4347);

function retry(fn, opts) {
  function run(resolve, reject) {
    var options = opts || {};

    // Default `randomize` to true
    if (!('randomize' in options)) {
      options.randomize = true;
    }

    var op = retrier.operation(options);

    // We allow the user to abort retrying
    // this makes sense in the cases where
    // knowledge is obtained that retrying
    // would be futile (e.g.: auth errors)

    function bail(err) {
      reject(err || new Error('Aborted'));
    }

    function onError(err, num) {
      if (err.bail) {
        bail(err);
        return;
      }

      if (!op.retry(err)) {
        reject(op.mainError());
      } else if (options.onRetry) {
        options.onRetry(err, num);
      }
    }

    function runAttempt(num) {
      var val;

      try {
        val = fn(bail, num);
      } catch (err) {
        onError(err, num);
        return;
      }

      Promise.resolve(val)
        .then(resolve)
        .catch(function catchIt(err) {
          onError(err, num);
        });
    }

    op.attempt(runAttempt);
  }

  return new Promise(run);
}

module.exports = retry;


/***/ }),

/***/ 9417:
/***/ ((module) => {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    if(a===b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 3717:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var concatMap = __webpack_require__(6891);
var balanced = __webpack_require__(9417);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ 134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {Resolver, V4MAPPED, ADDRCONFIG} = __webpack_require__(881);
const {promisify} = __webpack_require__(1669);
const os = __webpack_require__(2087);
const Keyv = __webpack_require__(1531);

const kCacheableLookupData = Symbol('cacheableLookupData');
const kCacheableLookupInstance = Symbol('cacheableLookupInstance');

const verifyAgent = agent => {
	if (!(agent && typeof agent.createConnection === 'function')) {
		throw new Error('Expected an Agent instance as the first argument');
	}
};

const map4to6 = entries => {
	for (const entry of entries) {
		entry.address = `::ffff:${entry.address}`;
		entry.family = 6;
	}
};

const getIfaceInfo = () => {
	let has4 = false;
	let has6 = false;

	for (const device of Object.values(os.networkInterfaces())) {
		for (const iface of device) {
			if (iface.internal) {
				continue;
			}

			if (iface.family === 'IPv6') {
				has6 = true;
			} else {
				has4 = true;
			}

			if (has4 && has6) {
				break;
			}
		}
	}

	return {has4, has6};
};

class CacheableLookup {
	constructor({cacheAdapter, maxTtl = Infinity, resolver} = {}) {
		this.cache = new Keyv({
			uri: typeof cacheAdapter === 'string' && cacheAdapter,
			store: typeof cacheAdapter !== 'string' && cacheAdapter,
			namespace: 'cached-lookup'
		});

		this.maxTtl = maxTtl;

		this._resolver = resolver || new Resolver();
		this._resolve4 = promisify(this._resolver.resolve4.bind(this._resolver));
		this._resolve6 = promisify(this._resolver.resolve6.bind(this._resolver));

		this._iface = getIfaceInfo();

		this.lookup = this.lookup.bind(this);
		this.lookupAsync = this.lookupAsync.bind(this);
	}

	set servers(servers) {
		this._resolver.setServers(servers);
	}

	get servers() {
		return this._resolver.getServers();
	}

	lookup(hostname, options, callback) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		// eslint-disable-next-line promise/prefer-await-to-then
		this.lookupAsync(hostname, {...options, throwNotFound: true}).then(result => {
			if (options.all) {
				callback(null, result);
			} else {
				callback(null, result.address, result.family, result.expires, result.ttl);
			}
		}).catch(callback);
	}

	async lookupAsync(hostname, options = {}) {
		let cached;
		if (!options.family && options.all) {
			const [cached4, cached6] = await Promise.all([this.lookupAsync(hostname, {all: true, family: 4}), this.lookupAsync(hostname, {all: true, family: 6})]);
			cached = [...cached4, ...cached6];
		} else {
			cached = await this.query(hostname, options.family || 4);

			if (cached.length === 0 && options.family === 6 && options.hints & V4MAPPED) {
				cached = await this.query(hostname, 4);
				map4to6(cached);
			}
		}

		if (options.hints & ADDRCONFIG) {
			const {_iface} = this;
			cached = cached.filter(entry => entry.family === 6 ? _iface.has6 : _iface.has4);
		}

		if (cached.length === 0 && options.throwNotFound) {
			const error = new Error(`ENOTFOUND ${hostname}`);
			error.code = 'ENOTFOUND';
			error.hostname = hostname;

			throw error;
		}

		const now = Date.now();
		cached = cached.filter(entry => entry.ttl === 0 || now < entry.expires);

		if (options.all) {
			return cached;
		}

		if (cached.length === 1) {
			return cached[0];
		}

		if (cached.length === 0) {
			return undefined;
		}

		return this._getEntry(cached);
	}

	async query(hostname, family) {
		let cached = await this.cache.get(`${hostname}:${family}`);
		if (!cached) {
			cached = await this.queryAndCache(hostname, family);
		}

		return cached;
	}

	async queryAndCache(hostname, family) {
		const resolve = family === 4 ? this._resolve4 : this._resolve6;
		const entries = await resolve(hostname, {ttl: true});

		if (entries === undefined) {
			return [];
		}

		const now = Date.now();

		let cacheTtl = 0;
		for (const entry of entries) {
			cacheTtl = Math.max(cacheTtl, entry.ttl);
			entry.family = family;
			entry.expires = now + (entry.ttl * 1000);
		}

		cacheTtl = Math.min(this.maxTtl, cacheTtl) * 1000;

		if (this.maxTtl !== 0 && cacheTtl !== 0) {
			await this.cache.set(`${hostname}:${family}`, entries, cacheTtl);
		}

		return entries;
	}

	_getEntry(entries) {
		return entries[Math.floor(Math.random() * entries.length)];
	}

	install(agent) {
		verifyAgent(agent);

		if (kCacheableLookupData in agent) {
			throw new Error('CacheableLookup has been already installed');
		}

		agent[kCacheableLookupData] = agent.createConnection;
		agent[kCacheableLookupInstance] = this;

		agent.createConnection = (options, callback) => {
			if (!('lookup' in options)) {
				options.lookup = this.lookup;
			}

			return agent[kCacheableLookupData](options, callback);
		};
	}

	uninstall(agent) {
		verifyAgent(agent);

		if (agent[kCacheableLookupData]) {
			if (agent[kCacheableLookupInstance] !== this) {
				throw new Error('The agent is not owned by this CacheableLookup instance');
			}

			agent.createConnection = agent[kCacheableLookupData];

			delete agent[kCacheableLookupData];
			delete agent[kCacheableLookupInstance];
		}
	}

	updateInterfaceInfo() {
		this._iface = getIfaceInfo();
	}
}

module.exports = CacheableLookup;
module.exports.default = CacheableLookup;


/***/ }),

/***/ 1472:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const EventEmitter = __webpack_require__(8614);
const urlLib = __webpack_require__(8835);
const normalizeUrl = __webpack_require__(7952);
const getStream = __webpack_require__(1766);
const CachePolicy = __webpack_require__(1002);
const Response = __webpack_require__(9004);
const lowercaseKeys = __webpack_require__(9662);
const cloneResponse = __webpack_require__(1312);
const Keyv = __webpack_require__(1531);

class CacheableRequest {
	constructor(request, cacheAdapter) {
		if (typeof request !== 'function') {
			throw new TypeError('Parameter `request` must be a function');
		}

		this.cache = new Keyv({
			uri: typeof cacheAdapter === 'string' && cacheAdapter,
			store: typeof cacheAdapter !== 'string' && cacheAdapter,
			namespace: 'cacheable-request'
		});

		return this.createCacheableRequest(request);
	}

	createCacheableRequest(request) {
		return (opts, cb) => {
			let url;
			if (typeof opts === 'string') {
				url = normalizeUrlObject(urlLib.parse(opts));
				opts = {};
			} else if (opts instanceof urlLib.URL) {
				url = normalizeUrlObject(urlLib.parse(opts.toString()));
				opts = {};
			} else {
				const [pathname, ...searchParts] = (opts.path || '').split('?');
				const search = searchParts.length > 0 ?
					`?${searchParts.join('?')}` :
					'';
				url = normalizeUrlObject({ ...opts, pathname, search });
			}

			opts = {
				headers: {},
				method: 'GET',
				cache: true,
				strictTtl: false,
				automaticFailover: false,
				...opts,
				...urlObjectToRequestOptions(url)
			};
			opts.headers = lowercaseKeys(opts.headers);

			const ee = new EventEmitter();
			const normalizedUrlString = normalizeUrl(
				urlLib.format(url),
				{
					stripWWW: false,
					removeTrailingSlash: false,
					stripAuthentication: false
				}
			);
			const key = `${opts.method}:${normalizedUrlString}`;
			let revalidate = false;
			let madeRequest = false;

			const makeRequest = opts => {
				madeRequest = true;
				let requestErrored = false;
				let requestErrorCallback;

				const requestErrorPromise = new Promise(resolve => {
					requestErrorCallback = () => {
						if (!requestErrored) {
							requestErrored = true;
							resolve();
						}
					};
				});

				const handler = response => {
					if (revalidate && !opts.forceRefresh) {
						response.status = response.statusCode;
						const revalidatedPolicy = CachePolicy.fromObject(revalidate.cachePolicy).revalidatedPolicy(opts, response);
						if (!revalidatedPolicy.modified) {
							const headers = revalidatedPolicy.policy.responseHeaders();
							response = new Response(revalidate.statusCode, headers, revalidate.body, revalidate.url);
							response.cachePolicy = revalidatedPolicy.policy;
							response.fromCache = true;
						}
					}

					if (!response.fromCache) {
						response.cachePolicy = new CachePolicy(opts, response, opts);
						response.fromCache = false;
					}

					let clonedResponse;
					if (opts.cache && response.cachePolicy.storable()) {
						clonedResponse = cloneResponse(response);

						(async () => {
							try {
								const bodyPromise = getStream.buffer(response);

								await Promise.race([
									requestErrorPromise,
									new Promise(resolve => response.once('end', resolve))
								]);

								if (requestErrored) {
									return;
								}

								const body = await bodyPromise;

								const value = {
									cachePolicy: response.cachePolicy.toObject(),
									url: response.url,
									statusCode: response.fromCache ? revalidate.statusCode : response.statusCode,
									body
								};

								let ttl = opts.strictTtl ? response.cachePolicy.timeToLive() : undefined;
								if (opts.maxTtl) {
									ttl = ttl ? Math.min(ttl, opts.maxTtl) : opts.maxTtl;
								}

								await this.cache.set(key, value, ttl);
							} catch (error) {
								ee.emit('error', new CacheableRequest.CacheError(error));
							}
						})();
					} else if (opts.cache && revalidate) {
						(async () => {
							try {
								await this.cache.delete(key);
							} catch (error) {
								ee.emit('error', new CacheableRequest.CacheError(error));
							}
						})();
					}

					ee.emit('response', clonedResponse || response);
					if (typeof cb === 'function') {
						cb(clonedResponse || response);
					}
				};

				try {
					const req = request(opts, handler);
					req.once('error', requestErrorCallback);
					req.once('abort', requestErrorCallback);
					ee.emit('request', req);
				} catch (error) {
					ee.emit('error', new CacheableRequest.RequestError(error));
				}
			};

			(async () => {
				const get = async opts => {
					await Promise.resolve();

					const cacheEntry = opts.cache ? await this.cache.get(key) : undefined;
					if (typeof cacheEntry === 'undefined') {
						return makeRequest(opts);
					}

					const policy = CachePolicy.fromObject(cacheEntry.cachePolicy);
					if (policy.satisfiesWithoutRevalidation(opts) && !opts.forceRefresh) {
						const headers = policy.responseHeaders();
						const response = new Response(cacheEntry.statusCode, headers, cacheEntry.body, cacheEntry.url);
						response.cachePolicy = policy;
						response.fromCache = true;

						ee.emit('response', response);
						if (typeof cb === 'function') {
							cb(response);
						}
					} else {
						revalidate = cacheEntry;
						opts.headers = policy.revalidationHeaders(opts);
						makeRequest(opts);
					}
				};

				const errorHandler = error => ee.emit('error', new CacheableRequest.CacheError(error));
				this.cache.once('error', errorHandler);
				ee.on('response', () => this.cache.removeListener('error', errorHandler));

				try {
					await get(opts);
				} catch (error) {
					if (opts.automaticFailover && !madeRequest) {
						makeRequest(opts);
					}

					ee.emit('error', new CacheableRequest.CacheError(error));
				}
			})();

			return ee;
		};
	}
}

function urlObjectToRequestOptions(url) {
	const options = { ...url };
	options.path = `${url.pathname || '/'}${url.search || ''}`;
	delete options.pathname;
	delete options.search;
	return options;
}

function normalizeUrlObject(url) {
	// If url was parsed by url.parse or new URL:
	// - hostname will be set
	// - host will be hostname[:port]
	// - port will be set if it was explicit in the parsed string
	// Otherwise, url was from request options:
	// - hostname or host may be set
	// - host shall not have port encoded
	return {
		protocol: url.protocol,
		auth: url.auth,
		hostname: url.hostname || url.host || 'localhost',
		port: url.port,
		pathname: url.pathname,
		search: url.search
	};
}

CacheableRequest.RequestError = class extends Error {
	constructor(error) {
		super(error.message);
		this.name = 'RequestError';
		Object.assign(this, error);
	}
};

CacheableRequest.CacheError = class extends Error {
	constructor(error) {
		super(error.message);
		this.name = 'CacheError';
		Object.assign(this, error);
	}
};

module.exports = CacheableRequest;


/***/ }),

/***/ 8707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const escapeStringRegexp = __webpack_require__(8691);
const ansiStyles = __webpack_require__(2068);
const stdoutColor = __webpack_require__(9318).stdout;

const template = __webpack_require__(2138);

const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript


/***/ }),

/***/ 2138:
/***/ ((module) => {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};


/***/ }),

/***/ 9051:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const fs = __webpack_require__(5747)
const path = __webpack_require__(5622)

/* istanbul ignore next */
const LCHOWN = fs.lchown ? 'lchown' : 'chown'
/* istanbul ignore next */
const LCHOWNSYNC = fs.lchownSync ? 'lchownSync' : 'chownSync'

/* istanbul ignore next */
const needEISDIRHandled = fs.lchown &&
  !process.version.match(/v1[1-9]+\./) &&
  !process.version.match(/v10\.[6-9]/)

const lchownSync = (path, uid, gid) => {
  try {
    return fs[LCHOWNSYNC](path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const chownSync = (path, uid, gid) => {
  try {
    return fs.chownSync(path, uid, gid)
  } catch (er) {
    if (er.code !== 'ENOENT')
      throw er
  }
}

/* istanbul ignore next */
const handleEISDIR =
  needEISDIRHandled ? (path, uid, gid, cb) => er => {
    // Node prior to v10 had a very questionable implementation of
    // fs.lchown, which would always try to call fs.open on a directory
    // Fall back to fs.chown in those cases.
    if (!er || er.code !== 'EISDIR')
      cb(er)
    else
      fs.chown(path, uid, gid, cb)
  }
  : (_, __, ___, cb) => cb

/* istanbul ignore next */
const handleEISDirSync =
  needEISDIRHandled ? (path, uid, gid) => {
    try {
      return lchownSync(path, uid, gid)
    } catch (er) {
      if (er.code !== 'EISDIR')
        throw er
      chownSync(path, uid, gid)
    }
  }
  : (path, uid, gid) => lchownSync(path, uid, gid)

// fs.readdir could only accept an options object as of node v6
const nodeVersion = process.version
let readdir = (path, options, cb) => fs.readdir(path, options, cb)
let readdirSync = (path, options) => fs.readdirSync(path, options)
/* istanbul ignore next */
if (/^v4\./.test(nodeVersion))
  readdir = (path, options, cb) => fs.readdir(path, cb)

const chown = (cpath, uid, gid, cb) => {
  fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, er => {
    // Skip ENOENT error
    cb(er && er.code !== 'ENOENT' ? er : null)
  }))
}

const chownrKid = (p, child, uid, gid, cb) => {
  if (typeof child === 'string')
    return fs.lstat(path.resolve(p, child), (er, stats) => {
      // Skip ENOENT error
      if (er)
        return cb(er.code !== 'ENOENT' ? er : null)
      stats.name = child
      chownrKid(p, stats, uid, gid, cb)
    })

  if (child.isDirectory()) {
    chownr(path.resolve(p, child.name), uid, gid, er => {
      if (er)
        return cb(er)
      const cpath = path.resolve(p, child.name)
      chown(cpath, uid, gid, cb)
    })
  } else {
    const cpath = path.resolve(p, child.name)
    chown(cpath, uid, gid, cb)
  }
}


const chownr = (p, uid, gid, cb) => {
  readdir(p, { withFileTypes: true }, (er, children) => {
    // any error other than ENOTDIR or ENOTSUP means it's not readable,
    // or doesn't exist.  give up.
    if (er) {
      if (er.code === 'ENOENT')
        return cb()
      else if (er.code !== 'ENOTDIR' && er.code !== 'ENOTSUP')
        return cb(er)
    }
    if (er || !children.length)
      return chown(p, uid, gid, cb)

    let len = children.length
    let errState = null
    const then = er => {
      if (errState)
        return
      if (er)
        return cb(errState = er)
      if (-- len === 0)
        return chown(p, uid, gid, cb)
    }

    children.forEach(child => chownrKid(p, child, uid, gid, then))
  })
}

const chownrKidSync = (p, child, uid, gid) => {
  if (typeof child === 'string') {
    try {
      const stats = fs.lstatSync(path.resolve(p, child))
      stats.name = child
      child = stats
    } catch (er) {
      if (er.code === 'ENOENT')
        return
      else
        throw er
    }
  }

  if (child.isDirectory())
    chownrSync(path.resolve(p, child.name), uid, gid)

  handleEISDirSync(path.resolve(p, child.name), uid, gid)
}

const chownrSync = (p, uid, gid) => {
  let children
  try {
    children = readdirSync(p, { withFileTypes: true })
  } catch (er) {
    if (er.code === 'ENOENT')
      return
    else if (er.code === 'ENOTDIR' || er.code === 'ENOTSUP')
      return handleEISDirSync(p, uid, gid)
    else
      throw er
  }

  if (children && children.length)
    children.forEach(child => chownrKidSync(p, child, uid, gid))

  return handleEISDirSync(p, uid, gid)
}

module.exports = chownr
chownr.sync = chownrSync


/***/ }),

/***/ 9372:
/***/ ((module) => {

"use strict";


// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProps = [
	'destroy',
	'setTimeout',
	'socket',
	'headers',
	'trailers',
	'rawHeaders',
	'statusCode',
	'httpVersion',
	'httpVersionMinor',
	'httpVersionMajor',
	'rawTrailers',
	'statusMessage'
];

module.exports = (fromStream, toStream) => {
	const fromProps = new Set(Object.keys(fromStream).concat(knownProps));

	for (const prop of fromProps) {
		// Don't overwrite existing properties
		if (prop in toStream) {
			continue;
		}

		toStream[prop] = typeof fromStream[prop] === 'function' ? fromStream[prop].bind(fromStream) : fromStream[prop];
	}
};


/***/ }),

/***/ 1312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const PassThrough = __webpack_require__(2413).PassThrough;
const mimicResponse = __webpack_require__(9372);

const cloneResponse = response => {
	if (!(response && response.pipe)) {
		throw new TypeError('Parameter `response` must be a response stream.');
	}

	const clone = new PassThrough();
	mimicResponse(response, clone);

	return response.pipe(clone);
};

module.exports = cloneResponse;


/***/ }),

/***/ 7391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
var cssKeywords = __webpack_require__(8510);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ 6931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(7391);
var route = __webpack_require__(880);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ 880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var conversions = __webpack_require__(7391);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ 8510:
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ 1904:
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(8614).EventEmitter;
var spawn = __webpack_require__(3129).spawn;
var path = __webpack_require__(5622);
var dirname = path.dirname;
var basename = path.basename;
var fs = __webpack_require__(5747);

/**
 * Inherit `Command` from `EventEmitter.prototype`.
 */

__webpack_require__(1669).inherits(Command, EventEmitter);

/**
 * Expose the root command.
 */

exports = module.exports = new Command();

/**
 * Expose `Command`.
 */

exports.Command = Command;

/**
 * Expose `Option`.
 */

exports.Option = Option;

/**
 * Initialize a new `Option` with the given `flags` and `description`.
 *
 * @param {String} flags
 * @param {String} description
 * @api public
 */

function Option(flags, description) {
  this.flags = flags;
  this.required = flags.indexOf('<') >= 0;
  this.optional = flags.indexOf('[') >= 0;
  this.bool = flags.indexOf('-no-') === -1;
  flags = flags.split(/[ ,|]+/);
  if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();
  this.long = flags.shift();
  this.description = description || '';
}

/**
 * Return option name.
 *
 * @return {String}
 * @api private
 */

Option.prototype.name = function() {
  return this.long
    .replace('--', '')
    .replace('no-', '');
};

/**
 * Return option name, in a camelcase format that can be used
 * as a object attribute key.
 *
 * @return {String}
 * @api private
 */

Option.prototype.attributeName = function() {
  return camelcase(this.name());
};

/**
 * Check if `arg` matches the short or long flag.
 *
 * @param {String} arg
 * @return {Boolean}
 * @api private
 */

Option.prototype.is = function(arg) {
  return this.short === arg || this.long === arg;
};

/**
 * Initialize a new `Command`.
 *
 * @param {String} name
 * @api public
 */

function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = {};
  this._allowUnknownOption = false;
  this._args = [];
  this._name = name || '';
}

/**
 * Add command `name`.
 *
 * The `.action()` callback is invoked when the
 * command `name` is specified via __ARGV__,
 * and the remaining arguments are applied to the
 * function for access.
 *
 * When the `name` is "*" an un-matched command
 * will be passed as the first arg, followed by
 * the rest of __ARGV__ remaining.
 *
 * Examples:
 *
 *      program
 *        .version('0.0.1')
 *        .option('-C, --chdir <path>', 'change the working directory')
 *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
 *        .option('-T, --no-tests', 'ignore test hook')
 *
 *      program
 *        .command('setup')
 *        .description('run remote setup commands')
 *        .action(function() {
 *          console.log('setup');
 *        });
 *
 *      program
 *        .command('exec <cmd>')
 *        .description('run the given remote command')
 *        .action(function(cmd) {
 *          console.log('exec "%s"', cmd);
 *        });
 *
 *      program
 *        .command('teardown <dir> [otherDirs...]')
 *        .description('run teardown commands')
 *        .action(function(dir, otherDirs) {
 *          console.log('dir "%s"', dir);
 *          if (otherDirs) {
 *            otherDirs.forEach(function (oDir) {
 *              console.log('dir "%s"', oDir);
 *            });
 *          }
 *        });
 *
 *      program
 *        .command('*')
 *        .description('deploy the given env')
 *        .action(function(env) {
 *          console.log('deploying "%s"', env);
 *        });
 *
 *      program.parse(process.argv);
  *
 * @param {String} name
 * @param {String} [desc] for git-style sub-commands
 * @return {Command} the new command
 * @api public
 */

Command.prototype.command = function(name, desc, opts) {
  if (typeof desc === 'object' && desc !== null) {
    opts = desc;
    desc = null;
  }
  opts = opts || {};
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());

  if (desc) {
    cmd.description(desc);
    this.executables = true;
    this._execs[cmd._name] = true;
    if (opts.isDefault) this.defaultExecutable = cmd._name;
  }
  cmd._noHelp = !!opts.noHelp;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;

  if (desc) return this;
  return cmd;
};

/**
 * Define argument syntax for the top-level command.
 *
 * @api public
 */

Command.prototype.arguments = function(desc) {
  return this.parseExpectedArgs(desc.split(/ +/));
};

/**
 * Add an implicit `help [cmd]` subcommand
 * which invokes `--help` for the given command.
 *
 * @api private
 */

Command.prototype.addImplicitHelpCommand = function() {
  this.command('help [cmd]', 'display help for [cmd]');
};

/**
 * Parse expected `args`.
 *
 * For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parseExpectedArgs = function(args) {
  if (!args.length) return;
  var self = this;
  args.forEach(function(arg) {
    var argDetails = {
      required: false,
      name: '',
      variadic: false
    };

    switch (arg[0]) {
      case '<':
        argDetails.required = true;
        argDetails.name = arg.slice(1, -1);
        break;
      case '[':
        argDetails.name = arg.slice(1, -1);
        break;
    }

    if (argDetails.name.length > 3 && argDetails.name.slice(-3) === '...') {
      argDetails.variadic = true;
      argDetails.name = argDetails.name.slice(0, -3);
    }
    if (argDetails.name) {
      self._args.push(argDetails);
    }
  });
  return this;
};

/**
 * Register callback `fn` for the command.
 *
 * Examples:
 *
 *      program
 *        .command('help')
 *        .description('display verbose help')
 *        .action(function() {
 *           // output help here
 *        });
 *
 * @param {Function} fn
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.action = function(fn) {
  var self = this;
  var listener = function(args, unknown) {
    // Parse any so-far unknown options
    args = args || [];
    unknown = unknown || [];

    var parsed = self.parseOptions(unknown);

    // Output help if necessary
    outputHelpIfNecessary(self, parsed.unknown);

    // If there are still any unknown options, then we simply
    // die, unless someone asked for help, in which case we give it
    // to them, and then we die.
    if (parsed.unknown.length > 0) {
      self.unknownOption(parsed.unknown[0]);
    }

    // Leftover arguments need to be pushed back. Fixes issue #56
    if (parsed.args.length) args = parsed.args.concat(args);

    self._args.forEach(function(arg, i) {
      if (arg.required && args[i] == null) {
        self.missingArgument(arg.name);
      } else if (arg.variadic) {
        if (i !== self._args.length - 1) {
          self.variadicArgNotLast(arg.name);
        }

        args[i] = args.splice(i);
      }
    });

    // Always append ourselves to the end of the arguments,
    // to make sure we match the number of arguments the user
    // expects
    if (self._args.length) {
      args[self._args.length] = self;
    } else {
      args.push(self);
    }

    fn.apply(self, args);
  };
  var parent = this.parent || this;
  var name = parent === this ? '*' : this._name;
  parent.on('command:' + name, listener);
  if (this._alias) parent.on('command:' + this._alias, listener);
  return this;
};

/**
 * Define option with `flags`, `description` and optional
 * coercion `fn`.
 *
 * The `flags` string should contain both the short and long flags,
 * separated by comma, a pipe or space. The following are all valid
 * all will output this way when `--help` is used.
 *
 *    "-p, --pepper"
 *    "-p|--pepper"
 *    "-p --pepper"
 *
 * Examples:
 *
 *     // simple boolean defaulting to false
 *     program.option('-p, --pepper', 'add pepper');
 *
 *     --pepper
 *     program.pepper
 *     // => Boolean
 *
 *     // simple boolean defaulting to true
 *     program.option('-C, --no-cheese', 'remove cheese');
 *
 *     program.cheese
 *     // => true
 *
 *     --no-cheese
 *     program.cheese
 *     // => false
 *
 *     // required argument
 *     program.option('-C, --chdir <path>', 'change the working directory');
 *
 *     --chdir /tmp
 *     program.chdir
 *     // => "/tmp"
 *
 *     // optional argument
 *     program.option('-c, --cheese [type]', 'add cheese [marble]');
 *
 * @param {String} flags
 * @param {String} description
 * @param {Function|*} [fn] or default
 * @param {*} [defaultValue]
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.option = function(flags, description, fn, defaultValue) {
  var self = this,
    option = new Option(flags, description),
    oname = option.name(),
    name = option.attributeName();

  // default as 3rd arg
  if (typeof fn !== 'function') {
    if (fn instanceof RegExp) {
      var regex = fn;
      fn = function(val, def) {
        var m = regex.exec(val);
        return m ? m[0] : def;
      };
    } else {
      defaultValue = fn;
      fn = null;
    }
  }

  // preassign default value only for --no-*, [optional], or <required>
  if (!option.bool || option.optional || option.required) {
    // when --no-* we make sure default is true
    if (!option.bool) defaultValue = true;
    // preassign only if we have a default
    if (defaultValue !== undefined) {
      self[name] = defaultValue;
      option.defaultValue = defaultValue;
    }
  }

  // register the option
  this.options.push(option);

  // when it's passed assign the value
  // and conditionally invoke the callback
  this.on('option:' + oname, function(val) {
    // coercion
    if (val !== null && fn) {
      val = fn(val, self[name] === undefined ? defaultValue : self[name]);
    }

    // unassigned or bool
    if (typeof self[name] === 'boolean' || typeof self[name] === 'undefined') {
      // if no value, bool true, and we have a default, then use it!
      if (val == null) {
        self[name] = option.bool
          ? defaultValue || true
          : false;
      } else {
        self[name] = val;
      }
    } else if (val !== null) {
      // reassign
      self[name] = val;
    }
  });

  return this;
};

/**
 * Allow unknown options on the command line.
 *
 * @param {Boolean} arg if `true` or omitted, no error will be thrown
 * for unknown options.
 * @api public
 */
Command.prototype.allowUnknownOption = function(arg) {
  this._allowUnknownOption = arguments.length === 0 || arg;
  return this;
};

/**
 * Parse `argv`, settings options and invoking commands when defined.
 *
 * @param {Array} argv
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parse = function(argv) {
  // implicit help
  if (this.executables) this.addImplicitHelpCommand();

  // store raw args
  this.rawArgs = argv;

  // guess name
  this._name = this._name || basename(argv[1], '.js');

  // github-style sub-commands with no sub-command
  if (this.executables && argv.length < 3 && !this.defaultExecutable) {
    // this user needs help
    argv.push('--help');
  }

  // process argv
  var parsed = this.parseOptions(this.normalize(argv.slice(2)));
  var args = this.args = parsed.args;

  var result = this.parseArgs(this.args, parsed.unknown);

  // executable sub-commands
  var name = result.args[0];

  var aliasCommand = null;
  // check alias of sub commands
  if (name) {
    aliasCommand = this.commands.filter(function(command) {
      return command.alias() === name;
    })[0];
  }

  if (this._execs[name] && typeof this._execs[name] !== 'function') {
    return this.executeSubCommand(argv, args, parsed.unknown);
  } else if (aliasCommand) {
    // is alias of a subCommand
    args[0] = aliasCommand._name;
    return this.executeSubCommand(argv, args, parsed.unknown);
  } else if (this.defaultExecutable) {
    // use the default subcommand
    args.unshift(this.defaultExecutable);
    return this.executeSubCommand(argv, args, parsed.unknown);
  }

  return result;
};

/**
 * Execute a sub-command executable.
 *
 * @param {Array} argv
 * @param {Array} args
 * @param {Array} unknown
 * @api private
 */

Command.prototype.executeSubCommand = function(argv, args, unknown) {
  args = args.concat(unknown);

  if (!args.length) this.help();
  if (args[0] === 'help' && args.length === 1) this.help();

  // <cmd> --help
  if (args[0] === 'help') {
    args[0] = args[1];
    args[1] = '--help';
  }

  // executable
  var f = argv[1];
  // name of the subcommand, link `pm-install`
  var bin = basename(f, path.extname(f)) + '-' + args[0];

  // In case of globally installed, get the base dir where executable
  //  subcommand file should be located at
  var baseDir;

  var resolvedLink = fs.realpathSync(f);

  baseDir = dirname(resolvedLink);

  // prefer local `./<bin>` to bin in the $PATH
  var localBin = path.join(baseDir, bin);

  // whether bin file is a js script with explicit `.js` or `.ts` extension
  var isExplicitJS = false;
  if (exists(localBin + '.js')) {
    bin = localBin + '.js';
    isExplicitJS = true;
  } else if (exists(localBin + '.ts')) {
    bin = localBin + '.ts';
    isExplicitJS = true;
  } else if (exists(localBin)) {
    bin = localBin;
  }

  args = args.slice(1);

  var proc;
  if (process.platform !== 'win32') {
    if (isExplicitJS) {
      args.unshift(bin);
      // add executable arguments to spawn
      args = (process.execArgv || []).concat(args);

      proc = spawn(process.argv[0], args, { stdio: 'inherit', customFds: [0, 1, 2] });
    } else {
      proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] });
    }
  } else {
    args.unshift(bin);
    proc = spawn(process.execPath, args, { stdio: 'inherit' });
  }

  var signals = ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'];
  signals.forEach(function(signal) {
    process.on(signal, function() {
      if (proc.killed === false && proc.exitCode === null) {
        proc.kill(signal);
      }
    });
  });
  proc.on('close', process.exit.bind(process));
  proc.on('error', function(err) {
    if (err.code === 'ENOENT') {
      console.error('error: %s(1) does not exist, try --help', bin);
    } else if (err.code === 'EACCES') {
      console.error('error: %s(1) not executable. try chmod or run with root', bin);
    }
    process.exit(1);
  });

  // Store the reference to the child process
  this.runningCommand = proc;
};

/**
 * Normalize `args`, splitting joined short flags. For example
 * the arg "-abc" is equivalent to "-a -b -c".
 * This also normalizes equal sign and splits "--abc=def" into "--abc def".
 *
 * @param {Array} args
 * @return {Array}
 * @api private
 */

Command.prototype.normalize = function(args) {
  var ret = [],
    arg,
    lastOpt,
    index;

  for (var i = 0, len = args.length; i < len; ++i) {
    arg = args[i];
    if (i > 0) {
      lastOpt = this.optionFor(args[i - 1]);
    }

    if (arg === '--') {
      // Honor option terminator
      ret = ret.concat(args.slice(i));
      break;
    } else if (lastOpt && lastOpt.required) {
      ret.push(arg);
    } else if (arg.length > 1 && arg[0] === '-' && arg[1] !== '-') {
      arg.slice(1).split('').forEach(function(c) {
        ret.push('-' + c);
      });
    } else if (/^--/.test(arg) && ~(index = arg.indexOf('='))) {
      ret.push(arg.slice(0, index), arg.slice(index + 1));
    } else {
      ret.push(arg);
    }
  }

  return ret;
};

/**
 * Parse command `args`.
 *
 * When listener(s) are available those
 * callbacks are invoked, otherwise the "*"
 * event is emitted and those actions are invoked.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api private
 */

Command.prototype.parseArgs = function(args, unknown) {
  var name;

  if (args.length) {
    name = args[0];
    if (this.listeners('command:' + name).length) {
      this.emit('command:' + args.shift(), args, unknown);
    } else {
      this.emit('command:*', args);
    }
  } else {
    outputHelpIfNecessary(this, unknown);

    // If there were no args and we have unknown options,
    // then they are extraneous and we need to error.
    if (unknown.length > 0) {
      this.unknownOption(unknown[0]);
    }
    if (this.commands.length === 0 &&
        this._args.filter(function(a) { return a.required; }).length === 0) {
      this.emit('command:*');
    }
  }

  return this;
};

/**
 * Return an option matching `arg` if any.
 *
 * @param {String} arg
 * @return {Option}
 * @api private
 */

Command.prototype.optionFor = function(arg) {
  for (var i = 0, len = this.options.length; i < len; ++i) {
    if (this.options[i].is(arg)) {
      return this.options[i];
    }
  }
};

/**
 * Parse options from `argv` returning `argv`
 * void of these options.
 *
 * @param {Array} argv
 * @return {Array}
 * @api public
 */

Command.prototype.parseOptions = function(argv) {
  var args = [],
    len = argv.length,
    literal,
    option,
    arg;

  var unknownOptions = [];

  // parse options
  for (var i = 0; i < len; ++i) {
    arg = argv[i];

    // literal args after --
    if (literal) {
      args.push(arg);
      continue;
    }

    if (arg === '--') {
      literal = true;
      continue;
    }

    // find matching Option
    option = this.optionFor(arg);

    // option is defined
    if (option) {
      // requires arg
      if (option.required) {
        arg = argv[++i];
        if (arg == null) return this.optionMissingArgument(option);
        this.emit('option:' + option.name(), arg);
      // optional arg
      } else if (option.optional) {
        arg = argv[i + 1];
        if (arg == null || (arg[0] === '-' && arg !== '-')) {
          arg = null;
        } else {
          ++i;
        }
        this.emit('option:' + option.name(), arg);
      // bool
      } else {
        this.emit('option:' + option.name());
      }
      continue;
    }

    // looks like an option
    if (arg.length > 1 && arg[0] === '-') {
      unknownOptions.push(arg);

      // If the next argument looks like it might be
      // an argument for this option, we pass it on.
      // If it isn't, then it'll simply be ignored
      if ((i + 1) < argv.length && argv[i + 1][0] !== '-') {
        unknownOptions.push(argv[++i]);
      }
      continue;
    }

    // arg
    args.push(arg);
  }

  return { args: args, unknown: unknownOptions };
};

/**
 * Return an object containing options as key-value pairs
 *
 * @return {Object}
 * @api public
 */
Command.prototype.opts = function() {
  var result = {},
    len = this.options.length;

  for (var i = 0; i < len; i++) {
    var key = this.options[i].attributeName();
    result[key] = key === this._versionOptionName ? this._version : this[key];
  }
  return result;
};

/**
 * Argument `name` is missing.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.missingArgument = function(name) {
  console.error("error: missing required argument `%s'", name);
  process.exit(1);
};

/**
 * `Option` is missing an argument, but received `flag` or nothing.
 *
 * @param {String} option
 * @param {String} flag
 * @api private
 */

Command.prototype.optionMissingArgument = function(option, flag) {
  if (flag) {
    console.error("error: option `%s' argument missing, got `%s'", option.flags, flag);
  } else {
    console.error("error: option `%s' argument missing", option.flags);
  }
  process.exit(1);
};

/**
 * Unknown option `flag`.
 *
 * @param {String} flag
 * @api private
 */

Command.prototype.unknownOption = function(flag) {
  if (this._allowUnknownOption) return;
  console.error("error: unknown option `%s'", flag);
  process.exit(1);
};

/**
 * Variadic argument with `name` is not the last argument as required.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.variadicArgNotLast = function(name) {
  console.error("error: variadic arguments must be last `%s'", name);
  process.exit(1);
};

/**
 * Set the program version to `str`.
 *
 * This method auto-registers the "-V, --version" flag
 * which will print the version number when passed.
 *
 * @param {String} str
 * @param {String} [flags]
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.version = function(str, flags) {
  if (arguments.length === 0) return this._version;
  this._version = str;
  flags = flags || '-V, --version';
  var versionOption = new Option(flags, 'output the version number');
  this._versionOptionName = versionOption.long.substr(2) || 'version';
  this.options.push(versionOption);
  this.on('option:' + this._versionOptionName, function() {
    process.stdout.write(str + '\n');
    process.exit(0);
  });
  return this;
};

/**
 * Set the description to `str`.
 *
 * @param {String} str
 * @param {Object} argsDescription
 * @return {String|Command}
 * @api public
 */

Command.prototype.description = function(str, argsDescription) {
  if (arguments.length === 0) return this._description;
  this._description = str;
  this._argsDescription = argsDescription;
  return this;
};

/**
 * Set an alias for the command
 *
 * @param {String} alias
 * @return {String|Command}
 * @api public
 */

Command.prototype.alias = function(alias) {
  var command = this;
  if (this.commands.length !== 0) {
    command = this.commands[this.commands.length - 1];
  }

  if (arguments.length === 0) return command._alias;

  if (alias === command._name) throw new Error('Command alias can\'t be the same as its name');

  command._alias = alias;
  return this;
};

/**
 * Set / get the command usage `str`.
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.usage = function(str) {
  var args = this._args.map(function(arg) {
    return humanReadableArgName(arg);
  });

  var usage = '[options]' +
    (this.commands.length ? ' [command]' : '') +
    (this._args.length ? ' ' + args.join(' ') : '');

  if (arguments.length === 0) return this._usage || usage;
  this._usage = str;

  return this;
};

/**
 * Get or set the name of the command
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.name = function(str) {
  if (arguments.length === 0) return this._name;
  this._name = str;
  return this;
};

/**
 * Return prepared commands.
 *
 * @return {Array}
 * @api private
 */

Command.prototype.prepareCommands = function() {
  return this.commands.filter(function(cmd) {
    return !cmd._noHelp;
  }).map(function(cmd) {
    var args = cmd._args.map(function(arg) {
      return humanReadableArgName(arg);
    }).join(' ');

    return [
      cmd._name +
        (cmd._alias ? '|' + cmd._alias : '') +
        (cmd.options.length ? ' [options]' : '') +
        (args ? ' ' + args : ''),
      cmd._description
    ];
  });
};

/**
 * Return the largest command length.
 *
 * @return {Number}
 * @api private
 */

Command.prototype.largestCommandLength = function() {
  var commands = this.prepareCommands();
  return commands.reduce(function(max, command) {
    return Math.max(max, command[0].length);
  }, 0);
};

/**
 * Return the largest option length.
 *
 * @return {Number}
 * @api private
 */

Command.prototype.largestOptionLength = function() {
  var options = [].slice.call(this.options);
  options.push({
    flags: '-h, --help'
  });
  return options.reduce(function(max, option) {
    return Math.max(max, option.flags.length);
  }, 0);
};

/**
 * Return the largest arg length.
 *
 * @return {Number}
 * @api private
 */

Command.prototype.largestArgLength = function() {
  return this._args.reduce(function(max, arg) {
    return Math.max(max, arg.name.length);
  }, 0);
};

/**
 * Return the pad width.
 *
 * @return {Number}
 * @api private
 */

Command.prototype.padWidth = function() {
  var width = this.largestOptionLength();
  if (this._argsDescription && this._args.length) {
    if (this.largestArgLength() > width) {
      width = this.largestArgLength();
    }
  }

  if (this.commands && this.commands.length) {
    if (this.largestCommandLength() > width) {
      width = this.largestCommandLength();
    }
  }

  return width;
};

/**
 * Return help for options.
 *
 * @return {String}
 * @api private
 */

Command.prototype.optionHelp = function() {
  var width = this.padWidth();

  // Append the help information
  return this.options.map(function(option) {
    return pad(option.flags, width) + '  ' + option.description +
      ((option.bool && option.defaultValue !== undefined) ? ' (default: ' + JSON.stringify(option.defaultValue) + ')' : '');
  }).concat([pad('-h, --help', width) + '  ' + 'output usage information'])
    .join('\n');
};

/**
 * Return command help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.commandHelp = function() {
  if (!this.commands.length) return '';

  var commands = this.prepareCommands();
  var width = this.padWidth();

  return [
    'Commands:',
    commands.map(function(cmd) {
      var desc = cmd[1] ? '  ' + cmd[1] : '';
      return (desc ? pad(cmd[0], width) : cmd[0]) + desc;
    }).join('\n').replace(/^/gm, '  '),
    ''
  ].join('\n');
};

/**
 * Return program help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.helpInformation = function() {
  var desc = [];
  if (this._description) {
    desc = [
      this._description,
      ''
    ];

    var argsDescription = this._argsDescription;
    if (argsDescription && this._args.length) {
      var width = this.padWidth();
      desc.push('Arguments:');
      desc.push('');
      this._args.forEach(function(arg) {
        desc.push('  ' + pad(arg.name, width) + '  ' + argsDescription[arg.name]);
      });
      desc.push('');
    }
  }

  var cmdName = this._name;
  if (this._alias) {
    cmdName = cmdName + '|' + this._alias;
  }
  var usage = [
    'Usage: ' + cmdName + ' ' + this.usage(),
    ''
  ];

  var cmds = [];
  var commandHelp = this.commandHelp();
  if (commandHelp) cmds = [commandHelp];

  var options = [
    'Options:',
    '' + this.optionHelp().replace(/^/gm, '  '),
    ''
  ];

  return usage
    .concat(desc)
    .concat(options)
    .concat(cmds)
    .join('\n');
};

/**
 * Output help information for this command
 *
 * @api public
 */

Command.prototype.outputHelp = function(cb) {
  if (!cb) {
    cb = function(passthru) {
      return passthru;
    };
  }
  process.stdout.write(cb(this.helpInformation()));
  this.emit('--help');
};

/**
 * Output help information and exit.
 *
 * @api public
 */

Command.prototype.help = function(cb) {
  this.outputHelp(cb);
  process.exit();
};

/**
 * Camel-case the given `flag`
 *
 * @param {String} flag
 * @return {String}
 * @api private
 */

function camelcase(flag) {
  return flag.split('-').reduce(function(str, word) {
    return str + word[0].toUpperCase() + word.slice(1);
  });
}

/**
 * Pad `str` to `width`.
 *
 * @param {String} str
 * @param {Number} width
 * @return {String}
 * @api private
 */

function pad(str, width) {
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
}

/**
 * Output help information if necessary
 *
 * @param {Command} command to output help for
 * @param {Array} array of options to search for -h or --help
 * @api private
 */

function outputHelpIfNecessary(cmd, options) {
  options = options || [];
  for (var i = 0; i < options.length; i++) {
    if (options[i] === '--help' || options[i] === '-h') {
      cmd.outputHelp();
      process.exit(0);
    }
  }
}

/**
 * Takes an argument an returns its human readable equivalent for help usage.
 *
 * @param {Object} arg
 * @return {String}
 * @api private
 */

function humanReadableArgName(arg) {
  var nameOutput = arg.name + (arg.variadic === true ? '...' : '');

  return arg.required
    ? '<' + nameOutput + '>'
    : '[' + nameOutput + ']';
}

// for versions before node v0.8 when there weren't `fs.existsSync`
function exists(file) {
  try {
    if (fs.statSync(file).isFile()) {
      return true;
    }
  } catch (e) {
    return false;
  }
}


/***/ }),

/***/ 6891:
/***/ ((module) => {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 2746:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const cp = __webpack_require__(3129);
const parse = __webpack_require__(6855);
const enoent = __webpack_require__(4101);

function spawn(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);

    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);

    return spawned;
}

function spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);

    return result;
}

module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;

module.exports._parse = parse;
module.exports._enoent = enoent;


/***/ }),

/***/ 4101:
/***/ ((module) => {

"use strict";


const isWin = process.platform === 'win32';

function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args,
    });
}

function hookChildProcess(cp, parsed) {
    if (!isWin) {
        return;
    }

    const originalEmit = cp.emit;

    cp.emit = function (name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === 'exit') {
            const err = verifyENOENT(arg1, parsed, 'spawn');

            if (err) {
                return originalEmit.call(cp, 'error', err);
            }
        }

        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}

function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn');
    }

    return null;
}

function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync');
    }

    return null;
}

module.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError,
};


/***/ }),

/***/ 6855:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(5622);
const niceTry = __webpack_require__(8560);
const resolveCommand = __webpack_require__(7274);
const escape = __webpack_require__(4274);
const readShebang = __webpack_require__(1252);
const semver = __webpack_require__(5911);

const isWin = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

// `options.shell` is supported in Node ^4.8.0, ^5.7.0 and >= 6.0.0
const supportsShellOption = niceTry(() => semver.satisfies(process.version, '^4.8.0 || ^5.7.0 || >= 6.0.0', true)) || false;

function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);

    const shebang = parsed.file && readShebang(parsed.file);

    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;

        return resolveCommand(parsed);
    }

    return parsed.file;
}

function parseNonShell(parsed) {
    if (!isWin) {
        return parsed;
    }

    // Detect & add support for shebangs
    const commandFile = detectShebang(parsed);

    // We don't need a shell if the command filename is an executable
    const needsShell = !isExecutableRegExp.test(commandFile);

    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);

        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = path.normalize(parsed.command);

        // Escape command & arguments
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));

        const shellCommand = [parsed.command].concat(parsed.args).join(' ');

        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.command = process.env.comspec || 'cmd.exe';
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }

    return parsed;
}

function parseShell(parsed) {
    // If node supports the shell option, there's no need to mimic its behavior
    if (supportsShellOption) {
        return parsed;
    }

    // Mimic node shell option
    // See https://github.com/nodejs/node/blob/b9f6a2dc059a1062776133f3d4fd848c4da7d150/lib/child_process.js#L335
    const shellCommand = [parsed.command].concat(parsed.args).join(' ');

    if (isWin) {
        parsed.command = typeof parsed.options.shell === 'string' ? parsed.options.shell : process.env.comspec || 'cmd.exe';
        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    } else {
        if (typeof parsed.options.shell === 'string') {
            parsed.command = parsed.options.shell;
        } else if (process.platform === 'android') {
            parsed.command = '/system/bin/sh';
        } else {
            parsed.command = '/bin/sh';
        }

        parsed.args = ['-c', shellCommand];
    }

    return parsed;
}

function parse(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }

    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original

    // Build our parsed object
    const parsed = {
        command,
        args,
        options,
        file: undefined,
        original: {
            command,
            args,
        },
    };

    // Delegate further parsing to shell or non-shell
    return options.shell ? parseShell(parsed) : parseNonShell(parsed);
}

module.exports = parse;


/***/ }),

/***/ 4274:
/***/ ((module) => {

"use strict";


// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;

function escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    return arg;
}

function escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;

    // Algorithm below is based on https://qntm.org/cmd

    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');

    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, '$1$1');

    // All other backslashes occur literally

    // Quote the whole thing:
    arg = `"${arg}"`;

    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1');
    }

    return arg;
}

module.exports.command = escapeCommand;
module.exports.argument = escapeArgument;


/***/ }),

/***/ 1252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const fs = __webpack_require__(5747);
const shebangCommand = __webpack_require__(7032);

function readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    let buffer;

    if (Buffer.alloc) {
        // Node.js v4.5+ / v5.10+
        buffer = Buffer.alloc(size);
    } else {
        // Old Node.js API
        buffer = new Buffer(size);
        buffer.fill(0); // zero-fill
    }

    let fd;

    try {
        fd = fs.openSync(command, 'r');
        fs.readSync(fd, buffer, 0, size, 0);
        fs.closeSync(fd);
    } catch (e) { /* Empty */ }

    // Attempt to extract shebang (null is returned if not a shebang)
    return shebangCommand(buffer.toString());
}

module.exports = readShebang;


/***/ }),

/***/ 7274:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const path = __webpack_require__(5622);
const which = __webpack_require__(4207);
const pathKey = __webpack_require__(539)();

function resolveCommandAttempt(parsed, withoutPathExt) {
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;

    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (hasCustomCwd) {
        try {
            process.chdir(parsed.options.cwd);
        } catch (err) {
            /* Empty */
        }
    }

    let resolved;

    try {
        resolved = which.sync(parsed.command, {
            path: (parsed.options.env || process.env)[pathKey],
            pathExt: withoutPathExt ? path.delimiter : undefined,
        });
    } catch (e) {
        /* Empty */
    } finally {
        process.chdir(cwd);
    }

    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }

    return resolved;
}

function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}

module.exports = resolveCommand;


/***/ }),

/***/ 2391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {
	pipeline: streamPipeline,
	PassThrough: PassThroughStream
} = __webpack_require__(2413);
const zlib = __webpack_require__(8761);
const mimicResponse = __webpack_require__(2610);

const decompressResponse = response => {
	const contentEncoding = (response.headers['content-encoding'] || '').toLowerCase();

	if (!['gzip', 'deflate', 'br'].includes(contentEncoding)) {
		return response;
	}

	// TODO: Remove this when targeting Node.js 12.
	const isBrotli = contentEncoding === 'br';
	if (isBrotli && typeof zlib.createBrotliDecompress !== 'function') {
		return response;
	}

	const decompress = isBrotli ? zlib.createBrotliDecompress() : zlib.createUnzip();
	const stream = new PassThroughStream();

	decompress.on('error', error => {
		// Ignore empty response
		if (error.code === 'Z_BUF_ERROR') {
			stream.end();
			return;
		}

		stream.emit('error', error);
	});

	const finalStream = streamPipeline(response, decompress, stream, () => {});

	mimicResponse(response, finalStream);

	return finalStream;
};

module.exports = decompressResponse;


/***/ }),

/***/ 1705:
/***/ ((module) => {

"use strict";
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



function isSpecificValue(val) {
	return (
		val instanceof Buffer
		|| val instanceof Date
		|| val instanceof RegExp
	) ? true : false;
}

function cloneSpecificValue(val) {
	if (val instanceof Buffer) {
		var x = Buffer.alloc
			? Buffer.alloc(val.length)
			: new Buffer(val.length);
		val.copy(x);
		return x;
	} else if (val instanceof Date) {
		return new Date(val.getTime());
	} else if (val instanceof RegExp) {
		return new RegExp(val);
	} else {
		throw new Error('Unexpected situation');
	}
}

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
	var clone = [];
	arr.forEach(function (item, index) {
		if (typeof item === 'object' && item !== null) {
			if (Array.isArray(item)) {
				clone[index] = deepCloneArray(item);
			} else if (isSpecificValue(item)) {
				clone[index] = cloneSpecificValue(item);
			} else {
				clone[index] = deepExtend({}, item);
			}
		} else {
			clone[index] = item;
		}
	});
	return clone;
}

function safeGetProperty(object, property) {
	return property === '__proto__' ? undefined : object[property];
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = module.exports = function (/*obj_1, [obj_2], [obj_N]*/) {
	if (arguments.length < 1 || typeof arguments[0] !== 'object') {
		return false;
	}

	if (arguments.length < 2) {
		return arguments[0];
	}

	var target = arguments[0];

	// convert arguments to array and cut off target object
	var args = Array.prototype.slice.call(arguments, 1);

	var val, src, clone;

	args.forEach(function (obj) {
		// skip argument if isn't an object, is null, or is an array
		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			return;
		}

		Object.keys(obj).forEach(function (key) {
			src = safeGetProperty(target, key); // source value
			val = safeGetProperty(obj, key); // new value

			// recursion prevention
			if (val === target) {
				return;

			/**
			 * if new value isn't object then just overwrite by new value
			 * instead of extending.
			 */
			} else if (typeof val !== 'object' || val === null) {
				target[key] = val;
				return;

			// just clone arrays (and recursive clone objects inside)
			} else if (Array.isArray(val)) {
				target[key] = deepCloneArray(val);
				return;

			// custom cloning and overwrite for specific objects
			} else if (isSpecificValue(val)) {
				target[key] = cloneSpecificValue(val);
				return;

			// overwrite by new value if source isn't object or array
			} else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
				target[key] = deepExtend({}, val);
				return;

			// source value and new value is objects both, extending...
			} else {
				target[key] = deepExtend(src, val);
				return;
			}
		});
	});

	return target;
};


/***/ }),

/***/ 6214:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function isTLSSocket(socket) {
    return socket.encrypted;
}
const deferToConnect = (socket, fn) => {
    let listeners;
    if (typeof fn === 'function') {
        const connect = fn;
        listeners = { connect };
    }
    else {
        listeners = fn;
    }
    const hasConnectListener = typeof listeners.connect === 'function';
    const hasSecureConnectListener = typeof listeners.secureConnect === 'function';
    const hasCloseListener = typeof listeners.close === 'function';
    const onConnect = () => {
        if (hasConnectListener) {
            listeners.connect();
        }
        if (isTLSSocket(socket) && hasSecureConnectListener) {
            if (socket.authorized) {
                listeners.secureConnect();
            }
            else if (!socket.authorizationError) {
                socket.once('secureConnect', listeners.secureConnect);
            }
        }
        if (hasCloseListener) {
            socket.once('close', listeners.close);
        }
    };
    if (socket.writable && !socket.connecting) {
        onConnect();
    }
    else if (socket.connecting) {
        socket.once('connect', onConnect);
    }
    else if (socket.destroyed && hasCloseListener) {
        listeners.close(socket._hadError);
    }
};
exports.default = deferToConnect;
// For CommonJS default export support
module.exports = deferToConnect;
module.exports.default = deferToConnect;


/***/ }),

/***/ 7994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var stream = __webpack_require__(2413);

function DuplexWrapper(options, writable, readable) {
  if (typeof readable === "undefined") {
    readable = writable;
    writable = options;
    options = null;
  }

  stream.Duplex.call(this, options);

  if (typeof readable.read !== "function") {
    readable = (new stream.Readable(options)).wrap(readable);
  }

  this._writable = writable;
  this._readable = readable;
  this._waiting = false;

  var self = this;

  writable.once("finish", function() {
    self.end();
  });

  this.once("finish", function() {
    writable.end();
  });

  readable.on("readable", function() {
    if (self._waiting) {
      self._waiting = false;
      self._read();
    }
  });

  readable.once("end", function() {
    self.push(null);
  });

  if (!options || typeof options.bubbleErrors === "undefined" || options.bubbleErrors) {
    writable.on("error", function(err) {
      self.emit("error", err);
    });

    readable.on("error", function(err) {
      self.emit("error", err);
    });
  }
}

DuplexWrapper.prototype = Object.create(stream.Duplex.prototype, {constructor: {value: DuplexWrapper}});

DuplexWrapper.prototype._write = function _write(input, encoding, done) {
  this._writable.write(input, encoding, done);
};

DuplexWrapper.prototype._read = function _read() {
  var buf;
  var reads = 0;
  while ((buf = this._readable.read()) !== null) {
    this.push(buf);
    reads++;
  }
  if (reads === 0) {
    this._waiting = true;
  }
};

module.exports = function duplex2(options, writable, readable) {
  return new DuplexWrapper(options, writable, readable);
};

module.exports.DuplexWrapper = DuplexWrapper;


/***/ }),

/***/ 1205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var once = __webpack_require__(1223);

var noop = function() {};

var isRequest = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once(callback || noop);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled = false;

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror = function(err) {
		callback.call(stream, err);
	};

	var onclose = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

module.exports = eos;


/***/ }),

/***/ 8691:
/***/ ((module) => {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),

/***/ 7714:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const MiniPass = __webpack_require__(1077)
const EE = __webpack_require__(8614).EventEmitter
const fs = __webpack_require__(5747)

// for writev
const binding = process.binding('fs')
const writeBuffers = binding.writeBuffers
/* istanbul ignore next */
const FSReqWrap = binding.FSReqWrap || binding.FSReqCallback

const _autoClose = Symbol('_autoClose')
const _close = Symbol('_close')
const _ended = Symbol('_ended')
const _fd = Symbol('_fd')
const _finished = Symbol('_finished')
const _flags = Symbol('_flags')
const _flush = Symbol('_flush')
const _handleChunk = Symbol('_handleChunk')
const _makeBuf = Symbol('_makeBuf')
const _mode = Symbol('_mode')
const _needDrain = Symbol('_needDrain')
const _onerror = Symbol('_onerror')
const _onopen = Symbol('_onopen')
const _onread = Symbol('_onread')
const _onwrite = Symbol('_onwrite')
const _open = Symbol('_open')
const _path = Symbol('_path')
const _pos = Symbol('_pos')
const _queue = Symbol('_queue')
const _read = Symbol('_read')
const _readSize = Symbol('_readSize')
const _reading = Symbol('_reading')
const _remain = Symbol('_remain')
const _size = Symbol('_size')
const _write = Symbol('_write')
const _writing = Symbol('_writing')
const _defaultFlag = Symbol('_defaultFlag')

class ReadStream extends MiniPass {
  constructor (path, opt) {
    opt = opt || {}
    super(opt)

    this.writable = false

    if (typeof path !== 'string')
      throw new TypeError('path must be a string')

    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null
    this[_path] = path
    this[_readSize] = opt.readSize || 16*1024*1024
    this[_reading] = false
    this[_size] = typeof opt.size === 'number' ? opt.size : Infinity
    this[_remain] = this[_size]
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true

    if (typeof this[_fd] === 'number')
      this[_read]()
    else
      this[_open]()
  }

  get fd () { return this[_fd] }
  get path () { return this[_path] }

  write () {
    throw new TypeError('this is a readable stream')
  }

  end () {
    throw new TypeError('this is a readable stream')
  }

  [_open] () {
    fs.open(this[_path], 'r', (er, fd) => this[_onopen](er, fd))
  }

  [_onopen] (er, fd) {
    if (er)
      this[_onerror](er)
    else {
      this[_fd] = fd
      this.emit('open', fd)
      this[_read]()
    }
  }

  [_makeBuf] () {
    return Buffer.allocUnsafe(Math.min(this[_readSize], this[_remain]))
  }

  [_read] () {
    if (!this[_reading]) {
      this[_reading] = true
      const buf = this[_makeBuf]()
      /* istanbul ignore if */
      if (buf.length === 0) return process.nextTick(() => this[_onread](null, 0, buf))
      fs.read(this[_fd], buf, 0, buf.length, null, (er, br, buf) =>
        this[_onread](er, br, buf))
    }
  }

  [_onread] (er, br, buf) {
    this[_reading] = false
    if (er)
      this[_onerror](er)
    else if (this[_handleChunk](br, buf))
      this[_read]()
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      fs.close(this[_fd], _ => this.emit('close'))
      this[_fd] = null
    }
  }

  [_onerror] (er) {
    this[_reading] = true
    this[_close]()
    this.emit('error', er)
  }

  [_handleChunk] (br, buf) {
    let ret = false
    // no effect if infinite
    this[_remain] -= br
    if (br > 0)
      ret = super.write(br < buf.length ? buf.slice(0, br) : buf)

    if (br === 0 || this[_remain] <= 0) {
      ret = false
      this[_close]()
      super.end()
    }

    return ret
  }

  emit (ev, data) {
    switch (ev) {
      case 'prefinish':
      case 'finish':
        break

      case 'drain':
        if (typeof this[_fd] === 'number')
          this[_read]()
        break

      default:
        return super.emit(ev, data)
    }
  }
}

class ReadStreamSync extends ReadStream {
  [_open] () {
    let threw = true
    try {
      this[_onopen](null, fs.openSync(this[_path], 'r'))
      threw = false
    } finally {
      if (threw)
        this[_close]()
    }
  }

  [_read] () {
    let threw = true
    try {
      if (!this[_reading]) {
        this[_reading] = true
        do {
          const buf = this[_makeBuf]()
          /* istanbul ignore next */
          const br = buf.length === 0 ? 0 : fs.readSync(this[_fd], buf, 0, buf.length, null)
          if (!this[_handleChunk](br, buf))
            break
        } while (true)
        this[_reading] = false
      }
      threw = false
    } finally {
      if (threw)
        this[_close]()
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      try {
        fs.closeSync(this[_fd])
      } catch (er) {}
      this[_fd] = null
      this.emit('close')
    }
  }
}

class WriteStream extends EE {
  constructor (path, opt) {
    opt = opt || {}
    super(opt)
    this.readable = false
    this[_writing] = false
    this[_ended] = false
    this[_needDrain] = false
    this[_queue] = []
    this[_path] = path
    this[_fd] = typeof opt.fd === 'number' ? opt.fd : null
    this[_mode] = opt.mode === undefined ? 0o666 : opt.mode
    this[_pos] = typeof opt.start === 'number' ? opt.start : null
    this[_autoClose] = typeof opt.autoClose === 'boolean' ?
      opt.autoClose : true

    // truncating makes no sense when writing into the middle
    const defaultFlag = this[_pos] !== null ? 'r+' : 'w'
    this[_defaultFlag] = opt.flags === undefined
    this[_flags] = this[_defaultFlag] ? defaultFlag : opt.flags

    if (this[_fd] === null)
      this[_open]()
  }

  get fd () { return this[_fd] }
  get path () { return this[_path] }

  [_onerror] (er) {
    this[_close]()
    this[_writing] = true
    this.emit('error', er)
  }

  [_open] () {
    fs.open(this[_path], this[_flags], this[_mode],
      (er, fd) => this[_onopen](er, fd))
  }

  [_onopen] (er, fd) {
    if (this[_defaultFlag] &&
        this[_flags] === 'r+' &&
        er && er.code === 'ENOENT') {
      this[_flags] = 'w'
      this[_open]()
    } else if (er)
      this[_onerror](er)
    else {
      this[_fd] = fd
      this.emit('open', fd)
      this[_flush]()
    }
  }

  end (buf, enc) {
    if (buf)
      this.write(buf, enc)

    this[_ended] = true

    // synthetic after-write logic, where drain/finish live
    if (!this[_writing] && !this[_queue].length &&
        typeof this[_fd] === 'number')
      this[_onwrite](null, 0)
  }

  write (buf, enc) {
    if (typeof buf === 'string')
      buf = new Buffer(buf, enc)

    if (this[_ended]) {
      this.emit('error', new Error('write() after end()'))
      return false
    }

    if (this[_fd] === null || this[_writing] || this[_queue].length) {
      this[_queue].push(buf)
      this[_needDrain] = true
      return false
    }

    this[_writing] = true
    this[_write](buf)
    return true
  }

  [_write] (buf) {
    fs.write(this[_fd], buf, 0, buf.length, this[_pos], (er, bw) =>
      this[_onwrite](er, bw))
  }

  [_onwrite] (er, bw) {
    if (er)
      this[_onerror](er)
    else {
      if (this[_pos] !== null)
        this[_pos] += bw
      if (this[_queue].length)
        this[_flush]()
      else {
        this[_writing] = false

        if (this[_ended] && !this[_finished]) {
          this[_finished] = true
          this[_close]()
          this.emit('finish')
        } else if (this[_needDrain]) {
          this[_needDrain] = false
          this.emit('drain')
        }
      }
    }
  }

  [_flush] () {
    if (this[_queue].length === 0) {
      if (this[_ended])
        this[_onwrite](null, 0)
    } else if (this[_queue].length === 1)
      this[_write](this[_queue].pop())
    else {
      const iovec = this[_queue]
      this[_queue] = []
      writev(this[_fd], iovec, this[_pos],
        (er, bw) => this[_onwrite](er, bw))
    }
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      fs.close(this[_fd], _ => this.emit('close'))
      this[_fd] = null
    }
  }
}

class WriteStreamSync extends WriteStream {
  [_open] () {
    let fd
    try {
      fd = fs.openSync(this[_path], this[_flags], this[_mode])
    } catch (er) {
      if (this[_defaultFlag] &&
          this[_flags] === 'r+' &&
          er && er.code === 'ENOENT') {
        this[_flags] = 'w'
        return this[_open]()
      } else
        throw er
    }
    this[_onopen](null, fd)
  }

  [_close] () {
    if (this[_autoClose] && typeof this[_fd] === 'number') {
      try {
        fs.closeSync(this[_fd])
      } catch (er) {}
      this[_fd] = null
      this.emit('close')
    }
  }

  [_write] (buf) {
    try {
      this[_onwrite](null,
        fs.writeSync(this[_fd], buf, 0, buf.length, this[_pos]))
    } catch (er) {
      this[_onwrite](er, 0)
    }
  }
}

const writev = (fd, iovec, pos, cb) => {
  const done = (er, bw) => cb(er, bw, iovec)
  const req = new FSReqWrap()
  req.oncomplete = done
  binding.writeBuffers(fd, iovec, pos, req)
}

exports.ReadStream = ReadStream
exports.ReadStreamSync = ReadStreamSync

exports.WriteStream = WriteStream
exports.WriteStreamSync = WriteStreamSync


/***/ }),

/***/ 6863:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(5747)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(1734)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),

/***/ 1734:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(5622);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(5747);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),

/***/ 1585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {PassThrough: PassThroughStream} = __webpack_require__(2413);

module.exports = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};


/***/ }),

/***/ 1766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {constants: BufferConstants} = __webpack_require__(4293);
const pump = __webpack_require__(8341);
const bufferStream = __webpack_require__(1585);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;

	let stream;
	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		stream = pump(inputStream, bufferStream(options), error => {
			if (error) {
				rejectPromise(error);
				return;
			}

			resolve();
		});

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

module.exports = getStream;
// TODO: Remove this for the next major release
module.exports.default = getStream;
module.exports.buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
module.exports.array = (stream, options) => getStream(stream, {...options, array: true});
module.exports.MaxBufferError = MaxBufferError;


/***/ }),

/***/ 7625:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var fs = __webpack_require__(5747)
var path = __webpack_require__(5622)
var minimatch = __webpack_require__(3973)
var isAbsolute = __webpack_require__(8714)
var Minimatch = minimatch.Minimatch

function alphasort (a, b) {
  return a.localeCompare(b, 'en')
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute
  self.fs = options.fs || fs

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),

/***/ 1957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var rp = __webpack_require__(6863)
var minimatch = __webpack_require__(3973)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(4124)
var EE = __webpack_require__(8614).EventEmitter
var path = __webpack_require__(5622)
var assert = __webpack_require__(2357)
var isAbsolute = __webpack_require__(8714)
var globSync = __webpack_require__(9010)
var common = __webpack_require__(7625)
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(2492)
var util = __webpack_require__(1669)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(1223)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    self.fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  self.fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    self.fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return self.fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),

/***/ 9010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = globSync
globSync.GlobSync = GlobSync

var rp = __webpack_require__(6863)
var minimatch = __webpack_require__(3973)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(1957).Glob
var util = __webpack_require__(1669)
var path = __webpack_require__(5622)
var assert = __webpack_require__(2357)
var isAbsolute = __webpack_require__(8714)
var common = __webpack_require__(7625)
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = this.fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, this.fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = this.fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = this.fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),

/***/ 5436:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const EventEmitter = __webpack_require__(8614);
const getStream = __webpack_require__(1766);
const PCancelable = __webpack_require__(9072);
const is_1 = __webpack_require__(7678);
const errors_1 = __webpack_require__(6312);
const normalize_arguments_1 = __webpack_require__(6210);
const request_as_event_emitter_1 = __webpack_require__(1569);
const parseBody = (body, responseType, encoding) => {
    if (responseType === 'json') {
        return body.length === 0 ? '' : JSON.parse(body.toString());
    }
    if (responseType === 'buffer') {
        return Buffer.from(body);
    }
    if (responseType === 'text') {
        return body.toString(encoding);
    }
    throw new TypeError(`Unknown body type '${responseType}'`);
};
function createRejection(error) {
    const promise = Promise.reject(error);
    const returnPromise = () => promise;
    promise.json = returnPromise;
    promise.text = returnPromise;
    promise.buffer = returnPromise;
    promise.on = returnPromise;
    return promise;
}
exports.createRejection = createRejection;
function asPromise(options) {
    const proxy = new EventEmitter();
    let body;
    const promise = new PCancelable((resolve, reject, onCancel) => {
        const emitter = request_as_event_emitter_1.default(options);
        onCancel(emitter.abort);
        const emitError = async (error) => {
            try {
                for (const hook of options.hooks.beforeError) {
                    // eslint-disable-next-line no-await-in-loop
                    error = await hook(error);
                }
                reject(error);
            }
            catch (error_) {
                reject(error_);
            }
        };
        emitter.on('response', async (response) => {
            var _a;
            proxy.emit('response', response);
            // Download body
            try {
                body = await getStream.buffer(response, { encoding: 'binary' });
            }
            catch (error) {
                emitError(new errors_1.ReadError(error, options));
                return;
            }
            if ((_a = response.req) === null || _a === void 0 ? void 0 : _a.aborted) {
                // Canceled while downloading - will throw a `CancelError` or `TimeoutError` error
                return;
            }
            const isOk = () => {
                const { statusCode } = response;
                const limitStatusCode = options.followRedirect ? 299 : 399;
                return (statusCode >= 200 && statusCode <= limitStatusCode) || statusCode === 304;
            };
            // Parse body
            try {
                response.body = parseBody(body, options.responseType, options.encoding);
            }
            catch (error) {
                // Fall back to `utf8`
                response.body = body.toString();
                if (isOk()) {
                    const parseError = new errors_1.ParseError(error, response, options);
                    emitError(parseError);
                    return;
                }
            }
            try {
                for (const [index, hook] of options.hooks.afterResponse.entries()) {
                    // @ts-ignore TS doesn't notice that CancelableRequest is a Promise
                    // eslint-disable-next-line no-await-in-loop
                    response = await hook(response, async (updatedOptions) => {
                        const typedOptions = normalize_arguments_1.normalizeArguments(normalize_arguments_1.mergeOptions(options, {
                            ...updatedOptions,
                            retry: {
                                calculateDelay: () => 0
                            },
                            throwHttpErrors: false,
                            resolveBodyOnly: false
                        }));
                        // Remove any further hooks for that request, because we'll call them anyway.
                        // The loop continues. We don't want duplicates (asPromise recursion).
                        typedOptions.hooks.afterResponse = options.hooks.afterResponse.slice(0, index);
                        for (const hook of options.hooks.beforeRetry) {
                            // eslint-disable-next-line no-await-in-loop
                            await hook(typedOptions);
                        }
                        const promise = asPromise(typedOptions);
                        onCancel(() => {
                            promise.catch(() => { });
                            promise.cancel();
                        });
                        return promise;
                    });
                }
            }
            catch (error) {
                emitError(error);
                return;
            }
            // Check for HTTP error codes
            if (!isOk()) {
                const error = new errors_1.HTTPError(response, options);
                if (emitter.retry(error)) {
                    return;
                }
                if (options.throwHttpErrors) {
                    emitError(error);
                    return;
                }
            }
            resolve(options.resolveBodyOnly ? response.body : response);
        });
        emitter.once('error', reject);
        request_as_event_emitter_1.proxyEvents(proxy, emitter);
    });
    promise.on = (name, fn) => {
        proxy.on(name, fn);
        return promise;
    };
    const shortcut = (responseType) => {
        // eslint-disable-next-line promise/prefer-await-to-then
        const newPromise = promise.then(() => parseBody(body, responseType, options.encoding));
        Object.defineProperties(newPromise, Object.getOwnPropertyDescriptors(promise));
        return newPromise;
    };
    promise.json = () => {
        if (is_1.default.undefined(body) && is_1.default.undefined(options.headers.accept)) {
            options.headers.accept = 'application/json';
        }
        return shortcut('json');
    };
    promise.buffer = () => shortcut('buffer');
    promise.text = () => shortcut('text');
    return promise;
}
exports.default = asPromise;


/***/ }),

/***/ 4736:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const duplexer3 = __webpack_require__(7994);
const http_1 = __webpack_require__(8605);
const stream_1 = __webpack_require__(2413);
const errors_1 = __webpack_require__(6312);
const request_as_event_emitter_1 = __webpack_require__(1569);
class ProxyStream extends stream_1.Duplex {
}
exports.ProxyStream = ProxyStream;
function asStream(options) {
    const input = new stream_1.PassThrough();
    const output = new stream_1.PassThrough();
    const proxy = duplexer3(input, output);
    const piped = new Set();
    let isFinished = false;
    options.retry.calculateDelay = () => 0;
    if (options.body || options.json || options.form) {
        proxy.write = () => {
            proxy.destroy();
            throw new Error('Got\'s stream is not writable when the `body`, `json` or `form` option is used');
        };
    }
    else if (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH' || (options.allowGetBody && options.method === 'GET')) {
        options.body = input;
    }
    else {
        proxy.write = () => {
            proxy.destroy();
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        };
    }
    const emitter = request_as_event_emitter_1.default(options);
    const emitError = async (error) => {
        try {
            for (const hook of options.hooks.beforeError) {
                // eslint-disable-next-line no-await-in-loop
                error = await hook(error);
            }
            proxy.emit('error', error);
        }
        catch (error_) {
            proxy.emit('error', error_);
        }
    };
    // Cancels the request
    proxy._destroy = (error, callback) => {
        callback(error);
        emitter.abort();
    };
    emitter.on('response', (response) => {
        const { statusCode, isFromCache } = response;
        proxy.isFromCache = isFromCache;
        if (options.throwHttpErrors && statusCode !== 304 && (statusCode < 200 || statusCode > 299)) {
            emitError(new errors_1.HTTPError(response, options));
            return;
        }
        {
            const read = proxy._read;
            proxy._read = (...args) => {
                isFinished = true;
                proxy._read = read;
                return read.apply(proxy, args);
            };
        }
        if (options.encoding) {
            proxy.setEncoding(options.encoding);
        }
        // We cannot use `stream.pipeline(...)` here,
        // because if we did then `output` would throw
        // the original error before throwing `ReadError`.
        response.pipe(output);
        response.once('error', error => {
            emitError(new errors_1.ReadError(error, options));
        });
        for (const destination of piped) {
            if (destination.headersSent) {
                continue;
            }
            for (const [key, value] of Object.entries(response.headers)) {
                // Got gives *decompressed* data. Overriding `content-encoding` header would result in an error.
                // It's not possible to decompress already decompressed data, is it?
                const isAllowed = options.decompress ? key !== 'content-encoding' : true;
                if (isAllowed) {
                    destination.setHeader(key, value);
                }
            }
            destination.statusCode = response.statusCode;
        }
        proxy.emit('response', response);
    });
    request_as_event_emitter_1.proxyEvents(proxy, emitter);
    emitter.on('error', (error) => proxy.emit('error', error));
    const pipe = proxy.pipe.bind(proxy);
    const unpipe = proxy.unpipe.bind(proxy);
    proxy.pipe = (destination, options) => {
        if (isFinished) {
            throw new Error('Failed to pipe. The response has been emitted already.');
        }
        pipe(destination, options);
        if (destination instanceof http_1.ServerResponse) {
            piped.add(destination);
        }
        return destination;
    };
    proxy.unpipe = stream => {
        piped.delete(stream);
        return unpipe(stream);
    };
    proxy.on('pipe', source => {
        if (source instanceof http_1.IncomingMessage) {
            options.headers = {
                ...source.headers,
                ...options.headers
            };
        }
    });
    proxy.isFromCache = undefined;
    return proxy;
}
exports.default = asStream;


/***/ }),

/***/ 75:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(7678);
const errors_1 = __webpack_require__(6312);
const retryAfterStatusCodes = new Set([413, 429, 503]);
const isErrorWithResponse = (error) => (error instanceof errors_1.HTTPError || error instanceof errors_1.ParseError || error instanceof errors_1.MaxRedirectsError);
const calculateRetryDelay = ({ attemptCount, retryOptions, error }) => {
    if (attemptCount > retryOptions.limit) {
        return 0;
    }
    const hasMethod = retryOptions.methods.includes(error.options.method);
    const hasErrorCode = Reflect.has(error, 'code') && retryOptions.errorCodes.includes(error.code);
    const hasStatusCode = isErrorWithResponse(error) && retryOptions.statusCodes.includes(error.response.statusCode);
    if (!hasMethod || (!hasErrorCode && !hasStatusCode)) {
        return 0;
    }
    if (isErrorWithResponse(error)) {
        const { response } = error;
        if (response && Reflect.has(response.headers, 'retry-after') && retryAfterStatusCodes.has(response.statusCode)) {
            let after = Number(response.headers['retry-after']);
            if (is_1.default.nan(after)) {
                after = Date.parse(response.headers['retry-after']) - Date.now();
            }
            else {
                after *= 1000;
            }
            if (after > retryOptions.maxRetryAfter) {
                return 0;
            }
            return after;
        }
        if (response.statusCode === 413) {
            return 0;
        }
    }
    const noise = Math.random() * 100;
    return ((2 ** (attemptCount - 1)) * 1000) + noise;
};
exports.default = calculateRetryDelay;


/***/ }),

/***/ 4337:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(7678);
const as_promise_1 = __webpack_require__(5436);
const as_stream_1 = __webpack_require__(4736);
const errors = __webpack_require__(6312);
const normalize_arguments_1 = __webpack_require__(6210);
const deep_freeze_1 = __webpack_require__(285);
const getPromiseOrStream = (options) => options.isStream ? as_stream_1.default(options) : as_promise_1.default(options);
const isGotInstance = (value) => (Reflect.has(value, 'defaults') && Reflect.has(value.defaults, 'options'));
const aliases = [
    'get',
    'post',
    'put',
    'patch',
    'head',
    'delete'
];
exports.defaultHandler = (options, next) => next(options);
const create = (defaults) => {
    // Proxy properties from next handlers
    defaults._rawHandlers = defaults.handlers;
    defaults.handlers = defaults.handlers.map(fn => ((options, next) => {
        // This will be assigned by assigning result
        let root;
        const result = fn(options, newOptions => {
            root = next(newOptions);
            return root;
        });
        if (result !== root && !options.isStream && root) {
            const typedResult = result;
            const { then: promiseThen, catch: promiseCatch, finally: promiseFianlly } = typedResult;
            Object.setPrototypeOf(typedResult, Object.getPrototypeOf(root));
            Object.defineProperties(typedResult, Object.getOwnPropertyDescriptors(root));
            // These should point to the new promise
            // eslint-disable-next-line promise/prefer-await-to-then
            typedResult.then = promiseThen;
            typedResult.catch = promiseCatch;
            typedResult.finally = promiseFianlly;
        }
        return result;
    }));
    // @ts-ignore Because the for loop handles it for us, as well as the other Object.defines
    const got = (url, options) => {
        var _a;
        let iteration = 0;
        const iterateHandlers = (newOptions) => {
            return defaults.handlers[iteration++](newOptions, iteration === defaults.handlers.length ? getPromiseOrStream : iterateHandlers);
        };
        /* eslint-disable @typescript-eslint/return-await */
        try {
            return iterateHandlers(normalize_arguments_1.normalizeArguments(url, options, defaults));
        }
        catch (error) {
            if ((_a = options) === null || _a === void 0 ? void 0 : _a.isStream) {
                throw error;
            }
            else {
                // @ts-ignore It's an Error not a response, but TS thinks it's calling .resolve
                return as_promise_1.createRejection(error);
            }
        }
        /* eslint-enable @typescript-eslint/return-await */
    };
    got.extend = (...instancesOrOptions) => {
        const optionsArray = [defaults.options];
        let handlers = [...defaults._rawHandlers];
        let isMutableDefaults;
        for (const value of instancesOrOptions) {
            if (isGotInstance(value)) {
                optionsArray.push(value.defaults.options);
                handlers.push(...value.defaults._rawHandlers);
                isMutableDefaults = value.defaults.mutableDefaults;
            }
            else {
                optionsArray.push(value);
                if (Reflect.has(value, 'handlers')) {
                    handlers.push(...value.handlers);
                }
                isMutableDefaults = value.mutableDefaults;
            }
        }
        handlers = handlers.filter(handler => handler !== exports.defaultHandler);
        if (handlers.length === 0) {
            handlers.push(exports.defaultHandler);
        }
        return create({
            options: normalize_arguments_1.mergeOptions(...optionsArray),
            handlers,
            mutableDefaults: Boolean(isMutableDefaults)
        });
    };
    // @ts-ignore The missing methods because the for-loop handles it for us
    got.stream = (url, options) => got(url, { ...options, isStream: true });
    for (const method of aliases) {
        // @ts-ignore Cannot properly type a function with multiple definitions yet
        got[method] = (url, options) => got(url, { ...options, method });
        got.stream[method] = (url, options) => got.stream(url, { ...options, method });
    }
    // @ts-ignore The missing property is added below
    got.paginate = async function* (url, options) {
        let normalizedOptions = normalize_arguments_1.normalizeArguments(url, options, defaults);
        const pagination = normalizedOptions._pagination;
        if (!is_1.default.object(pagination)) {
            throw new Error('`options._pagination` must be implemented');
        }
        const all = [];
        while (true) {
            // @ts-ignore See https://github.com/sindresorhus/got/issues/954
            // eslint-disable-next-line no-await-in-loop
            const result = await got(normalizedOptions);
            // eslint-disable-next-line no-await-in-loop
            const parsed = await pagination.transform(result);
            const current = [];
            for (const item of parsed) {
                if (pagination.filter(item, all, current)) {
                    if (!pagination.shouldContinue(item, all, current)) {
                        return;
                    }
                    yield item;
                    all.push(item);
                    current.push(item);
                    if (all.length === pagination.countLimit) {
                        return;
                    }
                }
            }
            const optionsToMerge = pagination.paginate(result, all, current);
            if (optionsToMerge === false) {
                return;
            }
            if (optionsToMerge !== undefined) {
                normalizedOptions = normalize_arguments_1.normalizeArguments(normalizedOptions, optionsToMerge);
            }
        }
    };
    got.paginate.all = async (url, options) => {
        const results = [];
        for await (const item of got.paginate(url, options)) {
            results.push(item);
        }
        return results;
    };
    Object.assign(got, { ...errors, mergeOptions: normalize_arguments_1.mergeOptions });
    Object.defineProperty(got, 'defaults', {
        value: defaults.mutableDefaults ? defaults : deep_freeze_1.default(defaults),
        writable: defaults.mutableDefaults,
        configurable: defaults.mutableDefaults,
        enumerable: true
    });
    return got;
};
exports.default = create;


/***/ }),

/***/ 6312:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(7678);
class GotError extends Error {
    constructor(message, error, options) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'GotError';
        if (!is_1.default.undefined(error.code)) {
            this.code = error.code;
        }
        Object.defineProperty(this, 'options', {
            // This fails because of TS 3.7.2 useDefineForClassFields
            // Ref: https://github.com/microsoft/TypeScript/issues/34972
            enumerable: false,
            value: options
        });
        // Recover the original stacktrace
        if (!is_1.default.undefined(error.stack)) {
            const indexOfMessage = this.stack.indexOf(this.message) + this.message.length;
            const thisStackTrace = this.stack.slice(indexOfMessage).split('\n').reverse();
            const errorStackTrace = error.stack.slice(error.stack.indexOf(error.message) + error.message.length).split('\n').reverse();
            // Remove duplicated traces
            while (errorStackTrace.length !== 0 && errorStackTrace[0] === thisStackTrace[0]) {
                thisStackTrace.shift();
            }
            this.stack = `${this.stack.slice(0, indexOfMessage)}${thisStackTrace.reverse().join('\n')}${errorStackTrace.reverse().join('\n')}`;
        }
    }
}
exports.GotError = GotError;
class CacheError extends GotError {
    constructor(error, options) {
        super(error.message, error, options);
        this.name = 'CacheError';
    }
}
exports.CacheError = CacheError;
class RequestError extends GotError {
    constructor(error, options) {
        super(error.message, error, options);
        this.name = 'RequestError';
    }
}
exports.RequestError = RequestError;
class ReadError extends GotError {
    constructor(error, options) {
        super(error.message, error, options);
        this.name = 'ReadError';
    }
}
exports.ReadError = ReadError;
class ParseError extends GotError {
    constructor(error, response, options) {
        super(`${error.message} in "${options.url.toString()}"`, error, options);
        this.name = 'ParseError';
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: response
        });
    }
}
exports.ParseError = ParseError;
class HTTPError extends GotError {
    constructor(response, options) {
        super(`Response code ${response.statusCode} (${response.statusMessage})`, {}, options);
        this.name = 'HTTPError';
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: response
        });
    }
}
exports.HTTPError = HTTPError;
class MaxRedirectsError extends GotError {
    constructor(response, maxRedirects, options) {
        super(`Redirected ${maxRedirects} times. Aborting.`, {}, options);
        this.name = 'MaxRedirectsError';
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: response
        });
    }
}
exports.MaxRedirectsError = MaxRedirectsError;
class UnsupportedProtocolError extends GotError {
    constructor(options) {
        super(`Unsupported protocol "${options.url.protocol}"`, {}, options);
        this.name = 'UnsupportedProtocolError';
    }
}
exports.UnsupportedProtocolError = UnsupportedProtocolError;
class TimeoutError extends GotError {
    constructor(error, timings, options) {
        super(error.message, error, options);
        this.name = 'TimeoutError';
        this.event = error.event;
        this.timings = timings;
    }
}
exports.TimeoutError = TimeoutError;
var p_cancelable_1 = __webpack_require__(9072);
exports.CancelError = p_cancelable_1.CancelError;


/***/ }),

/***/ 4247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const decompressResponse = __webpack_require__(2391);
const mimicResponse = __webpack_require__(2610);
const stream = __webpack_require__(2413);
const util_1 = __webpack_require__(1669);
const progress_1 = __webpack_require__(8983);
const pipeline = util_1.promisify(stream.pipeline);
exports.default = async (response, options, emitter) => {
    var _a;
    const downloadBodySize = Number(response.headers['content-length']) || undefined;
    const progressStream = progress_1.createProgressStream('downloadProgress', emitter, downloadBodySize);
    mimicResponse(response, progressStream);
    const newResponse = (options.decompress &&
        options.method !== 'HEAD' ? decompressResponse(progressStream) : progressStream);
    if (!options.decompress && ['gzip', 'deflate', 'br'].includes((_a = newResponse.headers['content-encoding'], (_a !== null && _a !== void 0 ? _a : '')))) {
        options.responseType = 'buffer';
    }
    emitter.emit('response', newResponse);
    return pipeline(response, progressStream).catch(error => {
        if (error.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
            throw error;
        }
    });
};


/***/ }),

/***/ 3061:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
const url_1 = __webpack_require__(8835);
const create_1 = __webpack_require__(4337);
const defaults = {
    options: {
        method: 'GET',
        retry: {
            limit: 2,
            methods: [
                'GET',
                'PUT',
                'HEAD',
                'DELETE',
                'OPTIONS',
                'TRACE'
            ],
            statusCodes: [
                408,
                413,
                429,
                500,
                502,
                503,
                504,
                521,
                522,
                524
            ],
            errorCodes: [
                'ETIMEDOUT',
                'ECONNRESET',
                'EADDRINUSE',
                'ECONNREFUSED',
                'EPIPE',
                'ENOTFOUND',
                'ENETUNREACH',
                'EAI_AGAIN'
            ],
            maxRetryAfter: undefined,
            calculateDelay: ({ computedValue }) => computedValue
        },
        timeout: {},
        headers: {
            'user-agent': 'got (https://github.com/sindresorhus/got)'
        },
        hooks: {
            init: [],
            beforeRequest: [],
            beforeRedirect: [],
            beforeRetry: [],
            beforeError: [],
            afterResponse: []
        },
        decompress: true,
        throwHttpErrors: true,
        followRedirect: true,
        isStream: false,
        cache: false,
        dnsCache: false,
        useElectronNet: false,
        responseType: 'text',
        resolveBodyOnly: false,
        maxRedirects: 10,
        prefixUrl: '',
        methodRewriting: true,
        allowGetBody: false,
        ignoreInvalidCookies: false,
        context: {},
        _pagination: {
            transform: (response) => {
                if (response.request.options.responseType === 'json') {
                    return response.body;
                }
                return JSON.parse(response.body);
            },
            paginate: response => {
                if (!Reflect.has(response.headers, 'link')) {
                    return false;
                }
                const items = response.headers.link.split(',');
                let next;
                for (const item of items) {
                    const parsed = item.split(';');
                    if (parsed[1].includes('next')) {
                        next = parsed[0].trimStart().trim();
                        next = next.slice(1, -1);
                        break;
                    }
                }
                if (next) {
                    const options = {
                        url: new url_1.URL(next)
                    };
                    return options;
                }
                return false;
            },
            filter: () => true,
            shouldContinue: () => true,
            countLimit: Infinity
        }
    },
    handlers: [create_1.defaultHandler],
    mutableDefaults: false
};
const got = create_1.default(defaults);
exports.default = got;
// For CommonJS default export support
module.exports = got;
module.exports.default = got;
// Export types
__export(__webpack_require__(2613));
var as_stream_1 = __webpack_require__(4736);
exports.ResponseStream = as_stream_1.ProxyStream;
var errors_1 = __webpack_require__(6312);
exports.GotError = errors_1.GotError;
exports.CacheError = errors_1.CacheError;
exports.RequestError = errors_1.RequestError;
exports.ReadError = errors_1.ReadError;
exports.ParseError = errors_1.ParseError;
exports.HTTPError = errors_1.HTTPError;
exports.MaxRedirectsError = errors_1.MaxRedirectsError;
exports.UnsupportedProtocolError = errors_1.UnsupportedProtocolError;
exports.TimeoutError = errors_1.TimeoutError;
exports.CancelError = errors_1.CancelError;


/***/ }),

/***/ 2744:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const knownHookEvents = [
    'beforeError',
    'init',
    'beforeRequest',
    'beforeRedirect',
    'beforeRetry',
    'afterResponse'
];
exports.default = knownHookEvents;


/***/ }),

/***/ 6210:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);

Object.defineProperty(exports, "__esModule", ({ value: true }));
const url_1 = __webpack_require__(8835);
const util_1 = __webpack_require__(1669);
const CacheableRequest = __webpack_require__(1472);
const http = __webpack_require__(8605);
const https = __webpack_require__(7211);
const lowercaseKeys = __webpack_require__(9662);
const toReadableStream = __webpack_require__(3158);
const is_1 = __webpack_require__(7678);
const cacheable_lookup_1 = __webpack_require__(134);
const errors_1 = __webpack_require__(6312);
const known_hook_events_1 = __webpack_require__(2744);
const dynamic_require_1 = __webpack_require__(7616);
const get_body_size_1 = __webpack_require__(5938);
const is_form_data_1 = __webpack_require__(9630);
const merge_1 = __webpack_require__(8359);
const options_to_url_1 = __webpack_require__(1760);
const supports_brotli_1 = __webpack_require__(7681);
const types_1 = __webpack_require__(2613);
const nonEnumerableProperties = [
    'context',
    'body',
    'json',
    'form'
];
const isAgentByProtocol = (agent) => is_1.default.object(agent);
// TODO: `preNormalizeArguments` should merge `options` & `defaults`
exports.preNormalizeArguments = (options, defaults) => {
    var _a, _b, _c, _d, _e, _f;
    // `options.headers`
    if (is_1.default.undefined(options.headers)) {
        options.headers = {};
    }
    else {
        options.headers = lowercaseKeys(options.headers);
    }
    for (const [key, value] of Object.entries(options.headers)) {
        if (is_1.default.null_(value)) {
            throw new TypeError(`Use \`undefined\` instead of \`null\` to delete the \`${key}\` header`);
        }
    }
    // `options.prefixUrl`
    if (is_1.default.urlInstance(options.prefixUrl) || is_1.default.string(options.prefixUrl)) {
        options.prefixUrl = options.prefixUrl.toString();
        if (options.prefixUrl.length !== 0 && !options.prefixUrl.endsWith('/')) {
            options.prefixUrl += '/';
        }
    }
    else {
        options.prefixUrl = defaults ? defaults.prefixUrl : '';
    }
    // `options.hooks`
    if (is_1.default.undefined(options.hooks)) {
        options.hooks = {};
    }
    if (is_1.default.object(options.hooks)) {
        for (const event of known_hook_events_1.default) {
            if (Reflect.has(options.hooks, event)) {
                if (!is_1.default.array(options.hooks[event])) {
                    throw new TypeError(`Parameter \`${event}\` must be an Array, not ${is_1.default(options.hooks[event])}`);
                }
            }
            else {
                options.hooks[event] = [];
            }
        }
    }
    else {
        throw new TypeError(`Parameter \`hooks\` must be an Object, not ${is_1.default(options.hooks)}`);
    }
    if (defaults) {
        for (const event of known_hook_events_1.default) {
            if (!(Reflect.has(options.hooks, event) && is_1.default.undefined(options.hooks[event]))) {
                // @ts-ignore Union type array is not assignable to union array type
                options.hooks[event] = [
                    ...defaults.hooks[event],
                    ...options.hooks[event]
                ];
            }
        }
    }
    // `options.timeout`
    if (is_1.default.number(options.timeout)) {
        options.timeout = { request: options.timeout };
    }
    else if (!is_1.default.object(options.timeout)) {
        options.timeout = {};
    }
    // `options.retry`
    const { retry } = options;
    if (defaults) {
        options.retry = { ...defaults.retry };
    }
    else {
        options.retry = {
            calculateDelay: retryObject => retryObject.computedValue,
            limit: 0,
            methods: [],
            statusCodes: [],
            errorCodes: [],
            maxRetryAfter: undefined
        };
    }
    if (is_1.default.object(retry)) {
        options.retry = {
            ...options.retry,
            ...retry
        };
    }
    else if (is_1.default.number(retry)) {
        options.retry.limit = retry;
    }
    if (options.retry.maxRetryAfter === undefined) {
        options.retry.maxRetryAfter = Math.min(...[options.timeout.request, options.timeout.connect].filter((n) => !is_1.default.nullOrUndefined(n)));
    }
    options.retry.methods = [...new Set(options.retry.methods.map(method => method.toUpperCase()))];
    options.retry.statusCodes = [...new Set(options.retry.statusCodes)];
    options.retry.errorCodes = [...new Set(options.retry.errorCodes)];
    // `options.dnsCache`
    if (options.dnsCache && !(options.dnsCache instanceof cacheable_lookup_1.default)) {
        options.dnsCache = new cacheable_lookup_1.default({ cacheAdapter: options.dnsCache });
    }
    // `options.method`
    if (is_1.default.string(options.method)) {
        options.method = options.method.toUpperCase();
    }
    else {
        options.method = (_b = (_a = defaults) === null || _a === void 0 ? void 0 : _a.method, (_b !== null && _b !== void 0 ? _b : 'GET'));
    }
    // Better memory management, so we don't have to generate a new object every time
    if (options.cache) {
        options.cacheableRequest = new CacheableRequest(
        // @ts-ignore Cannot properly type a function with multiple definitions yet
        (requestOptions, handler) => requestOptions[types_1.requestSymbol](requestOptions, handler), options.cache);
    }
    // `options.cookieJar`
    if (is_1.default.object(options.cookieJar)) {
        let { setCookie, getCookieString } = options.cookieJar;
        // Horrible `tough-cookie` check
        if (setCookie.length === 4 && getCookieString.length === 0) {
            if (!Reflect.has(setCookie, util_1.promisify.custom)) {
                // @ts-ignore TS is dumb - it says `setCookie` is `never`.
                setCookie = util_1.promisify(setCookie.bind(options.cookieJar));
                getCookieString = util_1.promisify(getCookieString.bind(options.cookieJar));
            }
        }
        else if (setCookie.length !== 2) {
            throw new TypeError('`options.cookieJar.setCookie` needs to be an async function with 2 arguments');
        }
        else if (getCookieString.length !== 1) {
            throw new TypeError('`options.cookieJar.getCookieString` needs to be an async function with 1 argument');
        }
        options.cookieJar = { setCookie, getCookieString };
    }
    // `options.encoding`
    if (is_1.default.null_(options.encoding)) {
        throw new TypeError('To get a Buffer, set `options.responseType` to `buffer` instead');
    }
    // `options.maxRedirects`
    if (!Reflect.has(options, 'maxRedirects') && !(defaults && Reflect.has(defaults, 'maxRedirects'))) {
        options.maxRedirects = 0;
    }
    // Merge defaults
    if (defaults) {
        options = merge_1.default({}, defaults, options);
    }
    // `options._pagination`
    if (is_1.default.object(options._pagination)) {
        const { _pagination: pagination } = options;
        if (!is_1.default.function_(pagination.transform)) {
            throw new TypeError('`options._pagination.transform` must be implemented');
        }
        if (!is_1.default.function_(pagination.shouldContinue)) {
            throw new TypeError('`options._pagination.shouldContinue` must be implemented');
        }
        if (!is_1.default.function_(pagination.filter)) {
            throw new TypeError('`options._pagination.filter` must be implemented');
        }
        if (!is_1.default.function_(pagination.paginate)) {
            throw new TypeError('`options._pagination.paginate` must be implemented');
        }
    }
    // Other values
    options.decompress = Boolean(options.decompress);
    options.isStream = Boolean(options.isStream);
    options.throwHttpErrors = Boolean(options.throwHttpErrors);
    options.ignoreInvalidCookies = Boolean(options.ignoreInvalidCookies);
    options.cache = (_c = options.cache, (_c !== null && _c !== void 0 ? _c : false));
    options.responseType = (_d = options.responseType, (_d !== null && _d !== void 0 ? _d : 'text'));
    options.resolveBodyOnly = Boolean(options.resolveBodyOnly);
    options.followRedirect = Boolean(options.followRedirect);
    options.dnsCache = (_e = options.dnsCache, (_e !== null && _e !== void 0 ? _e : false));
    options.useElectronNet = Boolean(options.useElectronNet);
    options.methodRewriting = Boolean(options.methodRewriting);
    options.allowGetBody = Boolean(options.allowGetBody);
    options.context = (_f = options.context, (_f !== null && _f !== void 0 ? _f : {}));
    return options;
};
exports.mergeOptions = (...sources) => {
    let mergedOptions = exports.preNormalizeArguments({});
    // Non enumerable properties shall not be merged
    const properties = {};
    for (const source of sources) {
        mergedOptions = exports.preNormalizeArguments(merge_1.default({}, source), mergedOptions);
        for (const name of nonEnumerableProperties) {
            if (!Reflect.has(source, name)) {
                continue;
            }
            properties[name] = {
                writable: true,
                configurable: true,
                enumerable: false,
                value: source[name]
            };
        }
    }
    Object.defineProperties(mergedOptions, properties);
    return mergedOptions;
};
exports.normalizeArguments = (url, options, defaults) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Merge options
    if (typeof url === 'undefined') {
        throw new TypeError('Missing `url` argument');
    }
    const runInitHooks = (hooks, options) => {
        if (hooks && options) {
            for (const hook of hooks) {
                const result = hook(options);
                if (is_1.default.promise(result)) {
                    throw new TypeError('The `init` hook must be a synchronous function');
                }
            }
        }
    };
    const hasUrl = is_1.default.urlInstance(url) || is_1.default.string(url);
    if (hasUrl) {
        if (options) {
            if (Reflect.has(options, 'url')) {
                throw new TypeError('The `url` option cannot be used if the input is a valid URL.');
            }
        }
        else {
            options = {};
        }
        // @ts-ignore URL is not URL
        options.url = url;
        runInitHooks((_a = defaults) === null || _a === void 0 ? void 0 : _a.options.hooks.init, options);
        runInitHooks((_b = options.hooks) === null || _b === void 0 ? void 0 : _b.init, options);
    }
    else if (Reflect.has(url, 'resolve')) {
        throw new Error('The legacy `url.Url` is deprecated. Use `URL` instead.');
    }
    else {
        runInitHooks((_c = defaults) === null || _c === void 0 ? void 0 : _c.options.hooks.init, url);
        runInitHooks((_d = url.hooks) === null || _d === void 0 ? void 0 : _d.init, url);
        if (options) {
            runInitHooks((_e = defaults) === null || _e === void 0 ? void 0 : _e.options.hooks.init, options);
            runInitHooks((_f = options.hooks) === null || _f === void 0 ? void 0 : _f.init, options);
        }
    }
    if (hasUrl) {
        options = exports.mergeOptions((_h = (_g = defaults) === null || _g === void 0 ? void 0 : _g.options, (_h !== null && _h !== void 0 ? _h : {})), (options !== null && options !== void 0 ? options : {}));
    }
    else {
        options = exports.mergeOptions((_k = (_j = defaults) === null || _j === void 0 ? void 0 : _j.options, (_k !== null && _k !== void 0 ? _k : {})), url, (options !== null && options !== void 0 ? options : {}));
    }
    // Normalize URL
    // TODO: drop `optionsToUrl` in Got 12
    if (is_1.default.string(options.url)) {
        options.url = options.prefixUrl + options.url;
        options.url = options.url.replace(/^unix:/, 'http://$&');
        if (options.searchParams || options.search) {
            options.url = options.url.split('?')[0];
        }
        // @ts-ignore URL is not URL
        options.url = options_to_url_1.default({
            origin: options.url,
            ...options
        });
    }
    else if (!is_1.default.urlInstance(options.url)) {
        // @ts-ignore URL is not URL
        options.url = options_to_url_1.default({ origin: options.prefixUrl, ...options });
    }
    const normalizedOptions = options;
    // Make it possible to change `options.prefixUrl`
    let prefixUrl = options.prefixUrl;
    Object.defineProperty(normalizedOptions, 'prefixUrl', {
        set: (value) => {
            if (!normalizedOptions.url.href.startsWith(value)) {
                throw new Error(`Cannot change \`prefixUrl\` from ${prefixUrl} to ${value}: ${normalizedOptions.url.href}`);
            }
            normalizedOptions.url = new url_1.URL(value + normalizedOptions.url.href.slice(prefixUrl.length));
            prefixUrl = value;
        },
        get: () => prefixUrl
    });
    // Make it possible to remove default headers
    for (const [key, value] of Object.entries(normalizedOptions.headers)) {
        if (is_1.default.undefined(value)) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete normalizedOptions.headers[key];
        }
    }
    return normalizedOptions;
};
const withoutBody = new Set(['HEAD']);
const withoutBodyUnlessSpecified = 'GET';
exports.normalizeRequestArguments = async (options) => {
    var _a, _b, _c;
    options = exports.mergeOptions(options);
    // Serialize body
    const { headers } = options;
    const hasNoContentType = is_1.default.undefined(headers['content-type']);
    {
        // TODO: these checks should be moved to `preNormalizeArguments`
        const isForm = !is_1.default.undefined(options.form);
        const isJson = !is_1.default.undefined(options.json);
        const isBody = !is_1.default.undefined(options.body);
        if ((isBody || isForm || isJson) && withoutBody.has(options.method)) {
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        }
        if (!options.allowGetBody && (isBody || isForm || isJson) && withoutBodyUnlessSpecified === options.method) {
            throw new TypeError(`The \`${options.method}\` method cannot be used with a body`);
        }
        if ([isBody, isForm, isJson].filter(isTrue => isTrue).length > 1) {
            throw new TypeError('The `body`, `json` and `form` options are mutually exclusive');
        }
        if (isBody &&
            !is_1.default.nodeStream(options.body) &&
            !is_1.default.string(options.body) &&
            !is_1.default.buffer(options.body) &&
            !(is_1.default.object(options.body) && is_form_data_1.default(options.body))) {
            throw new TypeError('The `body` option must be a stream.Readable, string or Buffer');
        }
        if (isForm && !is_1.default.object(options.form)) {
            throw new TypeError('The `form` option must be an Object');
        }
    }
    if (options.body) {
        // Special case for https://github.com/form-data/form-data
        if (is_1.default.object(options.body) && is_form_data_1.default(options.body) && hasNoContentType) {
            headers['content-type'] = `multipart/form-data; boundary=${options.body.getBoundary()}`;
        }
    }
    else if (options.form) {
        if (hasNoContentType) {
            headers['content-type'] = 'application/x-www-form-urlencoded';
        }
        options.body = (new url_1.URLSearchParams(options.form)).toString();
    }
    else if (options.json) {
        if (hasNoContentType) {
            headers['content-type'] = 'application/json';
        }
        options.body = JSON.stringify(options.json);
    }
    const uploadBodySize = await get_body_size_1.default(options);
    if (!is_1.default.nodeStream(options.body)) {
        options.body = toReadableStream(options.body);
    }
    // See https://tools.ietf.org/html/rfc7230#section-3.3.2
    // A user agent SHOULD send a Content-Length in a request message when
    // no Transfer-Encoding is sent and the request method defines a meaning
    // for an enclosed payload body.  For example, a Content-Length header
    // field is normally sent in a POST request even when the value is 0
    // (indicating an empty payload body).  A user agent SHOULD NOT send a
    // Content-Length header field when the request message does not contain
    // a payload body and the method semantics do not anticipate such a
    // body.
    if (is_1.default.undefined(headers['content-length']) && is_1.default.undefined(headers['transfer-encoding'])) {
        if ((options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH' || options.method === 'DELETE' || (options.allowGetBody && options.method === 'GET')) &&
            !is_1.default.undefined(uploadBodySize)) {
            // @ts-ignore We assign if it is undefined, so this IS correct
            headers['content-length'] = String(uploadBodySize);
        }
    }
    if (!options.isStream && options.responseType === 'json' && is_1.default.undefined(headers.accept)) {
        headers.accept = 'application/json';
    }
    if (options.decompress && is_1.default.undefined(headers['accept-encoding'])) {
        headers['accept-encoding'] = supports_brotli_1.default ? 'gzip, deflate, br' : 'gzip, deflate';
    }
    // Validate URL
    if (options.url.protocol !== 'http:' && options.url.protocol !== 'https:') {
        throw new errors_1.UnsupportedProtocolError(options);
    }
    decodeURI(options.url.toString());
    // Normalize request function
    if (is_1.default.function_(options.request)) {
        options[types_1.requestSymbol] = options.request;
        delete options.request;
    }
    else {
        options[types_1.requestSymbol] = options.url.protocol === 'https:' ? https.request : http.request;
    }
    // UNIX sockets
    if (options.url.hostname === 'unix') {
        const matches = /(?<socketPath>.+?):(?<path>.+)/.exec(options.url.pathname);
        if ((_a = matches) === null || _a === void 0 ? void 0 : _a.groups) {
            const { socketPath, path } = matches.groups;
            options = {
                ...options,
                socketPath,
                path,
                host: ''
            };
        }
    }
    if (isAgentByProtocol(options.agent)) {
        options.agent = (_b = options.agent[options.url.protocol.slice(0, -1)], (_b !== null && _b !== void 0 ? _b : options.agent));
    }
    if (options.dnsCache) {
        options.lookup = options.dnsCache.lookup;
    }
    /* istanbul ignore next: electron.net is broken */
    // No point in typing process.versions correctly, as
    // `process.version.electron` is used only once, right here.
    if (options.useElectronNet && process.versions.electron) {
        const electron = dynamic_require_1.default(module, 'electron'); // Trick webpack
        options.request = util_1.deprecate((_c = electron.net.request, (_c !== null && _c !== void 0 ? _c : electron.remote.net.request)), 'Electron support has been deprecated and will be removed in Got 11.\n' +
            'See https://github.com/sindresorhus/got/issues/899 for further information.', 'GOT_ELECTRON');
    }
    // Got's `timeout` is an object, http's `timeout` is a number, so they're not compatible.
    delete options.timeout;
    // Set cookies
    if (options.cookieJar) {
        const cookieString = await options.cookieJar.getCookieString(options.url.toString());
        if (is_1.default.nonEmptyString(cookieString)) {
            options.headers.cookie = cookieString;
        }
        else {
            delete options.headers.cookie;
        }
    }
    // `http-cache-semantics` checks this
    delete options.url;
    return options;
};


/***/ }),

/***/ 8983:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stream_1 = __webpack_require__(2413);
const is_1 = __webpack_require__(7678);
function createProgressStream(name, emitter, totalBytes) {
    let transformedBytes = 0;
    if (is_1.default.string(totalBytes)) {
        totalBytes = Number(totalBytes);
    }
    const progressStream = new stream_1.Transform({
        transform(chunk, _encoding, callback) {
            transformedBytes += chunk.length;
            const percent = totalBytes ? transformedBytes / totalBytes : 0;
            // Let `flush()` be responsible for emitting the last event
            if (percent < 1) {
                emitter.emit(name, {
                    percent,
                    transferred: transformedBytes,
                    total: totalBytes
                });
            }
            callback(undefined, chunk);
        },
        flush(callback) {
            emitter.emit(name, {
                percent: 1,
                transferred: transformedBytes,
                total: totalBytes
            });
            callback();
        }
    });
    emitter.emit(name, {
        percent: 0,
        transferred: 0,
        total: totalBytes
    });
    return progressStream;
}
exports.createProgressStream = createProgressStream;


/***/ }),

/***/ 1569:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __webpack_require__(5747);
const CacheableRequest = __webpack_require__(1472);
const EventEmitter = __webpack_require__(8614);
const http = __webpack_require__(8605);
const stream = __webpack_require__(2413);
const url_1 = __webpack_require__(8835);
const util_1 = __webpack_require__(1669);
const is_1 = __webpack_require__(7678);
const http_timer_1 = __webpack_require__(8097);
const calculate_retry_delay_1 = __webpack_require__(75);
const errors_1 = __webpack_require__(6312);
const get_response_1 = __webpack_require__(4247);
const normalize_arguments_1 = __webpack_require__(6210);
const progress_1 = __webpack_require__(8983);
const timed_out_1 = __webpack_require__(1489);
const types_1 = __webpack_require__(2613);
const url_to_options_1 = __webpack_require__(8184);
const pEvent = __webpack_require__(4568);
const setImmediateAsync = async () => new Promise(resolve => setImmediate(resolve));
const pipeline = util_1.promisify(stream.pipeline);
const redirectCodes = new Set([300, 301, 302, 303, 304, 307, 308]);
exports.default = (options) => {
    const emitter = new EventEmitter();
    const requestUrl = options.url.toString();
    const redirects = [];
    let retryCount = 0;
    let currentRequest;
    // `request.aborted` is a boolean since v11.0.0: https://github.com/nodejs/node/commit/4b00c4fafaa2ae8c41c1f78823c0feb810ae4723#diff-e3bc37430eb078ccbafe3aa3b570c91a
    const isAborted = () => typeof currentRequest.aborted === 'number' || currentRequest.aborted;
    const emitError = async (error) => {
        try {
            for (const hook of options.hooks.beforeError) {
                // eslint-disable-next-line no-await-in-loop
                error = await hook(error);
            }
            emitter.emit('error', error);
        }
        catch (error_) {
            emitter.emit('error', error_);
        }
    };
    const get = async () => {
        let httpOptions = await normalize_arguments_1.normalizeRequestArguments(options);
        const handleResponse = async (response) => {
            var _a;
            try {
                /* istanbul ignore next: fixes https://github.com/electron/electron/blob/cbb460d47628a7a146adf4419ed48550a98b2923/lib/browser/api/net.js#L59-L65 */
                if (options.useElectronNet) {
                    response = new Proxy(response, {
                        get: (target, name) => {
                            if (name === 'trailers' || name === 'rawTrailers') {
                                return [];
                            }
                            const value = target[name];
                            return is_1.default.function_(value) ? value.bind(target) : value;
                        }
                    });
                }
                const typedResponse = response;
                const { statusCode } = typedResponse;
                typedResponse.statusMessage = is_1.default.nonEmptyString(typedResponse.statusMessage) ? typedResponse.statusMessage : http.STATUS_CODES[statusCode];
                typedResponse.url = options.url.toString();
                typedResponse.requestUrl = requestUrl;
                typedResponse.retryCount = retryCount;
                typedResponse.redirectUrls = redirects;
                typedResponse.request = { options };
                typedResponse.isFromCache = (_a = typedResponse.fromCache, (_a !== null && _a !== void 0 ? _a : false));
                delete typedResponse.fromCache;
                if (!typedResponse.isFromCache) {
                    typedResponse.ip = response.socket.remoteAddress;
                }
                const rawCookies = typedResponse.headers['set-cookie'];
                if (Reflect.has(options, 'cookieJar') && rawCookies) {
                    let promises = rawCookies.map(async (rawCookie) => options.cookieJar.setCookie(rawCookie, typedResponse.url));
                    if (options.ignoreInvalidCookies) {
                        promises = promises.map(async (p) => p.catch(() => { }));
                    }
                    await Promise.all(promises);
                }
                if (options.followRedirect && Reflect.has(typedResponse.headers, 'location') && redirectCodes.has(statusCode)) {
                    typedResponse.resume(); // We're being redirected, we don't care about the response.
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
                    if (statusCode === 303 || options.methodRewriting === false) {
                        if (options.method !== 'GET' && options.method !== 'HEAD') {
                            // Server responded with "see other", indicating that the resource exists at another location,
                            // and the client should request it from that location via GET or HEAD.
                            options.method = 'GET';
                        }
                        if (Reflect.has(options, 'body')) {
                            delete options.body;
                        }
                        if (Reflect.has(options, 'json')) {
                            delete options.json;
                        }
                        if (Reflect.has(options, 'form')) {
                            delete options.form;
                        }
                    }
                    if (redirects.length >= options.maxRedirects) {
                        throw new errors_1.MaxRedirectsError(typedResponse, options.maxRedirects, options);
                    }
                    // Handles invalid URLs. See https://github.com/sindresorhus/got/issues/604
                    const redirectBuffer = Buffer.from(typedResponse.headers.location, 'binary').toString();
                    const redirectUrl = new url_1.URL(redirectBuffer, options.url);
                    // Redirecting to a different site, clear cookies.
                    if (redirectUrl.hostname !== options.url.hostname && Reflect.has(options.headers, 'cookie')) {
                        delete options.headers.cookie;
                    }
                    redirects.push(redirectUrl.toString());
                    options.url = redirectUrl;
                    for (const hook of options.hooks.beforeRedirect) {
                        // eslint-disable-next-line no-await-in-loop
                        await hook(options, typedResponse);
                    }
                    emitter.emit('redirect', response, options);
                    await get();
                    return;
                }
                await get_response_1.default(typedResponse, options, emitter);
            }
            catch (error) {
                emitError(error);
            }
        };
        const handleRequest = async (request) => {
            let isPiped = false;
            let isFinished = false;
            // `request.finished` doesn't indicate whether this has been emitted or not
            request.once('finish', () => {
                isFinished = true;
            });
            currentRequest = request;
            const onError = (error) => {
                if (error instanceof timed_out_1.TimeoutError) {
                    error = new errors_1.TimeoutError(error, request.timings, options);
                }
                else {
                    error = new errors_1.RequestError(error, options);
                }
                if (!emitter.retry(error)) {
                    emitError(error);
                }
            };
            request.on('error', error => {
                if (isPiped) {
                    // Check if it's caught by `stream.pipeline(...)`
                    if (!isFinished) {
                        return;
                    }
                    // We need to let `TimedOutTimeoutError` through, because `stream.pipeline(…)` aborts the request automatically.
                    if (isAborted() && !(error instanceof timed_out_1.TimeoutError)) {
                        return;
                    }
                }
                onError(error);
            });
            try {
                http_timer_1.default(request);
                timed_out_1.default(request, options.timeout, options.url);
                emitter.emit('request', request);
                const uploadStream = progress_1.createProgressStream('uploadProgress', emitter, httpOptions.headers['content-length']);
                isPiped = true;
                await pipeline(httpOptions.body, uploadStream, request);
                request.emit('upload-complete');
            }
            catch (error) {
                if (isAborted() && error.message === 'Premature close') {
                    // The request was aborted on purpose
                    return;
                }
                onError(error);
            }
        };
        if (options.cache) {
            // `cacheable-request` doesn't support Node 10 API, fallback.
            httpOptions = {
                ...httpOptions,
                ...url_to_options_1.default(options.url)
            };
            // @ts-ignore `cacheable-request` has got invalid types
            const cacheRequest = options.cacheableRequest(httpOptions, handleResponse);
            cacheRequest.once('error', (error) => {
                if (error instanceof CacheableRequest.RequestError) {
                    emitError(new errors_1.RequestError(error, options));
                }
                else {
                    emitError(new errors_1.CacheError(error, options));
                }
            });
            cacheRequest.once('request', handleRequest);
        }
        else {
            // Catches errors thrown by calling `requestFn(…)`
            try {
                handleRequest(httpOptions[types_1.requestSymbol](options.url, httpOptions, handleResponse));
            }
            catch (error) {
                emitError(new errors_1.RequestError(error, options));
            }
        }
    };
    emitter.retry = error => {
        let backoff;
        retryCount++;
        try {
            backoff = options.retry.calculateDelay({
                attemptCount: retryCount,
                retryOptions: options.retry,
                error,
                computedValue: calculate_retry_delay_1.default({
                    attemptCount: retryCount,
                    retryOptions: options.retry,
                    error,
                    computedValue: 0
                })
            });
        }
        catch (error_) {
            emitError(error_);
            return false;
        }
        if (backoff) {
            const retry = async (options) => {
                try {
                    for (const hook of options.hooks.beforeRetry) {
                        // eslint-disable-next-line no-await-in-loop
                        await hook(options, error, retryCount);
                    }
                    await get();
                }
                catch (error_) {
                    emitError(error_);
                }
            };
            setTimeout(retry, backoff, { ...options, forceRefresh: true });
            return true;
        }
        return false;
    };
    emitter.abort = () => {
        emitter.prependListener('request', (request) => {
            request.abort();
        });
        if (currentRequest) {
            currentRequest.abort();
        }
    };
    (async () => {
        try {
            if (options.body instanceof fs_1.ReadStream) {
                await pEvent(options.body, 'open');
            }
            // Promises are executed immediately.
            // If there were no `setImmediate` here,
            // `promise.json()` would have no effect
            // as the request would be sent already.
            await setImmediateAsync();
            for (const hook of options.hooks.beforeRequest) {
                // eslint-disable-next-line no-await-in-loop
                await hook(options);
            }
            await get();
        }
        catch (error) {
            emitError(error);
        }
    })();
    return emitter;
};
exports.proxyEvents = (proxy, emitter) => {
    const events = [
        'request',
        'redirect',
        'uploadProgress',
        'downloadProgress'
    ];
    for (const event of events) {
        emitter.on(event, (...args) => {
            proxy.emit(event, ...args);
        });
    }
};


/***/ }),

/***/ 2613:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.requestSymbol = Symbol('request');


/***/ }),

/***/ 285:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(7678);
function deepFreeze(object) {
    for (const value of Object.values(object)) {
        if (is_1.default.plainObject(value) || is_1.default.array(value)) {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}
exports.default = deepFreeze;


/***/ }),

/***/ 7616:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/* istanbul ignore file: used for webpack */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = (moduleObject, moduleId) => moduleObject.require(moduleId);


/***/ }),

/***/ 5938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __webpack_require__(5747);
const util_1 = __webpack_require__(1669);
const is_1 = __webpack_require__(7678);
const is_form_data_1 = __webpack_require__(9630);
const statAsync = util_1.promisify(fs_1.stat);
exports.default = async (options) => {
    const { body, headers } = options;
    if (headers && 'content-length' in headers) {
        return Number(headers['content-length']);
    }
    if (!body) {
        return 0;
    }
    if (is_1.default.string(body)) {
        return Buffer.byteLength(body);
    }
    if (is_1.default.buffer(body)) {
        return body.length;
    }
    if (is_form_data_1.default(body)) {
        return util_1.promisify(body.getLength.bind(body))();
    }
    if (body instanceof fs_1.ReadStream) {
        const { size } = await statAsync(body.path);
        return size;
    }
    return undefined;
};


/***/ }),

/***/ 9630:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(7678);
exports.default = (body) => is_1.default.nodeStream(body) && is_1.default.function_(body.getBoundary);


/***/ }),

/***/ 8359:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const url_1 = __webpack_require__(8835);
const is_1 = __webpack_require__(7678);
function merge(target, ...sources) {
    for (const source of sources) {
        for (const [key, sourceValue] of Object.entries(source)) {
            const targetValue = target[key];
            if (is_1.default.urlInstance(targetValue) && is_1.default.string(sourceValue)) {
                // @ts-ignore TS doesn't recognise Target accepts string keys
                target[key] = new url_1.URL(sourceValue, targetValue);
            }
            else if (is_1.default.plainObject(sourceValue)) {
                if (is_1.default.plainObject(targetValue)) {
                    // @ts-ignore TS doesn't recognise Target accepts string keys
                    target[key] = merge({}, targetValue, sourceValue);
                }
                else {
                    // @ts-ignore TS doesn't recognise Target accepts string keys
                    target[key] = merge({}, sourceValue);
                }
            }
            else if (is_1.default.array(sourceValue)) {
                // @ts-ignore TS doesn't recognise Target accepts string keys
                target[key] = sourceValue.slice();
            }
            else {
                // @ts-ignore TS doesn't recognise Target accepts string keys
                target[key] = sourceValue;
            }
        }
    }
    return target;
}
exports.default = merge;


/***/ }),

/***/ 1760:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const url_1 = __webpack_require__(8835);
function validateSearchParams(searchParams) {
    for (const value of Object.values(searchParams)) {
        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && value !== null) {
            throw new TypeError(`The \`searchParams\` value '${String(value)}' must be a string, number, boolean or null`);
        }
    }
}
const keys = [
    'protocol',
    'username',
    'password',
    'host',
    'hostname',
    'port',
    'pathname',
    'search',
    'hash'
];
exports.default = (options) => {
    var _a, _b;
    let origin;
    if (options.path) {
        if (options.pathname) {
            throw new TypeError('Parameters `path` and `pathname` are mutually exclusive.');
        }
        if (options.search) {
            throw new TypeError('Parameters `path` and `search` are mutually exclusive.');
        }
        if (options.searchParams) {
            throw new TypeError('Parameters `path` and `searchParams` are mutually exclusive.');
        }
    }
    if (Reflect.has(options, 'auth')) {
        throw new TypeError('Parameter `auth` is deprecated. Use `username` / `password` instead.');
    }
    if (options.search && options.searchParams) {
        throw new TypeError('Parameters `search` and `searchParams` are mutually exclusive.');
    }
    if (options.href) {
        return new url_1.URL(options.href);
    }
    if (options.origin) {
        origin = options.origin;
    }
    else {
        if (!options.protocol) {
            throw new TypeError('No URL protocol specified');
        }
        origin = `${options.protocol}//${_b = (_a = options.hostname, (_a !== null && _a !== void 0 ? _a : options.host)), (_b !== null && _b !== void 0 ? _b : '')}`;
    }
    const url = new url_1.URL(origin);
    if (options.path) {
        const searchIndex = options.path.indexOf('?');
        if (searchIndex === -1) {
            options.pathname = options.path;
        }
        else {
            options.pathname = options.path.slice(0, searchIndex);
            options.search = options.path.slice(searchIndex + 1);
        }
    }
    if (Reflect.has(options, 'path')) {
        delete options.path;
    }
    for (const key of keys) {
        if (Reflect.has(options, key)) {
            url[key] = options[key].toString();
        }
    }
    if (options.searchParams) {
        if (typeof options.searchParams !== 'string' && !(options.searchParams instanceof url_1.URLSearchParams)) {
            validateSearchParams(options.searchParams);
        }
        (new url_1.URLSearchParams(options.searchParams)).forEach((value, key) => {
            url.searchParams.append(key, value);
        });
    }
    return url;
};


/***/ }),

/***/ 7681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const zlib = __webpack_require__(8761);
exports.default = typeof zlib.createBrotliDecompress === 'function';


/***/ }),

/***/ 1489:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const net = __webpack_require__(1631);
const unhandle_1 = __webpack_require__(3174);
const reentry = Symbol('reentry');
const noop = () => { };
class TimeoutError extends Error {
    constructor(threshold, event) {
        super(`Timeout awaiting '${event}' for ${threshold}ms`);
        this.event = event;
        this.name = 'TimeoutError';
        this.code = 'ETIMEDOUT';
    }
}
exports.TimeoutError = TimeoutError;
exports.default = (request, delays, options) => {
    if (Reflect.has(request, reentry)) {
        return noop;
    }
    request[reentry] = true;
    const cancelers = [];
    const { once, unhandleAll } = unhandle_1.default();
    const addTimeout = (delay, callback, event) => {
        var _a, _b;
        const timeout = setTimeout(callback, delay, delay, event);
        (_b = (_a = timeout).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        const cancel = () => {
            clearTimeout(timeout);
        };
        cancelers.push(cancel);
        return cancel;
    };
    const { host, hostname } = options;
    const timeoutHandler = (delay, event) => {
        if (request.socket) {
            // @ts-ignore We do not want the `socket hang up` error
            request.socket._hadError = true;
        }
        request.abort();
        request.emit('error', new TimeoutError(delay, event));
    };
    const cancelTimeouts = () => {
        for (const cancel of cancelers) {
            cancel();
        }
        unhandleAll();
    };
    request.once('error', error => {
        cancelTimeouts();
        // Save original behavior
        if (request.listenerCount('error') === 0) {
            throw error;
        }
    });
    request.once('abort', cancelTimeouts);
    once(request, 'response', (response) => {
        once(response, 'end', cancelTimeouts);
    });
    if (typeof delays.request !== 'undefined') {
        addTimeout(delays.request, timeoutHandler, 'request');
    }
    if (typeof delays.socket !== 'undefined') {
        const socketTimeoutHandler = () => {
            timeoutHandler(delays.socket, 'socket');
        };
        request.setTimeout(delays.socket, socketTimeoutHandler);
        // `request.setTimeout(0)` causes a memory leak.
        // We can just remove the listener and forget about the timer - it's unreffed.
        // See https://github.com/sindresorhus/got/issues/690
        cancelers.push(() => {
            request.removeListener('timeout', socketTimeoutHandler);
        });
    }
    once(request, 'socket', (socket) => {
        var _a;
        // @ts-ignore Node typings doesn't have this property
        const { socketPath } = request;
        /* istanbul ignore next: hard to test */
        if (socket.connecting) {
            const hasPath = Boolean((socketPath !== null && socketPath !== void 0 ? socketPath : net.isIP((_a = (hostname !== null && hostname !== void 0 ? hostname : host), (_a !== null && _a !== void 0 ? _a : ''))) !== 0));
            if (typeof delays.lookup !== 'undefined' && !hasPath && typeof socket.address().address === 'undefined') {
                const cancelTimeout = addTimeout(delays.lookup, timeoutHandler, 'lookup');
                once(socket, 'lookup', cancelTimeout);
            }
            if (typeof delays.connect !== 'undefined') {
                const timeConnect = () => addTimeout(delays.connect, timeoutHandler, 'connect');
                if (hasPath) {
                    once(socket, 'connect', timeConnect());
                }
                else {
                    once(socket, 'lookup', (error) => {
                        if (error === null) {
                            once(socket, 'connect', timeConnect());
                        }
                    });
                }
            }
            if (typeof delays.secureConnect !== 'undefined' && options.protocol === 'https:') {
                once(socket, 'connect', () => {
                    const cancelTimeout = addTimeout(delays.secureConnect, timeoutHandler, 'secureConnect');
                    once(socket, 'secureConnect', cancelTimeout);
                });
            }
        }
        if (typeof delays.send !== 'undefined') {
            const timeRequest = () => addTimeout(delays.send, timeoutHandler, 'send');
            /* istanbul ignore next: hard to test */
            if (socket.connecting) {
                once(socket, 'connect', () => {
                    once(request, 'upload-complete', timeRequest());
                });
            }
            else {
                once(request, 'upload-complete', timeRequest());
            }
        }
    });
    if (typeof delays.response !== 'undefined') {
        once(request, 'upload-complete', () => {
            const cancelTimeout = addTimeout(delays.response, timeoutHandler, 'response');
            once(request, 'response', cancelTimeout);
        });
    }
    return cancelTimeouts;
};


/***/ }),

/***/ 3174:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// When attaching listeners, it's very easy to forget about them.
// Especially if you do error handling and set timeouts.
// So instead of checking if it's proper to throw an error on every timeout ever,
// use this simple tool which will remove all listeners you have attached.
exports.default = () => {
    const handlers = [];
    return {
        once(origin, event, fn) {
            origin.once(event, fn);
            handlers.push({ origin, event, fn });
        },
        unhandleAll() {
            for (const handler of handlers) {
                const { origin, event, fn } = handler;
                origin.removeListener(event, fn);
            }
            handlers.length = 0;
        }
    };
};


/***/ }),

/***/ 8184:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(7678);
exports.default = (url) => {
    // Cast to URL
    url = url;
    const options = {
        protocol: url.protocol,
        hostname: is_1.default.string(url.hostname) && url.hostname.startsWith('[') ? url.hostname.slice(1, -1) : url.hostname,
        host: url.host,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        href: url.href,
        path: `${url.pathname || ''}${url.search || ''}`
    };
    if (is_1.default.string(url.port) && url.port.length !== 0) {
        options.port = Number(url.port);
    }
    if (url.username || url.password) {
        options.auth = `${url.username || ''}:${url.password || ''}`;
    }
    return options;
};


/***/ }),

/***/ 1621:
/***/ ((module) => {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ 1002:
/***/ ((module) => {

"use strict";

// rfc7231 6.1
const statusCodeCacheableByDefault = new Set([
    200,
    203,
    204,
    206,
    300,
    301,
    404,
    405,
    410,
    414,
    501,
]);

// This implementation does not understand partial responses (206)
const understoodStatuses = new Set([
    200,
    203,
    204,
    300,
    301,
    302,
    303,
    307,
    308,
    404,
    405,
    410,
    414,
    501,
]);

const errorStatusCodes = new Set([
    500,
    502,
    503, 
    504,
]);

const hopByHopHeaders = {
    date: true, // included, because we add Age update Date
    connection: true,
    'keep-alive': true,
    'proxy-authenticate': true,
    'proxy-authorization': true,
    te: true,
    trailer: true,
    'transfer-encoding': true,
    upgrade: true,
};

const excludedFromRevalidationUpdate = {
    // Since the old body is reused, it doesn't make sense to change properties of the body
    'content-length': true,
    'content-encoding': true,
    'transfer-encoding': true,
    'content-range': true,
};

function toNumberOrZero(s) {
    const n = parseInt(s, 10);
    return isFinite(n) ? n : 0;
}

// RFC 5861
function isErrorResponse(response) {
    // consider undefined response as faulty
    if(!response) {
        return true
    }
    return errorStatusCodes.has(response.status);
}

function parseCacheControl(header) {
    const cc = {};
    if (!header) return cc;

    // TODO: When there is more than one value present for a given directive (e.g., two Expires header fields, multiple Cache-Control: max-age directives),
    // the directive's value is considered invalid. Caches are encouraged to consider responses that have invalid freshness information to be stale
    const parts = header.trim().split(/\s*,\s*/); // TODO: lame parsing
    for (const part of parts) {
        const [k, v] = part.split(/\s*=\s*/, 2);
        cc[k] = v === undefined ? true : v.replace(/^"|"$/g, ''); // TODO: lame unquoting
    }

    return cc;
}

function formatCacheControl(cc) {
    let parts = [];
    for (const k in cc) {
        const v = cc[k];
        parts.push(v === true ? k : k + '=' + v);
    }
    if (!parts.length) {
        return undefined;
    }
    return parts.join(', ');
}

module.exports = class CachePolicy {
    constructor(
        req,
        res,
        {
            shared,
            cacheHeuristic,
            immutableMinTimeToLive,
            ignoreCargoCult,
            _fromObject,
        } = {}
    ) {
        if (_fromObject) {
            this._fromObject(_fromObject);
            return;
        }

        if (!res || !res.headers) {
            throw Error('Response headers missing');
        }
        this._assertRequestHasHeaders(req);

        this._responseTime = this.now();
        this._isShared = shared !== false;
        this._cacheHeuristic =
            undefined !== cacheHeuristic ? cacheHeuristic : 0.1; // 10% matches IE
        this._immutableMinTtl =
            undefined !== immutableMinTimeToLive
                ? immutableMinTimeToLive
                : 24 * 3600 * 1000;

        this._status = 'status' in res ? res.status : 200;
        this._resHeaders = res.headers;
        this._rescc = parseCacheControl(res.headers['cache-control']);
        this._method = 'method' in req ? req.method : 'GET';
        this._url = req.url;
        this._host = req.headers.host;
        this._noAuthorization = !req.headers.authorization;
        this._reqHeaders = res.headers.vary ? req.headers : null; // Don't keep all request headers if they won't be used
        this._reqcc = parseCacheControl(req.headers['cache-control']);

        // Assume that if someone uses legacy, non-standard uncecessary options they don't understand caching,
        // so there's no point stricly adhering to the blindly copy&pasted directives.
        if (
            ignoreCargoCult &&
            'pre-check' in this._rescc &&
            'post-check' in this._rescc
        ) {
            delete this._rescc['pre-check'];
            delete this._rescc['post-check'];
            delete this._rescc['no-cache'];
            delete this._rescc['no-store'];
            delete this._rescc['must-revalidate'];
            this._resHeaders = Object.assign({}, this._resHeaders, {
                'cache-control': formatCacheControl(this._rescc),
            });
            delete this._resHeaders.expires;
            delete this._resHeaders.pragma;
        }

        // When the Cache-Control header field is not present in a request, caches MUST consider the no-cache request pragma-directive
        // as having the same effect as if "Cache-Control: no-cache" were present (see Section 5.2.1).
        if (
            res.headers['cache-control'] == null &&
            /no-cache/.test(res.headers.pragma)
        ) {
            this._rescc['no-cache'] = true;
        }
    }

    now() {
        return Date.now();
    }

    storable() {
        // The "no-store" request directive indicates that a cache MUST NOT store any part of either this request or any response to it.
        return !!(
            !this._reqcc['no-store'] &&
            // A cache MUST NOT store a response to any request, unless:
            // The request method is understood by the cache and defined as being cacheable, and
            ('GET' === this._method ||
                'HEAD' === this._method ||
                ('POST' === this._method && this._hasExplicitExpiration())) &&
            // the response status code is understood by the cache, and
            understoodStatuses.has(this._status) &&
            // the "no-store" cache directive does not appear in request or response header fields, and
            !this._rescc['no-store'] &&
            // the "private" response directive does not appear in the response, if the cache is shared, and
            (!this._isShared || !this._rescc.private) &&
            // the Authorization header field does not appear in the request, if the cache is shared,
            (!this._isShared ||
                this._noAuthorization ||
                this._allowsStoringAuthenticated()) &&
            // the response either:
            // contains an Expires header field, or
            (this._resHeaders.expires ||
                // contains a max-age response directive, or
                // contains a s-maxage response directive and the cache is shared, or
                // contains a public response directive.
                this._rescc['max-age'] ||
                (this._isShared && this._rescc['s-maxage']) ||
                this._rescc.public ||
                // has a status code that is defined as cacheable by default
                statusCodeCacheableByDefault.has(this._status))
        );
    }

    _hasExplicitExpiration() {
        // 4.2.1 Calculating Freshness Lifetime
        return (
            (this._isShared && this._rescc['s-maxage']) ||
            this._rescc['max-age'] ||
            this._resHeaders.expires
        );
    }

    _assertRequestHasHeaders(req) {
        if (!req || !req.headers) {
            throw Error('Request headers missing');
        }
    }

    satisfiesWithoutRevalidation(req) {
        this._assertRequestHasHeaders(req);

        // When presented with a request, a cache MUST NOT reuse a stored response, unless:
        // the presented request does not contain the no-cache pragma (Section 5.4), nor the no-cache cache directive,
        // unless the stored response is successfully validated (Section 4.3), and
        const requestCC = parseCacheControl(req.headers['cache-control']);
        if (requestCC['no-cache'] || /no-cache/.test(req.headers.pragma)) {
            return false;
        }

        if (requestCC['max-age'] && this.age() > requestCC['max-age']) {
            return false;
        }

        if (
            requestCC['min-fresh'] &&
            this.timeToLive() < 1000 * requestCC['min-fresh']
        ) {
            return false;
        }

        // the stored response is either:
        // fresh, or allowed to be served stale
        if (this.stale()) {
            const allowsStale =
                requestCC['max-stale'] &&
                !this._rescc['must-revalidate'] &&
                (true === requestCC['max-stale'] ||
                    requestCC['max-stale'] > this.age() - this.maxAge());
            if (!allowsStale) {
                return false;
            }
        }

        return this._requestMatches(req, false);
    }

    _requestMatches(req, allowHeadMethod) {
        // The presented effective request URI and that of the stored response match, and
        return (
            (!this._url || this._url === req.url) &&
            this._host === req.headers.host &&
            // the request method associated with the stored response allows it to be used for the presented request, and
            (!req.method ||
                this._method === req.method ||
                (allowHeadMethod && 'HEAD' === req.method)) &&
            // selecting header fields nominated by the stored response (if any) match those presented, and
            this._varyMatches(req)
        );
    }

    _allowsStoringAuthenticated() {
        //  following Cache-Control response directives (Section 5.2.2) have such an effect: must-revalidate, public, and s-maxage.
        return (
            this._rescc['must-revalidate'] ||
            this._rescc.public ||
            this._rescc['s-maxage']
        );
    }

    _varyMatches(req) {
        if (!this._resHeaders.vary) {
            return true;
        }

        // A Vary header field-value of "*" always fails to match
        if (this._resHeaders.vary === '*') {
            return false;
        }

        const fields = this._resHeaders.vary
            .trim()
            .toLowerCase()
            .split(/\s*,\s*/);
        for (const name of fields) {
            if (req.headers[name] !== this._reqHeaders[name]) return false;
        }
        return true;
    }

    _copyWithoutHopByHopHeaders(inHeaders) {
        const headers = {};
        for (const name in inHeaders) {
            if (hopByHopHeaders[name]) continue;
            headers[name] = inHeaders[name];
        }
        // 9.1.  Connection
        if (inHeaders.connection) {
            const tokens = inHeaders.connection.trim().split(/\s*,\s*/);
            for (const name of tokens) {
                delete headers[name];
            }
        }
        if (headers.warning) {
            const warnings = headers.warning.split(/,/).filter(warning => {
                return !/^\s*1[0-9][0-9]/.test(warning);
            });
            if (!warnings.length) {
                delete headers.warning;
            } else {
                headers.warning = warnings.join(',').trim();
            }
        }
        return headers;
    }

    responseHeaders() {
        const headers = this._copyWithoutHopByHopHeaders(this._resHeaders);
        const age = this.age();

        // A cache SHOULD generate 113 warning if it heuristically chose a freshness
        // lifetime greater than 24 hours and the response's age is greater than 24 hours.
        if (
            age > 3600 * 24 &&
            !this._hasExplicitExpiration() &&
            this.maxAge() > 3600 * 24
        ) {
            headers.warning =
                (headers.warning ? `${headers.warning}, ` : '') +
                '113 - "rfc7234 5.5.4"';
        }
        headers.age = `${Math.round(age)}`;
        headers.date = new Date(this.now()).toUTCString();
        return headers;
    }

    /**
     * Value of the Date response header or current time if Date was invalid
     * @return timestamp
     */
    date() {
        const serverDate = Date.parse(this._resHeaders.date);
        if (isFinite(serverDate)) {
            return serverDate;
        }
        return this._responseTime;
    }

    /**
     * Value of the Age header, in seconds, updated for the current time.
     * May be fractional.
     *
     * @return Number
     */
    age() {
        let age = this._ageValue();

        const residentTime = (this.now() - this._responseTime) / 1000;
        return age + residentTime;
    }

    _ageValue() {
        return toNumberOrZero(this._resHeaders.age);
    }

    /**
     * Value of applicable max-age (or heuristic equivalent) in seconds. This counts since response's `Date`.
     *
     * For an up-to-date value, see `timeToLive()`.
     *
     * @return Number
     */
    maxAge() {
        if (!this.storable() || this._rescc['no-cache']) {
            return 0;
        }

        // Shared responses with cookies are cacheable according to the RFC, but IMHO it'd be unwise to do so by default
        // so this implementation requires explicit opt-in via public header
        if (
            this._isShared &&
            (this._resHeaders['set-cookie'] &&
                !this._rescc.public &&
                !this._rescc.immutable)
        ) {
            return 0;
        }

        if (this._resHeaders.vary === '*') {
            return 0;
        }

        if (this._isShared) {
            if (this._rescc['proxy-revalidate']) {
                return 0;
            }
            // if a response includes the s-maxage directive, a shared cache recipient MUST ignore the Expires field.
            if (this._rescc['s-maxage']) {
                return toNumberOrZero(this._rescc['s-maxage']);
            }
        }

        // If a response includes a Cache-Control field with the max-age directive, a recipient MUST ignore the Expires field.
        if (this._rescc['max-age']) {
            return toNumberOrZero(this._rescc['max-age']);
        }

        const defaultMinTtl = this._rescc.immutable ? this._immutableMinTtl : 0;

        const serverDate = this.date();
        if (this._resHeaders.expires) {
            const expires = Date.parse(this._resHeaders.expires);
            // A cache recipient MUST interpret invalid date formats, especially the value "0", as representing a time in the past (i.e., "already expired").
            if (Number.isNaN(expires) || expires < serverDate) {
                return 0;
            }
            return Math.max(defaultMinTtl, (expires - serverDate) / 1000);
        }

        if (this._resHeaders['last-modified']) {
            const lastModified = Date.parse(this._resHeaders['last-modified']);
            if (isFinite(lastModified) && serverDate > lastModified) {
                return Math.max(
                    defaultMinTtl,
                    ((serverDate - lastModified) / 1000) * this._cacheHeuristic
                );
            }
        }

        return defaultMinTtl;
    }

    timeToLive() {
        const age = this.maxAge() - this.age();
        const staleIfErrorAge = age + toNumberOrZero(this._rescc['stale-if-error']);
        const staleWhileRevalidateAge = age + toNumberOrZero(this._rescc['stale-while-revalidate']);
        return Math.max(0, age, staleIfErrorAge, staleWhileRevalidateAge) * 1000;
    }

    stale() {
        return this.maxAge() <= this.age();
    }

    _useStaleIfError() {
        return this.maxAge() + toNumberOrZero(this._rescc['stale-if-error']) > this.age();
    }

    useStaleWhileRevalidate() {
        return this.maxAge() + toNumberOrZero(this._rescc['stale-while-revalidate']) > this.age();
    }

    static fromObject(obj) {
        return new this(undefined, undefined, { _fromObject: obj });
    }

    _fromObject(obj) {
        if (this._responseTime) throw Error('Reinitialized');
        if (!obj || obj.v !== 1) throw Error('Invalid serialization');

        this._responseTime = obj.t;
        this._isShared = obj.sh;
        this._cacheHeuristic = obj.ch;
        this._immutableMinTtl =
            obj.imm !== undefined ? obj.imm : 24 * 3600 * 1000;
        this._status = obj.st;
        this._resHeaders = obj.resh;
        this._rescc = obj.rescc;
        this._method = obj.m;
        this._url = obj.u;
        this._host = obj.h;
        this._noAuthorization = obj.a;
        this._reqHeaders = obj.reqh;
        this._reqcc = obj.reqcc;
    }

    toObject() {
        return {
            v: 1,
            t: this._responseTime,
            sh: this._isShared,
            ch: this._cacheHeuristic,
            imm: this._immutableMinTtl,
            st: this._status,
            resh: this._resHeaders,
            rescc: this._rescc,
            m: this._method,
            u: this._url,
            h: this._host,
            a: this._noAuthorization,
            reqh: this._reqHeaders,
            reqcc: this._reqcc,
        };
    }

    /**
     * Headers for sending to the origin server to revalidate stale response.
     * Allows server to return 304 to allow reuse of the previous response.
     *
     * Hop by hop headers are always stripped.
     * Revalidation headers may be added or removed, depending on request.
     */
    revalidationHeaders(incomingReq) {
        this._assertRequestHasHeaders(incomingReq);
        const headers = this._copyWithoutHopByHopHeaders(incomingReq.headers);

        // This implementation does not understand range requests
        delete headers['if-range'];

        if (!this._requestMatches(incomingReq, true) || !this.storable()) {
            // revalidation allowed via HEAD
            // not for the same resource, or wasn't allowed to be cached anyway
            delete headers['if-none-match'];
            delete headers['if-modified-since'];
            return headers;
        }

        /* MUST send that entity-tag in any cache validation request (using If-Match or If-None-Match) if an entity-tag has been provided by the origin server. */
        if (this._resHeaders.etag) {
            headers['if-none-match'] = headers['if-none-match']
                ? `${headers['if-none-match']}, ${this._resHeaders.etag}`
                : this._resHeaders.etag;
        }

        // Clients MAY issue simple (non-subrange) GET requests with either weak validators or strong validators. Clients MUST NOT use weak validators in other forms of request.
        const forbidsWeakValidators =
            headers['accept-ranges'] ||
            headers['if-match'] ||
            headers['if-unmodified-since'] ||
            (this._method && this._method != 'GET');

        /* SHOULD send the Last-Modified value in non-subrange cache validation requests (using If-Modified-Since) if only a Last-Modified value has been provided by the origin server.
        Note: This implementation does not understand partial responses (206) */
        if (forbidsWeakValidators) {
            delete headers['if-modified-since'];

            if (headers['if-none-match']) {
                const etags = headers['if-none-match']
                    .split(/,/)
                    .filter(etag => {
                        return !/^\s*W\//.test(etag);
                    });
                if (!etags.length) {
                    delete headers['if-none-match'];
                } else {
                    headers['if-none-match'] = etags.join(',').trim();
                }
            }
        } else if (
            this._resHeaders['last-modified'] &&
            !headers['if-modified-since']
        ) {
            headers['if-modified-since'] = this._resHeaders['last-modified'];
        }

        return headers;
    }

    /**
     * Creates new CachePolicy with information combined from the previews response,
     * and the new revalidation response.
     *
     * Returns {policy, modified} where modified is a boolean indicating
     * whether the response body has been modified, and old cached body can't be used.
     *
     * @return {Object} {policy: CachePolicy, modified: Boolean}
     */
    revalidatedPolicy(request, response) {
        this._assertRequestHasHeaders(request);
        if(this._useStaleIfError() && isErrorResponse(response)) {  // I consider the revalidation request unsuccessful
          return {
            modified: false,
            matches: false,
            policy: this,
          };
        }
        if (!response || !response.headers) {
            throw Error('Response headers missing');
        }

        // These aren't going to be supported exactly, since one CachePolicy object
        // doesn't know about all the other cached objects.
        let matches = false;
        if (response.status !== undefined && response.status != 304) {
            matches = false;
        } else if (
            response.headers.etag &&
            !/^\s*W\//.test(response.headers.etag)
        ) {
            // "All of the stored responses with the same strong validator are selected.
            // If none of the stored responses contain the same strong validator,
            // then the cache MUST NOT use the new response to update any stored responses."
            matches =
                this._resHeaders.etag &&
                this._resHeaders.etag.replace(/^\s*W\//, '') ===
                    response.headers.etag;
        } else if (this._resHeaders.etag && response.headers.etag) {
            // "If the new response contains a weak validator and that validator corresponds
            // to one of the cache's stored responses,
            // then the most recent of those matching stored responses is selected for update."
            matches =
                this._resHeaders.etag.replace(/^\s*W\//, '') ===
                response.headers.etag.replace(/^\s*W\//, '');
        } else if (this._resHeaders['last-modified']) {
            matches =
                this._resHeaders['last-modified'] ===
                response.headers['last-modified'];
        } else {
            // If the new response does not include any form of validator (such as in the case where
            // a client generates an If-Modified-Since request from a source other than the Last-Modified
            // response header field), and there is only one stored response, and that stored response also
            // lacks a validator, then that stored response is selected for update.
            if (
                !this._resHeaders.etag &&
                !this._resHeaders['last-modified'] &&
                !response.headers.etag &&
                !response.headers['last-modified']
            ) {
                matches = true;
            }
        }

        if (!matches) {
            return {
                policy: new this.constructor(request, response),
                // Client receiving 304 without body, even if it's invalid/mismatched has no option
                // but to reuse a cached body. We don't have a good way to tell clients to do
                // error recovery in such case.
                modified: response.status != 304,
                matches: false,
            };
        }

        // use other header fields provided in the 304 (Not Modified) response to replace all instances
        // of the corresponding header fields in the stored response.
        const headers = {};
        for (const k in this._resHeaders) {
            headers[k] =
                k in response.headers && !excludedFromRevalidationUpdate[k]
                    ? response.headers[k]
                    : this._resHeaders[k];
        }

        const newResponse = Object.assign({}, response, {
            status: this._status,
            method: this._method,
            headers,
        });
        return {
            policy: new this.constructor(request, newResponse, {
                shared: this._isShared,
                cacheHeuristic: this._cacheHeuristic,
                immutableMinTimeToLive: this._immutableMinTtl,
            }),
            modified: false,
            matches: true,
        };
    }
};


/***/ }),

/***/ 2492:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrappy = __webpack_require__(2940)
var reqs = Object.create(null)
var once = __webpack_require__(1223)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),

/***/ 4124:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

try {
  var util = __webpack_require__(1669);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(8544);
}


/***/ }),

/***/ 8544:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 8885:
/***/ ((__unused_webpack_module, exports) => {

exports.parse = exports.decode = decode

exports.stringify = exports.encode = encode

exports.safe = safe
exports.unsafe = unsafe

var eol = typeof process !== 'undefined' &&
  process.platform === 'win32' ? '\r\n' : '\n'

function encode (obj, opt) {
  var children = []
  var out = ''

  if (typeof opt === 'string') {
    opt = {
      section: opt,
      whitespace: false,
    }
  } else {
    opt = opt || {}
    opt.whitespace = opt.whitespace === true
  }

  var separator = opt.whitespace ? ' = ' : '='

  Object.keys(obj).forEach(function (k, _, __) {
    var val = obj[k]
    if (val && Array.isArray(val)) {
      val.forEach(function (item) {
        out += safe(k + '[]') + separator + safe(item) + '\n'
      })
    } else if (val && typeof val === 'object')
      children.push(k)
    else
      out += safe(k) + separator + safe(val) + eol
  })

  if (opt.section && out.length)
    out = '[' + safe(opt.section) + ']' + eol + out

  children.forEach(function (k, _, __) {
    var nk = dotSplit(k).join('\\.')
    var section = (opt.section ? opt.section + '.' : '') + nk
    var child = encode(obj[k], {
      section: section,
      whitespace: opt.whitespace,
    })
    if (out.length && child.length)
      out += eol

    out += child
  })

  return out
}

function dotSplit (str) {
  return str.replace(/\1/g, '\u0002LITERAL\\1LITERAL\u0002')
    .replace(/\\\./g, '\u0001')
    .split(/\./).map(function (part) {
      return part.replace(/\1/g, '\\.')
        .replace(/\2LITERAL\\1LITERAL\2/g, '\u0001')
    })
}

function decode (str) {
  var out = {}
  var p = out
  var section = null
  //          section     |key      = value
  var re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i
  var lines = str.split(/[\r\n]+/g)

  lines.forEach(function (line, _, __) {
    if (!line || line.match(/^\s*[;#]/))
      return
    var match = line.match(re)
    if (!match)
      return
    if (match[1] !== undefined) {
      section = unsafe(match[1])
      if (section === '__proto__') {
        // not allowed
        // keep parsing the section, but don't attach it.
        p = {}
        return
      }
      p = out[section] = out[section] || {}
      return
    }
    var key = unsafe(match[2])
    if (key === '__proto__')
      return
    var value = match[3] ? unsafe(match[4]) : true
    switch (value) {
      case 'true':
      case 'false':
      case 'null': value = JSON.parse(value)
    }

    // Convert keys with '[]' suffix to an array
    if (key.length > 2 && key.slice(-2) === '[]') {
      key = key.substring(0, key.length - 2)
      if (key === '__proto__')
        return
      if (!p[key])
        p[key] = []
      else if (!Array.isArray(p[key]))
        p[key] = [p[key]]
    }

    // safeguard against resetting a previously defined
    // array by accidentally forgetting the brackets
    if (Array.isArray(p[key]))
      p[key].push(value)
    else
      p[key] = value
  })

  // {a:{y:1},"a.b":{x:2}} --> {a:{y:1,b:{x:2}}}
  // use a filter to return the keys that have to be deleted.
  Object.keys(out).filter(function (k, _, __) {
    if (!out[k] ||
      typeof out[k] !== 'object' ||
      Array.isArray(out[k]))
      return false

    // see if the parent section is also an object.
    // if so, add it to that, and mark this one for deletion
    var parts = dotSplit(k)
    var p = out
    var l = parts.pop()
    var nl = l.replace(/\\\./g, '.')
    parts.forEach(function (part, _, __) {
      if (part === '__proto__')
        return
      if (!p[part] || typeof p[part] !== 'object')
        p[part] = {}
      p = p[part]
    })
    if (p === out && nl === l)
      return false

    p[nl] = out[k]
    return true
  }).forEach(function (del, _, __) {
    delete out[del]
  })

  return out
}

function isQuoted (val) {
  return (val.charAt(0) === '"' && val.slice(-1) === '"') ||
    (val.charAt(0) === "'" && val.slice(-1) === "'")
}

function safe (val) {
  return (typeof val !== 'string' ||
    val.match(/[=\r\n]/) ||
    val.match(/^\[/) ||
    (val.length > 1 &&
     isQuoted(val)) ||
    val !== val.trim())
    ? JSON.stringify(val)
    : val.replace(/;/g, '\\;').replace(/#/g, '\\#')
}

function unsafe (val, doUnesc) {
  val = (val || '').trim()
  if (isQuoted(val)) {
    // remove the single quotes before calling JSON.parse
    if (val.charAt(0) === "'")
      val = val.substr(1, val.length - 2)

    try {
      val = JSON.parse(val)
    } catch (_) {}
  } else {
    // walk the val to find the first not-escaped ; character
    var esc = false
    var unesc = ''
    for (var i = 0, l = val.length; i < l; i++) {
      var c = val.charAt(i)
      if (esc) {
        if ('\\;#'.indexOf(c) !== -1)
          unesc += c
        else
          unesc += '\\' + c

        esc = false
      } else if (';#'.indexOf(c) !== -1)
        break
      else if (c === '\\')
        esc = true
      else
        unesc += c
    }
    if (esc)
      unesc += '\\'

    return unesc.trim()
  }
  return val
}


/***/ }),

/***/ 7126:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fs = __webpack_require__(5747)
var core
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = __webpack_require__(2001)
} else {
  core = __webpack_require__(9728)
}

module.exports = isexe
isexe.sync = sync

function isexe (path, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe(path, options || {}, function (er, is) {
        if (er) {
          reject(er)
        } else {
          resolve(is)
        }
      })
    })
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null
        is = false
      }
    }
    cb(er, is)
  })
}

function sync (path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}


/***/ }),

/***/ 9728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(5747)

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat, options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat, options) {
  var mod = stat.mode
  var uid = stat.uid
  var gid = stat.gid

  var myUid = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid()
  var myGid = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid()

  var u = parseInt('100', 8)
  var g = parseInt('010', 8)
  var o = parseInt('001', 8)
  var ug = u | g

  var ret = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0

  return ret
}


/***/ }),

/***/ 2001:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(5747)

function checkPathExt (path, options) {
  var pathext = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';')
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase()
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat (stat, path, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, path, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), path, options)
}


/***/ }),

/***/ 2820:
/***/ ((__unused_webpack_module, exports) => {

//TODO: handle reviver/dehydrate function like normal
//and handle indentation, like normal.
//if anyone needs this... please send pull request.

exports.stringify = function stringify (o) {
  if('undefined' == typeof o) return o

  if(o && Buffer.isBuffer(o))
    return JSON.stringify(':base64:' + o.toString('base64'))

  if(o && o.toJSON)
    o =  o.toJSON()

  if(o && 'object' === typeof o) {
    var s = ''
    var array = Array.isArray(o)
    s = array ? '[' : '{'
    var first = true

    for(var k in o) {
      var ignore = 'function' == typeof o[k] || (!array && 'undefined' === typeof o[k])
      if(Object.hasOwnProperty.call(o, k) && !ignore) {
        if(!first)
          s += ','
        first = false
        if (array) {
          if(o[k] == undefined)
            s += 'null'
          else
            s += stringify(o[k])
        } else if (o[k] !== void(0)) {
          s += stringify(k) + ':' + stringify(o[k])
        }
      }
    }

    s += array ? ']' : '}'

    return s
  } else if ('string' === typeof o) {
    return JSON.stringify(/^:/.test(o) ? ':' + o : o)
  } else if ('undefined' === typeof o) {
    return 'null';
  } else
    return JSON.stringify(o)
}

exports.parse = function (s) {
  return JSON.parse(s, function (key, value) {
    if('string' === typeof value) {
      if(/^:base64:/.test(value))
        return Buffer.from(value.substring(8), 'base64')
      else
        return /^:/.test(value) ? value.substring(1) : value 
    }
    return value
  })
}


/***/ }),

/***/ 1531:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const EventEmitter = __webpack_require__(8614);
const JSONB = __webpack_require__(2820);

const loadStore = opts => {
	const adapters = {
		redis: '@keyv/redis',
		mongodb: '@keyv/mongo',
		mongo: '@keyv/mongo',
		sqlite: '@keyv/sqlite',
		postgresql: '@keyv/postgres',
		postgres: '@keyv/postgres',
		mysql: '@keyv/mysql'
	};
	if (opts.adapter || opts.uri) {
		const adapter = opts.adapter || /^[^:]*/.exec(opts.uri)[0];
		return new (require(adapters[adapter]))(opts);
	}

	return new Map();
};

class Keyv extends EventEmitter {
	constructor(uri, opts) {
		super();
		this.opts = Object.assign(
			{
				namespace: 'keyv',
				serialize: JSONB.stringify,
				deserialize: JSONB.parse
			},
			(typeof uri === 'string') ? { uri } : uri,
			opts
		);

		if (!this.opts.store) {
			const adapterOpts = Object.assign({}, this.opts);
			this.opts.store = loadStore(adapterOpts);
		}

		if (typeof this.opts.store.on === 'function') {
			this.opts.store.on('error', err => this.emit('error', err));
		}

		this.opts.store.namespace = this.opts.namespace;
	}

	_getKeyPrefix(key) {
		return `${this.opts.namespace}:${key}`;
	}

	get(key, opts) {
		const keyPrefixed = this._getKeyPrefix(key);
		const { store } = this.opts;
		return Promise.resolve()
			.then(() => store.get(keyPrefixed))
			.then(data => {
				return (typeof data === 'string') ? this.opts.deserialize(data) : data;
			})
			.then(data => {
				if (data === undefined) {
					return undefined;
				}

				if (typeof data.expires === 'number' && Date.now() > data.expires) {
					this.delete(key);
					return undefined;
				}

				return (opts && opts.raw) ? data : data.value;
			});
	}

	set(key, value, ttl) {
		const keyPrefixed = this._getKeyPrefix(key);
		if (typeof ttl === 'undefined') {
			ttl = this.opts.ttl;
		}

		if (ttl === 0) {
			ttl = undefined;
		}

		const { store } = this.opts;

		return Promise.resolve()
			.then(() => {
				const expires = (typeof ttl === 'number') ? (Date.now() + ttl) : null;
				value = { value, expires };
				return this.opts.serialize(value);
			})
			.then(value => store.set(keyPrefixed, value, ttl))
			.then(() => true);
	}

	delete(key) {
		const keyPrefixed = this._getKeyPrefix(key);
		const { store } = this.opts;
		return Promise.resolve()
			.then(() => store.delete(keyPrefixed));
	}

	clear() {
		const { store } = this.opts;
		return Promise.resolve()
			.then(() => store.clear());
	}
}

module.exports = Keyv;


/***/ }),

/***/ 5215:
/***/ ((module) => {

"use strict";


const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;

const $ = {
	enabled: !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0',

	// modifiers
	reset: init(0, 0),
	bold: init(1, 22),
	dim: init(2, 22),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),

	// colors
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	grey: init(90, 39),

	// background colors
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49)
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (str.includes(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);

	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);

	return ctx;
}

function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			this.has.includes(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

module.exports = $;


/***/ }),

/***/ 9662:
/***/ ((module) => {

"use strict";

module.exports = object => {
	const result = {};

	for (const [key, value] of Object.entries(object)) {
		result[key.toLowerCase()] = value;
	}

	return result;
};


/***/ }),

/***/ 2610:
/***/ ((module) => {

"use strict";


// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage
const knownProperties = [
	'aborted',
	'complete',
	'destroy',
	'headers',
	'httpVersion',
	'httpVersionMinor',
	'httpVersionMajor',
	'method',
	'rawHeaders',
	'rawTrailers',
	'setTimeout',
	'socket',
	'statusCode',
	'statusMessage',
	'trailers',
	'url'
];

module.exports = (fromStream, toStream) => {
	const fromProperties = new Set(Object.keys(fromStream).concat(knownProperties));

	for (const property of fromProperties) {
		// Don't overwrite existing properties.
		if (property in toStream) {
			continue;
		}

		toStream[property] = typeof fromStream[property] === 'function' ? fromStream[property].bind(fromStream) : fromStream[property];
	}

	return toStream;
};


/***/ }),

/***/ 3973:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(5622)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(3717)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ 5871:
/***/ ((module) => {

module.exports = function (args, opts) {
    if (!opts) opts = {};
    
    var flags = { bools : {}, strings : {}, unknownFn: null };

    if (typeof opts['unknown'] === 'function') {
        flags.unknownFn = opts['unknown'];
    }

    if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
      flags.allBools = true;
    } else {
      [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
          flags.bools[key] = true;
      });
    }
    
    var aliases = {};
    Object.keys(opts.alias || {}).forEach(function (key) {
        aliases[key] = [].concat(opts.alias[key]);
        aliases[key].forEach(function (x) {
            aliases[x] = [key].concat(aliases[key].filter(function (y) {
                return x !== y;
            }));
        });
    });

    [].concat(opts.string).filter(Boolean).forEach(function (key) {
        flags.strings[key] = true;
        if (aliases[key]) {
            flags.strings[aliases[key]] = true;
        }
     });

    var defaults = opts['default'] || {};
    
    var argv = { _ : [] };
    Object.keys(flags.bools).forEach(function (key) {
        setArg(key, defaults[key] === undefined ? false : defaults[key]);
    });
    
    var notFlags = [];

    if (args.indexOf('--') !== -1) {
        notFlags = args.slice(args.indexOf('--')+1);
        args = args.slice(0, args.indexOf('--'));
    }

    function argDefined(key, arg) {
        return (flags.allBools && /^--[^=]+$/.test(arg)) ||
            flags.strings[key] || flags.bools[key] || aliases[key];
    }

    function setArg (key, val, arg) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg) === false) return;
        }

        var value = !flags.strings[key] && isNumber(val)
            ? Number(val) : val
        ;
        setKey(argv, key.split('.'), value);
        
        (aliases[key] || []).forEach(function (x) {
            setKey(argv, x.split('.'), value);
        });
    }

    function setKey (obj, keys, value) {
        var o = obj;
        for (var i = 0; i < keys.length-1; i++) {
            var key = keys[i];
            if (key === '__proto__') return;
            if (o[key] === undefined) o[key] = {};
            if (o[key] === Object.prototype || o[key] === Number.prototype
                || o[key] === String.prototype) o[key] = {};
            if (o[key] === Array.prototype) o[key] = [];
            o = o[key];
        }

        var key = keys[keys.length - 1];
        if (key === '__proto__') return;
        if (o === Object.prototype || o === Number.prototype
            || o === String.prototype) o = {};
        if (o === Array.prototype) o = [];
        if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {
            o[key] = value;
        }
        else if (Array.isArray(o[key])) {
            o[key].push(value);
        }
        else {
            o[key] = [ o[key], value ];
        }
    }
    
    function aliasIsBoolean(key) {
      return aliases[key].some(function (x) {
          return flags.bools[x];
      });
    }

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        
        if (/^--.+=/.test(arg)) {
            // Using [\s\S] instead of . because js doesn't support the
            // 'dotall' regex modifier. See:
            // http://stackoverflow.com/a/1068308/13216
            var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
            var key = m[1];
            var value = m[2];
            if (flags.bools[key]) {
                value = value !== 'false';
            }
            setArg(key, value, arg);
        }
        else if (/^--no-.+/.test(arg)) {
            var key = arg.match(/^--no-(.+)/)[1];
            setArg(key, false, arg);
        }
        else if (/^--.+/.test(arg)) {
            var key = arg.match(/^--(.+)/)[1];
            var next = args[i + 1];
            if (next !== undefined && !/^-/.test(next)
            && !flags.bools[key]
            && !flags.allBools
            && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                setArg(key, next, arg);
                i++;
            }
            else if (/^(true|false)$/.test(next)) {
                setArg(key, next === 'true', arg);
                i++;
            }
            else {
                setArg(key, flags.strings[key] ? '' : true, arg);
            }
        }
        else if (/^-[^-]+/.test(arg)) {
            var letters = arg.slice(1,-1).split('');
            
            var broken = false;
            for (var j = 0; j < letters.length; j++) {
                var next = arg.slice(j+2);
                
                if (next === '-') {
                    setArg(letters[j], next, arg)
                    continue;
                }
                
                if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                    setArg(letters[j], next.split('=')[1], arg);
                    broken = true;
                    break;
                }
                
                if (/[A-Za-z]/.test(letters[j])
                && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j], next, arg);
                    broken = true;
                    break;
                }
                
                if (letters[j+1] && letters[j+1].match(/\W/)) {
                    setArg(letters[j], arg.slice(j+2), arg);
                    broken = true;
                    break;
                }
                else {
                    setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
                }
            }
            
            var key = arg.slice(-1)[0];
            if (!broken && key !== '-') {
                if (args[i+1] && !/^(-|--)[^-]/.test(args[i+1])
                && !flags.bools[key]
                && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                    setArg(key, args[i+1], arg);
                    i++;
                }
                else if (args[i+1] && /^(true|false)$/.test(args[i+1])) {
                    setArg(key, args[i+1] === 'true', arg);
                    i++;
                }
                else {
                    setArg(key, flags.strings[key] ? '' : true, arg);
                }
            }
        }
        else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv._.push(
                    flags.strings['_'] || !isNumber(arg) ? arg : Number(arg)
                );
            }
            if (opts.stopEarly) {
                argv._.push.apply(argv._, args.slice(i + 1));
                break;
            }
        }
    }
    
    Object.keys(defaults).forEach(function (key) {
        if (!hasKey(argv, key.split('.'))) {
            setKey(argv, key.split('.'), defaults[key]);
            
            (aliases[key] || []).forEach(function (x) {
                setKey(argv, x.split('.'), defaults[key]);
            });
        }
    });
    
    if (opts['--']) {
        argv['--'] = new Array();
        notFlags.forEach(function(key) {
            argv['--'].push(key);
        });
    }
    else {
        notFlags.forEach(function(key) {
            argv._.push(key);
        });
    }

    return argv;
};

function hasKey (obj, keys) {
    var o = obj;
    keys.slice(0,-1).forEach(function (key) {
        o = (o[key] || {});
    });

    var key = keys[keys.length - 1];
    return key in o;
}

function isNumber (x) {
    if (typeof x === 'number') return true;
    if (/^0x[0-9a-f]+$/i.test(x)) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
}



/***/ }),

/***/ 1077:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const EE = __webpack_require__(8614)
const Yallist = __webpack_require__(665)
const SD = __webpack_require__(4304).StringDecoder

const EOF = Symbol('EOF')
const MAYBE_EMIT_END = Symbol('maybeEmitEnd')
const EMITTED_END = Symbol('emittedEnd')
const EMITTING_END = Symbol('emittingEnd')
const CLOSED = Symbol('closed')
const READ = Symbol('read')
const FLUSH = Symbol('flush')
const FLUSHCHUNK = Symbol('flushChunk')
const ENCODING = Symbol('encoding')
const DECODER = Symbol('decoder')
const FLOWING = Symbol('flowing')
const PAUSED = Symbol('paused')
const RESUME = Symbol('resume')
const BUFFERLENGTH = Symbol('bufferLength')
const BUFFERPUSH = Symbol('bufferPush')
const BUFFERSHIFT = Symbol('bufferShift')
const OBJECTMODE = Symbol('objectMode')
const DESTROYED = Symbol('destroyed')

// TODO remove when Node v8 support drops
const doIter = global._MP_NO_ITERATOR_SYMBOLS_  !== '1'
const ASYNCITERATOR = doIter && Symbol.asyncIterator
  || Symbol('asyncIterator not implemented')
const ITERATOR = doIter && Symbol.iterator
  || Symbol('iterator not implemented')

// Buffer in node 4.x < 4.5.0 doesn't have working Buffer.from
// or Buffer.alloc, and Buffer in node 10 deprecated the ctor.
// .M, this is fine .\^/M..
const B = Buffer.alloc ? Buffer
  : /* istanbul ignore next */ __webpack_require__(1867).Buffer

// events that mean 'the stream is over'
// these are treated specially, and re-emitted
// if they are listened for after emitting.
const isEndish = ev =>
  ev === 'end' ||
  ev === 'finish' ||
  ev === 'prefinish'

const isArrayBuffer = b => b instanceof ArrayBuffer ||
  typeof b === 'object' &&
  b.constructor &&
  b.constructor.name === 'ArrayBuffer' &&
  b.byteLength >= 0

const isArrayBufferView = b => !B.isBuffer(b) && ArrayBuffer.isView(b)

module.exports = class Minipass extends EE {
  constructor (options) {
    super()
    this[FLOWING] = false
    // whether we're explicitly paused
    this[PAUSED] = false
    this.pipes = new Yallist()
    this.buffer = new Yallist()
    this[OBJECTMODE] = options && options.objectMode || false
    if (this[OBJECTMODE])
      this[ENCODING] = null
    else
      this[ENCODING] = options && options.encoding || null
    if (this[ENCODING] === 'buffer')
      this[ENCODING] = null
    this[DECODER] = this[ENCODING] ? new SD(this[ENCODING]) : null
    this[EOF] = false
    this[EMITTED_END] = false
    this[EMITTING_END] = false
    this[CLOSED] = false
    this.writable = true
    this.readable = true
    this[BUFFERLENGTH] = 0
    this[DESTROYED] = false
  }

  get bufferLength () { return this[BUFFERLENGTH] }

  get encoding () { return this[ENCODING] }
  set encoding (enc) {
    if (this[OBJECTMODE])
      throw new Error('cannot set encoding in objectMode')

    if (this[ENCODING] && enc !== this[ENCODING] &&
        (this[DECODER] && this[DECODER].lastNeed || this[BUFFERLENGTH]))
      throw new Error('cannot change encoding')

    if (this[ENCODING] !== enc) {
      this[DECODER] = enc ? new SD(enc) : null
      if (this.buffer.length)
        this.buffer = this.buffer.map(chunk => this[DECODER].write(chunk))
    }

    this[ENCODING] = enc
  }

  setEncoding (enc) {
    this.encoding = enc
  }

  get objectMode () { return this[OBJECTMODE] }
  set objectMode (ॐ ) { this[OBJECTMODE] = this[OBJECTMODE] || !!ॐ  }

  write (chunk, encoding, cb) {
    if (this[EOF])
      throw new Error('write after end')

    if (this[DESTROYED]) {
      this.emit('error', Object.assign(
        new Error('Cannot call write after a stream was destroyed'),
        { code: 'ERR_STREAM_DESTROYED' }
      ))
      return true
    }

    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'

    if (!encoding)
      encoding = 'utf8'

    // convert array buffers and typed array views into buffers
    // at some point in the future, we may want to do the opposite!
    // leave strings and buffers as-is
    // anything else switches us into object mode
    if (!this[OBJECTMODE] && !B.isBuffer(chunk)) {
      if (isArrayBufferView(chunk))
        chunk = B.from(chunk.buffer, chunk.byteOffset, chunk.byteLength)
      else if (isArrayBuffer(chunk))
        chunk = B.from(chunk)
      else if (typeof chunk !== 'string')
        // use the setter so we throw if we have encoding set
        this.objectMode = true
    }

    // this ensures at this point that the chunk is a buffer or string
    // don't buffer it up or send it to the decoder
    if (!this.objectMode && !chunk.length) {
      const ret = this.flowing
      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable')
      if (cb)
        cb()
      return ret
    }

    // fast-path writing strings of same encoding to a stream with
    // an empty buffer, skipping the buffer/decoder dance
    if (typeof chunk === 'string' && !this[OBJECTMODE] &&
        // unless it is a string already ready for us to use
        !(encoding === this[ENCODING] && !this[DECODER].lastNeed)) {
      chunk = B.from(chunk, encoding)
    }

    if (B.isBuffer(chunk) && this[ENCODING])
      chunk = this[DECODER].write(chunk)

    try {
      return this.flowing
        ? (this.emit('data', chunk), this.flowing)
        : (this[BUFFERPUSH](chunk), false)
    } finally {
      if (this[BUFFERLENGTH] !== 0)
        this.emit('readable')
      if (cb)
        cb()
    }
  }

  read (n) {
    if (this[DESTROYED])
      return null

    try {
      if (this[BUFFERLENGTH] === 0 || n === 0 || n > this[BUFFERLENGTH])
        return null

      if (this[OBJECTMODE])
        n = null

      if (this.buffer.length > 1 && !this[OBJECTMODE]) {
        if (this.encoding)
          this.buffer = new Yallist([
            Array.from(this.buffer).join('')
          ])
        else
          this.buffer = new Yallist([
            B.concat(Array.from(this.buffer), this[BUFFERLENGTH])
          ])
      }

      return this[READ](n || null, this.buffer.head.value)
    } finally {
      this[MAYBE_EMIT_END]()
    }
  }

  [READ] (n, chunk) {
    if (n === chunk.length || n === null)
      this[BUFFERSHIFT]()
    else {
      this.buffer.head.value = chunk.slice(n)
      chunk = chunk.slice(0, n)
      this[BUFFERLENGTH] -= n
    }

    this.emit('data', chunk)

    if (!this.buffer.length && !this[EOF])
      this.emit('drain')

    return chunk
  }

  end (chunk, encoding, cb) {
    if (typeof chunk === 'function')
      cb = chunk, chunk = null
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'
    if (chunk)
      this.write(chunk, encoding)
    if (cb)
      this.once('end', cb)
    this[EOF] = true
    this.writable = false

    // if we haven't written anything, then go ahead and emit,
    // even if we're not reading.
    // we'll re-emit if a new 'end' listener is added anyway.
    // This makes MP more suitable to write-only use cases.
    if (this.flowing || !this[PAUSED])
      this[MAYBE_EMIT_END]()
    return this
  }

  // don't let the internal resume be overwritten
  [RESUME] () {
    if (this[DESTROYED])
      return

    this[PAUSED] = false
    this[FLOWING] = true
    this.emit('resume')
    if (this.buffer.length)
      this[FLUSH]()
    else if (this[EOF])
      this[MAYBE_EMIT_END]()
    else
      this.emit('drain')
  }

  resume () {
    return this[RESUME]()
  }

  pause () {
    this[FLOWING] = false
    this[PAUSED] = true
  }

  get destroyed () {
    return this[DESTROYED]
  }

  get flowing () {
    return this[FLOWING]
  }

  get paused () {
    return this[PAUSED]
  }

  [BUFFERPUSH] (chunk) {
    if (this[OBJECTMODE])
      this[BUFFERLENGTH] += 1
    else
      this[BUFFERLENGTH] += chunk.length
    return this.buffer.push(chunk)
  }

  [BUFFERSHIFT] () {
    if (this.buffer.length) {
      if (this[OBJECTMODE])
        this[BUFFERLENGTH] -= 1
      else
        this[BUFFERLENGTH] -= this.buffer.head.value.length
    }
    return this.buffer.shift()
  }

  [FLUSH] () {
    do {} while (this[FLUSHCHUNK](this[BUFFERSHIFT]()))

    if (!this.buffer.length && !this[EOF])
      this.emit('drain')
  }

  [FLUSHCHUNK] (chunk) {
    return chunk ? (this.emit('data', chunk), this.flowing) : false
  }

  pipe (dest, opts) {
    if (this[DESTROYED])
      return

    const ended = this[EMITTED_END]
    opts = opts || {}
    if (dest === process.stdout || dest === process.stderr)
      opts.end = false
    else
      opts.end = opts.end !== false

    const p = { dest: dest, opts: opts, ondrain: _ => this[RESUME]() }
    this.pipes.push(p)

    dest.on('drain', p.ondrain)
    this[RESUME]()
    // piping an ended stream ends immediately
    if (ended && p.opts.end)
      p.dest.end()
    return dest
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    try {
      return super.on(ev, fn)
    } finally {
      if (ev === 'data' && !this.pipes.length && !this.flowing)
        this[RESUME]()
      else if (isEndish(ev) && this[EMITTED_END]) {
        super.emit(ev)
        this.removeAllListeners(ev)
      }
    }
  }

  get emittedEnd () {
    return this[EMITTED_END]
  }

  [MAYBE_EMIT_END] () {
    if (!this[EMITTING_END] &&
        !this[EMITTED_END] &&
        !this[DESTROYED] &&
        this.buffer.length === 0 &&
        this[EOF]) {
      this[EMITTING_END] = true
      this.emit('end')
      this.emit('prefinish')
      this.emit('finish')
      if (this[CLOSED])
        this.emit('close')
      this[EMITTING_END] = false
    }
  }

  emit (ev, data) {
    // error and close are only events allowed after calling destroy()
    if (ev !== 'error' && ev !== 'close' && ev !== DESTROYED && this[DESTROYED])
      return
    else if (ev === 'data') {
      if (!data)
        return

      if (this.pipes.length)
        this.pipes.forEach(p =>
          p.dest.write(data) === false && this.pause())
    } else if (ev === 'end') {
      // only actual end gets this treatment
      if (this[EMITTED_END] === true)
        return

      this[EMITTED_END] = true
      this.readable = false

      if (this[DECODER]) {
        data = this[DECODER].end()
        if (data) {
          this.pipes.forEach(p => p.dest.write(data))
          super.emit('data', data)
        }
      }

      this.pipes.forEach(p => {
        p.dest.removeListener('drain', p.ondrain)
        if (p.opts.end)
          p.dest.end()
      })
    } else if (ev === 'close') {
      this[CLOSED] = true
      // don't emit close before 'end' and 'finish'
      if (!this[EMITTED_END] && !this[DESTROYED])
        return
    }

    // TODO: replace with a spread operator when Node v4 support drops
    const args = new Array(arguments.length)
    args[0] = ev
    args[1] = data
    if (arguments.length > 2) {
      for (let i = 2; i < arguments.length; i++) {
        args[i] = arguments[i]
      }
    }

    try {
      return super.emit.apply(this, args)
    } finally {
      if (!isEndish(ev))
        this[MAYBE_EMIT_END]()
      else
        this.removeAllListeners(ev)
    }
  }

  // const all = await stream.collect()
  collect () {
    const buf = []
    buf.dataLength = 0
    this.on('data', c => {
      buf.push(c)
      buf.dataLength += c.length
    })
    return this.promise().then(() => buf)
  }

  // const data = await stream.concat()
  concat () {
    return this[OBJECTMODE]
      ? Promise.reject(new Error('cannot concat in objectMode'))
      : this.collect().then(buf =>
          this[OBJECTMODE]
            ? Promise.reject(new Error('cannot concat in objectMode'))
            : this[ENCODING] ? buf.join('') : B.concat(buf, buf.dataLength))
  }

  // stream.promise().then(() => done, er => emitted error)
  promise () {
    return new Promise((resolve, reject) => {
      this.on(DESTROYED, () => reject(new Error('stream destroyed')))
      this.on('end', () => resolve())
      this.on('error', er => reject(er))
    })
  }

  // for await (let chunk of stream)
  [ASYNCITERATOR] () {
    const next = () => {
      const res = this.read()
      if (res !== null)
        return Promise.resolve({ done: false, value: res })

      if (this[EOF])
        return Promise.resolve({ done: true })

      let resolve = null
      let reject = null
      const onerr = er => {
        this.removeListener('data', ondata)
        this.removeListener('end', onend)
        reject(er)
      }
      const ondata = value => {
        this.removeListener('error', onerr)
        this.removeListener('end', onend)
        this.pause()
        resolve({ value: value, done: !!this[EOF] })
      }
      const onend = () => {
        this.removeListener('error', onerr)
        this.removeListener('data', ondata)
        resolve({ done: true })
      }
      const ondestroy = () => onerr(new Error('stream destroyed'))
      return new Promise((res, rej) => {
        reject = rej
        resolve = res
        this.once(DESTROYED, ondestroy)
        this.once('error', onerr)
        this.once('end', onend)
        this.once('data', ondata)
      })
    }

    return { next }
  }

  // for (let chunk of stream)
  [ITERATOR] () {
    const next = () => {
      const value = this.read()
      const done = value === null
      return { value, done }
    }
    return { next }
  }

  destroy (er) {
    if (this[DESTROYED]) {
      if (er)
        this.emit('error', er)
      else
        this.emit(DESTROYED)
      return this
    }

    this[DESTROYED] = true

    // throw away all buffered data, it's never coming out
    this.buffer = new Yallist()
    this[BUFFERLENGTH] = 0

    if (typeof this.close === 'function' && !this[CLOSED])
      this.close()

    if (er)
      this.emit('error', er)
    else // if no error to emit, still reject pending promises
      this.emit(DESTROYED)

    return this
  }

  static isStream (s) {
    return !!s && (s instanceof Minipass || s instanceof EE && (
      typeof s.pipe === 'function' || // readable
      (typeof s.write === 'function' && typeof s.end === 'function') // writable
    ))
  }
}


/***/ }),

/***/ 6769:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Update with any zlib constants that are added or changed in the future.
// Node v6 didn't export this, so we just hard code the version and rely
// on all the other hard-coded values from zlib v4736.  When node v6
// support drops, we can just export the realZlibConstants object.
const realZlibConstants = __webpack_require__(8761).constants ||
  /* istanbul ignore next */ { ZLIB_VERNUM: 4736 }

module.exports = Object.freeze(Object.assign(Object.create(null), {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_DEFAULT_MODE: 0,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_MIN_WINDOW_BITS: 10,
  BROTLI_MAX_WINDOW_BITS: 24,
  BROTLI_LARGE_MAX_WINDOW_BITS: 30,
  BROTLI_DEFAULT_WINDOW: 22,
  BROTLI_MIN_INPUT_BLOCK_BITS: 16,
  BROTLI_MAX_INPUT_BLOCK_BITS: 24,
  BROTLI_PARAM_MODE: 0,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_PARAM_LGBLOCK: 3,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
  BROTLI_PARAM_SIZE_HINT: 5,
  BROTLI_PARAM_LARGE_WINDOW: 6,
  BROTLI_PARAM_NPOSTFIX: 7,
  BROTLI_PARAM_NDIRECT: 8,
  BROTLI_DECODER_RESULT_ERROR: 0,
  BROTLI_DECODER_RESULT_SUCCESS: 1,
  BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
  BROTLI_DECODER_NO_ERROR: 0,
  BROTLI_DECODER_SUCCESS: 1,
  BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
  BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
  BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
  BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
  BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
  BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
  BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
  BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
  BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
  BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
  BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
  BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
  BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
  BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
  BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
  BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
  BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
  BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
  BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
  BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
  BROTLI_DECODER_ERROR_UNREACHABLE: -31,
}, realZlibConstants))


/***/ }),

/***/ 3486:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const assert = __webpack_require__(2357)
const Buffer = __webpack_require__(4293).Buffer
const realZlib = __webpack_require__(8761)

const constants = exports.constants = __webpack_require__(6769)
const Minipass = __webpack_require__(1077)

const OriginalBufferConcat = Buffer.concat

class ZlibError extends Error {
  constructor (err) {
    super('zlib: ' + err.message)
    this.code = err.code
    this.errno = err.errno
    /* istanbul ignore if */
    if (!this.code)
      this.code = 'ZLIB_ERROR'

    this.message = 'zlib: ' + err.message
    Error.captureStackTrace(this, this.constructor)
  }

  get name () {
    return 'ZlibError'
  }
}

// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.
const _opts = Symbol('opts')
const _flushFlag = Symbol('flushFlag')
const _finishFlushFlag = Symbol('finishFlushFlag')
const _fullFlushFlag = Symbol('fullFlushFlag')
const _handle = Symbol('handle')
const _onError = Symbol('onError')
const _sawError = Symbol('sawError')
const _level = Symbol('level')
const _strategy = Symbol('strategy')
const _ended = Symbol('ended')
const _defaultFullFlush = Symbol('_defaultFullFlush')

class ZlibBase extends Minipass {
  constructor (opts, mode) {
    if (!opts || typeof opts !== 'object')
      throw new TypeError('invalid options for ZlibBase constructor')

    super(opts)
    this[_ended] = false
    this[_opts] = opts

    this[_flushFlag] = opts.flush
    this[_finishFlushFlag] = opts.finishFlush
    // this will throw if any options are invalid for the class selected
    try {
      this[_handle] = new realZlib[mode](opts)
    } catch (er) {
      // make sure that all errors get decorated properly
      throw new ZlibError(er)
    }

    this[_onError] = (err) => {
      this[_sawError] = true
      // there is no way to cleanly recover.
      // continuing only obscures problems.
      this.close()
      this.emit('error', err)
    }

    this[_handle].on('error', er => this[_onError](new ZlibError(er)))
    this.once('end', () => this.close)
  }

  close () {
    if (this[_handle]) {
      this[_handle].close()
      this[_handle] = null
      this.emit('close')
    }
  }

  reset () {
    if (!this[_sawError]) {
      assert(this[_handle], 'zlib binding closed')
      return this[_handle].reset()
    }
  }

  flush (flushFlag) {
    if (this.ended)
      return

    if (typeof flushFlag !== 'number')
      flushFlag = this[_fullFlushFlag]
    this.write(Object.assign(Buffer.alloc(0), { [_flushFlag]: flushFlag }))
  }

  end (chunk, encoding, cb) {
    if (chunk)
      this.write(chunk, encoding)
    this.flush(this[_finishFlushFlag])
    this[_ended] = true
    return super.end(null, null, cb)
  }

  get ended () {
    return this[_ended]
  }

  write (chunk, encoding, cb) {
    // process the chunk using the sync process
    // then super.write() all the outputted chunks
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'

    if (typeof chunk === 'string')
      chunk = Buffer.from(chunk, encoding)

    if (this[_sawError])
      return
    assert(this[_handle], 'zlib binding closed')

    // _processChunk tries to .close() the native handle after it's done, so we
    // intercept that by temporarily making it a no-op.
    const nativeHandle = this[_handle]._handle
    const originalNativeClose = nativeHandle.close
    nativeHandle.close = () => {}
    const originalClose = this[_handle].close
    this[_handle].close = () => {}
    // It also calls `Buffer.concat()` at the end, which may be convenient
    // for some, but which we are not interested in as it slows us down.
    Buffer.concat = (args) => args
    let result
    try {
      const flushFlag = typeof chunk[_flushFlag] === 'number'
        ? chunk[_flushFlag] : this[_flushFlag]
      result = this[_handle]._processChunk(chunk, flushFlag)
      // if we don't throw, reset it back how it was
      Buffer.concat = OriginalBufferConcat
    } catch (err) {
      // or if we do, put Buffer.concat() back before we emit error
      // Error events call into user code, which may call Buffer.concat()
      Buffer.concat = OriginalBufferConcat
      this[_onError](new ZlibError(err))
    } finally {
      if (this[_handle]) {
        // Core zlib resets `_handle` to null after attempting to close the
        // native handle. Our no-op handler prevented actual closure, but we
        // need to restore the `._handle` property.
        this[_handle]._handle = nativeHandle
        nativeHandle.close = originalNativeClose
        this[_handle].close = originalClose
        // `_processChunk()` adds an 'error' listener. If we don't remove it
        // after each call, these handlers start piling up.
        this[_handle].removeAllListeners('error')
      }
    }

    let writeReturn
    if (result) {
      if (Array.isArray(result) && result.length > 0) {
        // The first buffer is always `handle._outBuffer`, which would be
        // re-used for later invocations; so, we always have to copy that one.
        writeReturn = super.write(Buffer.from(result[0]))
        for (let i = 1; i < result.length; i++) {
          writeReturn = super.write(result[i])
        }
      } else {
        writeReturn = super.write(Buffer.from(result))
      }
    }

    if (cb)
      cb()
    return writeReturn
  }
}

class Zlib extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {}

    opts.flush = opts.flush || constants.Z_NO_FLUSH
    opts.finishFlush = opts.finishFlush || constants.Z_FINISH
    super(opts, mode)

    this[_fullFlushFlag] = constants.Z_FULL_FLUSH
    this[_level] = opts.level
    this[_strategy] = opts.strategy
  }

  params (level, strategy) {
    if (this[_sawError])
      return

    if (!this[_handle])
      throw new Error('cannot switch params when binding is closed')

    // no way to test this without also not supporting params at all
    /* istanbul ignore if */
    if (!this[_handle].params)
      throw new Error('not supported in this implementation')

    if (this[_level] !== level || this[_strategy] !== strategy) {
      this.flush(constants.Z_SYNC_FLUSH)
      assert(this[_handle], 'zlib binding closed')
      // .params() calls .flush(), but the latter is always async in the
      // core zlib. We override .flush() temporarily to intercept that and
      // flush synchronously.
      const origFlush = this[_handle].flush
      this[_handle].flush = (flushFlag, cb) => {
        this.flush(flushFlag)
        cb()
      }
      try {
        this[_handle].params(level, strategy)
      } finally {
        this[_handle].flush = origFlush
      }
      /* istanbul ignore else */
      if (this[_handle]) {
        this[_level] = level
        this[_strategy] = strategy
      }
    }
  }
}

// minimal 2-byte header
class Deflate extends Zlib {
  constructor (opts) {
    super(opts, 'Deflate')
  }
}

class Inflate extends Zlib {
  constructor (opts) {
    super(opts, 'Inflate')
  }
}

// gzip - bigger header, same deflate compression
class Gzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gzip')
  }
}

class Gunzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gunzip')
  }
}

// raw - no header
class DeflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'DeflateRaw')
  }
}

class InflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'InflateRaw')
  }
}

// auto-detect header.
class Unzip extends Zlib {
  constructor (opts) {
    super(opts, 'Unzip')
  }
}

class Brotli extends ZlibBase {
  constructor (opts, mode) {
    opts = opts || {}

    opts.flush = opts.flush || constants.BROTLI_OPERATION_PROCESS
    opts.finishFlush = opts.finishFlush || constants.BROTLI_OPERATION_FINISH

    super(opts, mode)

    this[_fullFlushFlag] = constants.BROTLI_OPERATION_FLUSH
  }
}

class BrotliCompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliCompress')
  }
}

class BrotliDecompress extends Brotli {
  constructor (opts) {
    super(opts, 'BrotliDecompress')
  }
}

exports.Deflate = Deflate
exports.Inflate = Inflate
exports.Gzip = Gzip
exports.Gunzip = Gunzip
exports.DeflateRaw = DeflateRaw
exports.InflateRaw = InflateRaw
exports.Unzip = Unzip
/* istanbul ignore else */
if (typeof realZlib.BrotliCompress === 'function') {
  exports.BrotliCompress = BrotliCompress
  exports.BrotliDecompress = BrotliDecompress
} else {
  exports.BrotliCompress = exports.BrotliDecompress = class {
    constructor () {
      throw new Error('Brotli is not supported in this version of Node.js')
    }
  }
}


/***/ }),

/***/ 6186:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(5622);
var fs = __webpack_require__(5747);
var _0777 = parseInt('0777', 8);

module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

function mkdirP (p, opts, f, made) {
    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    }
    else if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }
    
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    
    if (mode === undefined) {
        mode = _0777
    }
    if (!made) made = null;
    
    var cb = f || function () {};
    p = path.resolve(p);
    
    xfs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                if (path.dirname(p) === p) return cb(er);
                mkdirP(path.dirname(p), opts, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, opts, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                xfs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync (p, opts, made) {
    if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }
    
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    
    if (mode === undefined) {
        mode = _0777
    }
    if (!made) made = null;

    p = path.resolve(p);

    try {
        xfs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = sync(path.dirname(p), opts, made);
                sync(p, opts, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = xfs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};


/***/ }),

/***/ 8560:
/***/ ((module) => {

"use strict";


/**
 * Tries to execute a function and discards any error that occurs.
 * @param {Function} fn - Function that might or might not throw an error.
 * @returns {?*} Return-value of the function when no error occurred.
 */
module.exports = function(fn) {

	try { return fn() } catch (e) {}

}

/***/ }),

/***/ 7952:
/***/ ((module) => {

"use strict";


// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
const DATA_URL_DEFAULT_MIME_TYPE = 'text/plain';
const DATA_URL_DEFAULT_CHARSET = 'us-ascii';

const testParameter = (name, filters) => {
	return filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);
};

const normalizeDataURL = (urlString, {stripHash}) => {
	const match = /^data:(?<type>[^,]*?),(?<data>[^#]*?)(?:#(?<hash>.*))?$/.exec(urlString);

	if (!match) {
		throw new Error(`Invalid URL: ${urlString}`);
	}

	let {type, data, hash} = match.groups;
	const mediaType = type.split(';');
	hash = stripHash ? '' : hash;

	let isBase64 = false;
	if (mediaType[mediaType.length - 1] === 'base64') {
		mediaType.pop();
		isBase64 = true;
	}

	// Lowercase MIME type
	const mimeType = (mediaType.shift() || '').toLowerCase();
	const attributes = mediaType
		.map(attribute => {
			let [key, value = ''] = attribute.split('=').map(string => string.trim());

			// Lowercase `charset`
			if (key === 'charset') {
				value = value.toLowerCase();

				if (value === DATA_URL_DEFAULT_CHARSET) {
					return '';
				}
			}

			return `${key}${value ? `=${value}` : ''}`;
		})
		.filter(Boolean);

	const normalizedMediaType = [
		...attributes
	];

	if (isBase64) {
		normalizedMediaType.push('base64');
	}

	if (normalizedMediaType.length !== 0 || (mimeType && mimeType !== DATA_URL_DEFAULT_MIME_TYPE)) {
		normalizedMediaType.unshift(mimeType);
	}

	return `data:${normalizedMediaType.join(';')},${isBase64 ? data.trim() : data}${hash ? `#${hash}` : ''}`;
};

const normalizeUrl = (urlString, options) => {
	options = {
		defaultProtocol: 'http:',
		normalizeProtocol: true,
		forceHttp: false,
		forceHttps: false,
		stripAuthentication: true,
		stripHash: false,
		stripTextFragment: true,
		stripWWW: true,
		removeQueryParameters: [/^utm_\w+/i],
		removeTrailingSlash: true,
		removeSingleSlash: true,
		removeDirectoryIndex: false,
		sortQueryParameters: true,
		...options
	};

	urlString = urlString.trim();

	// Data URL
	if (/^data:/i.test(urlString)) {
		return normalizeDataURL(urlString, options);
	}

	if (/^view-source:/i.test(urlString)) {
		throw new Error('`view-source:` is not supported as it is a non-standard protocol');
	}

	const hasRelativeProtocol = urlString.startsWith('//');
	const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString);

	// Prepend protocol
	if (!isRelativeUrl) {
		urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, options.defaultProtocol);
	}

	const urlObj = new URL(urlString);

	if (options.forceHttp && options.forceHttps) {
		throw new Error('The `forceHttp` and `forceHttps` options cannot be used together');
	}

	if (options.forceHttp && urlObj.protocol === 'https:') {
		urlObj.protocol = 'http:';
	}

	if (options.forceHttps && urlObj.protocol === 'http:') {
		urlObj.protocol = 'https:';
	}

	// Remove auth
	if (options.stripAuthentication) {
		urlObj.username = '';
		urlObj.password = '';
	}

	// Remove hash
	if (options.stripHash) {
		urlObj.hash = '';
	} else if (options.stripTextFragment) {
		urlObj.hash = urlObj.hash.replace(/#?:~:text.*?$/i, '');
	}

	// Remove duplicate slashes if not preceded by a protocol
	if (urlObj.pathname) {
		urlObj.pathname = urlObj.pathname.replace(/(?<!\b(?:[a-z][a-z\d+\-.]{1,50}:))\/{2,}/g, '/');
	}

	// Decode URI octets
	if (urlObj.pathname) {
		try {
			urlObj.pathname = decodeURI(urlObj.pathname);
		} catch (_) {}
	}

	// Remove directory index
	if (options.removeDirectoryIndex === true) {
		options.removeDirectoryIndex = [/^index\.[a-z]+$/];
	}

	if (Array.isArray(options.removeDirectoryIndex) && options.removeDirectoryIndex.length > 0) {
		let pathComponents = urlObj.pathname.split('/');
		const lastComponent = pathComponents[pathComponents.length - 1];

		if (testParameter(lastComponent, options.removeDirectoryIndex)) {
			pathComponents = pathComponents.slice(0, pathComponents.length - 1);
			urlObj.pathname = pathComponents.slice(1).join('/') + '/';
		}
	}

	if (urlObj.hostname) {
		// Remove trailing dot
		urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

		// Remove `www.`
		if (options.stripWWW && /^www\.(?!www\.)(?:[a-z\-\d]{1,63})\.(?:[a-z.\-\d]{2,63})$/.test(urlObj.hostname)) {
			// Each label should be max 63 at length (min: 1).
			// Source: https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names
			// Each TLD should be up to 63 characters long (min: 2).
			// It is technically possible to have a single character TLD, but none currently exist.
			urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
		}
	}

	// Remove query unwanted parameters
	if (Array.isArray(options.removeQueryParameters)) {
		for (const key of [...urlObj.searchParams.keys()]) {
			if (testParameter(key, options.removeQueryParameters)) {
				urlObj.searchParams.delete(key);
			}
		}
	}

	if (options.removeQueryParameters === true) {
		urlObj.search = '';
	}

	// Sort query parameters
	if (options.sortQueryParameters) {
		urlObj.searchParams.sort();
	}

	if (options.removeTrailingSlash) {
		urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
	}

	const oldUrlString = urlString;

	// Take advantage of many of the Node `url` normalizations
	urlString = urlObj.toString();

	if (!options.removeSingleSlash && urlObj.pathname === '/' && !oldUrlString.endsWith('/') && urlObj.hash === '') {
		urlString = urlString.replace(/\/$/, '');
	}

	// Remove ending `/` unless removeSingleSlash is false
	if ((options.removeTrailingSlash || urlObj.pathname === '/') && urlObj.hash === '' && options.removeSingleSlash) {
		urlString = urlString.replace(/\/$/, '');
	}

	// Restore relative protocol, if applicable
	if (hasRelativeProtocol && !options.normalizeProtocol) {
		urlString = urlString.replace(/^http:\/\//, '//');
	}

	// Remove http/https
	if (options.stripProtocol) {
		urlString = urlString.replace(/^(?:https?:)?\/\//, '');
	}

	return urlString;
};

module.exports = normalizeUrl;


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrappy = __webpack_require__(2940)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 9072:
/***/ ((module) => {

"use strict";


class CancelError extends Error {
	constructor(reason) {
		super(reason || 'Promise was canceled');
		this.name = 'CancelError';
	}

	get isCanceled() {
		return true;
	}
}

class PCancelable {
	static fn(userFn) {
		return (...arguments_) => {
			return new PCancelable((resolve, reject, onCancel) => {
				arguments_.push(onCancel);
				// eslint-disable-next-line promise/prefer-await-to-then
				userFn(...arguments_).then(resolve, reject);
			});
		};
	}

	constructor(executor) {
		this._cancelHandlers = [];
		this._isPending = true;
		this._isCanceled = false;
		this._rejectOnCancel = true;

		this._promise = new Promise((resolve, reject) => {
			this._reject = reject;

			const onResolve = value => {
				if (!this._isCanceled || !onCancel.shouldReject) {
					this._isPending = false;
					resolve(value);
				}
			};

			const onReject = error => {
				this._isPending = false;
				reject(error);
			};

			const onCancel = handler => {
				if (!this._isPending) {
					throw new Error('The `onCancel` handler was attached after the promise settled.');
				}

				this._cancelHandlers.push(handler);
			};

			Object.defineProperties(onCancel, {
				shouldReject: {
					get: () => this._rejectOnCancel,
					set: boolean => {
						this._rejectOnCancel = boolean;
					}
				}
			});

			return executor(onResolve, onReject, onCancel);
		});
	}

	then(onFulfilled, onRejected) {
		// eslint-disable-next-line promise/prefer-await-to-then
		return this._promise.then(onFulfilled, onRejected);
	}

	catch(onRejected) {
		return this._promise.catch(onRejected);
	}

	finally(onFinally) {
		return this._promise.finally(onFinally);
	}

	cancel(reason) {
		if (!this._isPending || this._isCanceled) {
			return;
		}

		this._isCanceled = true;

		if (this._cancelHandlers.length > 0) {
			try {
				for (const handler of this._cancelHandlers) {
					handler();
				}
			} catch (error) {
				this._reject(error);
				return;
			}
		}

		if (this._rejectOnCancel) {
			this._reject(new CancelError(reason));
		}
	}

	get isCanceled() {
		return this._isCanceled;
	}
}

Object.setPrototypeOf(PCancelable.prototype, Promise.prototype);

module.exports = PCancelable;
module.exports.CancelError = CancelError;


/***/ }),

/***/ 4568:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const pTimeout = __webpack_require__(6424);

const symbolAsyncIterator = Symbol.asyncIterator || '@@asyncIterator';

const normalizeEmitter = emitter => {
	const addListener = emitter.on || emitter.addListener || emitter.addEventListener;
	const removeListener = emitter.off || emitter.removeListener || emitter.removeEventListener;

	if (!addListener || !removeListener) {
		throw new TypeError('Emitter is not compatible');
	}

	return {
		addListener: addListener.bind(emitter),
		removeListener: removeListener.bind(emitter)
	};
};

const toArray = value => Array.isArray(value) ? value : [value];

const multiple = (emitter, event, options) => {
	let cancel;
	const ret = new Promise((resolve, reject) => {
		options = {
			rejectionEvents: ['error'],
			multiArgs: false,
			resolveImmediately: false,
			...options
		};

		if (!(options.count >= 0 && (options.count === Infinity || Number.isInteger(options.count)))) {
			throw new TypeError('The `count` option should be at least 0 or more');
		}

		// Allow multiple events
		const events = toArray(event);

		const items = [];
		const {addListener, removeListener} = normalizeEmitter(emitter);

		const onItem = (...args) => {
			const value = options.multiArgs ? args : args[0];

			if (options.filter && !options.filter(value)) {
				return;
			}

			items.push(value);

			if (options.count === items.length) {
				cancel();
				resolve(items);
			}
		};

		const rejectHandler = error => {
			cancel();
			reject(error);
		};

		cancel = () => {
			for (const event of events) {
				removeListener(event, onItem);
			}

			for (const rejectionEvent of options.rejectionEvents) {
				removeListener(rejectionEvent, rejectHandler);
			}
		};

		for (const event of events) {
			addListener(event, onItem);
		}

		for (const rejectionEvent of options.rejectionEvents) {
			addListener(rejectionEvent, rejectHandler);
		}

		if (options.resolveImmediately) {
			resolve(items);
		}
	});

	ret.cancel = cancel;

	if (typeof options.timeout === 'number') {
		const timeout = pTimeout(ret, options.timeout);
		timeout.cancel = cancel;
		return timeout;
	}

	return ret;
};

const pEvent = (emitter, event, options) => {
	if (typeof options === 'function') {
		options = {filter: options};
	}

	options = {
		...options,
		count: 1,
		resolveImmediately: false
	};

	const arrayPromise = multiple(emitter, event, options);
	const promise = arrayPromise.then(array => array[0]); // eslint-disable-line promise/prefer-await-to-then
	promise.cancel = arrayPromise.cancel;

	return promise;
};

module.exports = pEvent;
// TODO: Remove this for the next major release
module.exports.default = pEvent;

module.exports.multiple = multiple;

module.exports.iterator = (emitter, event, options) => {
	if (typeof options === 'function') {
		options = {filter: options};
	}

	// Allow multiple events
	const events = toArray(event);

	options = {
		rejectionEvents: ['error'],
		resolutionEvents: [],
		limit: Infinity,
		multiArgs: false,
		...options
	};

	const {limit} = options;
	const isValidLimit = limit >= 0 && (limit === Infinity || Number.isInteger(limit));
	if (!isValidLimit) {
		throw new TypeError('The `limit` option should be a non-negative integer or Infinity');
	}

	if (limit === 0) {
		// Return an empty async iterator to avoid any further cost
		return {
			[Symbol.asyncIterator]() {
				return this;
			},
			async next() {
				return {
					done: true,
					value: undefined
				};
			}
		};
	}

	const {addListener, removeListener} = normalizeEmitter(emitter);

	let isDone = false;
	let error;
	let hasPendingError = false;
	const nextQueue = [];
	const valueQueue = [];
	let eventCount = 0;
	let isLimitReached = false;

	const valueHandler = (...args) => {
		eventCount++;
		isLimitReached = eventCount === limit;

		const value = options.multiArgs ? args : args[0];

		if (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();

			resolve({done: false, value});

			if (isLimitReached) {
				cancel();
			}

			return;
		}

		valueQueue.push(value);

		if (isLimitReached) {
			cancel();
		}
	};

	const cancel = () => {
		isDone = true;
		for (const event of events) {
			removeListener(event, valueHandler);
		}

		for (const rejectionEvent of options.rejectionEvents) {
			removeListener(rejectionEvent, rejectHandler);
		}

		for (const resolutionEvent of options.resolutionEvents) {
			removeListener(resolutionEvent, resolveHandler);
		}

		while (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();
			resolve({done: true, value: undefined});
		}
	};

	const rejectHandler = (...args) => {
		error = options.multiArgs ? args : args[0];

		if (nextQueue.length > 0) {
			const {reject} = nextQueue.shift();
			reject(error);
		} else {
			hasPendingError = true;
		}

		cancel();
	};

	const resolveHandler = (...args) => {
		const value = options.multiArgs ? args : args[0];

		if (options.filter && !options.filter(value)) {
			return;
		}

		if (nextQueue.length > 0) {
			const {resolve} = nextQueue.shift();
			resolve({done: true, value});
		} else {
			valueQueue.push(value);
		}

		cancel();
	};

	for (const event of events) {
		addListener(event, valueHandler);
	}

	for (const rejectionEvent of options.rejectionEvents) {
		addListener(rejectionEvent, rejectHandler);
	}

	for (const resolutionEvent of options.resolutionEvents) {
		addListener(resolutionEvent, resolveHandler);
	}

	return {
		[symbolAsyncIterator]() {
			return this;
		},
		async next() {
			if (valueQueue.length > 0) {
				const value = valueQueue.shift();
				return {
					done: isDone && valueQueue.length === 0 && !isLimitReached,
					value
				};
			}

			if (hasPendingError) {
				hasPendingError = false;
				throw error;
			}

			if (isDone) {
				return {
					done: true,
					value: undefined
				};
			}

			return new Promise((resolve, reject) => nextQueue.push({resolve, reject}));
		},
		async return(value) {
			cancel();
			return {
				done: isDone,
				value
			};
		}
	};
};

module.exports.TimeoutError = pTimeout.TimeoutError;


/***/ }),

/***/ 1330:
/***/ ((module) => {

"use strict";

module.exports = (promise, onFinally) => {
	onFinally = onFinally || (() => {});

	return promise.then(
		val => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => val),
		err => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => {
			throw err;
		})
	);
};


/***/ }),

/***/ 6424:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const pFinally = __webpack_require__(1330);

class TimeoutError extends Error {
	constructor(message) {
		super(message);
		this.name = 'TimeoutError';
	}
}

const pTimeout = (promise, milliseconds, fallback) => new Promise((resolve, reject) => {
	if (typeof milliseconds !== 'number' || milliseconds < 0) {
		throw new TypeError('Expected `milliseconds` to be a positive number');
	}

	if (milliseconds === Infinity) {
		resolve(promise);
		return;
	}

	const timer = setTimeout(() => {
		if (typeof fallback === 'function') {
			try {
				resolve(fallback());
			} catch (error) {
				reject(error);
			}

			return;
		}

		const message = typeof fallback === 'string' ? fallback : `Promise timed out after ${milliseconds} milliseconds`;
		const timeoutError = fallback instanceof Error ? fallback : new TimeoutError(message);

		if (typeof promise.cancel === 'function') {
			promise.cancel();
		}

		reject(timeoutError);
	}, milliseconds);

	// TODO: Use native `finally` keyword when targeting Node.js 10
	pFinally(
		// eslint-disable-next-line promise/prefer-await-to-then
		promise.then(resolve, reject),
		() => {
			clearTimeout(timer);
		}
	);
});

module.exports = pTimeout;
// TODO: Remove this for the next major release
module.exports.default = pTimeout;

module.exports.TimeoutError = TimeoutError;


/***/ }),

/***/ 8714:
/***/ ((module) => {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),

/***/ 539:
/***/ ((module) => {

"use strict";

module.exports = opts => {
	opts = opts || {};

	const env = opts.env || process.env;
	const platform = opts.platform || process.platform;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(env).find(x => x.toUpperCase() === 'PATH') || 'Path';
};


/***/ }),

/***/ 7280:
/***/ ((module) => {

"use strict";


class DatePart {
  constructor({
    token,
    date,
    parts,
    locales
  }) {
    this.token = token;
    this.date = date || new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }

  up() {}

  down() {}

  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  setTo(val) {}

  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  toString() {
    return String(this.date);
  }

}

module.exports = DatePart;

/***/ }),

/***/ 4203:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

const pos = n => {
  n = n % 10;
  return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
};

class Day extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setDate(this.date.getDate() + 1);
  }

  down() {
    this.date.setDate(this.date.getDate() - 1);
  }

  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }

  toString() {
    let date = this.date.getDate();
    let day = this.date.getDay();
    return this.token === 'DD' ? String(date).padStart(2, '0') : this.token === 'Do' ? date + pos(date) : this.token === 'd' ? day + 1 : this.token === 'ddd' ? this.locales.weekdaysShort[day] : this.token === 'dddd' ? this.locales.weekdays[day] : date;
  }

}

module.exports = Day;

/***/ }),

/***/ 2574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

class Hours extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setHours(this.date.getHours() + 1);
  }

  down() {
    this.date.setHours(this.date.getHours() - 1);
  }

  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }

  toString() {
    let hours = this.date.getHours();
    if (/h/.test(this.token)) hours = hours % 12 || 12;
    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
  }

}

module.exports = Hours;

/***/ }),

/***/ 2408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  DatePart: __webpack_require__(7280),
  Meridiem: __webpack_require__(4853),
  Day: __webpack_require__(4203),
  Hours: __webpack_require__(2574),
  Milliseconds: __webpack_require__(4909),
  Minutes: __webpack_require__(5876),
  Month: __webpack_require__(9461),
  Seconds: __webpack_require__(5884),
  Year: __webpack_require__(359)
};

/***/ }),

/***/ 4853:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

class Meridiem extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }

  down() {
    this.up();
  }

  toString() {
    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
  }

}

module.exports = Meridiem;

/***/ }),

/***/ 4909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

class Milliseconds extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }

  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }

  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
  }

  toString() {
    return String(this.date.getMilliseconds()).padStart(4, '0').substr(0, this.token.length);
  }

}

module.exports = Milliseconds;

/***/ }),

/***/ 5876:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

class Minutes extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }

  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }

  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }

  toString() {
    let m = this.date.getMinutes();
    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
  }

}

module.exports = Minutes;

/***/ }),

/***/ 9461:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

class Month extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }

  toString() {
    let month = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month + 1).padStart(2, '0') : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
  }

}

module.exports = Month;

/***/ }),

/***/ 5884:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

class Seconds extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }

  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }

  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }

  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
  }

}

module.exports = Seconds;

/***/ }),

/***/ 359:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(7280);

class Year extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }

  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }

  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }

  toString() {
    let year = String(this.date.getFullYear()).padStart(4, '0');
    return this.token.length === 2 ? year.substr(-2) : year;
  }

}

module.exports = Year;

/***/ }),

/***/ 2257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(5215);

const Prompt = __webpack_require__(461);

const _require = __webpack_require__(9571),
      cursor = _require.cursor;

const _require2 = __webpack_require__(8091),
      style = _require2.style,
      clear = _require2.clear,
      figures = _require2.figures,
      strip = _require2.strip;

const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);

const getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);

const getIndex = (arr, valOrTitle) => {
  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : undefined;
};
/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.noMatches] The no matches found label
 */


class AutocompletePrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === 'number' ? opts.initial : getIndex(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.fallback = opts.fallback || (opts.initial !== undefined ? `${figures.pointerSmall} ${getTitle(this.choices, this.initial)}` : `${figures.pointerSmall} ${opts.noMatches || 'no matches found'}`);
    this.suggestions = [[]];
    this.page = 0;
    this.input = '';
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear('');
    this.complete(this.render);
    this.render();
  }

  moveSelect(i) {
    this.select = i;

    if (this.suggestions[this.page].length > 0) {
      this.value = getVal(this.suggestions[this.page], i);
    } else {
      this.value = this.initial !== undefined ? getVal(this.choices, this.initial) : null;
    }

    this.fire();
  }

  complete(cb) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const p = _this.completing = _this.suggest(_this.input, _this.choices);

      const suggestions = yield p;
      if (_this.completing !== p) return;
      _this.suggestions = suggestions.map((s, i, arr) => ({
        title: getTitle(arr, i),
        value: getVal(arr, i)
      })).reduce((arr, sug) => {
        if (arr[arr.length - 1].length < _this.limit) arr[arr.length - 1].push(sug);else arr.push([sug]);
        return arr;
      }, [[]]);
      _this.isFallback = false;
      _this.completing = false;
      if (!_this.suggestions[_this.page]) _this.page = 0;

      if (!_this.suggestions.length && _this.fallback) {
        const index = getIndex(_this.choices, _this.fallback);
        _this.suggestions = [[]];
        if (index !== undefined) _this.suggestions[0].push({
          title: getTitle(_this.choices, index),
          value: getVal(_this.choices, index)
        });
        _this.isFallback = true;
      }

      const l = Math.max(suggestions.length - 1, 0);

      _this.moveSelect(Math.min(l, _this.select));

      cb && cb();
    })();
  }

  reset() {
    this.input = '';
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    // TODO on ctrl+# go to page #
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c}${s2}`;
    this.cursor = s1.length + 1;
    this.complete(this.render);
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.input.slice(0, this.cursor - 1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor - 1;
    this.render();
  }

  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor + 1);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.render();
  }

  first() {
    this.moveSelect(0);
    this.render();
  }

  last() {
    this.moveSelect(this.suggestions[this.page].length - 1);
    this.render();
  }

  up() {
    if (this.select <= 0) return this.bell();
    this.moveSelect(this.select - 1);
    this.render();
  }

  down() {
    if (this.select >= this.suggestions[this.page].length - 1) return this.bell();
    this.moveSelect(this.select + 1);
    this.render();
  }

  next() {
    if (this.select === this.suggestions[this.page].length - 1) {
      this.page = (this.page + 1) % this.suggestions.length;
      this.moveSelect(0);
    } else this.moveSelect(this.select + 1);

    this.render();
  }

  nextPage() {
    if (this.page >= this.suggestions.length - 1) return this.bell();
    this.page++;
    this.moveSelect(0);
    this.render();
  }

  prevPage() {
    if (this.page <= 0) return this.bell();
    this.page--;
    this.moveSelect(0);
    this.render();
  }

  left() {
    if (this.cursor <= 0) return this.bell();
    this.cursor = this.cursor - 1;
    this.render();
  }

  right() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    this.cursor = this.cursor + 1;
    this.render();
  }

  render() {
    if (this.closed) return;
    super.render();
    if (this.lineCount) this.out.write(cursor.down(this.lineCount));
    let prompt = color.bold(`${style.symbol(this.done, this.aborted)} ${this.msg} `) + `${style.delimiter(this.completing)} `;
    let length = strip(prompt).length;

    if (this.done && this.suggestions[this.page][this.select]) {
      prompt += `${this.suggestions[this.page][this.select].title}`;
    } else {
      this.rendered = `${this.transform.render(this.input)}`;
      length += this.rendered.length;
      prompt += this.rendered;
    }

    if (!this.done) {
      this.lineCount = this.suggestions[this.page].length;
      let suggestions = this.suggestions[this.page].reduce((acc, item, i) => acc + `\n${i === this.select ? color.cyan(item.title) : item.title}`, '');

      if (suggestions && !this.isFallback) {
        prompt += suggestions;

        if (this.suggestions.length > 1) {
          this.lineCount++;
          prompt += color.blue(`\nPage ${this.page + 1}/${this.suggestions.length}`);
        }
      } else {
        const fallbackIndex = getIndex(this.choices, this.fallback);
        const fallbackTitle = fallbackIndex !== undefined ? getTitle(this.choices, fallbackIndex) : this.fallback;
        prompt += `\n${color.gray(fallbackTitle)}`;
        this.lineCount++;
      }
    }

    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);

    if (this.lineCount && !this.done) {
      let pos = cursor.up(this.lineCount);
      pos += cursor.left + cursor.to(length);
      pos += cursor.move(-this.rendered.length + this.cursor * this.scale);
      this.out.write(pos);
    }
  }

}

module.exports = AutocompletePrompt;

/***/ }),

/***/ 5441:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);

const _require = __webpack_require__(9571),
      cursor = _require.cursor;

const MultiselectPrompt = __webpack_require__(4140);

const _require2 = __webpack_require__(8091),
      clear = _require2.clear,
      style = _require2.style,
      figures = _require2.figures;
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class AutocompleteMultiselectPrompt extends MultiselectPrompt {
  constructor(opts = {}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = '';
    this.clear = clear('');
    this.filteredOptions = this.value;
    this.render();
  }

  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }

  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }

    this.render();
  }

  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }

    this.render();
  }

  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }

  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }

  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value.filter(v => {
      if (this.inputValue) {
        if (typeof v.title === 'string') {
          if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }

        if (typeof v.value === 'string') {
          if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }

        return false;
      }

      return true;
    });
    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight);
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.filteredOptions[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  handleInputChange(c) {
    this.inputValue = this.inputValue + c;
    this.updateFilteredOptions();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c);
    }
  }

  renderInstructions() {
    return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
    `;
  }

  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray('Enter something to filter')}\n`;
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);else title = cursor === i ? color.cyan().underline(v.title) : v.title;
    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title;
  }

  renderDoneOrInstructions() {
    if (this.done) {
      const selected = this.value.filter(e => e.selected).map(v => v.title).join(', ');
      return selected;
    }

    const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }

    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render(); // print prompt

    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(' ');

    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }

    prompt += this.renderOptions(this.filteredOptions);
    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }

}

module.exports = AutocompleteMultiselectPrompt;

/***/ }),

/***/ 9486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);

const Prompt = __webpack_require__(461);

const _require = __webpack_require__(8091),
      style = _require.style;

const _require2 = __webpack_require__(9571),
      erase = _require2.erase,
      cursor = _require2.cursor;
/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.yes] The "Yes" label
 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
 * @param {String} [opts.no] The "No" label
 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
 */


class ConfirmPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || 'yes';
    this.yesOption = opts.yesOption || '(Y/n)';
    this.noMsg = opts.no || 'no';
    this.noOption = opts.noOption || '(y/N)';
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    if (c.toLowerCase() === 'y') {
      this.value = true;
      return this.submit();
    }

    if (c.toLowerCase() === 'n') {
      this.value = false;
      return this.submit();
    }

    return this.bell();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();
    this.out.write(erase.line + cursor.to(0) + [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)].join(' '));
  }

}

module.exports = ConfirmPrompt;

/***/ }),

/***/ 4177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(5215);

const Prompt = __webpack_require__(461);

const _require = __webpack_require__(8091),
      style = _require.style,
      clear = _require.clear,
      figures = _require.figures,
      strip = _require.strip;

const _require2 = __webpack_require__(9571),
      erase = _require2.erase,
      cursor = _require2.cursor;

const _require3 = __webpack_require__(2408),
      DatePart = _require3.DatePart,
      Meridiem = _require3.Meridiem,
      Day = _require3.Day,
      Hours = _require3.Hours,
      Milliseconds = _require3.Milliseconds,
      Minutes = _require3.Minutes,
      Month = _require3.Month,
      Seconds = _require3.Seconds,
      Year = _require3.Year;

const regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
const regexGroups = {
  1: ({
    token
  }) => token.replace(/\\(.)/g, '$1'),
  2: opts => new Day(opts),
  // Day // TODO
  3: opts => new Month(opts),
  // Month
  4: opts => new Year(opts),
  // Year
  5: opts => new Meridiem(opts),
  // AM/PM // TODO (special)
  6: opts => new Hours(opts),
  // Hours
  7: opts => new Minutes(opts),
  // Minutes
  8: opts => new Seconds(opts),
  // Seconds
  9: opts => new Milliseconds(opts) // Fractional seconds

};
const dfltLocales = {
  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
  /**
   * DatePrompt Base Element
   * @param {Object} opts Options
   * @param {String} opts.message Message
   * @param {Number} [opts.initial] Index of default value
   * @param {String} [opts.mask] The format mask
   * @param {object} [opts.locales] The date locales
   * @param {String} [opts.error] The error message shown on invalid value
   * @param {Function} [opts.validate] Function to validate the submitted value
   * @param {Stream} [opts.stdin] The Readable stream to listen to
   * @param {Stream} [opts.stdout] The Writable stream to write readline data to
   */

};

class DatePrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = '';
    this.locales = Object.assign(dfltLocales, opts.locales);
    this._date = opts.initial || new Date();
    this.errorMsg = opts.error || 'Please Enter A Valid Value';

    this.validator = opts.validate || (() => true);

    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
    this.clear = clear('');
    this.render();
  }

  get value() {
    return this.date;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    if (date) this._date.setTime(date.getTime());
  }

  set mask(mask) {
    let result;
    this.parts = [];

    while (result = regex.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex(gr => gr != null);
      this.parts.push(idx in regexGroups ? regexGroups[idx]({
        token: result[idx] || match,
        date: this.date,
        parts: this.parts,
        locales: this.locales
      }) : result[idx] || match);
    }

    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string') arr[arr.length - 1] += i;else arr.push(i);
      return arr;
    }, []);
    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }

  moveCursor(n) {
    this.typed = '';
    this.cursor = n;
    this.fire();
  }

  reset() {
    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart));
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === 'string') {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.validate();

      if (_this2.error) {
        _this2.color = 'red';

        _this2.fire();

        _this2.render();

        return;
      }

      _this2.done = true;
      _this2.aborted = false;

      _this2.fire();

      _this2.render();

      _this2.out.write('\n');

      _this2.close();
    })();
  }

  up() {
    this.typed = '';
    this.parts[this.cursor].up();
    this.render();
  }

  down() {
    this.typed = '';
    this.parts[this.cursor].down();
    this.render();
  }

  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null) return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }

  right() {
    let next = this.parts[this.cursor].next();
    if (next == null) return this.bell();
    this.moveCursor(this.parts.indexOf(next));
    this.render();
  }

  next() {
    let next = this.parts[this.cursor].next();
    this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex(part => part instanceof DatePart));
    this.render();
  }

  _(c) {
    if (/\d/.test(c)) {
      this.typed += c;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(erase.lines(1));
    super.render();
    let clear = erase.line + (this.lines ? erase.down(this.lines) : '') + cursor.to(0);
    this.lines = 0;
    let error = '';

    if (this.error) {
      let lines = this.errorMsg.split('\n');
      error = lines.reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
      this.lines = lines.length;
    } // Print prompt


    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join('')].join(' ');
    let position = '';

    if (this.lines) {
      position += cursor.up(this.lines);
      position += cursor.left + cursor.to(strip(prompt).length);
    }

    this.out.write(clear + prompt + error + position);
  }

}

module.exports = DatePrompt;

/***/ }),

/***/ 2838:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  TextPrompt: __webpack_require__(16),
  SelectPrompt: __webpack_require__(786),
  TogglePrompt: __webpack_require__(8001),
  DatePrompt: __webpack_require__(4177),
  NumberPrompt: __webpack_require__(7072),
  MultiselectPrompt: __webpack_require__(4140),
  AutocompletePrompt: __webpack_require__(2257),
  AutocompleteMultiselectPrompt: __webpack_require__(5441),
  ConfirmPrompt: __webpack_require__(9486)
};

/***/ }),

/***/ 4140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);

const _require = __webpack_require__(9571),
      cursor = _require.cursor;

const Prompt = __webpack_require__(461);

const _require2 = __webpack_require__(8091),
      clear = _require2.clear,
      figures = _require2.figures,
      style = _require2.style;
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class MultiselectPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || '';
    this.warn = opts.warn || '- This option is disabled -';
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string') ch = {
        title: ch,
        value: idx
      };
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value || idx),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear('');

    if (!opts.overrideRender) {
      this.render();
    }
  }

  reset() {
    this.value.map(v => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }

  selected() {
    return this.value.filter(v => v.selected);
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    const selected = this.value.filter(e => e.selected);

    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }

  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }

    this.render();
  }

  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }

    this.render();
  }

  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.value[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      return this.bell();
    }
  }

  renderInstructions() {
    return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    enter/return: Complete answer
    `;
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);else title = cursor === i ? color.cyan().underline(v.title) : v.title;
    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title;
  } // shared with autocompleteMultiselect


  paginateOptions(options) {
    const c = this.cursor;
    let styledOptions = options.map((v, i) => this.renderOption(c, v, i));
    const numOfOptionsToRender = 10; // if needed, can add an option to change this.

    let scopedOptions = styledOptions;
    let hint = '';

    if (styledOptions.length === 0) {
      return color.red('No matches for this query.');
    } else if (styledOptions.length > numOfOptionsToRender) {
      let startIndex = c - numOfOptionsToRender / 2;
      let endIndex = c + numOfOptionsToRender / 2;

      if (startIndex < 0) {
        startIndex = 0;
        endIndex = numOfOptionsToRender;
      } else if (endIndex > options.length) {
        endIndex = options.length;
        startIndex = endIndex - numOfOptionsToRender;
      }

      scopedOptions = styledOptions.slice(startIndex, endIndex);
      hint = color.dim('(Move up and down to reveal more choices)');
    }

    return '\n' + scopedOptions.join('\n') + '\n' + hint;
  } // shared with autocomleteMultiselect


  renderOptions(options) {
    if (!this.done) {
      return this.paginateOptions(options);
    }

    return '';
  }

  renderDoneOrInstructions() {
    if (this.done) {
      const selected = this.value.filter(e => e.selected).map(v => v.title).join(', ');
      return selected;
    }

    const output = [color.gray(this.hint), this.renderInstructions()];

    if (this.value[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }

    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render(); // print prompt

    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(' ');

    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }

    prompt += this.renderOptions(this.value);
    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }

}

module.exports = MultiselectPrompt;

/***/ }),

/***/ 7072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(5215);

const Prompt = __webpack_require__(461);

const _require = __webpack_require__(9571),
      cursor = _require.cursor,
      erase = _require.erase;

const _require2 = __webpack_require__(8091),
      style = _require2.style,
      clear = _require2.clear,
      figures = _require2.figures,
      strip = _require2.strip;

const isNumber = /[0-9]/;

const isDef = any => any !== undefined;

const round = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};
/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */


class NumberPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : '';
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;

    this.validator = opts.validate || (() => true);

    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }

  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v, this.round)}`);
      this._value = round(v, this.round);
    }

    this.fire();
  }

  get value() {
    return this._value;
  }

  parse(x) {
    return this.float ? parseFloat(x) : parseInt(x);
  }

  valid(c) {
    return c === `-` || c === `.` && this.float || isNumber.test(c);
  }

  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }

  abort() {
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === `string`) {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.validate();

      if (_this2.error) {
        _this2.color = `red`;

        _this2.fire();

        _this2.render();

        return;
      }

      let x = _this2.value;
      _this2.value = x !== `` ? x : _this2.initial;
      _this2.done = true;
      _this2.aborted = false;
      _this2.error = false;

      _this2.fire();

      _this2.render();

      _this2.out.write(`\n`);

      _this2.close();
    })();
  }

  up() {
    this.typed = ``;
    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  down() {
    this.typed = ``;
    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse(val = val.slice(0, -1)) || ``;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (!this.valid(c)) return this.bell();
    const now = Date.now();
    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed

    this.typed += c;
    this.lastHit = now;
    this.color = `cyan`;
    if (c === `.`) return this.fire();
    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }

  render() {
    if (this.closed) return;
    super.render();
    let clear = erase.line + (this.lines ? erase.down(this.lines) : ``) + cursor.to(0);
    this.lines = 0;
    let error = ``;

    if (this.error) {
      let lines = this.errorMsg.split(`\n`);
      error += lines.reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
      this.lines = lines.length;
    }

    let underline = !this.done || !this.done && !this.placeholder;
    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), underline ? color[this.color]().underline(this.rendered) : this.rendered].join(` `);
    let position = ``;

    if (this.lines) {
      position += cursor.up(this.lines);
      position += cursor.left + cursor.to(strip(prompt).length);
    }

    this.out.write(clear + prompt + error + position);
  }

}

module.exports = NumberPrompt;

/***/ }),

/***/ 461:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const readline = __webpack_require__(1058);

const _require = __webpack_require__(8091),
      action = _require.action;

const EventEmitter = __webpack_require__(8614);

const _require2 = __webpack_require__(9571),
      beep = _require2.beep,
      cursor = _require2.cursor;

const color = __webpack_require__(5215);
/**
 * Base prompt skeleton
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class Prompt extends EventEmitter {
  constructor(opts = {}) {
    super();
    this.firstRender = true;
    this.in = opts.in || process.stdin;
    this.out = opts.out || process.stdout;

    this.onRender = (opts.onRender || (() => void 0)).bind(this);

    const rl = readline.createInterface(this.in);
    readline.emitKeypressEvents(this.in, rl);
    if (this.in.isTTY) this.in.setRawMode(true);

    const keypress = (str, key) => {
      let a = action(key);

      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === 'function') {
        this[a](key);
      } else {
        this.bell();
      }
    };

    this.close = () => {
      this.out.write(cursor.show);
      this.in.removeListener('keypress', keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : 'submit', this.value);
      this.closed = true;
    };

    this.in.on('keypress', keypress);
  }

  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted
    });
  }

  bell() {
    this.out.write(beep);
  }

  render() {
    this.onRender(color);
    if (this.firstRender) this.firstRender = false;
  }

}

module.exports = Prompt;

/***/ }),

/***/ 786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);

const Prompt = __webpack_require__(461);

const _require = __webpack_require__(8091),
      style = _require.style,
      clear = _require.clear,
      figures = _require.figures;

const _require2 = __webpack_require__(9571),
      erase = _require2.erase,
      cursor = _require2.cursor;
/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class SelectPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string') ch = {
        title: ch,
        value: idx
      };
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value || idx),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear('');
    this.render();
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    } else this.bell();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(erase.lines(this.choices.length + 1));
    super.render(); // Print prompt

    this.out.write([style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(' ')); // Print choices

    if (!this.done) {
      this.out.write('\n' + this.choices.map((v, i) => {
        let title, prefix;

        if (v.disabled) {
          title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
          prefix = this.cursor === i ? color.bold().gray(figures.pointer) + ' ' : '  ';
        } else {
          title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
          prefix = this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ';
        }

        return `${prefix} ${title}`;
      }).join('\n'));
    }
  }

}

module.exports = SelectPrompt;

/***/ }),

/***/ 16:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(5215);

const Prompt = __webpack_require__(461);

const _require = __webpack_require__(9571),
      cursor = _require.cursor;

const _require2 = __webpack_require__(8091),
      style = _require2.style,
      clear = _require2.clear,
      strip = _require2.strip,
      figures = _require2.figures;
/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.initial] Default value
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */


class TextPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;

    this.validator = opts.validate || (() => true);

    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.clear = clear(``);
    this.render();
  }

  set value(v) {
    if (!v && this.initial) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v);
    }

    this._value = v;
    this.fire();
  }

  get value() {
    return this._value;
  }

  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.fire();
    this.render();
  }

  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === `string`) {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.value = _this2.value || _this2.initial;
      yield _this2.validate();

      if (_this2.error) {
        _this2.red = true;

        _this2.fire();

        _this2.render();

        return;
      }

      _this2.done = true;
      _this2.aborted = false;

      _this2.fire();

      _this2.render();

      _this2.out.write('\n');

      _this2.close();
    })();
  }

  next() {
    if (!this.placeholder) return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }

  moveCursor(n) {
    if (this.placeholder) return;
    this.cursor = this.cursor + n;
  }

  _(c, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length + 1;
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.value.slice(0, this.cursor - 1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.moveCursor(-1);
    this.render();
  }

  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor + 1);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.render();
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length;
    this.render();
  }

  left() {
    if (this.cursor <= 0 || this.placeholder) return this.bell();
    this.moveCursor(-1);
    this.render();
  }

  right() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    this.moveCursor(1);
    this.render();
  }

  render() {
    if (this.closed) return;
    super.render();
    let erase = (this.lines ? cursor.down(this.lines) : ``) + this.clear;
    this.lines = 0;
    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.red ? color.red(this.rendered) : this.rendered].join(` `);
    let error = ``;

    if (this.error) {
      let lines = this.errorMsg.split(`\n`);
      error += lines.reduce((a, l, i) => a += `\n${i ? ' ' : figures.pointerSmall} ${color.red().italic(l)}`, ``);
      this.lines = lines.length;
    }

    let position = ``;

    if (this.lines) {
      position += cursor.up(this.lines);
      position += cursor.left + cursor.to(strip(prompt).length);
    }

    position += cursor.move(this.placeholder ? -this.initial.length * this.scale : -this.rendered.length + this.cursor * this.scale);
    this.out.write(erase + prompt + error + position);
    this.clear = clear(prompt + error);
  }

}

module.exports = TextPrompt;

/***/ }),

/***/ 8001:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);

const Prompt = __webpack_require__(461);

const _require = __webpack_require__(8091),
      style = _require.style,
      clear = _require.clear;

const _require2 = __webpack_require__(9571),
      cursor = _require2.cursor,
      erase = _require2.erase;
/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class TogglePrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || 'on';
    this.inactive = opts.inactive || 'off';
    this.initialValue = this.value;
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }

  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }

  delete() {
    this.deactivate();
  }

  left() {
    this.deactivate();
  }

  right() {
    this.activate();
  }

  down() {
    this.deactivate();
  }

  up() {
    this.activate();
  }

  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.value = !this.value;
    } else if (c === '1') {
      this.value = true;
    } else if (c === '0') {
      this.value = false;
    } else return this.bell();

    this.render();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();
    this.out.write(erase.lines(this.first ? 1 : this.msg.split(/\n/g).length) + cursor.to(0) + [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan().underline(this.inactive), color.gray('/'), this.value ? color.cyan().underline(this.active) : this.active].join(' '));
  }

}

module.exports = TogglePrompt;

/***/ }),

/***/ 5357:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const prompts = __webpack_require__(7627);

const passOn = ['suggest', 'format', 'onState', 'validate', 'onRender'];

const noop = () => {};
/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @param {Function} [onSubmit] Callback function called on prompt submit
 * @param {Function} [onCancel] Callback function called on cancel/abort
 * @returns {Object} Object with values from user input
 */


function prompt() {
  return _prompt.apply(this, arguments);
}

function _prompt() {
  _prompt = _asyncToGenerator(function* (questions = [], {
    onSubmit = noop,
    onCancel = noop
  } = {}) {
    const answers = {};
    const override = prompt._override || {};
    questions = [].concat(questions);
    let answer, question, quit, name, type;

    const getFormattedAnswer =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (question, answer, skipValidation = false) {
        if (!skipValidation && question.validate && question.validate(answer) !== true) {
          return;
        }

        return question.format ? yield question.format(answer, answers) : answer;
      });

      return function getFormattedAnswer(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        question = _step.value;
        var _question = question;
        name = _question.name;
        type = _question.type;

        // if property is a function, invoke it unless it's a special function
        for (let key in question) {
          if (passOn.includes(key)) continue;
          let value = question[key];
          question[key] = typeof value === 'function' ? yield value(answer, _objectSpread({}, answers), question) : value;
        }

        if (typeof question.message !== 'string') {
          throw new Error('prompt message is required');
        } // update vars in case they changed


        var _question2 = question;
        name = _question2.name;
        type = _question2.type;
        // skip if type is a falsy value
        if (!type) continue;

        if (prompts[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }

        if (override[question.name] !== undefined) {
          answer = yield getFormattedAnswer(question, override[question.name]);

          if (answer !== undefined) {
            answers[name] = answer;
            continue;
          }
        }

        try {
          // Get the injected answer if there is one or prompt the user
          answer = prompt._injected ? getInjectedAnswer(prompt._injected) : yield prompts[type](question);
          answers[name] = answer = yield getFormattedAnswer(question, answer, true);
          quit = yield onSubmit(question, answer, answers);
        } catch (err) {
          quit = !(yield onCancel(question, answers));
        }

        if (quit) return answers;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return answers;
  });
  return _prompt.apply(this, arguments);
}

function getInjectedAnswer(injected) {
  const answer = injected.shift();

  if (answer instanceof Error) {
    throw answer;
  }

  return answer;
}

function inject(answers) {
  prompt._injected = (prompt._injected || []).concat(answers);
}

function override(answers) {
  prompt._override = Object.assign({}, answers);
}

module.exports = Object.assign(prompt, {
  prompt,
  prompts,
  inject,
  override
});

/***/ }),

/***/ 7627:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const $ = exports;

const el = __webpack_require__(2838);

const noop = v => v;

function toPrompt(type, args, opts = {}) {
  return new Promise((res, rej) => {
    const p = new el[type](args);
    const onAbort = opts.onAbort || noop;
    const onSubmit = opts.onSubmit || noop;
    p.on('state', args.onState || noop);
    p.on('submit', x => res(onSubmit(x)));
    p.on('abort', x => rej(onAbort(x)));
  });
}
/**
 * Text prompt
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.text = args => toPrompt('TextPrompt', args);
/**
 * Password prompt with masked input
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.password = args => {
  args.style = 'password';
  return $.text(args);
};
/**
 * Prompt where input is invisible, like sudo
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.invisible = args => {
  args.style = 'invisible';
  return $.text(args);
};
/**
 * Number prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.number = args => toPrompt('NumberPrompt', args);
/**
 * Date prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.date = args => toPrompt('DatePrompt', args);
/**
 * Classic yes/no prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.confirm = args => toPrompt('ConfirmPrompt', args);
/**
 * List prompt, split intput string by `seperator`
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [args.separator] String separator
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input, in form of an `Array`
 */


$.list = args => {
  const sep = args.separator || ',';
  return toPrompt('TextPrompt', args, {
    onSubmit: str => str.split(sep).map(s => s.trim())
  });
};
/**
 * Toggle/switch prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {string} [args.active="on"] Text for `active` state
 * @param {string} [args.inactive="off"] Text for `inactive` state
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.toggle = args => toPrompt('TogglePrompt', args);
/**
 * Interactive select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [args.initial] Index of default value
 * @param {String} [args.hint] Hint to display
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.select = args => toPrompt('SelectPrompt', args);
/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [args.max] Max select
 * @param {string} [args.hint] Hint to display user
 * @param {Number} [args.cursor=0] Cursor start position
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.multiselect = args => {
  args.choices = [].concat(args.choices || []);

  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

  return toPrompt('MultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

$.autocompleteMultiselect = args => {
  args.choices = [].concat(args.choices || []);

  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

  return toPrompt('AutocompleteMultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

const byTitle = (input, choices) => Promise.resolve(choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
/**
 * Interactive auto-complete prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
 * @param {number} [args.limit=10] Max number of results to show
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {String} [args.initial] Index of the default value
 * @param {String} [args.fallback] Fallback message - defaults to initial value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.autocomplete = args => {
  args.suggest = args.suggest || byTitle;
  args.choices = [].concat(args.choices || []);
  return toPrompt('AutocompletePrompt', args);
};

/***/ }),

/***/ 9001:
/***/ ((module) => {

"use strict";


module.exports = key => {
  if (key.ctrl) {
    if (key.name === 'a') return 'first';
    if (key.name === 'c') return 'abort';
    if (key.name === 'd') return 'abort';
    if (key.name === 'e') return 'last';
    if (key.name === 'g') return 'reset';
  }

  if (key.name === 'return') return 'submit';
  if (key.name === 'enter') return 'submit'; // ctrl + J

  if (key.name === 'backspace') return 'delete';
  if (key.name === 'delete') return 'deleteForward';
  if (key.name === 'abort') return 'abort';
  if (key.name === 'escape') return 'abort';
  if (key.name === 'tab') return 'next';
  if (key.name === 'pagedown') return 'nextPage';
  if (key.name === 'pageup') return 'prevPage';
  if (key.name === 'up') return 'up';
  if (key.name === 'down') return 'down';
  if (key.name === 'right') return 'right';
  if (key.name === 'left') return 'left';
  return false;
};

/***/ }),

/***/ 3952:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const strip = __webpack_require__(8007);

const _require = __webpack_require__(9571),
      erase = _require.erase,
      cursor = _require.cursor;

const width = str => [...strip(str)].length;

module.exports = function (prompt, perLine = process.stdout.columns) {
  if (!perLine) return erase.line + cursor.to(0);
  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      let line = _step.value;
      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
};

/***/ }),

/***/ 8845:
/***/ ((module) => {

"use strict";


const main = {
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  tick: '✔',
  cross: '✖',
  ellipsis: '…',
  pointerSmall: '›',
  line: '─',
  pointer: '❯'
};
const win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',
  tick: '√',
  cross: '×',
  ellipsis: '...',
  pointerSmall: '»',
  line: '─',
  pointer: '>'
};
const figures = process.platform === 'win32' ? win : main;
module.exports = figures;

/***/ }),

/***/ 8091:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  action: __webpack_require__(9001),
  clear: __webpack_require__(3952),
  style: __webpack_require__(8295),
  strip: __webpack_require__(8007),
  figures: __webpack_require__(8845)
};

/***/ }),

/***/ 8007:
/***/ ((module) => {

"use strict";


module.exports = str => {
  const pattern = ['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'].join('|');
  const RGX = new RegExp(pattern, 'g');
  return typeof str === 'string' ? str.replace(RGX, '') : str;
};

/***/ }),

/***/ 8295:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const c = __webpack_require__(5215);

const figures = __webpack_require__(8845); // rendering user input.


const styles = Object.freeze({
  password: {
    scale: 1,
    render: input => '*'.repeat(input.length)
  },
  emoji: {
    scale: 2,
    render: input => '😃'.repeat(input.length)
  },
  invisible: {
    scale: 0,
    render: input => ''
  },
  default: {
    scale: 1,
    render: input => `${input}`
  }
});

const render = type => styles[type] || styles.default; // icon to signalize a prompt.


const symbols = Object.freeze({
  aborted: c.red(figures.cross),
  done: c.green(figures.tick),
  default: c.cyan('?')
});

const symbol = (done, aborted) => aborted ? symbols.aborted : done ? symbols.done : symbols.default; // between the question and the user's input.


const delimiter = completing => c.gray(completing ? figures.ellipsis : figures.pointerSmall);

const item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : '+' : figures.line);

module.exports = {
  styles,
  render,
  symbols,
  symbol,
  delimiter,
  item
};

/***/ }),

/***/ 9646:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function isNodeLT(tar) {
  tar = (Array.isArray(tar) ? tar : tar.split('.')).map(Number);
  let i=0, src=process.versions.node.split('.').map(Number);
  for (; i < tar.length; i++) {
    if (src[i] > tar[i]) return false;
    if (tar[i] > src[i]) return true;
  }
  return false;
}

module.exports =
  isNodeLT('8.6.0')
    ? __webpack_require__(5357)
    : __webpack_require__(5379);


/***/ }),

/***/ 8377:
/***/ ((module) => {

"use strict";


class DatePart {
  constructor({token, date, parts, locales}) {
    this.token = token;
    this.date = date || new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }

  up() {}

  down() {}

  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  setTo(val) {}

  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  toString() {
    return String(this.date);
  }
}

module.exports = DatePart;




/***/ }),

/***/ 6784:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

const pos = n => {
  n = n % 10;
  return n === 1 ? 'st'
       : n === 2 ? 'nd'
       : n === 3 ? 'rd'
       : 'th';
}

class Day extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setDate(this.date.getDate() + 1);
  }

  down() {
    this.date.setDate(this.date.getDate() - 1);
  }

  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }

  toString() {
    let date = this.date.getDate();
    let day = this.date.getDay();
    return this.token === 'DD' ? String(date).padStart(2, '0')
         : this.token === 'Do' ? date + pos(date)
         : this.token === 'd' ? day + 1
         : this.token === 'ddd' ? this.locales.weekdaysShort[day]
         : this.token === 'dddd' ? this.locales.weekdays[day]
         : date;
  }
}

module.exports = Day;


/***/ }),

/***/ 754:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

class Hours extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setHours(this.date.getHours() + 1);
  }

  down() {
    this.date.setHours(this.date.getHours() - 1);
  }

  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }

  toString() {
    let hours = this.date.getHours();
    if (/h/.test(this.token))
      hours = (hours % 12) || 12;
    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
  }
}

module.exports = Hours;


/***/ }),

/***/ 8108:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  DatePart: __webpack_require__(8377),
  Meridiem: __webpack_require__(2616),
  Day: __webpack_require__(6784),
  Hours: __webpack_require__(754),
  Milliseconds: __webpack_require__(4316),
  Minutes: __webpack_require__(1770),
  Month: __webpack_require__(8086),
  Seconds: __webpack_require__(1823),
  Year: __webpack_require__(9208),
}


/***/ }),

/***/ 2616:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

class Meridiem extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }

  down() {
    this.up();
  }

  toString() {
    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
  }
}

module.exports = Meridiem;


/***/ }),

/***/ 4316:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

class Milliseconds extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }

  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }

  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-(this.token.length))));
  }

  toString() {
    return String(this.date.getMilliseconds()).padStart(4, '0')
                                              .substr(0, this.token.length);
  }
}

module.exports = Milliseconds;


/***/ }),

/***/ 1770:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

class Minutes extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }

  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }

  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }

  toString() {
    let m = this.date.getMinutes();
    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
  }
}

module.exports = Minutes;


/***/ }),

/***/ 8086:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

class Month extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }

  toString() {
    let month = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month + 1).padStart(2, '0')
           : tl === 3 ? this.locales.monthsShort[month]
             : tl === 4 ? this.locales.months[month]
               : String(month + 1);
  }
}

module.exports = Month;


/***/ }),

/***/ 1823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

class Seconds extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }

  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }

  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }

  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
  }
}

module.exports = Seconds;


/***/ }),

/***/ 9208:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const DatePart = __webpack_require__(8377);

class Year extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }

  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }

  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }

  toString() {
    let year = String(this.date.getFullYear()).padStart(4, '0');
    return this.token.length === 2 ? year.substr(-2) : year;
  }
}

module.exports = Year;


/***/ }),

/***/ 1098:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);
const Prompt = __webpack_require__(4185);
const { cursor } = __webpack_require__(9571);
const { style, clear, figures, strip } = __webpack_require__(9501);

const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
const getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
const getIndex = (arr, valOrTitle) => {
  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : undefined;
};

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.noMatches] The no matches found label
 */
class AutocompletePrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === 'number'
      ? opts.initial
      : getIndex(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.fallback = opts.fallback || (
      opts.initial !== undefined ?
        `${figures.pointerSmall} ${getTitle(this.choices, this.initial)}` :
        `${figures.pointerSmall} ${opts.noMatches || 'no matches found'}`
    );
    this.suggestions = [[]];
    this.page = 0;
    this.input = '';
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear('');
    this.complete(this.render);
    this.render();
  }

  moveSelect(i) {
    this.select = i;
    if (this.suggestions[this.page].length > 0) {
      this.value = getVal(this.suggestions[this.page], i);
    } else {
      this.value = this.initial !== undefined
        ? getVal(this.choices, this.initial)
        : null;
    }
    this.fire();
  }

  async complete(cb) {
    const p = (this.completing = this.suggest(this.input, this.choices));
    const suggestions = await p;

    if (this.completing !== p) return;
    this.suggestions = suggestions
        .map((s, i, arr) => ({title: getTitle(arr, i), value: getVal(arr, i)}))
        .reduce((arr, sug) => {
          if (arr[arr.length - 1].length < this.limit)
            arr[arr.length - 1].push(sug);
          else arr.push([sug]);
          return arr;
        }, [[]]);
    this.isFallback = false;
    this.completing = false;
    if (!this.suggestions[this.page])
      this.page = 0;

    if (!this.suggestions.length && this.fallback) {
      const index = getIndex(this.choices, this.fallback);
      this.suggestions = [[]];
      if (index !== undefined)
        this.suggestions[0].push({ title: getTitle(this.choices, index), value: getVal(this.choices, index) });
      this.isFallback = true;
    }

    const l = Math.max(suggestions.length - 1, 0);
    this.moveSelect(Math.min(l, this.select));

    cb && cb();
  }

  reset() {
    this.input = '';
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) { // TODO on ctrl+# go to page #
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c}${s2}`;
    this.cursor = s1.length+1;
    this.complete(this.render);
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.input.slice(0, this.cursor-1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor-1;
    this.render();
  }

  deleteForward() {
      if(this.cursor*this.scale >= this.rendered.length) return this.bell();
      let s1 = this.input.slice(0, this.cursor);
      let s2 = this.input.slice(this.cursor+1);
      this.input = `${s1}${s2}`;
      this.complete(this.render);
      this.render();
  }

  first() {
    this.moveSelect(0);
    this.render();
  }

  last() {
    this.moveSelect(this.suggestions[this.page].length - 1);
    this.render();
  }

  up() {
    if (this.select <= 0) return this.bell();
    this.moveSelect(this.select - 1);
    this.render();
  }

  down() {
    if (this.select >= this.suggestions[this.page].length - 1) return this.bell();
    this.moveSelect(this.select + 1);
    this.render();
  }

  next() {
    if (this.select === this.suggestions[this.page].length - 1) {
      this.page = (this.page + 1) % this.suggestions.length;
      this.moveSelect(0);
    } else this.moveSelect(this.select + 1);
    this.render();
  }

  nextPage() {
    if (this.page >= this.suggestions.length - 1)
      return this.bell();
    this.page++;
    this.moveSelect(0);
    this.render();
  }

  prevPage() {
    if (this.page <= 0)
      return this.bell();
    this.page--;
    this.moveSelect(0);
    this.render();
  }

  left() {
    if (this.cursor <= 0) return this.bell();
    this.cursor = this.cursor-1;
    this.render();
  }

  right() {
    if (this.cursor*this.scale >= this.rendered.length) return this.bell();
    this.cursor = this.cursor+1;
    this.render();
  }

  render() {
    if (this.closed) return;
    super.render();
    if (this.lineCount) this.out.write(cursor.down(this.lineCount));

    let prompt = color.bold(`${style.symbol(this.done, this.aborted)} ${this.msg} `)
      + `${style.delimiter(this.completing)} `;
    let length = strip(prompt).length;

    if (this.done && this.suggestions[this.page][this.select]) {
        prompt += `${this.suggestions[this.page][this.select].title}`;
    } else {
        this.rendered = `${this.transform.render(this.input)}`;
        length += this.rendered.length;
        prompt += this.rendered;
    }

    if (!this.done) {
      this.lineCount = this.suggestions[this.page].length;
      let suggestions = this.suggestions[this.page].reduce((acc, item, i) =>
        acc + `\n${i === this.select ? color.cyan(item.title) : item.title}`, '');
      if (suggestions && !this.isFallback) {
        prompt += suggestions;
        if (this.suggestions.length > 1) {
          this.lineCount++;
          prompt += color.blue(`\nPage ${this.page+1}/${this.suggestions.length}`);
        }
      } else {
        const fallbackIndex = getIndex(this.choices, this.fallback);
        const fallbackTitle = fallbackIndex !== undefined
          ? getTitle(this.choices, fallbackIndex)
          : this.fallback;
        prompt += `\n${color.gray(fallbackTitle)}`;
        this.lineCount++;
      }
    }

    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);

    if (this.lineCount && !this.done) {
      let pos = cursor.up(this.lineCount);
      pos += cursor.left+cursor.to(length);
      pos += cursor.move(-this.rendered.length+this.cursor*this.scale);
      this.out.write(pos);
    }
  }
}

module.exports = AutocompletePrompt;


/***/ }),

/***/ 8178:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);
const { cursor } = __webpack_require__(9571);
const MultiselectPrompt = __webpack_require__(1944);
const { clear, style, figures } = __webpack_require__(9501);
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class AutocompleteMultiselectPrompt extends MultiselectPrompt {
  constructor(opts={}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = '';
    this.clear = clear('');
    this.filteredOptions = this.value;
    this.render();
  }

  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }

  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }

  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }

  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }

  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value
      .filter(v => {
        if (this.inputValue) {
          if (typeof v.title === 'string') {
            if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          if (typeof v.value === 'string') {
            if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight)
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.filteredOptions[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  handleInputChange(c) {
    this.inputValue = this.inputValue + c;
    this.updateFilteredOptions();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c);
    } 
  }

  renderInstructions() {
    return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
    `
  }

  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray('Enter something to filter')}\n`;
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
    else title = cursor === i ? color.cyan().underline(v.title) : v.title;
    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title
  }

  renderDoneOrInstructions() {
    if (this.done) {
      const selected = this.value
        .filter(e => e.selected)
        .map(v => v.title)
        .join(', ');
      return selected;
    }
    
    const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }
    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();

    // print prompt
    
    let prompt = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(' ');
    
    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt += this.renderOptions(this.filteredOptions);

    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }
}

module.exports = AutocompleteMultiselectPrompt;


/***/ }),

/***/ 1491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const color = __webpack_require__(5215);
const Prompt = __webpack_require__(4185);
const { style } = __webpack_require__(9501);
const { erase, cursor } = __webpack_require__(9571);

/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.yes] The "Yes" label
 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
 * @param {String} [opts.no] The "No" label
 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
 */
class ConfirmPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || 'yes';
    this.yesOption = opts.yesOption || '(Y/n)';
    this.noMsg = opts.no || 'no';
    this.noOption = opts.noOption || '(y/N)';
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    if (c.toLowerCase() === 'y') {
      this.value = true;
      return this.submit();
    }
    if (c.toLowerCase() === 'n') {
      this.value = false;
      return this.submit();
    }
    return this.bell();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();
    
    this.out.write(
      erase.line +
        cursor.to(0) +
        [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.done
            ? this.value ? this.yesMsg : this.noMsg
            : color.gray(this.initialValue ? this.yesOption : this.noOption)
        ].join(' ')
    );
  }
}

module.exports = ConfirmPrompt;


/***/ }),

/***/ 5667:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);
const Prompt = __webpack_require__(4185);
const { style, clear, figures, strip } = __webpack_require__(9501);
const { erase, cursor } = __webpack_require__(9571);
const { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = __webpack_require__(8108);

const regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
const regexGroups = {
  1: ({token}) => token.replace(/\\(.)/g, '$1'),
  2: (opts) => new Day(opts), // Day // TODO
  3: (opts) => new Month(opts), // Month
  4: (opts) => new Year(opts), // Year
  5: (opts) => new Meridiem(opts), // AM/PM // TODO (special)
  6: (opts) => new Hours(opts), // Hours
  7: (opts) => new Minutes(opts), // Minutes
  8: (opts) => new Seconds(opts), // Seconds
  9: (opts) => new Milliseconds(opts), // Fractional seconds
}

const dfltLocales = {
  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
}

/**
 * DatePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Number} [opts.initial] Index of default value
 * @param {String} [opts.mask] The format mask
 * @param {object} [opts.locales] The date locales
 * @param {String} [opts.error] The error message shown on invalid value
 * @param {Function} [opts.validate] Function to validate the submitted value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class DatePrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = '';
    this.locales = Object.assign(dfltLocales, opts.locales);
    this._date = opts.initial || new Date();
    this.errorMsg = opts.error || 'Please Enter A Valid Value';
    this.validator = opts.validate || (() => true);
    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
    this.clear = clear('');
    this.render();
  }

  get value() {
    return this.date
  }

  get date() {
    return this._date;
  }

  set date(date) {
    if (date) this._date.setTime(date.getTime());
  }

  set mask(mask) {
    let result;
    this.parts = [];
    while(result = regex.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex(gr => gr != null);
      this.parts.push(idx in regexGroups
        ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales })
        : result[idx] || match);
    }

    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string')
        arr[arr.length - 1] += i;
      else arr.push(i);
      return arr;
    }, []);

    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }

  moveCursor(n) {
    this.typed = '';
    this.cursor = n;
    this.fire();
  }

  reset() {
    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart));
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }
  
  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === 'string') {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    await this.validate();
    if (this.error) {
      this.color = 'red';
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  up() {
    this.typed = '';
    this.parts[this.cursor].up();
    this.render();
  }

  down() {
    this.typed = '';
    this.parts[this.cursor].down();
    this.render();
  }

  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null) return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }

  right() {
    let next = this.parts[this.cursor].next();
    if (next == null) return this.bell();
    this.moveCursor(this.parts.indexOf(next));
    this.render();
  }

  next() {
    let next = this.parts[this.cursor].next();
    this.moveCursor(next
      ? this.parts.indexOf(next)
      : this.parts.findIndex((part) => part instanceof DatePart));
    this.render();
  }

  _(c) {
    if (/\d/.test(c)) {
      this.typed += c;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(erase.lines(1));
    super.render();
    let clear = erase.line + (this.lines ? erase.down(this.lines) : '') + cursor.to(0);
    this.lines = 0;
    
    let error = '';
    if (this.error) {
      let lines = this.errorMsg.split('\n');
      error = lines.reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
      this.lines = lines.length;
    }

    // Print prompt
    let prompt = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), [])
        .join(''),
    ].join(' ');
    
    let position = '';
    if (this.lines) {
        position += cursor.up(this.lines);
        position += cursor.left+cursor.to(strip(prompt).length);
    }

    this.out.write(clear+prompt+error+position);
  }
}

module.exports = DatePrompt;


/***/ }),

/***/ 9098:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  TextPrompt: __webpack_require__(5387),
  SelectPrompt: __webpack_require__(6514),
  TogglePrompt: __webpack_require__(2093),
  DatePrompt: __webpack_require__(5667),
  NumberPrompt: __webpack_require__(2952),
  MultiselectPrompt: __webpack_require__(1944),
  AutocompletePrompt: __webpack_require__(1098),
  AutocompleteMultiselectPrompt: __webpack_require__(8178),
  ConfirmPrompt: __webpack_require__(1491)
};


/***/ }),

/***/ 1944:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);
const { cursor } = __webpack_require__(9571);
const Prompt = __webpack_require__(4185);
const { clear, figures, style } = __webpack_require__(9501);

/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class MultiselectPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || '';
    this.warn = opts.warn || '- This option is disabled -';
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string')
        ch = {title: ch, value: idx};
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value || idx),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear('');
    if (!opts.overrideRender) {
      this.render();
    }
  }

  reset() {
    this.value.map(v => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }

  selected() {
    return this.value.filter(v => v.selected);
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    const selected = this.value
      .filter(e => e.selected);
    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }

  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }

  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.value[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      return this.bell();
    } 
  }

  renderInstructions() {
    return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    enter/return: Complete answer
    `
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
    else title = cursor === i ? color.cyan().underline(v.title) : v.title;
    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title
  }

  // shared with autocompleteMultiselect
  paginateOptions(options) {
    const c = this.cursor;
    let styledOptions = options.map((v, i) => this.renderOption(c, v, i));
    const numOfOptionsToRender = 10; // if needed, can add an option to change this.

    let scopedOptions = styledOptions;
    let hint = '';
    if (styledOptions.length === 0) {
      return color.red('No matches for this query.');
    } else if (styledOptions.length > numOfOptionsToRender) {
      let startIndex = c - (numOfOptionsToRender / 2);
      let endIndex = c + (numOfOptionsToRender / 2);
      if (startIndex < 0) {
        startIndex = 0;
        endIndex = numOfOptionsToRender;
      } else if (endIndex > options.length) {
        endIndex = options.length;
        startIndex = endIndex - numOfOptionsToRender;
      }
      scopedOptions = styledOptions.slice(startIndex, endIndex);
      hint = color.dim('(Move up and down to reveal more choices)');
    }
    return '\n' + scopedOptions.join('\n') + '\n' + hint;
  }

  // shared with autocomleteMultiselect
  renderOptions(options) {
    if (!this.done) {
      return this.paginateOptions(options);
    }
    return '';
  }

  renderDoneOrInstructions() {
    if (this.done) {
      const selected = this.value
        .filter(e => e.selected)
        .map(v => v.title)
        .join(', ');
      return selected;
    }
    
    const output = [color.gray(this.hint), this.renderInstructions()];

    if (this.value[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }
    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();

    // print prompt
    
    let prompt = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(' ');
    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt += this.renderOptions(this.value);

    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }
}

module.exports = MultiselectPrompt;


/***/ }),

/***/ 2952:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const color = __webpack_require__(5215);
const Prompt = __webpack_require__(4185);
const { cursor, erase } = __webpack_require__(9571);
const { style, clear, figures, strip } = __webpack_require__(9501);

const isNumber = /[0-9]/;
const isDef = any => any !== undefined;
const round = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */
class NumberPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : '';
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.validator = opts.validate || (() => true);
    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }

  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v, this.round)}`);
      this._value = round(v, this.round);
    }
    this.fire();
  }

  get value() {
    return this._value;
  }

  parse(x) {
    return this.float ? parseFloat(x) : parseInt(x);
  }

  valid(c) {
    return c === `-` || c === `.` && this.float || isNumber.test(c)
  }

  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }

  abort() {
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    await this.validate();
    if (this.error) {
      this.color = `red`;
      this.fire();
      this.render();
      return;
    }
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = true;
    this.aborted = false;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  up() {
    this.typed = ``;
    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  down() {
    this.typed = ``;
    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse((val = val.slice(0, -1))) || ``;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (!this.valid(c)) return this.bell();

    const now = Date.now();
    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed
    this.typed += c;
    this.lastHit = now;
    this.color = `cyan`;

    if (c === `.`) return this.fire();

    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }

  render() {
    if (this.closed) return;
    super.render();
    let clear = erase.line + (this.lines ? erase.down(this.lines) : ``) + cursor.to(0);
    this.lines = 0;

    let error = ``;
    if (this.error) {
      let lines = this.errorMsg.split(`\n`);
      error += lines.reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
      this.lines = lines.length;
    }

    let underline = !this.done || (!this.done && !this.placeholder);
    let prompt = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      underline ? color[this.color]().underline(this.rendered) : this.rendered
    ].join(` `);

    let position = ``;
    if (this.lines) {
      position += cursor.up(this.lines);
      position += cursor.left+cursor.to(strip(prompt).length);
    }

    this.out.write(clear+prompt+error+position);
  }
}

module.exports = NumberPrompt;


/***/ }),

/***/ 4185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const readline = __webpack_require__(1058);
const { action } = __webpack_require__(9501);
const EventEmitter = __webpack_require__(8614);
const { beep, cursor } = __webpack_require__(9571);
const color = __webpack_require__(5215);

/**
 * Base prompt skeleton
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class Prompt extends EventEmitter {
  constructor(opts={}) {
    super();

    this.firstRender = true;
    this.in = opts.in || process.stdin;
    this.out = opts.out || process.stdout;
    this.onRender = (opts.onRender || (() => void 0)).bind(this);

    const rl = readline.createInterface(this.in);
    readline.emitKeypressEvents(this.in, rl);

    if (this.in.isTTY) this.in.setRawMode(true);

    const keypress = (str, key) => {
      let a = action(key);
      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === 'function') {
        this[a](key);
      } else {
        this.bell();
      }
    };

    this.close = () => {
      this.out.write(cursor.show);
      this.in.removeListener('keypress', keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : 'submit', this.value);
      this.closed = true;
    };

    this.in.on('keypress', keypress);
  }

  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted
    });
  }

  bell() {
    this.out.write(beep);
  }

  render() {
    this.onRender(color);
    if (this.firstRender) this.firstRender = false;
  }
}

module.exports = Prompt;


/***/ }),

/***/ 6514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const color = __webpack_require__(5215);
const Prompt = __webpack_require__(4185);
const { style, clear, figures } = __webpack_require__(9501);
const { erase, cursor } = __webpack_require__(9571);

/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class SelectPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string')
        ch = {title: ch, value: idx};
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value || idx),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear('');
    this.render();
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    } else
      this.bell();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(erase.lines(this.choices.length + 1));
    super.render();

    // Print prompt
    this.out.write([
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(false),
        this.done ? this.selection.title : this.selection.disabled
                  ? color.yellow(this.warn) : color.gray(this.hint)
      ].join(' '));

    // Print choices
    if (!this.done) {
      this.out.write(
        '\n' +
          this.choices
            .map((v, i) => {
              let title, prefix;
              if (v.disabled) {
                title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
                prefix = this.cursor === i ? color.bold().gray(figures.pointer) + ' ' : '  ';
              } else {
                title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
                prefix = this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ';
              }
              return `${prefix} ${title}`;
            })
            .join('\n')
      );
    }
  }
}

module.exports = SelectPrompt;


/***/ }),

/***/ 5387:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const color = __webpack_require__(5215);
const Prompt = __webpack_require__(4185);
const { cursor } = __webpack_require__(9571);
const { style, clear, strip, figures } = __webpack_require__(9501);

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.initial] Default value
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */
class TextPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;
    this.validator = opts.validate || (() => true);
    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.clear = clear(``);
    this.render();
  }

  set value(v) {
    if (!v && this.initial) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v);
    }
    this._value = v;
    this.fire();
  }

  get value() {
    return this._value;
  }

  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.fire();
    this.render();
  }

  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    this.value = this.value || this.initial;
    await this.validate();
    if (this.error) {
      this.red = true;
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  next() {
    if (!this.placeholder) return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }

  moveCursor(n) {
    if (this.placeholder) return;
    this.cursor = this.cursor+n;
  }

  _(c, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length+1;
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.value.slice(0, this.cursor-1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.moveCursor(-1);
    this.render();
  }

  deleteForward() {
    if(this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor+1);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.render();
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length;
    this.render();
  }

  left() {
    if (this.cursor <= 0 || this.placeholder) return this.bell();
    this.moveCursor(-1);
    this.render();
  }

  right() {
    if (this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
    this.moveCursor(1);
    this.render();
  }

  render() {
    if (this.closed) return;
    super.render();
    let erase = (this.lines ? cursor.down(this.lines) : ``)+this.clear;
    this.lines = 0;

    let prompt = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      this.red ? color.red(this.rendered) : this.rendered
    ].join(` `);

    let error = ``;
    if (this.error) {
      let lines = this.errorMsg.split(`\n`);
      error += lines.reduce((a, l, i) => a += `\n${i ? ' ' : figures.pointerSmall} ${color.red().italic(l)}`, ``);
      this.lines = lines.length;
    }

    let position = ``;
    if (this.lines) {
      position += cursor.up(this.lines);
      position += cursor.left+cursor.to(strip(prompt).length);
    }
    position += cursor.move(this.placeholder ?
      -this.initial.length*this.scale :
      -this.rendered.length+this.cursor*this.scale
    );

    this.out.write(erase+prompt+error+position);
    this.clear = clear(prompt+error);
  }
}

module.exports = TextPrompt;


/***/ }),

/***/ 2093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const color = __webpack_require__(5215);
const Prompt = __webpack_require__(4185);
const { style, clear } = __webpack_require__(9501);
const { cursor, erase } = __webpack_require__(9571);

/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class TogglePrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || 'on';
    this.inactive = opts.inactive || 'off';
    this.initialValue = this.value;
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }

  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }

  delete() {
    this.deactivate();
  }
  left() {
    this.deactivate();
  }
  right() {
    this.activate();
  }
  down() {
    this.deactivate();
  }
  up() {
    this.activate();
  }

  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.value = !this.value;
    } else if (c === '1') {
      this.value = true;
    } else if (c === '0') {
      this.value = false;
    } else return this.bell();
    this.render();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();

    this.out.write(
      erase.lines(this.first ? 1 : this.msg.split(/\n/g).length) +
      cursor.to(0) + [
        style.symbol(this.done, this.aborted),
        color.bold(this.msg),
        style.delimiter(this.done),
        this.value ? this.inactive : color.cyan().underline(this.inactive),
        color.gray('/'),
        this.value ? color.cyan().underline(this.active) : this.active
      ].join(' ')
    );
  }
}

module.exports = TogglePrompt;


/***/ }),

/***/ 5379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const prompts = __webpack_require__(1558);

const passOn = ['suggest', 'format', 'onState', 'validate', 'onRender'];
const noop = () => {};

/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @param {Function} [onSubmit] Callback function called on prompt submit
 * @param {Function} [onCancel] Callback function called on cancel/abort
 * @returns {Object} Object with values from user input
 */
async function prompt(questions=[], { onSubmit=noop, onCancel=noop }={}) {
  const answers = {};
  const override = prompt._override || {};
  questions = [].concat(questions);
  let answer, question, quit, name, type;

  const getFormattedAnswer = async (question, answer, skipValidation = false) => {
    if (!skipValidation && question.validate && question.validate(answer) !== true) {
      return;
    }
    return question.format ? await question.format(answer, answers) : answer
  };

  for (question of questions) {
    ({ name, type } = question);

    // if property is a function, invoke it unless it's a special function
    for (let key in question) {
      if (passOn.includes(key)) continue;
      let value = question[key];
      question[key] = typeof value === 'function' ? await value(answer, { ...answers }, question) : value;
    }

    if (typeof question.message !== 'string') {
      throw new Error('prompt message is required');
    }

    // update vars in case they changed
    ({ name, type } = question);

    // skip if type is a falsy value
    if (!type) continue;

    if (prompts[type] === void 0) {
      throw new Error(`prompt type (${type}) is not defined`);
    }

    if (override[question.name] !== undefined) {
      answer = await getFormattedAnswer(question, override[question.name]);
      if (answer !== undefined) {
        answers[name] = answer;
        continue;
      }
    }

    try {
      // Get the injected answer if there is one or prompt the user
      answer = prompt._injected ? getInjectedAnswer(prompt._injected) : await prompts[type](question);
      answers[name] = answer = await getFormattedAnswer(question, answer, true);
      quit = await onSubmit(question, answer, answers);
    } catch (err) {
      quit = !(await onCancel(question, answers));
    }

    if (quit) return answers;
  }

  return answers;
}

function getInjectedAnswer(injected) {
  const answer = injected.shift();
    if (answer instanceof Error) {
      throw answer;
    }

    return answer;
}

function inject(answers) {
  prompt._injected = (prompt._injected || []).concat(answers);
}

function override(answers) {
  prompt._override = Object.assign({}, answers);
}

module.exports = Object.assign(prompt, { prompt, prompts, inject, override });


/***/ }),

/***/ 1558:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const $ = exports;
const el = __webpack_require__(9098);
const noop = v => v;

function toPrompt(type, args, opts={}) {
  return new Promise((res, rej) => {
    const p = new el[type](args);
    const onAbort = opts.onAbort || noop;
    const onSubmit = opts.onSubmit || noop;
    p.on('state', args.onState || noop);
    p.on('submit', x => res(onSubmit(x)));
    p.on('abort', x => rej(onAbort(x)));
  });
}

/**
 * Text prompt
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.text = args => toPrompt('TextPrompt', args);

/**
 * Password prompt with masked input
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.password = args => {
  args.style = 'password';
  return $.text(args);
};

/**
 * Prompt where input is invisible, like sudo
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.invisible = args => {
  args.style = 'invisible';
  return $.text(args);
};

/**
 * Number prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.number = args => toPrompt('NumberPrompt', args);

/**
 * Date prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.date = args => toPrompt('DatePrompt', args);

/**
 * Classic yes/no prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.confirm = args => toPrompt('ConfirmPrompt', args);

/**
 * List prompt, split intput string by `seperator`
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [args.separator] String separator
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input, in form of an `Array`
 */
$.list = args => {
  const sep = args.separator || ',';
  return toPrompt('TextPrompt', args, {
    onSubmit: str => str.split(sep).map(s => s.trim())
  });
};

/**
 * Toggle/switch prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {string} [args.active="on"] Text for `active` state
 * @param {string} [args.inactive="off"] Text for `inactive` state
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.toggle = args => toPrompt('TogglePrompt', args);

/**
 * Interactive select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [args.initial] Index of default value
 * @param {String} [args.hint] Hint to display
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.select = args => toPrompt('SelectPrompt', args);

/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [args.max] Max select
 * @param {string} [args.hint] Hint to display user
 * @param {Number} [args.cursor=0] Cursor start position
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.multiselect = args => {
  args.choices = [].concat(args.choices || []);
  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
  return toPrompt('MultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

$.autocompleteMultiselect = args => {
  args.choices = [].concat(args.choices || []);
  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
  return toPrompt('AutocompleteMultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

const byTitle = (input, choices) => Promise.resolve(
  choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
);

/**
 * Interactive auto-complete prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
 * @param {number} [args.limit=10] Max number of results to show
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {String} [args.initial] Index of the default value
 * @param {String} [args.fallback] Fallback message - defaults to initial value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.autocomplete = args => {
  args.suggest = args.suggest || byTitle;
  args.choices = [].concat(args.choices || []);
  return toPrompt('AutocompletePrompt', args);
};


/***/ }),

/***/ 2337:
/***/ ((module) => {

"use strict";


module.exports = key => {
  if (key.ctrl) {
    if (key.name === 'a') return 'first';
    if (key.name === 'c') return 'abort';
    if (key.name === 'd') return 'abort';
    if (key.name === 'e') return 'last';
    if (key.name === 'g') return 'reset';
  }

  if (key.name === 'return') return 'submit';
  if (key.name === 'enter') return 'submit'; // ctrl + J
  if (key.name === 'backspace') return 'delete';
  if (key.name === 'delete') return 'deleteForward';
  if (key.name === 'abort') return 'abort';
  if (key.name === 'escape') return 'abort';
  if (key.name === 'tab') return 'next';
  if (key.name === 'pagedown') return 'nextPage';
  if (key.name === 'pageup') return 'prevPage';

  if (key.name === 'up') return 'up';
  if (key.name === 'down') return 'down';
  if (key.name === 'right') return 'right';
  if (key.name === 'left') return 'left';

  return false;
};


/***/ }),

/***/ 4679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const strip = __webpack_require__(6439);
const { erase, cursor } = __webpack_require__(9571);

const width = str => [...strip(str)].length;

module.exports = function(prompt, perLine = process.stdout.columns) {
  if (!perLine) return erase.line + cursor.to(0);

  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  for (let line of lines) {
    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
  }

  return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
};


/***/ }),

/***/ 1918:
/***/ ((module) => {

"use strict";
	

 const main = {
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  tick: '✔',	
  cross: '✖',	
  ellipsis: '…',	
  pointerSmall: '›',	
  line: '─',	
  pointer: '❯'	
};	
const win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',	
  tick: '√',	
  cross: '×',	
  ellipsis: '...',	
  pointerSmall: '»',	
  line: '─',	
  pointer: '>'	
};	
const figures = process.platform === 'win32' ? win : main;	

 module.exports = figures;


/***/ }),

/***/ 9501:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = {
  action: __webpack_require__(2337),
  clear: __webpack_require__(4679),
  style: __webpack_require__(5290),
  strip: __webpack_require__(6439),
  figures: __webpack_require__(1918)
};


/***/ }),

/***/ 6439:
/***/ ((module) => {

"use strict";


module.exports = str => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
  ].join('|');

  const RGX = new RegExp(pattern, 'g');
  return typeof str === 'string' ? str.replace(RGX, '') : str;
};


/***/ }),

/***/ 5290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const c = __webpack_require__(5215);
const figures = __webpack_require__(1918);

// rendering user input.
const styles = Object.freeze({
  password: { scale: 1, render: input => '*'.repeat(input.length) },
  emoji: { scale: 2, render: input => '😃'.repeat(input.length) },
  invisible: { scale: 0, render: input => '' },
  default: { scale: 1, render: input => `${input}` }
});
const render = type => styles[type] || styles.default;

// icon to signalize a prompt.
const symbols = Object.freeze({
  aborted: c.red(figures.cross),
  done: c.green(figures.tick),
  default: c.cyan('?')
});

const symbol = (done, aborted) =>
  aborted ? symbols.aborted : done ? symbols.done : symbols.default;

// between the question and the user's input.
const delimiter = completing =>
  c.gray(completing ? figures.ellipsis : figures.pointerSmall);

const item = (expandable, expanded) =>
  c.gray(expandable ? (expanded ? figures.pointerSmall : '+') : figures.line);

module.exports = {
  styles,
  render,
  symbols,
  symbol,
  delimiter,
  item
};


/***/ }),

/***/ 8341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var once = __webpack_require__(1223)
var eos = __webpack_require__(1205)
var fs = __webpack_require__(5747) // we only need fs to get the ReadStream and WriteStream prototypes

var noop = function () {}
var ancient = /^v?\.0/.test(process.version)

var isFn = function (fn) {
  return typeof fn === 'function'
}

var isFS = function (stream) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs) return false // browser
  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
}

var isRequest = function (stream) {
  return stream.setHeader && isFn(stream.abort)
}

var destroyer = function (stream, reading, writing, callback) {
  callback = once(callback)

  var closed = false
  stream.on('close', function () {
    closed = true
  })

  eos(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true
    callback()
  })

  var destroyed = false
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true

    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'))
  }
}

var call = function (fn) {
  fn()
}

var pipe = function (from, to) {
  return from.pipe(to)
}

var pump = function () {
  var streams = Array.prototype.slice.call(arguments)
  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

  if (Array.isArray(streams[0])) streams = streams[0]
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1
    var writing = i > 0
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err
      if (err) destroys.forEach(call)
      if (reading) return
      destroys.forEach(call)
      callback(error)
    })
  })

  return streams.reduce(pipe)
}

module.exports = pump


/***/ }),

/***/ 7353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var cc   = __webpack_require__(5588)
var join = __webpack_require__(5622).join
var deepExtend = __webpack_require__(1705)
var etc = '/etc'
var win = process.platform === "win32"
var home = win
           ? process.env.USERPROFILE
           : process.env.HOME

module.exports = function (name, defaults, argv, parse) {
  if('string' !== typeof name)
    throw new Error('rc(name): name *must* be string')
  if(!argv)
    argv = __webpack_require__(5871)(process.argv.slice(2))
  defaults = (
      'string' === typeof defaults
    ? cc.json(defaults) : defaults
    ) || {}

  parse = parse || cc.parse

  var env = cc.env(name + '_')

  var configs = [defaults]
  var configFiles = []
  function addConfigFile (file) {
    if (configFiles.indexOf(file) >= 0) return
    var fileConfig = cc.file(file)
    if (fileConfig) {
      configs.push(parse(fileConfig))
      configFiles.push(file)
    }
  }

  // which files do we look at?
  if (!win)
   [join(etc, name, 'config'),
    join(etc, name + 'rc')].forEach(addConfigFile)
  if (home)
   [join(home, '.config', name, 'config'),
    join(home, '.config', name),
    join(home, '.' + name, 'config'),
    join(home, '.' + name + 'rc')].forEach(addConfigFile)
  addConfigFile(cc.find('.'+name+'rc'))
  if (env.config) addConfigFile(env.config)
  if (argv.config) addConfigFile(argv.config)

  return deepExtend.apply(null, configs.concat([
    env,
    argv,
    configFiles.length ? {configs: configFiles, config: configFiles[configFiles.length - 1]} : undefined,
  ]))
}


/***/ }),

/***/ 5588:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var fs   = __webpack_require__(5747)
var ini  = __webpack_require__(8885)
var path = __webpack_require__(5622)
var stripJsonComments = __webpack_require__(2562)

var parse = exports.parse = function (content) {

  //if it ends in .json or starts with { then it must be json.
  //must be done this way, because ini accepts everything.
  //can't just try and parse it and let it throw if it's not ini.
  //everything is ini. even json with a syntax error.

  if(/^\s*{/.test(content))
    return JSON.parse(stripJsonComments(content))
  return ini.parse(content)

}

var file = exports.file = function () {
  var args = [].slice.call(arguments).filter(function (arg) { return arg != null })

  //path.join breaks if it's a not a string, so just skip this.
  for(var i in args)
    if('string' !== typeof args[i])
      return

  var file = path.join.apply(null, args)
  var content
  try {
    return fs.readFileSync(file,'utf-8')
  } catch (err) {
    return
  }
}

var json = exports.json = function () {
  var content = file.apply(null, arguments)
  return content ? parse(content) : null
}

var env = exports.env = function (prefix, env) {
  env = env || process.env
  var obj = {}
  var l = prefix.length
  for(var k in env) {
    if(k.toLowerCase().indexOf(prefix.toLowerCase()) === 0) {

      var keypath = k.substring(l).split('__')

      // Trim empty strings from keypath array
      var _emptyStringIndex
      while ((_emptyStringIndex=keypath.indexOf('')) > -1) {
        keypath.splice(_emptyStringIndex, 1)
      }

      var cursor = obj
      keypath.forEach(function _buildSubObj(_subkey,i){

        // (check for _subkey first so we ignore empty strings)
        // (check for cursor to avoid assignment to primitive objects)
        if (!_subkey || typeof cursor !== 'object')
          return

        // If this is the last key, just stuff the value in there
        // Assigns actual value from env variable to final key
        // (unless it's just an empty string- in that case use the last valid key)
        if (i === keypath.length-1)
          cursor[_subkey] = env[k]


        // Build sub-object if nothing already exists at the keypath
        if (cursor[_subkey] === undefined)
          cursor[_subkey] = {}

        // Increment cursor used to track the object at the current depth
        cursor = cursor[_subkey]

      })

    }

  }

  return obj
}

var find = exports.find = function () {
  var rel = path.join.apply(null, [].slice.call(arguments))

  function find(start, rel) {
    var file = path.join(start, rel)
    try {
      fs.statSync(file)
      return file
    } catch (err) {
      if(path.dirname(start) !== start) // root
        return find(path.dirname(start), rel)
    }
  }
  return find(process.cwd(), rel)
}




/***/ }),

/***/ 8506:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const safeBuffer = __webpack_require__(1867).Buffer

function decodeBase64 (base64) {
  return safeBuffer.from(base64, 'base64').toString('utf8')
}

function encodeBase64 (string) {
  return safeBuffer.from(string, 'utf8').toString('base64')
}

module.exports = {
  decodeBase64: decodeBase64,
  encodeBase64: encodeBase64
}


/***/ }),

/***/ 2968:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var url = __webpack_require__(8835)
var base64 = __webpack_require__(8506)

var decodeBase64 = base64.decodeBase64
var encodeBase64 = base64.encodeBase64

var tokenKey = ':_authToken'
var userKey = ':username'
var passwordKey = ':_password'

module.exports = function () {
  var checkUrl
  var options
  if (arguments.length >= 2) {
    checkUrl = arguments[0]
    options = arguments[1]
  } else if (typeof arguments[0] === 'string') {
    checkUrl = arguments[0]
  } else {
    options = arguments[0]
  }
  options = options || {}
  options.npmrc = options.npmrc || __webpack_require__(7353)('npm', {registry: 'https://registry.npmjs.org/'})
  checkUrl = checkUrl || options.npmrc.registry
  return getRegistryAuthInfo(checkUrl, options) || getLegacyAuthInfo(options.npmrc)
}

function getRegistryAuthInfo (checkUrl, options) {
  var parsed = url.parse(checkUrl, false, true)
  var pathname

  while (pathname !== '/' && parsed.pathname !== pathname) {
    pathname = parsed.pathname || '/'

    var regUrl = '//' + parsed.host + pathname.replace(/\/$/, '')
    var authInfo = getAuthInfoForUrl(regUrl, options.npmrc)
    if (authInfo) {
      return authInfo
    }

    // break if not recursive
    if (!options.recursive) {
      return /\/$/.test(checkUrl)
        ? undefined
        : getRegistryAuthInfo(url.resolve(checkUrl, '.'), options)
    }

    parsed.pathname = url.resolve(normalizePath(pathname), '..') || '/'
  }

  return undefined
}

function getLegacyAuthInfo (npmrc) {
  if (npmrc._auth) {
    return {token: npmrc._auth, type: 'Basic'}
  }
  return undefined
}

function normalizePath (path) {
  return path[path.length - 1] === '/' ? path : path + '/'
}

function getAuthInfoForUrl (regUrl, npmrc) {
  // try to get bearer token
  var bearerAuth = getBearerToken(npmrc[regUrl + tokenKey] || npmrc[regUrl + '/' + tokenKey])
  if (bearerAuth) {
    return bearerAuth
  }

  // try to get basic token
  var username = npmrc[regUrl + userKey] || npmrc[regUrl + '/' + userKey]
  var password = npmrc[regUrl + passwordKey] || npmrc[regUrl + '/' + passwordKey]
  var basicAuth = getTokenForUsernameAndPassword(username, password)
  if (basicAuth) {
    return basicAuth
  }

  return undefined
}

function getBearerToken (tok) {
  if (!tok) {
    return undefined
  }

  // check if bearer token
  var token = tok.replace(/^\$\{?([^}]*)\}?$/, function (fullMatch, envVar) {
    return process.env[envVar]
  })

  return {token: token, type: 'Bearer'}
}

function getTokenForUsernameAndPassword (username, password) {
  if (!username || !password) {
    return undefined
  }

  // passwords are base64 encoded, so we need to decode it
  // See https://github.com/npm/npm/blob/v3.10.6/lib/config/set-credentials-by-uri.js#L26
  var pass = decodeBase64(password.replace(/^\$\{?([^}]*)\}?$/, function (fullMatch, envVar) {
    return process.env[envVar]
  }))

  // a basic auth token is base64 encoded 'username:password'
  // See https://github.com/npm/npm/blob/v3.10.6/lib/config/get-credentials-by-uri.js#L70
  var token = encodeBase64(username + ':' + pass)

  // we found a basicToken token so let's exit the loop
  return {
    token: token,
    type: 'Basic',
    password: pass,
    username: username
  }
}


/***/ }),

/***/ 4182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = function (scope) {
	var rc = __webpack_require__(7353)('npm', {registry: 'https://registry.npmjs.org/'});
	var url = rc[scope + ':registry'] || rc.registry;
	return url.slice(-1) === '/' ? url : url + '/';
};


/***/ }),

/***/ 9004:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Readable = __webpack_require__(2413).Readable;
const lowercaseKeys = __webpack_require__(9662);

class Response extends Readable {
	constructor(statusCode, headers, body, url) {
		if (typeof statusCode !== 'number') {
			throw new TypeError('Argument `statusCode` should be a number');
		}
		if (typeof headers !== 'object') {
			throw new TypeError('Argument `headers` should be an object');
		}
		if (!(body instanceof Buffer)) {
			throw new TypeError('Argument `body` should be a buffer');
		}
		if (typeof url !== 'string') {
			throw new TypeError('Argument `url` should be a string');
		}

		super();
		this.statusCode = statusCode;
		this.headers = lowercaseKeys(headers);
		this.body = body;
		this.url = url;
	}

	_read() {
		this.push(this.body);
		this.push(null);
	}
}

module.exports = Response;


/***/ }),

/***/ 4347:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(6244);

/***/ }),

/***/ 6244:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var RetryOperation = __webpack_require__(5369);

exports.operation = function(options) {
  var timeouts = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && options.forever,
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a,b) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt, opts) {
  var random = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj, options, methods) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method   = methods[i];
    var original = obj[method];

    obj[method] = function retryWrapper(original) {
      var op       = exports.operation(options);
      var args     = Array.prototype.slice.call(arguments, 1);
      var callback = args.pop();

      args.push(function(err) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};


/***/ }),

/***/ 5369:
/***/ ((module) => {

function RetryOperation(timeouts, options) {
  // Compatibility for the old (timeouts, retryForever) signature
  if (typeof options === 'boolean') {
    options = { forever: options };
  }

  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;

  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
module.exports = RetryOperation;

RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts;
}

RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  this._timeouts       = [];
  this._cachedTimeouts = null;
};

RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  if (!err) {
    return false;
  }
  var currentTime = new Date().getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.unshift(new Error('RetryOperation timeout occurred'));
    return false;
  }

  this._errors.push(err);

  var timeout = this._timeouts.shift();
  if (timeout === undefined) {
    if (this._cachedTimeouts) {
      // retry forever, only keep last error
      this._errors.splice(this._errors.length - 1, this._errors.length);
      this._timeouts = this._cachedTimeouts.slice(0);
      timeout = this._timeouts.shift();
    } else {
      return false;
    }
  }

  var self = this;
  var timer = setTimeout(function() {
    self._attempts++;

    if (self._operationTimeoutCb) {
      self._timeout = setTimeout(function() {
        self._operationTimeoutCb(self._attempts);
      }, self._operationTimeout);

      if (self._options.unref) {
          self._timeout.unref();
      }
    }

    self._fn(self._attempts);
  }, timeout);

  if (this._options.unref) {
      timer.unref();
  }

  return true;
};

RetryOperation.prototype.attempt = function(fn, timeoutOps) {
  this._fn = fn;

  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }

  var self = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self._operationTimeoutCb();
    }, self._operationTimeout);
  }

  this._operationStart = new Date().getTime();

  this._fn(this._attempts);
};

RetryOperation.prototype.try = function(fn) {
  console.log('Using RetryOperation.try() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = function(fn) {
  console.log('Using RetryOperation.start() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = RetryOperation.prototype.try;

RetryOperation.prototype.errors = function() {
  return this._errors;
};

RetryOperation.prototype.attempts = function() {
  return this._attempts;
};

RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }

  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;

  for (var i = 0; i < this._errors.length; i++) {
    var error = this._errors[i];
    var message = error.message;
    var count = (counts[message] || 0) + 1;

    counts[message] = count;

    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }

  return mainError;
};


/***/ }),

/***/ 4959:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const assert = __webpack_require__(2357)
const path = __webpack_require__(5622)
const fs = __webpack_require__(5747)
let glob = undefined
try {
  glob = __webpack_require__(1957)
} catch (_err) {
  // treat glob as optional.
}

const defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
let timeout = 0

const isWindows = (process.platform === "win32")

const defaults = options => {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(m => {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  if (options.disableGlob !== true && glob === undefined) {
    throw Error('glob dependency not found, set `options.disableGlob = true` if intentional')
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

const rimraf = (p, options, cb) => {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  let busyTries = 0
  let errState = null
  let n = 0

  const next = (er) => {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  const afterGlob = (er, results) => {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(p => {
      const CB = (er) => {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            // try again, with the same exact callback as this one.
            return setTimeout(() => rimraf_(p, options, CB), busyTries * 100)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(() => rimraf_(p, options, CB), timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      }
      rimraf_(p, options, CB)
    })
  }

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, (er, stat) => {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
const rimraf_ = (p, options, cb) => {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, (er, st) => {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, er => {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

const fixWinEPERM = (p, options, er, cb) => {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er)
    assert(er instanceof Error)

  options.chmod(p, 0o666, er2 => {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, (er3, stats) => {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

const fixWinEPERMSync = (p, options, er) => {
  assert(p)
  assert(options)
  if (er)
    assert(er instanceof Error)

  try {
    options.chmodSync(p, 0o666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  let stats
  try {
    stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

const rmdir = (p, options, originalEr, cb) => {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

const rmkids = (p, options, cb) => {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, (er, files) => {
    if (er)
      return cb(er)
    let n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    let errState
    files.forEach(f => {
      rimraf(path.join(p, f), options, er => {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
const rimrafSync = (p, options) => {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  let results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (let i = 0; i < results.length; i++) {
    const p = results[i]

    let st
    try {
      st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

const rmdirSync = (p, options, originalEr) => {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

const rmkidsSync = (p, options) => {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  const retries = isWindows ? 100 : 1
  let i = 0
  do {
    let threw = true
    try {
      const ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}

module.exports = rimraf
rimraf.sync = rimrafSync


/***/ }),

/***/ 1867:
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(4293)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 5911:
/***/ ((module, exports) => {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options)
        })
      })
    })
  })
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),

/***/ 7032:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var shebangRegex = __webpack_require__(2638);

module.exports = function (str) {
	var match = str.match(shebangRegex);

	if (!match) {
		return null;
	}

	var arr = match[0].replace(/#! ?/, '').split(' ');
	var bin = arr[0].split('/').pop();
	var arg = arr[1];

	return (bin === 'env' ?
		arg :
		bin + (arg ? ' ' + arg : '')
	);
};


/***/ }),

/***/ 2638:
/***/ ((module) => {

"use strict";

module.exports = /^#!.*/;


/***/ }),

/***/ 9571:
/***/ ((module) => {

"use strict";


const ESC = '\x1B';
const CSI = `${ESC}[`;
const beep = '\u0007';

const cursor = {
  to(x, y) {
    if (!y) return `${CSI}${x + 1}G`;
    return `${CSI}${y + 1};${x + 1}H`;
  },
  move(x, y) {
    let ret = '';

    if (x < 0) ret += `${CSI}${-x}D`;
    else if (x > 0) ret += `${CSI}${x}C`;

    if (y < 0) ret += `${CSI}${-y}A`;
    else if (y > 0) ret += `${CSI}${y}B`;

    return ret;
  },
  up: (count = 1) => `${CSI}${count}A`,
  down: (count = 1) => `${CSI}${count}B`,
  forward: (count = 1) => `${CSI}${count}C`,
  backward: (count = 1) => `${CSI}${count}D`,
  nextLine: (count = 1) => `${CSI}E`.repeat(count),
  prevLine: (count = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
}

const scroll = {
  up: (count = 1) => `${CSI}S`.repeat(count),
  down: (count = 1) => `${CSI}T`.repeat(count)
}

const erase = {
  screen: `${CSI}2J`,
  up: (count = 1) => `${CSI}1J`.repeat(count),
  down: (count = 1) => `${CSI}J`.repeat(count),
  line: `${CSI}2K`,
  lineEnd: `${CSI}K`,
  lineStart: `${CSI}1K`,
  lines(count) {
    let clear = '';
    for (let i = 0; i < count; i++)
      clear += this.line + (i < count - 1 ? cursor.up() : '');
    if (count)
      clear += cursor.left;
    return clear;
  }
}

module.exports = { cursor, scroll, erase, beep };


/***/ }),

/***/ 2562:
/***/ ((module) => {

"use strict";

var singleComment = 1;
var multiComment = 2;

function stripWithoutWhitespace() {
	return '';
}

function stripWithWhitespace(str, start, end) {
	return str.slice(start, end).replace(/\S/g, ' ');
}

module.exports = function (str, opts) {
	opts = opts || {};

	var currentChar;
	var nextChar;
	var insideString = false;
	var insideComment = false;
	var offset = 0;
	var ret = '';
	var strip = opts.whitespace === false ? stripWithoutWhitespace : stripWithWhitespace;

	for (var i = 0; i < str.length; i++) {
		currentChar = str[i];
		nextChar = str[i + 1];

		if (!insideComment && currentChar === '"') {
			var escaped = str[i - 1] === '\\' && str[i - 2] !== '\\';
			if (!escaped) {
				insideString = !insideString;
			}
		}

		if (insideString) {
			continue;
		}

		if (!insideComment && currentChar + nextChar === '//') {
			ret += str.slice(offset, i);
			offset = i;
			insideComment = singleComment;
			i++;
		} else if (insideComment === singleComment && currentChar + nextChar === '\r\n') {
			i++;
			insideComment = false;
			ret += strip(str, offset, i);
			offset = i;
			continue;
		} else if (insideComment === singleComment && currentChar === '\n') {
			insideComment = false;
			ret += strip(str, offset, i);
			offset = i;
		} else if (!insideComment && currentChar + nextChar === '/*') {
			ret += str.slice(offset, i);
			offset = i;
			insideComment = multiComment;
			i++;
			continue;
		} else if (insideComment === multiComment && currentChar + nextChar === '*/') {
			i++;
			insideComment = false;
			ret += strip(str, offset, i + 1);
			offset = i + 1;
			continue;
		}
	}

	return ret + (insideComment ? strip(str.substr(offset)) : str.substr(offset));
};


/***/ }),

/***/ 9318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(2087);
const hasFlag = __webpack_require__(1621);

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ 4674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


// high-level commands
__webpack_unused_export__ = /* unused reexport */ __webpack_require__(4016)
__webpack_unused_export__ = /* unused reexport */ __webpack_require__(5923)
__webpack_unused_export__ = /* unused reexport */ __webpack_require__(1525)
__webpack_unused_export__ = /* unused reexport */ __webpack_require__(4404)
__webpack_unused_export__ = exports.extract = __webpack_require__(5317)

// classes
/* unused reexport */ __webpack_require__(7900)
/* unused reexport */ __webpack_require__(7628)
/* unused reexport */ __webpack_require__(8917)
/* unused reexport */ __webpack_require__(8116)
/* unused reexport */ __webpack_require__(5450)
/* unused reexport */ __webpack_require__(6043)
/* unused reexport */ __webpack_require__(7996)
/* unused reexport */ __webpack_require__(4173)


/***/ }),

/***/ 6707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// Buffer in node 4.x < 4.5.0 doesn't have working Buffer.from
// or Buffer.alloc, and Buffer in node 10 deprecated the ctor.
// .M, this is fine .\^/M..
let B = Buffer
/* istanbul ignore next */
if (!B.alloc) {
  B = __webpack_require__(1867).Buffer
}
module.exports = B


/***/ }),

/***/ 4016:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// tar -c
const hlo = __webpack_require__(5274)

const Pack = __webpack_require__(7900)
const fs = __webpack_require__(5747)
const fsm = __webpack_require__(7714)
const t = __webpack_require__(1525)
const path = __webpack_require__(5622)

const c = module.exports = (opt_, files, cb) => {
  if (typeof files === 'function')
    cb = files

  if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  return opt.file && opt.sync ? createFileSync(opt, files)
    : opt.file ? createFile(opt, files, cb)
    : opt.sync ? createSync(opt, files)
    : create(opt, files)
}

const createFileSync = (opt, files) => {
  const p = new Pack.Sync(opt)
  const stream = new fsm.WriteStreamSync(opt.file, {
    mode: opt.mode || 0o666
  })
  p.pipe(stream)
  addFilesSync(p, files)
}

const createFile = (opt, files, cb) => {
  const p = new Pack(opt)
  const stream = new fsm.WriteStream(opt.file, {
    mode: opt.mode || 0o666
  })
  p.pipe(stream)

  const promise = new Promise((res, rej) => {
    stream.on('error', rej)
    stream.on('close', res)
    p.on('error', rej)
  })

  addFilesAsync(p, files)

  return cb ? promise.then(cb, cb) : promise
}

const addFilesSync = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@')
      t({
        file: path.resolve(p.cwd, file.substr(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry)
      })
    else
      p.add(file)
  })
  p.end()
}

const addFilesAsync = (p, files) => {
  while (files.length) {
    const file = files.shift()
    if (file.charAt(0) === '@')
      return t({
        file: path.resolve(p.cwd, file.substr(1)),
        noResume: true,
        onentry: entry => p.add(entry)
      }).then(_ => addFilesAsync(p, files))
    else
      p.add(file)
  }
  p.end()
}

const createSync = (opt, files) => {
  const p = new Pack.Sync(opt)
  addFilesSync(p, files)
  return p
}

const create = (opt, files) => {
  const p = new Pack(opt)
  addFilesAsync(p, files)
  return p
}


/***/ }),

/***/ 5317:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// tar -x
const hlo = __webpack_require__(5274)
const Unpack = __webpack_require__(7628)
const fs = __webpack_require__(5747)
const fsm = __webpack_require__(7714)
const path = __webpack_require__(5622)

const x = module.exports = (opt_, files, cb) => {
  if (typeof opt_ === 'function')
    cb = opt_, files = null, opt_ = {}
  else if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (typeof files === 'function')
    cb = files, files = null

  if (!files)
    files = []
  else
    files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  if (files.length)
    filesFilter(opt, files)

  return opt.file && opt.sync ? extractFileSync(opt)
    : opt.file ? extractFile(opt, cb)
    : opt.sync ? extractSync(opt)
    : extract(opt)
}

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [f.replace(/\/+$/, ''), true]))
  const filter = opt.filter

  const mapHas = (file, r) => {
    const root = r || path.parse(file).root || '.'
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path.dirname(file), root)

    map.set(file, ret)
    return ret
  }

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(file.replace(/\/+$/, ''))
    : file => mapHas(file.replace(/\/+$/, ''))
}

const extractFileSync = opt => {
  const u = new Unpack.Sync(opt)

  const file = opt.file
  let threw = true
  let fd
  const stat = fs.statSync(file)
  // This trades a zero-byte read() syscall for a stat
  // However, it will usually result in less memory allocation
  const readSize = opt.maxReadSize || 16*1024*1024
  const stream = new fsm.ReadStreamSync(file, {
    readSize: readSize,
    size: stat.size
  })
  stream.pipe(u)
}

const extractFile = (opt, cb) => {
  const u = new Unpack(opt)
  const readSize = opt.maxReadSize || 16*1024*1024

  const file = opt.file
  const p = new Promise((resolve, reject) => {
    u.on('error', reject)
    u.on('close', resolve)

    // This trades a zero-byte read() syscall for a stat
    // However, it will usually result in less memory allocation
    fs.stat(file, (er, stat) => {
      if (er)
        reject(er)
      else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size
        })
        stream.on('error', reject)
        stream.pipe(u)
      }
    })
  })
  return cb ? p.then(cb, cb) : p
}

const extractSync = opt => {
  return new Unpack.Sync(opt)
}

const extract = opt => {
  return new Unpack(opt)
}


/***/ }),

/***/ 6043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// parse a 512-byte header block to a data object, or vice-versa
// encode returns `true` if a pax extended header is needed, because
// the data could not be faithfully encoded in a simple header.
// (Also, check header.needPax to see if it needs a pax header.)

const Buffer = __webpack_require__(6707)
const types = __webpack_require__(4173)
const pathModule = __webpack_require__(5622).posix
const large = __webpack_require__(2370)

const SLURP = Symbol('slurp')
const TYPE = Symbol('type')

class Header {
  constructor (data, off, ex, gex) {
    this.cksumValid = false
    this.needPax = false
    this.nullBlock = false

    this.block = null
    this.path = null
    this.mode = null
    this.uid = null
    this.gid = null
    this.size = null
    this.mtime = null
    this.cksum = null
    this[TYPE] = '0'
    this.linkpath = null
    this.uname = null
    this.gname = null
    this.devmaj = 0
    this.devmin = 0
    this.atime = null
    this.ctime = null

    if (Buffer.isBuffer(data))
      this.decode(data, off || 0, ex, gex)
    else if (data)
      this.set(data)
  }

  decode (buf, off, ex, gex) {
    if (!off)
      off = 0

    if (!buf || !(buf.length >= off + 512))
      throw new Error('need 512 bytes for header')

    this.path = decString(buf, off, 100)
    this.mode = decNumber(buf, off + 100, 8)
    this.uid = decNumber(buf, off + 108, 8)
    this.gid = decNumber(buf, off + 116, 8)
    this.size = decNumber(buf, off + 124, 12)
    this.mtime = decDate(buf, off + 136, 12)
    this.cksum = decNumber(buf, off + 148, 12)

    // if we have extended or global extended headers, apply them now
    // See https://github.com/npm/node-tar/pull/187
    this[SLURP](ex)
    this[SLURP](gex, true)

    // old tar versions marked dirs as a file with a trailing /
    this[TYPE] = decString(buf, off + 156, 1)
    if (this[TYPE] === '')
      this[TYPE] = '0'
    if (this[TYPE] === '0' && this.path.substr(-1) === '/')
      this[TYPE] = '5'

    // tar implementations sometimes incorrectly put the stat(dir).size
    // as the size in the tarball, even though Directory entries are
    // not able to have any body at all.  In the very rare chance that
    // it actually DOES have a body, we weren't going to do anything with
    // it anyway, and it'll just be a warning about an invalid header.
    if (this[TYPE] === '5')
      this.size = 0

    this.linkpath = decString(buf, off + 157, 100)
    if (buf.slice(off + 257, off + 265).toString() === 'ustar\u000000') {
      this.uname = decString(buf, off + 265, 32)
      this.gname = decString(buf, off + 297, 32)
      this.devmaj = decNumber(buf, off + 329, 8)
      this.devmin = decNumber(buf, off + 337, 8)
      if (buf[off + 475] !== 0) {
        // definitely a prefix, definitely >130 chars.
        const prefix = decString(buf, off + 345, 155)
        this.path = prefix + '/' + this.path
      } else {
        const prefix = decString(buf, off + 345, 130)
        if (prefix)
          this.path = prefix + '/' + this.path
        this.atime = decDate(buf, off + 476, 12)
        this.ctime = decDate(buf, off + 488, 12)
      }
    }

    let sum = 8 * 0x20
    for (let i = off; i < off + 148; i++) {
      sum += buf[i]
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i]
    }
    this.cksumValid = sum === this.cksum
    if (this.cksum === null && sum === 8 * 0x20)
      this.nullBlock = true
  }

  [SLURP] (ex, global) {
    for (let k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path'))
        this[k] = ex[k]
    }
  }

  encode (buf, off) {
    if (!buf) {
      buf = this.block = Buffer.alloc(512)
      off = 0
    }

    if (!off)
      off = 0

    if (!(buf.length >= off + 512))
      throw new Error('need 512 bytes for header')

    const prefixSize = this.ctime || this.atime ? 130 : 155
    const split = splitPrefix(this.path || '', prefixSize)
    const path = split[0]
    const prefix = split[1]
    this.needPax = split[2]

    this.needPax = encString(buf, off, 100, path) || this.needPax
    this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax
    this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax
    this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax
    this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax
    this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax
    buf[off + 156] = this[TYPE].charCodeAt(0)
    this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax
    buf.write('ustar\u000000', off + 257, 8)
    this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax
    this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax
    this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax
    this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax
    this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax
    if (buf[off + 475] !== 0)
      this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax
    else {
      this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax
      this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax
      this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax
    }

    let sum = 8 * 0x20
    for (let i = off; i < off + 148; i++) {
      sum += buf[i]
    }
    for (let i = off + 156; i < off + 512; i++) {
      sum += buf[i]
    }
    this.cksum = sum
    encNumber(buf, off + 148, 8, this.cksum)
    this.cksumValid = true

    return this.needPax
  }

  set (data) {
    for (let i in data) {
      if (data[i] !== null && data[i] !== undefined)
        this[i] = data[i]
    }
  }

  get type () {
    return types.name.get(this[TYPE]) || this[TYPE]
  }

  get typeKey () {
    return this[TYPE]
  }

  set type (type) {
    if (types.code.has(type))
      this[TYPE] = types.code.get(type)
    else
      this[TYPE] = type
  }
}

const splitPrefix = (p, prefixSize) => {
  const pathSize = 100
  let pp = p
  let prefix = ''
  let ret
  const root = pathModule.parse(p).root || '.'

  if (Buffer.byteLength(pp) < pathSize)
    ret = [pp, prefix, false]
  else {
    // first set prefix to the dir, and path to the base
    prefix = pathModule.dirname(pp)
    pp = pathModule.basename(pp)

    do {
      // both fit!
      if (Buffer.byteLength(pp) <= pathSize &&
          Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp, prefix, false]

      // prefix fits in prefix, but path doesn't fit in path
      else if (Buffer.byteLength(pp) > pathSize &&
          Buffer.byteLength(prefix) <= prefixSize)
        ret = [pp.substr(0, pathSize - 1), prefix, true]

      else {
        // make path take a bit from prefix
        pp = pathModule.join(pathModule.basename(prefix), pp)
        prefix = pathModule.dirname(prefix)
      }
    } while (prefix !== root && !ret)

    // at this point, found no resolution, just truncate
    if (!ret)
      ret = [p.substr(0, pathSize - 1), '', true]
  }
  return ret
}

const decString = (buf, off, size) =>
  buf.slice(off, off + size).toString('utf8').replace(/\0.*/, '')

const decDate = (buf, off, size) =>
  numToDate(decNumber(buf, off, size))

const numToDate = num => num === null ? null : new Date(num * 1000)

const decNumber = (buf, off, size) =>
  buf[off] & 0x80 ? large.parse(buf.slice(off, off + size))
    : decSmallNumber(buf, off, size)

const nanNull = value => isNaN(value) ? null : value

const decSmallNumber = (buf, off, size) =>
  nanNull(parseInt(
    buf.slice(off, off + size)
      .toString('utf8').replace(/\0.*$/, '').trim(), 8))

// the maximum encodable as a null-terminated octal, by field size
const MAXNUM = {
  12: 0o77777777777,
  8 : 0o7777777
}

const encNumber = (buf, off, size, number) =>
  number === null ? false :
  number > MAXNUM[size] || number < 0
    ? (large.encode(number, buf.slice(off, off + size)), true)
    : (encSmallNumber(buf, off, size, number), false)

const encSmallNumber = (buf, off, size, number) =>
  buf.write(octalString(number, size), off, size, 'ascii')

const octalString = (number, size) =>
  padOctal(Math.floor(number).toString(8), size)

const padOctal = (string, size) =>
  (string.length === size - 1 ? string
  : new Array(size - string.length - 1).join('0') + string + ' ') + '\0'

const encDate = (buf, off, size, date) =>
  date === null ? false :
  encNumber(buf, off, size, date.getTime() / 1000)

// enough to fill the longest string we've got
const NULLS = new Array(156).join('\0')
// pad with nulls, return true if it's longer or non-ascii
const encString = (buf, off, size, string) =>
  string === null ? false :
  (buf.write(string + NULLS, off, size, 'utf8'),
   string.length !== Buffer.byteLength(string) || string.length > size)

module.exports = Header


/***/ }),

/***/ 5274:
/***/ ((module) => {

"use strict";


// turn tar(1) style args like `C` into the more verbose things like `cwd`

const argmap = new Map([
  ['C', 'cwd'],
  ['f', 'file'],
  ['z', 'gzip'],
  ['P', 'preservePaths'],
  ['U', 'unlink'],
  ['strip-components', 'strip'],
  ['stripComponents', 'strip'],
  ['keep-newer', 'newer'],
  ['keepNewer', 'newer'],
  ['keep-newer-files', 'newer'],
  ['keepNewerFiles', 'newer'],
  ['k', 'keep'],
  ['keep-existing', 'keep'],
  ['keepExisting', 'keep'],
  ['m', 'noMtime'],
  ['no-mtime', 'noMtime'],
  ['p', 'preserveOwner'],
  ['L', 'follow'],
  ['h', 'follow']
])

const parse = module.exports = opt => opt ? Object.keys(opt).map(k => [
  argmap.has(k) ? argmap.get(k) : k, opt[k]
]).reduce((set, kv) => (set[kv[0]] = kv[1], set), Object.create(null)) : {}


/***/ }),

/***/ 2370:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Tar can encode large and negative numbers using a leading byte of
// 0xff for negative, and 0x80 for positive.

const encode = exports.encode = (num, buf) => {
  if (!Number.isSafeInteger(num))
    // The number is so large that javascript cannot represent it with integer
    // precision.
    throw TypeError('cannot encode number outside of javascript safe integer range')
  else if (num < 0)
    encodeNegative(num, buf)
  else
    encodePositive(num, buf)
  return buf
}

const encodePositive = (num, buf) => {
  buf[0] = 0x80

  for (var i = buf.length; i > 1; i--) {
    buf[i-1] = num & 0xff
    num = Math.floor(num / 0x100)
  }
}

const encodeNegative = (num, buf) => {
  buf[0] = 0xff
  var flipped = false
  num = num * -1
  for (var i = buf.length; i > 1; i--) {
    var byte = num & 0xff
    num = Math.floor(num / 0x100)
    if (flipped)
      buf[i-1] = onesComp(byte)
    else if (byte === 0)
      buf[i-1] = 0
    else {
      flipped = true
      buf[i-1] = twosComp(byte)
    }
  }
}

const parse = exports.parse = (buf) => {
  var post = buf[buf.length - 1]
  var pre = buf[0]
  var value;
  if (pre === 0x80)
    value = pos(buf.slice(1, buf.length))
  else if (pre === 0xff)
    value = twos(buf)
  else
    throw TypeError('invalid base256 encoding')

  if (!Number.isSafeInteger(value))
    // The number is so large that javascript cannot represent it with integer
    // precision.
    throw TypeError('parsed number outside of javascript safe integer range')

  return value
}

const twos = (buf) => {
  var len = buf.length
  var sum = 0
  var flipped = false
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i]
    var f
    if (flipped)
      f = onesComp(byte)
    else if (byte === 0)
      f = byte
    else {
      flipped = true
      f = twosComp(byte)
    }
    if (f !== 0)
      sum -= f * Math.pow(256, len - i - 1)
  }
  return sum
}

const pos = (buf) => {
  var len = buf.length
  var sum = 0
  for (var i = len - 1; i > -1; i--) {
    var byte = buf[i]
    if (byte !== 0)
      sum += byte * Math.pow(256, len - i - 1)
  }
  return sum
}

const onesComp = byte => (0xff ^ byte) & 0xff

const twosComp = byte => ((0xff ^ byte) + 1) & 0xff


/***/ }),

/***/ 1525:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Buffer = __webpack_require__(6707)

// XXX: This shares a lot in common with extract.js
// maybe some DRY opportunity here?

// tar -t
const hlo = __webpack_require__(5274)
const Parser = __webpack_require__(8917)
const fs = __webpack_require__(5747)
const fsm = __webpack_require__(7714)
const path = __webpack_require__(5622)

const t = module.exports = (opt_, files, cb) => {
  if (typeof opt_ === 'function')
    cb = opt_, files = null, opt_ = {}
  else if (Array.isArray(opt_))
    files = opt_, opt_ = {}

  if (typeof files === 'function')
    cb = files, files = null

  if (!files)
    files = []
  else
    files = Array.from(files)

  const opt = hlo(opt_)

  if (opt.sync && typeof cb === 'function')
    throw new TypeError('callback not supported for sync tar functions')

  if (!opt.file && typeof cb === 'function')
    throw new TypeError('callback only supported with file option')

  if (files.length)
    filesFilter(opt, files)

  if (!opt.noResume)
    onentryFunction(opt)

  return opt.file && opt.sync ? listFileSync(opt)
    : opt.file ? listFile(opt, cb)
    : list(opt)
}

const onentryFunction = opt => {
  const onentry = opt.onentry
  opt.onentry = onentry ? e => {
    onentry(e)
    e.resume()
  } : e => e.resume()
}

// construct a filter that limits the file entries listed
// include child entries if a dir is included
const filesFilter = (opt, files) => {
  const map = new Map(files.map(f => [f.replace(/\/+$/, ''), true]))
  const filter = opt.filter

  const mapHas = (file, r) => {
    const root = r || path.parse(file).root || '.'
    const ret = file === root ? false
      : map.has(file) ? map.get(file)
      : mapHas(path.dirname(file), root)

    map.set(file, ret)
    return ret
  }

  opt.filter = filter
    ? (file, entry) => filter(file, entry) && mapHas(file.replace(/\/+$/, ''))
    : file => mapHas(file.replace(/\/+$/, ''))
}

const listFileSync = opt => {
  const p = list(opt)
  const file = opt.file
  let threw = true
  let fd
  try {
    const stat = fs.statSync(file)
    const readSize = opt.maxReadSize || 16*1024*1024
    if (stat.size < readSize) {
      p.end(fs.readFileSync(file))
    } else {
      let pos = 0
      const buf = Buffer.allocUnsafe(readSize)
      fd = fs.openSync(file, 'r')
      while (pos < stat.size) {
        let bytesRead = fs.readSync(fd, buf, 0, readSize, pos)
        pos += bytesRead
        p.write(buf.slice(0, bytesRead))
      }
      p.end()
    }
    threw = false
  } finally {
    if (threw && fd)
      try { fs.closeSync(fd) } catch (er) {}
  }
}

const listFile = (opt, cb) => {
  const parse = new Parser(opt)
  const readSize = opt.maxReadSize || 16*1024*1024

  const file = opt.file
  const p = new Promise((resolve, reject) => {
    parse.on('error', reject)
    parse.on('end', resolve)

    fs.stat(file, (er, stat) => {
      if (er)
        reject(er)
      else {
        const stream = new fsm.ReadStream(file, {
          readSize: readSize,
          size: stat.size
        })
        stream.on('error', reject)
        stream.pipe(parse)
      }
    })
  })
  return cb ? p.then(cb, cb) : p
}

const list = opt => new Parser(opt)


/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// wrapper around mkdirp for tar's needs.

// TODO: This should probably be a class, not functionally
// passing around state in a gazillion args.

const mkdirp = __webpack_require__(6186)
const fs = __webpack_require__(5747)
const path = __webpack_require__(5622)
const chownr = __webpack_require__(9051)

class SymlinkError extends Error {
  constructor (symlink, path) {
    super('Cannot extract through symbolic link')
    this.path = path
    this.symlink = symlink
  }

  get name () {
    return 'SylinkError'
  }
}

class CwdError extends Error {
  constructor (path, code) {
    super(code + ': Cannot cd into \'' + path + '\'')
    this.path = path
    this.code = code
  }

  get name () {
    return 'CwdError'
  }
}

const mkdir = module.exports = (dir, opt, cb) => {
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask
  const mode = opt.mode | 0o0700
  const needChmod = (mode & umask) !== 0

  const uid = opt.uid
  const gid = opt.gid
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    ( uid !== opt.processUid || gid !== opt.processGid )

  const preserve = opt.preserve
  const unlink = opt.unlink
  const cache = opt.cache
  const cwd = opt.cwd

  const done = (er, created) => {
    if (er)
      cb(er)
    else {
      cache.set(dir, true)
      if (created && doChown)
        chownr(created, uid, gid, er => done(er))
      else if (needChmod)
        fs.chmod(dir, mode, cb)
      else
        cb()
    }
  }

  if (cache && cache.get(dir) === true)
    return done()

  if (dir === cwd)
    return fs.stat(dir, (er, st) => {
      if (er || !st.isDirectory())
        er = new CwdError(dir, er && er.code || 'ENOTDIR')
      done(er)
    })

  if (preserve)
    return mkdirp(dir, mode, done)

  const sub = path.relative(cwd, dir)
  const parts = sub.split(/\/|\\/)
  mkdir_(cwd, parts, mode, cache, unlink, cwd, null, done)
}

const mkdir_ = (base, parts, mode, cache, unlink, cwd, created, cb) => {
  if (!parts.length)
    return cb(null, created)
  const p = parts.shift()
  const part = base + '/' + p
  if (cache.get(part))
    return mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb))
}

const onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => er => {
  if (er) {
    if (er.path && path.dirname(er.path) === cwd &&
        (er.code === 'ENOTDIR' || er.code === 'ENOENT'))
      return cb(new CwdError(cwd, er.code))

    fs.lstat(part, (statEr, st) => {
      if (statEr)
        cb(statEr)
      else if (st.isDirectory())
        mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
      else if (unlink)
        fs.unlink(part, er => {
          if (er)
            return cb(er)
          fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb))
        })
      else if (st.isSymbolicLink())
        return cb(new SymlinkError(part, part + '/' + parts.join('/')))
      else
        cb(er)
    })
  } else {
    created = created || part
    mkdir_(part, parts, mode, cache, unlink, cwd, created, cb)
  }
}

const mkdirSync = module.exports.sync = (dir, opt) => {
  // if there's any overlap between mask and mode,
  // then we'll need an explicit chmod
  const umask = opt.umask
  const mode = opt.mode | 0o0700
  const needChmod = (mode & umask) !== 0

  const uid = opt.uid
  const gid = opt.gid
  const doChown = typeof uid === 'number' &&
    typeof gid === 'number' &&
    ( uid !== opt.processUid || gid !== opt.processGid )

  const preserve = opt.preserve
  const unlink = opt.unlink
  const cache = opt.cache
  const cwd = opt.cwd

  const done = (created) => {
    cache.set(dir, true)
    if (created && doChown)
      chownr.sync(created, uid, gid)
    if (needChmod)
      fs.chmodSync(dir, mode)
  }

  if (cache && cache.get(dir) === true)
    return done()

  if (dir === cwd) {
    let ok = false
    let code = 'ENOTDIR'
    try {
      ok = fs.statSync(dir).isDirectory()
    } catch (er) {
      code = er.code
    } finally {
      if (!ok)
        throw new CwdError(dir, code)
    }
    done()
    return
  }

  if (preserve)
    return done(mkdirp.sync(dir, mode))

  const sub = path.relative(cwd, dir)
  const parts = sub.split(/\/|\\/)
  let created = null
  for (let p = parts.shift(), part = cwd;
       p && (part += '/' + p);
       p = parts.shift()) {

    if (cache.get(part))
      continue

    try {
      fs.mkdirSync(part, mode)
      created = created || part
      cache.set(part, true)
    } catch (er) {
      if (er.path && path.dirname(er.path) === cwd &&
          (er.code === 'ENOTDIR' || er.code === 'ENOENT'))
        return new CwdError(cwd, er.code)

      const st = fs.lstatSync(part)
      if (st.isDirectory()) {
        cache.set(part, true)
        continue
      } else if (unlink) {
        fs.unlinkSync(part)
        fs.mkdirSync(part, mode)
        created = created || part
        cache.set(part, true)
        continue
      } else if (st.isSymbolicLink())
        return new SymlinkError(part, part + '/' + parts.join('/'))
    }
  }

  return done(created)
}


/***/ }),

/***/ 8371:
/***/ ((module) => {

"use strict";

module.exports = (mode, isDir) => {
  mode &= 0o7777
  // if dirs are readable, then they should be listable
  if (isDir) {
    if (mode & 0o400)
      mode |= 0o100
    if (mode & 0o40)
      mode |= 0o10
    if (mode & 0o4)
      mode |= 0o1
  }
  return mode
}


/***/ }),

/***/ 7900:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const Buffer = __webpack_require__(6707)

// A readable tar stream creator
// Technically, this is a transform stream that you write paths into,
// and tar format comes out of.
// The `add()` method is like `write()` but returns this,
// and end() return `this` as well, so you can
// do `new Pack(opt).add('files').add('dir').end().pipe(output)
// You could also do something like:
// streamOfPaths().pipe(new Pack()).pipe(new fs.WriteStream('out.tar'))

class PackJob {
  constructor (path, absolute) {
    this.path = path || './'
    this.absolute = absolute
    this.entry = null
    this.stat = null
    this.readdir = null
    this.pending = false
    this.ignore = false
    this.piped = false
  }
}

const MiniPass = __webpack_require__(1077)
const zlib = __webpack_require__(3486)
const ReadEntry = __webpack_require__(8116)
const WriteEntry = __webpack_require__(5450)
const WriteEntrySync = WriteEntry.Sync
const WriteEntryTar = WriteEntry.Tar
const Yallist = __webpack_require__(665)
const EOF = Buffer.alloc(1024)
const ONSTAT = Symbol('onStat')
const ENDED = Symbol('ended')
const QUEUE = Symbol('queue')
const CURRENT = Symbol('current')
const PROCESS = Symbol('process')
const PROCESSING = Symbol('processing')
const PROCESSJOB = Symbol('processJob')
const JOBS = Symbol('jobs')
const JOBDONE = Symbol('jobDone')
const ADDFSENTRY = Symbol('addFSEntry')
const ADDTARENTRY = Symbol('addTarEntry')
const STAT = Symbol('stat')
const READDIR = Symbol('readdir')
const ONREADDIR = Symbol('onreaddir')
const PIPE = Symbol('pipe')
const ENTRY = Symbol('entry')
const ENTRYOPT = Symbol('entryOpt')
const WRITEENTRYCLASS = Symbol('writeEntryClass')
const WRITE = Symbol('write')
const ONDRAIN = Symbol('ondrain')

const fs = __webpack_require__(5747)
const path = __webpack_require__(5622)
const warner = __webpack_require__(5899)

const Pack = warner(class Pack extends MiniPass {
  constructor (opt) {
    super(opt)
    opt = opt || Object.create(null)
    this.opt = opt
    this.cwd = opt.cwd || process.cwd()
    this.maxReadSize = opt.maxReadSize
    this.preservePaths = !!opt.preservePaths
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.prefix = (opt.prefix || '').replace(/(\\|\/)+$/, '')
    this.linkCache = opt.linkCache || new Map()
    this.statCache = opt.statCache || new Map()
    this.readdirCache = opt.readdirCache || new Map()

    this[WRITEENTRYCLASS] = WriteEntry
    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    this.zip = null
    if (opt.gzip) {
      if (typeof opt.gzip !== 'object')
        opt.gzip = {}
      this.zip = new zlib.Gzip(opt.gzip)
      this.zip.on('data', chunk => super.write(chunk))
      this.zip.on('end', _ => super.end())
      this.zip.on('drain', _ => this[ONDRAIN]())
      this.on('resume', _ => this.zip.resume())
    } else
      this.on('drain', this[ONDRAIN])

    this.portable = !!opt.portable
    this.noDirRecurse = !!opt.noDirRecurse
    this.follow = !!opt.follow
    this.noMtime = !!opt.noMtime
    this.mtime = opt.mtime || null

    this.filter = typeof opt.filter === 'function' ? opt.filter : _ => true

    this[QUEUE] = new Yallist
    this[JOBS] = 0
    this.jobs = +opt.jobs || 4
    this[PROCESSING] = false
    this[ENDED] = false
  }

  [WRITE] (chunk) {
    return super.write(chunk)
  }

  add (path) {
    this.write(path)
    return this
  }

  end (path) {
    if (path)
      this.write(path)
    this[ENDED] = true
    this[PROCESS]()
    return this
  }

  write (path) {
    if (this[ENDED])
      throw new Error('write after end')

    if (path instanceof ReadEntry)
      this[ADDTARENTRY](path)
    else
      this[ADDFSENTRY](path)
    return this.flowing
  }

  [ADDTARENTRY] (p) {
    const absolute = path.resolve(this.cwd, p.path)
    if (this.prefix)
      p.path = this.prefix + '/' + p.path.replace(/^\.(\/+|$)/, '')

    // in this case, we don't have to wait for the stat
    if (!this.filter(p.path, p))
      p.resume()
    else {
      const job = new PackJob(p.path, absolute, false)
      job.entry = new WriteEntryTar(p, this[ENTRYOPT](job))
      job.entry.on('end', _ => this[JOBDONE](job))
      this[JOBS] += 1
      this[QUEUE].push(job)
    }

    this[PROCESS]()
  }

  [ADDFSENTRY] (p) {
    const absolute = path.resolve(this.cwd, p)
    if (this.prefix)
      p = this.prefix + '/' + p.replace(/^\.(\/+|$)/, '')

    this[QUEUE].push(new PackJob(p, absolute))
    this[PROCESS]()
  }

  [STAT] (job) {
    job.pending = true
    this[JOBS] += 1
    const stat = this.follow ? 'stat' : 'lstat'
    fs[stat](job.absolute, (er, stat) => {
      job.pending = false
      this[JOBS] -= 1
      if (er)
        this.emit('error', er)
      else
        this[ONSTAT](job, stat)
    })
  }

  [ONSTAT] (job, stat) {
    this.statCache.set(job.absolute, stat)
    job.stat = stat

    // now we have the stat, we can filter it.
    if (!this.filter(job.path, stat))
      job.ignore = true

    this[PROCESS]()
  }

  [READDIR] (job) {
    job.pending = true
    this[JOBS] += 1
    fs.readdir(job.absolute, (er, entries) => {
      job.pending = false
      this[JOBS] -= 1
      if (er)
        return this.emit('error', er)
      this[ONREADDIR](job, entries)
    })
  }

  [ONREADDIR] (job, entries) {
    this.readdirCache.set(job.absolute, entries)
    job.readdir = entries
    this[PROCESS]()
  }

  [PROCESS] () {
    if (this[PROCESSING])
      return

    this[PROCESSING] = true
    for (let w = this[QUEUE].head;
         w !== null && this[JOBS] < this.jobs;
         w = w.next) {
      this[PROCESSJOB](w.value)
      if (w.value.ignore) {
        const p = w.next
        this[QUEUE].removeNode(w)
        w.next = p
      }
    }

    this[PROCESSING] = false

    if (this[ENDED] && !this[QUEUE].length && this[JOBS] === 0) {
      if (this.zip)
        this.zip.end(EOF)
      else {
        super.write(EOF)
        super.end()
      }
    }
  }

  get [CURRENT] () {
    return this[QUEUE] && this[QUEUE].head && this[QUEUE].head.value
  }

  [JOBDONE] (job) {
    this[QUEUE].shift()
    this[JOBS] -= 1
    this[PROCESS]()
  }

  [PROCESSJOB] (job) {
    if (job.pending)
      return

    if (job.entry) {
      if (job === this[CURRENT] && !job.piped)
        this[PIPE](job)
      return
    }

    if (!job.stat) {
      if (this.statCache.has(job.absolute))
        this[ONSTAT](job, this.statCache.get(job.absolute))
      else
        this[STAT](job)
    }
    if (!job.stat)
      return

    // filtered out!
    if (job.ignore)
      return

    if (!this.noDirRecurse && job.stat.isDirectory() && !job.readdir) {
      if (this.readdirCache.has(job.absolute))
        this[ONREADDIR](job, this.readdirCache.get(job.absolute))
      else
        this[READDIR](job)
      if (!job.readdir)
        return
    }

    // we know it doesn't have an entry, because that got checked above
    job.entry = this[ENTRY](job)
    if (!job.entry) {
      job.ignore = true
      return
    }

    if (job === this[CURRENT] && !job.piped)
      this[PIPE](job)
  }

  [ENTRYOPT] (job) {
    return {
      onwarn: (msg, data) => {
        this.warn(msg, data)
      },
      noPax: this.noPax,
      cwd: this.cwd,
      absolute: job.absolute,
      preservePaths: this.preservePaths,
      maxReadSize: this.maxReadSize,
      strict: this.strict,
      portable: this.portable,
      linkCache: this.linkCache,
      statCache: this.statCache,
      noMtime: this.noMtime,
      mtime: this.mtime
    }
  }

  [ENTRY] (job) {
    this[JOBS] += 1
    try {
      return new this[WRITEENTRYCLASS](job.path, this[ENTRYOPT](job))
        .on('end', () => this[JOBDONE](job))
        .on('error', er => this.emit('error', er))
    } catch (er) {
      this.emit('error', er)
    }
  }

  [ONDRAIN] () {
    if (this[CURRENT] && this[CURRENT].entry)
      this[CURRENT].entry.resume()
  }

  // like .pipe() but using super, because our write() is special
  [PIPE] (job) {
    job.piped = true

    if (job.readdir)
      job.readdir.forEach(entry => {
        const p = this.prefix ?
          job.path.slice(this.prefix.length + 1) || './'
          : job.path

        const base = p === './' ? '' : p.replace(/\/*$/, '/')
        this[ADDFSENTRY](base + entry)
      })

    const source = job.entry
    const zip = this.zip

    if (zip)
      source.on('data', chunk => {
        if (!zip.write(chunk))
          source.pause()
      })
    else
      source.on('data', chunk => {
        if (!super.write(chunk))
          source.pause()
      })
  }

  pause () {
    if (this.zip)
      this.zip.pause()
    return super.pause()
  }
})

class PackSync extends Pack {
  constructor (opt) {
    super(opt)
    this[WRITEENTRYCLASS] = WriteEntrySync
  }

  // pause/resume are no-ops in sync streams.
  pause () {}
  resume () {}

  [STAT] (job) {
    const stat = this.follow ? 'statSync' : 'lstatSync'
    this[ONSTAT](job, fs[stat](job.absolute))
  }

  [READDIR] (job, stat) {
    this[ONREADDIR](job, fs.readdirSync(job.absolute))
  }

  // gotta get it all in this tick
  [PIPE] (job) {
    const source = job.entry
    const zip = this.zip

    if (job.readdir)
      job.readdir.forEach(entry => {
        const p = this.prefix ?
          job.path.slice(this.prefix.length + 1) || './'
          : job.path

        const base = p === './' ? '' : p.replace(/\/*$/, '/')
        this[ADDFSENTRY](base + entry)
      })

    if (zip)
      source.on('data', chunk => {
        zip.write(chunk)
      })
    else
      source.on('data', chunk => {
        super[WRITE](chunk)
      })
  }
}

Pack.Sync = PackSync

module.exports = Pack


/***/ }),

/***/ 8917:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// this[BUFFER] is the remainder of a chunk if we're waiting for
// the full 512 bytes of a header to come in.  We will Buffer.concat()
// it to the next write(), which is a mem copy, but a small one.
//
// this[QUEUE] is a Yallist of entries that haven't been emitted
// yet this can only get filled up if the user keeps write()ing after
// a write() returns false, or does a write() with more than one entry
//
// We don't buffer chunks, we always parse them and either create an
// entry, or push it into the active entry.  The ReadEntry class knows
// to throw data away if .ignore=true
//
// Shift entry off the buffer when it emits 'end', and emit 'entry' for
// the next one in the list.
//
// At any time, we're pushing body chunks into the entry at WRITEENTRY,
// and waiting for 'end' on the entry at READENTRY
//
// ignored entries get .resume() called on them straight away

const warner = __webpack_require__(5899)
const path = __webpack_require__(5622)
const Header = __webpack_require__(6043)
const EE = __webpack_require__(8614)
const Yallist = __webpack_require__(665)
const maxMetaEntrySize = 1024 * 1024
const Entry = __webpack_require__(8116)
const Pax = __webpack_require__(7996)
const zlib = __webpack_require__(3486)
const Buffer = __webpack_require__(6707)

const gzipHeader = Buffer.from([0x1f, 0x8b])
const STATE = Symbol('state')
const WRITEENTRY = Symbol('writeEntry')
const READENTRY = Symbol('readEntry')
const NEXTENTRY = Symbol('nextEntry')
const PROCESSENTRY = Symbol('processEntry')
const EX = Symbol('extendedHeader')
const GEX = Symbol('globalExtendedHeader')
const META = Symbol('meta')
const EMITMETA = Symbol('emitMeta')
const BUFFER = Symbol('buffer')
const QUEUE = Symbol('queue')
const ENDED = Symbol('ended')
const EMITTEDEND = Symbol('emittedEnd')
const EMIT = Symbol('emit')
const UNZIP = Symbol('unzip')
const CONSUMECHUNK = Symbol('consumeChunk')
const CONSUMECHUNKSUB = Symbol('consumeChunkSub')
const CONSUMEBODY = Symbol('consumeBody')
const CONSUMEMETA = Symbol('consumeMeta')
const CONSUMEHEADER = Symbol('consumeHeader')
const CONSUMING = Symbol('consuming')
const BUFFERCONCAT = Symbol('bufferConcat')
const MAYBEEND = Symbol('maybeEnd')
const WRITING = Symbol('writing')
const ABORTED = Symbol('aborted')
const DONE = Symbol('onDone')

const noop = _ => true

module.exports = warner(class Parser extends EE {
  constructor (opt) {
    opt = opt || {}
    super(opt)

    if (opt.ondone)
      this.on(DONE, opt.ondone)
    else
      this.on(DONE, _ => {
        this.emit('prefinish')
        this.emit('finish')
        this.emit('end')
        this.emit('close')
      })

    this.strict = !!opt.strict
    this.maxMetaEntrySize = opt.maxMetaEntrySize || maxMetaEntrySize
    this.filter = typeof opt.filter === 'function' ? opt.filter : noop

    // have to set this so that streams are ok piping into it
    this.writable = true
    this.readable = false

    this[QUEUE] = new Yallist()
    this[BUFFER] = null
    this[READENTRY] = null
    this[WRITEENTRY] = null
    this[STATE] = 'begin'
    this[META] = ''
    this[EX] = null
    this[GEX] = null
    this[ENDED] = false
    this[UNZIP] = null
    this[ABORTED] = false
    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)
    if (typeof opt.onentry === 'function')
      this.on('entry', opt.onentry)
  }

  [CONSUMEHEADER] (chunk, position) {
    const header = new Header(chunk, position, this[EX], this[GEX])

    if (header.nullBlock)
      this[EMIT]('nullBlock')
    else if (!header.cksumValid)
      this.warn('invalid entry', header)
    else if (!header.path)
      this.warn('invalid: path is required', header)
    else {
      const type = header.type
      if (/^(Symbolic)?Link$/.test(type) && !header.linkpath)
        this.warn('invalid: linkpath required', header)
      else if (!/^(Symbolic)?Link$/.test(type) && header.linkpath)
        this.warn('invalid: linkpath forbidden', header)
      else {
        const entry = this[WRITEENTRY] = new Entry(header, this[EX], this[GEX])

        if (entry.meta) {
          if (entry.size > this.maxMetaEntrySize) {
            entry.ignore = true
            this[EMIT]('ignoredEntry', entry)
            this[STATE] = 'ignore'
          } else if (entry.size > 0) {
            this[META] = ''
            entry.on('data', c => this[META] += c)
            this[STATE] = 'meta'
          }
        } else {

          this[EX] = null
          entry.ignore = entry.ignore || !this.filter(entry.path, entry)
          if (entry.ignore) {
            this[EMIT]('ignoredEntry', entry)
            this[STATE] = entry.remain ? 'ignore' : 'begin'
          } else {
            if (entry.remain)
              this[STATE] = 'body'
            else {
              this[STATE] = 'begin'
              entry.end()
            }

            if (!this[READENTRY]) {
              this[QUEUE].push(entry)
              this[NEXTENTRY]()
            } else
              this[QUEUE].push(entry)
          }
        }
      }
    }
  }

  [PROCESSENTRY] (entry) {
    let go = true

    if (!entry) {
      this[READENTRY] = null
      go = false
    } else if (Array.isArray(entry))
      this.emit.apply(this, entry)
    else {
      this[READENTRY] = entry
      this.emit('entry', entry)
      if (!entry.emittedEnd) {
        entry.on('end', _ => this[NEXTENTRY]())
        go = false
      }
    }

    return go
  }

  [NEXTENTRY] () {
    do {} while (this[PROCESSENTRY](this[QUEUE].shift()))

    if (!this[QUEUE].length) {
      // At this point, there's nothing in the queue, but we may have an
      // entry which is being consumed (readEntry).
      // If we don't, then we definitely can handle more data.
      // If we do, and either it's flowing, or it has never had any data
      // written to it, then it needs more.
      // The only other possibility is that it has returned false from a
      // write() call, so we wait for the next drain to continue.
      const re = this[READENTRY]
      const drainNow = !re || re.flowing || re.size === re.remain
      if (drainNow) {
        if (!this[WRITING])
          this.emit('drain')
      } else
        re.once('drain', _ => this.emit('drain'))
     }
  }

  [CONSUMEBODY] (chunk, position) {
    // write up to but no  more than writeEntry.blockRemain
    const entry = this[WRITEENTRY]
    const br = entry.blockRemain
    const c = (br >= chunk.length && position === 0) ? chunk
      : chunk.slice(position, position + br)

    entry.write(c)

    if (!entry.blockRemain) {
      this[STATE] = 'begin'
      this[WRITEENTRY] = null
      entry.end()
    }

    return c.length
  }

  [CONSUMEMETA] (chunk, position) {
    const entry = this[WRITEENTRY]
    const ret = this[CONSUMEBODY](chunk, position)

    // if we finished, then the entry is reset
    if (!this[WRITEENTRY])
      this[EMITMETA](entry)

    return ret
  }

  [EMIT] (ev, data, extra) {
    if (!this[QUEUE].length && !this[READENTRY])
      this.emit(ev, data, extra)
    else
      this[QUEUE].push([ev, data, extra])
  }

  [EMITMETA] (entry) {
    this[EMIT]('meta', this[META])
    switch (entry.type) {
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this[EX] = Pax.parse(this[META], this[EX], false)
        break

      case 'GlobalExtendedHeader':
        this[GEX] = Pax.parse(this[META], this[GEX], true)
        break

      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
        this[EX] = this[EX] || Object.create(null)
        this[EX].path = this[META].replace(/\0.*/, '')
        break

      case 'NextFileHasLongLinkpath':
        this[EX] = this[EX] || Object.create(null)
        this[EX].linkpath = this[META].replace(/\0.*/, '')
        break

      /* istanbul ignore next */
      default: throw new Error('unknown meta: ' + entry.type)
    }
  }

  abort (msg, error) {
    this[ABORTED] = true
    this.warn(msg, error)
    this.emit('abort', error)
    this.emit('error', error)
  }

  write (chunk) {
    if (this[ABORTED])
      return

    // first write, might be gzipped
    if (this[UNZIP] === null && chunk) {
      if (this[BUFFER]) {
        chunk = Buffer.concat([this[BUFFER], chunk])
        this[BUFFER] = null
      }
      if (chunk.length < gzipHeader.length) {
        this[BUFFER] = chunk
        return true
      }
      for (let i = 0; this[UNZIP] === null && i < gzipHeader.length; i++) {
        if (chunk[i] !== gzipHeader[i])
          this[UNZIP] = false
      }
      if (this[UNZIP] === null) {
        const ended = this[ENDED]
        this[ENDED] = false
        this[UNZIP] = new zlib.Unzip()
        this[UNZIP].on('data', chunk => this[CONSUMECHUNK](chunk))
        this[UNZIP].on('error', er =>
          this.abort(er.message, er))
        this[UNZIP].on('end', _ => {
          this[ENDED] = true
          this[CONSUMECHUNK]()
        })
        this[WRITING] = true
        const ret = this[UNZIP][ended ? 'end' : 'write' ](chunk)
        this[WRITING] = false
        return ret
      }
    }

    this[WRITING] = true
    if (this[UNZIP])
      this[UNZIP].write(chunk)
    else
      this[CONSUMECHUNK](chunk)
    this[WRITING] = false

    // return false if there's a queue, or if the current entry isn't flowing
    const ret =
      this[QUEUE].length ? false :
      this[READENTRY] ? this[READENTRY].flowing :
      true

    // if we have no queue, then that means a clogged READENTRY
    if (!ret && !this[QUEUE].length)
      this[READENTRY].once('drain', _ => this.emit('drain'))

    return ret
  }

  [BUFFERCONCAT] (c) {
    if (c && !this[ABORTED])
      this[BUFFER] = this[BUFFER] ? Buffer.concat([this[BUFFER], c]) : c
  }

  [MAYBEEND] () {
    if (this[ENDED] &&
        !this[EMITTEDEND] &&
        !this[ABORTED] &&
        !this[CONSUMING]) {
      this[EMITTEDEND] = true
      const entry = this[WRITEENTRY]
      if (entry && entry.blockRemain) {
        const have = this[BUFFER] ? this[BUFFER].length : 0
        this.warn('Truncated input (needed ' + entry.blockRemain +
                  ' more bytes, only ' + have + ' available)', entry)
        if (this[BUFFER])
          entry.write(this[BUFFER])
        entry.end()
      }
      this[EMIT](DONE)
    }
  }

  [CONSUMECHUNK] (chunk) {
    if (this[CONSUMING]) {
      this[BUFFERCONCAT](chunk)
    } else if (!chunk && !this[BUFFER]) {
      this[MAYBEEND]()
    } else {
      this[CONSUMING] = true
      if (this[BUFFER]) {
        this[BUFFERCONCAT](chunk)
        const c = this[BUFFER]
        this[BUFFER] = null
        this[CONSUMECHUNKSUB](c)
      } else {
        this[CONSUMECHUNKSUB](chunk)
      }

      while (this[BUFFER] && this[BUFFER].length >= 512 && !this[ABORTED]) {
        const c = this[BUFFER]
        this[BUFFER] = null
        this[CONSUMECHUNKSUB](c)
      }
      this[CONSUMING] = false
    }

    if (!this[BUFFER] || this[ENDED])
      this[MAYBEEND]()
  }

  [CONSUMECHUNKSUB] (chunk) {
    // we know that we are in CONSUMING mode, so anything written goes into
    // the buffer.  Advance the position and put any remainder in the buffer.
    let position = 0
    let length = chunk.length
    while (position + 512 <= length && !this[ABORTED]) {
      switch (this[STATE]) {
        case 'begin':
          this[CONSUMEHEADER](chunk, position)
          position += 512
          break

        case 'ignore':
        case 'body':
          position += this[CONSUMEBODY](chunk, position)
          break

        case 'meta':
          position += this[CONSUMEMETA](chunk, position)
          break

        /* istanbul ignore next */
        default:
          throw new Error('invalid state: ' + this[STATE])
      }
    }

    if (position < length) {
      if (this[BUFFER])
        this[BUFFER] = Buffer.concat([chunk.slice(position), this[BUFFER]])
      else
        this[BUFFER] = chunk.slice(position)
    }
  }

  end (chunk) {
    if (!this[ABORTED]) {
      if (this[UNZIP])
        this[UNZIP].end(chunk)
      else {
        this[ENDED] = true
        this.write(chunk)
      }
    }
  }
})


/***/ }),

/***/ 7996:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const Buffer = __webpack_require__(6707)
const Header = __webpack_require__(6043)
const path = __webpack_require__(5622)

class Pax {
  constructor (obj, global) {
    this.atime = obj.atime || null
    this.charset = obj.charset || null
    this.comment = obj.comment || null
    this.ctime = obj.ctime || null
    this.gid = obj.gid || null
    this.gname = obj.gname || null
    this.linkpath = obj.linkpath || null
    this.mtime = obj.mtime || null
    this.path = obj.path || null
    this.size = obj.size || null
    this.uid = obj.uid || null
    this.uname = obj.uname || null
    this.dev = obj.dev || null
    this.ino = obj.ino || null
    this.nlink = obj.nlink || null
    this.global = global || false
  }

  encode () {
    const body = this.encodeBody()
    if (body === '')
      return null

    const bodyLen = Buffer.byteLength(body)
    // round up to 512 bytes
    // add 512 for header
    const bufLen = 512 * Math.ceil(1 + bodyLen / 512)
    const buf = Buffer.allocUnsafe(bufLen)

    // 0-fill the header section, it might not hit every field
    for (let i = 0; i < 512; i++) {
      buf[i] = 0
    }

    new Header({
      // XXX split the path
      // then the path should be PaxHeader + basename, but less than 99,
      // prepend with the dirname
      path: ('PaxHeader/' + path.basename(this.path)).slice(0, 99),
      mode: this.mode || 0o644,
      uid: this.uid || null,
      gid: this.gid || null,
      size: bodyLen,
      mtime: this.mtime || null,
      type: this.global ? 'GlobalExtendedHeader' : 'ExtendedHeader',
      linkpath: '',
      uname: this.uname || '',
      gname: this.gname || '',
      devmaj: 0,
      devmin: 0,
      atime: this.atime || null,
      ctime: this.ctime || null
    }).encode(buf)

    buf.write(body, 512, bodyLen, 'utf8')

    // null pad after the body
    for (let i = bodyLen + 512; i < buf.length; i++) {
      buf[i] = 0
    }

    return buf
  }

  encodeBody () {
    return (
      this.encodeField('path') +
      this.encodeField('ctime') +
      this.encodeField('atime') +
      this.encodeField('dev') +
      this.encodeField('ino') +
      this.encodeField('nlink') +
      this.encodeField('charset') +
      this.encodeField('comment') +
      this.encodeField('gid') +
      this.encodeField('gname') +
      this.encodeField('linkpath') +
      this.encodeField('mtime') +
      this.encodeField('size') +
      this.encodeField('uid') +
      this.encodeField('uname')
    )
  }

  encodeField (field) {
    if (this[field] === null || this[field] === undefined)
      return ''
    const v = this[field] instanceof Date ? this[field].getTime() / 1000
      : this[field]
    const s = ' ' +
      (field === 'dev' || field === 'ino' || field === 'nlink'
       ? 'SCHILY.' : '') +
      field + '=' + v + '\n'
    const byteLen = Buffer.byteLength(s)
    // the digits includes the length of the digits in ascii base-10
    // so if it's 9 characters, then adding 1 for the 9 makes it 10
    // which makes it 11 chars.
    let digits = Math.floor(Math.log(byteLen) / Math.log(10)) + 1
    if (byteLen + digits >= Math.pow(10, digits))
      digits += 1
    const len = digits + byteLen
    return len + s
  }
}

Pax.parse = (string, ex, g) => new Pax(merge(parseKV(string), ex), g)

const merge = (a, b) =>
  b ? Object.keys(a).reduce((s, k) => (s[k] = a[k], s), b) : a

const parseKV = string =>
  string
    .replace(/\n$/, '')
    .split('\n')
    .reduce(parseKVLine, Object.create(null))

const parseKVLine = (set, line) => {
  const n = parseInt(line, 10)

  // XXX Values with \n in them will fail this.
  // Refactor to not be a naive line-by-line parse.
  if (n !== Buffer.byteLength(line) + 1)
    return set

  line = line.substr((n + ' ').length)
  const kv = line.split('=')
  const k = kv.shift().replace(/^SCHILY\.(dev|ino|nlink)/, '$1')
  if (!k)
    return set

  const v = kv.join('=')
  set[k] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(k)
    ?  new Date(v * 1000)
    : /^[0-9]+$/.test(v) ? +v
    : v
  return set
}

module.exports = Pax


/***/ }),

/***/ 8116:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const types = __webpack_require__(4173)
const MiniPass = __webpack_require__(1077)

const SLURP = Symbol('slurp')
module.exports = class ReadEntry extends MiniPass {
  constructor (header, ex, gex) {
    super()
    this.extended = ex
    this.globalExtended = gex
    this.header = header
    this.startBlockSize = 512 * Math.ceil(header.size / 512)
    this.blockRemain = this.startBlockSize
    this.remain = header.size
    this.type = header.type
    this.meta = false
    this.ignore = false
    switch (this.type) {
      case 'File':
      case 'OldFile':
      case 'Link':
      case 'SymbolicLink':
      case 'CharacterDevice':
      case 'BlockDevice':
      case 'Directory':
      case 'FIFO':
      case 'ContiguousFile':
      case 'GNUDumpDir':
        break

      case 'NextFileHasLongLinkpath':
      case 'NextFileHasLongPath':
      case 'OldGnuLongPath':
      case 'GlobalExtendedHeader':
      case 'ExtendedHeader':
      case 'OldExtendedHeader':
        this.meta = true
        break

      // NOTE: gnutar and bsdtar treat unrecognized types as 'File'
      // it may be worth doing the same, but with a warning.
      default:
        this.ignore = true
    }

    this.path = header.path
    this.mode = header.mode
    if (this.mode)
      this.mode = this.mode & 0o7777
    this.uid = header.uid
    this.gid = header.gid
    this.uname = header.uname
    this.gname = header.gname
    this.size = header.size
    this.mtime = header.mtime
    this.atime = header.atime
    this.ctime = header.ctime
    this.linkpath = header.linkpath
    this.uname = header.uname
    this.gname = header.gname

    if (ex) this[SLURP](ex)
    if (gex) this[SLURP](gex, true)
  }

  write (data) {
    const writeLen = data.length
    if (writeLen > this.blockRemain)
      throw new Error('writing more to entry than is appropriate')

    const r = this.remain
    const br = this.blockRemain
    this.remain = Math.max(0, r - writeLen)
    this.blockRemain = Math.max(0, br - writeLen)
    if (this.ignore)
      return true

    if (r >= writeLen)
      return super.write(data)

    // r < writeLen
    return super.write(data.slice(0, r))
  }

  [SLURP] (ex, global) {
    for (let k in ex) {
      // we slurp in everything except for the path attribute in
      // a global extended header, because that's weird.
      if (ex[k] !== null && ex[k] !== undefined &&
          !(global && k === 'path'))
        this[k] = ex[k]
    }
  }
}


/***/ }),

/***/ 5923:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const Buffer = __webpack_require__(6707)

// tar -r
const hlo = __webpack_require__(5274)
const Pack = __webpack_require__(7900)
const Parse = __webpack_require__(8917)
const fs = __webpack_require__(5747)
const fsm = __webpack_require__(7714)
const t = __webpack_require__(1525)
const path = __webpack_require__(5622)

// starting at the head of the file, read a Header
// If the checksum is invalid, that's our position to start writing
// If it is, jump forward by the specified size (round up to 512)
// and try again.
// Write the new Pack stream starting there.

const Header = __webpack_require__(6043)

const r = module.exports = (opt_, files, cb) => {
  const opt = hlo(opt_)

  if (!opt.file)
    throw new TypeError('file is required')

  if (opt.gzip)
    throw new TypeError('cannot append to compressed archives')

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  return opt.sync ? replaceSync(opt, files)
    : replace(opt, files, cb)
}

const replaceSync = (opt, files) => {
  const p = new Pack.Sync(opt)

  let threw = true
  let fd
  let position

  try {
    try {
      fd = fs.openSync(opt.file, 'r+')
    } catch (er) {
      if (er.code === 'ENOENT')
        fd = fs.openSync(opt.file, 'w+')
      else
        throw er
    }

    const st = fs.fstatSync(fd)
    const headBuf = Buffer.alloc(512)

    POSITION: for (position = 0; position < st.size; position += 512) {
      for (let bufPos = 0, bytes = 0; bufPos < 512; bufPos += bytes) {
        bytes = fs.readSync(
          fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos
        )

        if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b)
          throw new Error('cannot append to compressed archives')

        if (!bytes)
          break POSITION
      }

      let h = new Header(headBuf)
      if (!h.cksumValid)
        break
      let entryBlockSize = 512 * Math.ceil(h.size / 512)
      if (position + entryBlockSize + 512 > st.size)
        break
      // the 512 for the header we just parsed will be added as well
      // also jump ahead all the blocks for the body
      position += entryBlockSize
      if (opt.mtimeCache)
        opt.mtimeCache.set(h.path, h.mtime)
    }
    threw = false

    streamSync(opt, p, position, fd, files)
  } finally {
    if (threw)
      try { fs.closeSync(fd) } catch (er) {}
  }
}

const streamSync = (opt, p, position, fd, files) => {
  const stream = new fsm.WriteStreamSync(opt.file, {
    fd: fd,
    start: position
  })
  p.pipe(stream)
  addFilesSync(p, files)
}

const replace = (opt, files, cb) => {
  files = Array.from(files)
  const p = new Pack(opt)

  const getPos = (fd, size, cb_) => {
    const cb = (er, pos) => {
      if (er)
        fs.close(fd, _ => cb_(er))
      else
        cb_(null, pos)
    }

    let position = 0
    if (size === 0)
      return cb(null, 0)

    let bufPos = 0
    const headBuf = Buffer.alloc(512)
    const onread = (er, bytes) => {
      if (er)
        return cb(er)
      bufPos += bytes
      if (bufPos < 512 && bytes)
        return fs.read(
          fd, headBuf, bufPos, headBuf.length - bufPos,
          position + bufPos, onread
        )

      if (position === 0 && headBuf[0] === 0x1f && headBuf[1] === 0x8b)
        return cb(new Error('cannot append to compressed archives'))

      // truncated header
      if (bufPos < 512)
        return cb(null, position)

      const h = new Header(headBuf)
      if (!h.cksumValid)
        return cb(null, position)

      const entryBlockSize = 512 * Math.ceil(h.size / 512)
      if (position + entryBlockSize + 512 > size)
        return cb(null, position)

      position += entryBlockSize + 512
      if (position >= size)
        return cb(null, position)

      if (opt.mtimeCache)
        opt.mtimeCache.set(h.path, h.mtime)
      bufPos = 0
      fs.read(fd, headBuf, 0, 512, position, onread)
    }
    fs.read(fd, headBuf, 0, 512, position, onread)
  }

  const promise = new Promise((resolve, reject) => {
    p.on('error', reject)
    let flag = 'r+'
    const onopen = (er, fd) => {
      if (er && er.code === 'ENOENT' && flag === 'r+') {
        flag = 'w+'
        return fs.open(opt.file, flag, onopen)
      }

      if (er)
        return reject(er)

      fs.fstat(fd, (er, st) => {
        if (er)
          return reject(er)
        getPos(fd, st.size, (er, position) => {
          if (er)
            return reject(er)
          const stream = new fsm.WriteStream(opt.file, {
            fd: fd,
            start: position
          })
          p.pipe(stream)
          stream.on('error', reject)
          stream.on('close', resolve)
          addFilesAsync(p, files)
        })
      })
    }
    fs.open(opt.file, flag, onopen)
  })

  return cb ? promise.then(cb, cb) : promise
}

const addFilesSync = (p, files) => {
  files.forEach(file => {
    if (file.charAt(0) === '@')
      t({
        file: path.resolve(p.cwd, file.substr(1)),
        sync: true,
        noResume: true,
        onentry: entry => p.add(entry)
      })
    else
      p.add(file)
  })
  p.end()
}

const addFilesAsync = (p, files) => {
  while (files.length) {
    const file = files.shift()
    if (file.charAt(0) === '@')
      return t({
        file: path.resolve(p.cwd, file.substr(1)),
        noResume: true,
        onentry: entry => p.add(entry)
      }).then(_ => addFilesAsync(p, files))
    else
      p.add(file)
  }
  p.end()
}


/***/ }),

/***/ 4173:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// map types from key to human-friendly name
exports.name = new Map([
  ['0', 'File'],
  // same as File
  ['', 'OldFile'],
  ['1', 'Link'],
  ['2', 'SymbolicLink'],
  // Devices and FIFOs aren't fully supported
  // they are parsed, but skipped when unpacking
  ['3', 'CharacterDevice'],
  ['4', 'BlockDevice'],
  ['5', 'Directory'],
  ['6', 'FIFO'],
  // same as File
  ['7', 'ContiguousFile'],
  // pax headers
  ['g', 'GlobalExtendedHeader'],
  ['x', 'ExtendedHeader'],
  // vendor-specific stuff
  // skip
  ['A', 'SolarisACL'],
  // like 5, but with data, which should be skipped
  ['D', 'GNUDumpDir'],
  // metadata only, skip
  ['I', 'Inode'],
  // data = link path of next file
  ['K', 'NextFileHasLongLinkpath'],
  // data = path of next file
  ['L', 'NextFileHasLongPath'],
  // skip
  ['M', 'ContinuationFile'],
  // like L
  ['N', 'OldGnuLongPath'],
  // skip
  ['S', 'SparseFile'],
  // skip
  ['V', 'TapeVolumeHeader'],
  // like x
  ['X', 'OldExtendedHeader']
])

// map the other direction
exports.code = new Map(Array.from(exports.name).map(kv => [kv[1], kv[0]]))


/***/ }),

/***/ 7628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const assert = __webpack_require__(2357)
const EE = __webpack_require__(8614).EventEmitter
const Parser = __webpack_require__(8917)
const fs = __webpack_require__(5747)
const fsm = __webpack_require__(7714)
const path = __webpack_require__(5622)
const mkdir = __webpack_require__(9624)
const mkdirSync = mkdir.sync
const wc = __webpack_require__(4808)

const ONENTRY = Symbol('onEntry')
const CHECKFS = Symbol('checkFs')
const ISREUSABLE = Symbol('isReusable')
const MAKEFS = Symbol('makeFs')
const FILE = Symbol('file')
const DIRECTORY = Symbol('directory')
const LINK = Symbol('link')
const SYMLINK = Symbol('symlink')
const HARDLINK = Symbol('hardlink')
const UNSUPPORTED = Symbol('unsupported')
const UNKNOWN = Symbol('unknown')
const CHECKPATH = Symbol('checkPath')
const MKDIR = Symbol('mkdir')
const ONERROR = Symbol('onError')
const PENDING = Symbol('pending')
const PEND = Symbol('pend')
const UNPEND = Symbol('unpend')
const ENDED = Symbol('ended')
const MAYBECLOSE = Symbol('maybeClose')
const SKIP = Symbol('skip')
const DOCHOWN = Symbol('doChown')
const UID = Symbol('uid')
const GID = Symbol('gid')
const crypto = __webpack_require__(6417)

// Unlinks on Windows are not atomic.
//
// This means that if you have a file entry, followed by another
// file entry with an identical name, and you cannot re-use the file
// (because it's a hardlink, or because unlink:true is set, or it's
// Windows, which does not have useful nlink values), then the unlink
// will be committed to the disk AFTER the new file has been written
// over the old one, deleting the new file.
//
// To work around this, on Windows systems, we rename the file and then
// delete the renamed file.  It's a sloppy kludge, but frankly, I do not
// know of a better way to do this, given windows' non-atomic unlink
// semantics.
//
// See: https://github.com/npm/node-tar/issues/183
/* istanbul ignore next */
const unlinkFile = (path, cb) => {
  if (process.platform !== 'win32')
    return fs.unlink(path, cb)

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex')
  fs.rename(path, name, er => {
    if (er)
      return cb(er)
    fs.unlink(name, cb)
  })
}

/* istanbul ignore next */
const unlinkFileSync = path => {
  if (process.platform !== 'win32')
    return fs.unlinkSync(path)

  const name = path + '.DELETE.' + crypto.randomBytes(16).toString('hex')
  fs.renameSync(path, name)
  fs.unlinkSync(name)
}

// this.gid, entry.gid, this.processUid
const uint32 = (a, b, c) =>
  a === a >>> 0 ? a
  : b === b >>> 0 ? b
  : c

class Unpack extends Parser {
  constructor (opt) {
    if (!opt)
      opt = {}

    opt.ondone = _ => {
      this[ENDED] = true
      this[MAYBECLOSE]()
    }

    super(opt)

    this.transform = typeof opt.transform === 'function' ? opt.transform : null

    this.writable = true
    this.readable = false

    this[PENDING] = 0
    this[ENDED] = false

    this.dirCache = opt.dirCache || new Map()

    if (typeof opt.uid === 'number' || typeof opt.gid === 'number') {
      // need both or neither
      if (typeof opt.uid !== 'number' || typeof opt.gid !== 'number')
        throw new TypeError('cannot set owner without number uid and gid')
      if (opt.preserveOwner)
        throw new TypeError(
          'cannot preserve owner in archive and also set owner explicitly')
      this.uid = opt.uid
      this.gid = opt.gid
      this.setOwner = true
    } else {
      this.uid = null
      this.gid = null
      this.setOwner = false
    }

    // default true for root
    if (opt.preserveOwner === undefined && typeof opt.uid !== 'number')
      this.preserveOwner = process.getuid && process.getuid() === 0
    else
      this.preserveOwner = !!opt.preserveOwner

    this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ?
      process.getuid() : null
    this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ?
      process.getgid() : null

    // mostly just for testing, but useful in some cases.
    // Forcibly trigger a chown on every entry, no matter what
    this.forceChown = opt.forceChown === true

    // turn ><?| in filenames into 0xf000-higher encoded forms
    this.win32 = !!opt.win32 || process.platform === 'win32'

    // do not unpack over files that are newer than what's in the archive
    this.newer = !!opt.newer

    // do not unpack over ANY files
    this.keep = !!opt.keep

    // do not set mtime/atime of extracted entries
    this.noMtime = !!opt.noMtime

    // allow .., absolute path entries, and unpacking through symlinks
    // without this, warn and skip .., relativize absolutes, and error
    // on symlinks in extraction path
    this.preservePaths = !!opt.preservePaths

    // unlink files and links before writing. This breaks existing hard
    // links, and removes symlink directories rather than erroring
    this.unlink = !!opt.unlink

    this.cwd = path.resolve(opt.cwd || process.cwd())
    this.strip = +opt.strip || 0
    this.processUmask = process.umask()
    this.umask = typeof opt.umask === 'number' ? opt.umask : this.processUmask
    // default mode for dirs created as parents
    this.dmode = opt.dmode || (0o0777 & (~this.umask))
    this.fmode = opt.fmode || (0o0666 & (~this.umask))
    this.on('entry', entry => this[ONENTRY](entry))
  }

  [MAYBECLOSE] () {
    if (this[ENDED] && this[PENDING] === 0) {
      this.emit('prefinish')
      this.emit('finish')
      this.emit('end')
      this.emit('close')
    }
  }

  [CHECKPATH] (entry) {
    if (this.strip) {
      const parts = entry.path.split(/\/|\\/)
      if (parts.length < this.strip)
        return false
      entry.path = parts.slice(this.strip).join('/')

      if (entry.type === 'Link') {
        const linkparts = entry.linkpath.split(/\/|\\/)
        if (linkparts.length >= this.strip)
          entry.linkpath = linkparts.slice(this.strip).join('/')
      }
    }

    if (!this.preservePaths) {
      const p = entry.path
      if (p.match(/(^|\/|\\)\.\.(\\|\/|$)/)) {
        this.warn('path contains \'..\'', p)
        return false
      }

      // absolutes on posix are also absolutes on win32
      // so we only need to test this one to get both
      if (path.win32.isAbsolute(p)) {
        const parsed = path.win32.parse(p)
        this.warn('stripping ' + parsed.root + ' from absolute path', p)
        entry.path = p.substr(parsed.root.length)
      }
    }

    // only encode : chars that aren't drive letter indicators
    if (this.win32) {
      const parsed = path.win32.parse(entry.path)
      entry.path = parsed.root === '' ? wc.encode(entry.path)
        : parsed.root + wc.encode(entry.path.substr(parsed.root.length))
    }

    if (path.isAbsolute(entry.path))
      entry.absolute = entry.path
    else
      entry.absolute = path.resolve(this.cwd, entry.path)

    return true
  }

  [ONENTRY] (entry) {
    if (!this[CHECKPATH](entry))
      return entry.resume()

    assert.equal(typeof entry.absolute, 'string')

    switch (entry.type) {
      case 'Directory':
      case 'GNUDumpDir':
        if (entry.mode)
          entry.mode = entry.mode | 0o700

      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
      case 'Link':
      case 'SymbolicLink':
        return this[CHECKFS](entry)

      case 'CharacterDevice':
      case 'BlockDevice':
      case 'FIFO':
        return this[UNSUPPORTED](entry)
    }
  }

  [ONERROR] (er, entry) {
    // Cwd has to exist, or else nothing works. That's serious.
    // Other errors are warnings, which raise the error in strict
    // mode, but otherwise continue on.
    if (er.name === 'CwdError')
      this.emit('error', er)
    else {
      this.warn(er.message, er)
      this[UNPEND]()
      entry.resume()
    }
  }

  [MKDIR] (dir, mode, cb) {
    mkdir(dir, {
      uid: this.uid,
      gid: this.gid,
      processUid: this.processUid,
      processGid: this.processGid,
      umask: this.processUmask,
      preserve: this.preservePaths,
      unlink: this.unlink,
      cache: this.dirCache,
      cwd: this.cwd,
      mode: mode
    }, cb)
  }

  [DOCHOWN] (entry) {
    // in preserve owner mode, chown if the entry doesn't match process
    // in set owner mode, chown if setting doesn't match process
    return this.forceChown ||
      this.preserveOwner &&
      ( typeof entry.uid === 'number' && entry.uid !== this.processUid ||
        typeof entry.gid === 'number' && entry.gid !== this.processGid )
      ||
      ( typeof this.uid === 'number' && this.uid !== this.processUid ||
        typeof this.gid === 'number' && this.gid !== this.processGid )
  }

  [UID] (entry) {
    return uint32(this.uid, entry.uid, this.processUid)
  }

  [GID] (entry) {
    return uint32(this.gid, entry.gid, this.processGid)
  }

  [FILE] (entry) {
    const mode = entry.mode & 0o7777 || this.fmode
    const stream = new fsm.WriteStream(entry.absolute, {
      mode: mode,
      autoClose: false
    })
    stream.on('error', er => this[ONERROR](er, entry))

    let actions = 1
    const done = er => {
      if (er)
        return this[ONERROR](er, entry)

      if (--actions === 0)
        fs.close(stream.fd, _ => this[UNPEND]())
    }

    stream.on('finish', _ => {
      // if futimes fails, try utimes
      // if utimes fails, fail with the original error
      // same for fchown/chown
      const abs = entry.absolute
      const fd = stream.fd

      if (entry.mtime && !this.noMtime) {
        actions++
        const atime = entry.atime || new Date()
        const mtime = entry.mtime
        fs.futimes(fd, atime, mtime, er =>
          er ? fs.utimes(abs, atime, mtime, er2 => done(er2 && er))
          : done())
      }

      if (this[DOCHOWN](entry)) {
        actions++
        const uid = this[UID](entry)
        const gid = this[GID](entry)
        fs.fchown(fd, uid, gid, er =>
          er ? fs.chown(abs, uid, gid, er2 => done(er2 && er))
          : done())
      }

      done()
    })

    const tx = this.transform ? this.transform(entry) || entry : entry
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry))
      entry.pipe(tx)
    }
    tx.pipe(stream)
  }

  [DIRECTORY] (entry) {
    const mode = entry.mode & 0o7777 || this.dmode
    this[MKDIR](entry.absolute, mode, er => {
      if (er)
        return this[ONERROR](er, entry)

      let actions = 1
      const done = _ => {
        if (--actions === 0) {
          this[UNPEND]()
          entry.resume()
        }
      }

      if (entry.mtime && !this.noMtime) {
        actions++
        fs.utimes(entry.absolute, entry.atime || new Date(), entry.mtime, done)
      }

      if (this[DOCHOWN](entry)) {
        actions++
        fs.chown(entry.absolute, this[UID](entry), this[GID](entry), done)
      }

      done()
    })
  }

  [UNSUPPORTED] (entry) {
    this.warn('unsupported entry type: ' + entry.type, entry)
    entry.resume()
  }

  [SYMLINK] (entry) {
    this[LINK](entry, entry.linkpath, 'symlink')
  }

  [HARDLINK] (entry) {
    this[LINK](entry, path.resolve(this.cwd, entry.linkpath), 'link')
  }

  [PEND] () {
    this[PENDING]++
  }

  [UNPEND] () {
    this[PENDING]--
    this[MAYBECLOSE]()
  }

  [SKIP] (entry) {
    this[UNPEND]()
    entry.resume()
  }

  // Check if we can reuse an existing filesystem entry safely and
  // overwrite it, rather than unlinking and recreating
  // Windows doesn't report a useful nlink, so we just never reuse entries
  [ISREUSABLE] (entry, st) {
    return entry.type === 'File' &&
      !this.unlink &&
      st.isFile() &&
      st.nlink <= 1 &&
      process.platform !== 'win32'
  }

  // check if a thing is there, and if so, try to clobber it
  [CHECKFS] (entry) {
    this[PEND]()
    this[MKDIR](path.dirname(entry.absolute), this.dmode, er => {
      if (er)
        return this[ONERROR](er, entry)
      fs.lstat(entry.absolute, (er, st) => {
        if (st && (this.keep || this.newer && st.mtime > entry.mtime))
          this[SKIP](entry)
        else if (er || this[ISREUSABLE](entry, st))
          this[MAKEFS](null, entry)
        else if (st.isDirectory()) {
          if (entry.type === 'Directory') {
            if (!entry.mode || (st.mode & 0o7777) === entry.mode)
              this[MAKEFS](null, entry)
            else
              fs.chmod(entry.absolute, entry.mode, er => this[MAKEFS](er, entry))
          } else
            fs.rmdir(entry.absolute, er => this[MAKEFS](er, entry))
        } else
          unlinkFile(entry.absolute, er => this[MAKEFS](er, entry))
      })
    })
  }

  [MAKEFS] (er, entry) {
    if (er)
      return this[ONERROR](er, entry)

    switch (entry.type) {
      case 'File':
      case 'OldFile':
      case 'ContiguousFile':
        return this[FILE](entry)

      case 'Link':
        return this[HARDLINK](entry)

      case 'SymbolicLink':
        return this[SYMLINK](entry)

      case 'Directory':
      case 'GNUDumpDir':
        return this[DIRECTORY](entry)
    }
  }

  [LINK] (entry, linkpath, link) {
    // XXX: get the type ('file' or 'dir') for windows
    fs[link](linkpath, entry.absolute, er => {
      if (er)
        return this[ONERROR](er, entry)
      this[UNPEND]()
      entry.resume()
    })
  }
}

class UnpackSync extends Unpack {
  constructor (opt) {
    super(opt)
  }

  [CHECKFS] (entry) {
    const er = this[MKDIR](path.dirname(entry.absolute), this.dmode)
    if (er)
      return this[ONERROR](er, entry)
    try {
      const st = fs.lstatSync(entry.absolute)
      if (this.keep || this.newer && st.mtime > entry.mtime)
        return this[SKIP](entry)
      else if (this[ISREUSABLE](entry, st))
        return this[MAKEFS](null, entry)
      else {
        try {
          if (st.isDirectory()) {
            if (entry.type === 'Directory') {
              if (entry.mode && (st.mode & 0o7777) !== entry.mode)
                fs.chmodSync(entry.absolute, entry.mode)
            } else
              fs.rmdirSync(entry.absolute)
          } else
            unlinkFileSync(entry.absolute)
          return this[MAKEFS](null, entry)
        } catch (er) {
          return this[ONERROR](er, entry)
        }
      }
    } catch (er) {
      return this[MAKEFS](null, entry)
    }
  }

  [FILE] (entry) {
    const mode = entry.mode & 0o7777 || this.fmode

    const oner = er => {
      try { fs.closeSync(fd) } catch (_) {}
      if (er)
        this[ONERROR](er, entry)
    }

    let stream
    let fd
    try {
      fd = fs.openSync(entry.absolute, 'w', mode)
    } catch (er) {
      return oner(er)
    }
    const tx = this.transform ? this.transform(entry) || entry : entry
    if (tx !== entry) {
      tx.on('error', er => this[ONERROR](er, entry))
      entry.pipe(tx)
    }

    tx.on('data', chunk => {
      try {
        fs.writeSync(fd, chunk, 0, chunk.length)
      } catch (er) {
        oner(er)
      }
    })

    tx.on('end', _ => {
      let er = null
      // try both, falling futimes back to utimes
      // if either fails, handle the first error
      if (entry.mtime && !this.noMtime) {
        const atime = entry.atime || new Date()
        const mtime = entry.mtime
        try {
          fs.futimesSync(fd, atime, mtime)
        } catch (futimeser) {
          try {
            fs.utimesSync(entry.absolute, atime, mtime)
          } catch (utimeser) {
            er = futimeser
          }
        }
      }

      if (this[DOCHOWN](entry)) {
        const uid = this[UID](entry)
        const gid = this[GID](entry)

        try {
          fs.fchownSync(fd, uid, gid)
        } catch (fchowner) {
          try {
            fs.chownSync(entry.absolute, uid, gid)
          } catch (chowner) {
            er = er || fchowner
          }
        }
      }

      oner(er)
    })
  }

  [DIRECTORY] (entry) {
    const mode = entry.mode & 0o7777 || this.dmode
    const er = this[MKDIR](entry.absolute, mode)
    if (er)
      return this[ONERROR](er, entry)
    if (entry.mtime && !this.noMtime) {
      try {
        fs.utimesSync(entry.absolute, entry.atime || new Date(), entry.mtime)
      } catch (er) {}
    }
    if (this[DOCHOWN](entry)) {
      try {
        fs.chownSync(entry.absolute, this[UID](entry), this[GID](entry))
      } catch (er) {}
    }
    entry.resume()
  }

  [MKDIR] (dir, mode) {
    try {
      return mkdir.sync(dir, {
        uid: this.uid,
        gid: this.gid,
        processUid: this.processUid,
        processGid: this.processGid,
        umask: this.processUmask,
        preserve: this.preservePaths,
        unlink: this.unlink,
        cache: this.dirCache,
        cwd: this.cwd,
        mode: mode
      })
    } catch (er) {
      return er
    }
  }

  [LINK] (entry, linkpath, link) {
    try {
      fs[link + 'Sync'](linkpath, entry.absolute)
      entry.resume()
    } catch (er) {
      return this[ONERROR](er, entry)
    }
  }
}

Unpack.Sync = UnpackSync
module.exports = Unpack


/***/ }),

/***/ 4404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// tar -u

const hlo = __webpack_require__(5274)
const r = __webpack_require__(5923)
// just call tar.r with the filter and mtimeCache

const u = module.exports = (opt_, files, cb) => {
  const opt = hlo(opt_)

  if (!opt.file)
    throw new TypeError('file is required')

  if (opt.gzip)
    throw new TypeError('cannot append to compressed archives')

  if (!files || !Array.isArray(files) || !files.length)
    throw new TypeError('no files or directories specified')

  files = Array.from(files)

  mtimeFilter(opt)
  return r(opt, files, cb)
}

const mtimeFilter = opt => {
  const filter = opt.filter

  if (!opt.mtimeCache)
    opt.mtimeCache = new Map()

  opt.filter = filter ? (path, stat) =>
    filter(path, stat) && !(opt.mtimeCache.get(path) > stat.mtime)
    : (path, stat) => !(opt.mtimeCache.get(path) > stat.mtime)
}


/***/ }),

/***/ 5899:
/***/ ((module) => {

"use strict";

module.exports = Base => class extends Base {
  warn (msg, data) {
    if (!this.strict)
      this.emit('warn', msg, data)
    else if (data instanceof Error)
      this.emit('error', data)
    else {
      const er = new Error(msg)
      er.data = data
      this.emit('error', er)
    }
  }
}


/***/ }),

/***/ 4808:
/***/ ((module) => {

"use strict";


// When writing files on Windows, translate the characters to their
// 0xf000 higher-encoded versions.

const raw = [
  '|',
  '<',
  '>',
  '?',
  ':'
]

const win = raw.map(char =>
  String.fromCharCode(0xf000 + char.charCodeAt(0)))

const toWin = new Map(raw.map((char, i) => [char, win[i]]))
const toRaw = new Map(win.map((char, i) => [char, raw[i]]))

module.exports = {
  encode: s => raw.reduce((s, c) => s.split(c).join(toWin.get(c)), s),
  decode: s => win.reduce((s, c) => s.split(c).join(toRaw.get(c)), s)
}


/***/ }),

/***/ 5450:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const Buffer = __webpack_require__(6707)
const MiniPass = __webpack_require__(1077)
const Pax = __webpack_require__(7996)
const Header = __webpack_require__(6043)
const ReadEntry = __webpack_require__(8116)
const fs = __webpack_require__(5747)
const path = __webpack_require__(5622)

const types = __webpack_require__(4173)
const maxReadSize = 16 * 1024 * 1024
const PROCESS = Symbol('process')
const FILE = Symbol('file')
const DIRECTORY = Symbol('directory')
const SYMLINK = Symbol('symlink')
const HARDLINK = Symbol('hardlink')
const HEADER = Symbol('header')
const READ = Symbol('read')
const LSTAT = Symbol('lstat')
const ONLSTAT = Symbol('onlstat')
const ONREAD = Symbol('onread')
const ONREADLINK = Symbol('onreadlink')
const OPENFILE = Symbol('openfile')
const ONOPENFILE = Symbol('onopenfile')
const CLOSE = Symbol('close')
const MODE = Symbol('mode')
const warner = __webpack_require__(5899)
const winchars = __webpack_require__(4808)

const modeFix = __webpack_require__(8371)

const WriteEntry = warner(class WriteEntry extends MiniPass {
  constructor (p, opt) {
    opt = opt || {}
    super(opt)
    if (typeof p !== 'string')
      throw new TypeError('path is required')
    this.path = p
    // suppress atime, ctime, uid, gid, uname, gname
    this.portable = !!opt.portable
    // until node has builtin pwnam functions, this'll have to do
    this.myuid = process.getuid && process.getuid()
    this.myuser = process.env.USER || ''
    this.maxReadSize = opt.maxReadSize || maxReadSize
    this.linkCache = opt.linkCache || new Map()
    this.statCache = opt.statCache || new Map()
    this.preservePaths = !!opt.preservePaths
    this.cwd = opt.cwd || process.cwd()
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.noMtime = !!opt.noMtime
    this.mtime = opt.mtime || null

    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    if (!this.preservePaths && path.win32.isAbsolute(p)) {
      // absolutes on posix are also absolutes on win32
      // so we only need to test this one to get both
      const parsed = path.win32.parse(p)
      this.warn('stripping ' + parsed.root + ' from absolute path', p)
      this.path = p.substr(parsed.root.length)
    }

    this.win32 = !!opt.win32 || process.platform === 'win32'
    if (this.win32) {
      this.path = winchars.decode(this.path.replace(/\\/g, '/'))
      p = p.replace(/\\/g, '/')
    }

    this.absolute = opt.absolute || path.resolve(this.cwd, p)

    if (this.path === '')
      this.path = './'

    if (this.statCache.has(this.absolute))
      this[ONLSTAT](this.statCache.get(this.absolute))
    else
      this[LSTAT]()
  }

  [LSTAT] () {
    fs.lstat(this.absolute, (er, stat) => {
      if (er)
        return this.emit('error', er)
      this[ONLSTAT](stat)
    })
  }

  [ONLSTAT] (stat) {
    this.statCache.set(this.absolute, stat)
    this.stat = stat
    if (!stat.isFile())
      stat.size = 0
    this.type = getType(stat)
    this.emit('stat', stat)
    this[PROCESS]()
  }

  [PROCESS] () {
    switch (this.type) {
      case 'File': return this[FILE]()
      case 'Directory': return this[DIRECTORY]()
      case 'SymbolicLink': return this[SYMLINK]()
      // unsupported types are ignored.
      default: return this.end()
    }
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory')
  }

  [HEADER] () {
    if (this.type === 'Directory' && this.portable)
      this.noMtime = true

    this.header = new Header({
      path: this.path,
      linkpath: this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this[MODE](this.stat.mode),
      uid: this.portable ? null : this.stat.uid,
      gid: this.portable ? null : this.stat.gid,
      size: this.stat.size,
      mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
      type: this.type,
      uname: this.portable ? null :
        this.stat.uid === this.myuid ? this.myuser : '',
      atime: this.portable ? null : this.stat.atime,
      ctime: this.portable ? null : this.stat.ctime
    })

    if (this.header.encode() && !this.noPax)
      this.write(new Pax({
        atime: this.portable ? null : this.header.atime,
        ctime: this.portable ? null : this.header.ctime,
        gid: this.portable ? null : this.header.gid,
        mtime: this.noMtime ? null : this.mtime || this.header.mtime,
        path: this.path,
        linkpath: this.linkpath,
        size: this.header.size,
        uid: this.portable ? null : this.header.uid,
        uname: this.portable ? null : this.header.uname,
        dev: this.portable ? null : this.stat.dev,
        ino: this.portable ? null : this.stat.ino,
        nlink: this.portable ? null : this.stat.nlink
      }).encode())
    this.write(this.header.block)
  }

  [DIRECTORY] () {
    if (this.path.substr(-1) !== '/')
      this.path += '/'
    this.stat.size = 0
    this[HEADER]()
    this.end()
  }

  [SYMLINK] () {
    fs.readlink(this.absolute, (er, linkpath) => {
      if (er)
        return this.emit('error', er)
      this[ONREADLINK](linkpath)
    })
  }

  [ONREADLINK] (linkpath) {
    this.linkpath = linkpath
    this[HEADER]()
    this.end()
  }

  [HARDLINK] (linkpath) {
    this.type = 'Link'
    this.linkpath = path.relative(this.cwd, linkpath)
    this.stat.size = 0
    this[HEADER]()
    this.end()
  }

  [FILE] () {
    if (this.stat.nlink > 1) {
      const linkKey = this.stat.dev + ':' + this.stat.ino
      if (this.linkCache.has(linkKey)) {
        const linkpath = this.linkCache.get(linkKey)
        if (linkpath.indexOf(this.cwd) === 0)
          return this[HARDLINK](linkpath)
      }
      this.linkCache.set(linkKey, this.absolute)
    }

    this[HEADER]()
    if (this.stat.size === 0)
      return this.end()

    this[OPENFILE]()
  }

  [OPENFILE] () {
    fs.open(this.absolute, 'r', (er, fd) => {
      if (er)
        return this.emit('error', er)
      this[ONOPENFILE](fd)
    })
  }

  [ONOPENFILE] (fd) {
    const blockLen = 512 * Math.ceil(this.stat.size / 512)
    const bufLen = Math.min(blockLen, this.maxReadSize)
    const buf = Buffer.allocUnsafe(bufLen)
    this[READ](fd, buf, 0, buf.length, 0, this.stat.size, blockLen)
  }

  [READ] (fd, buf, offset, length, pos, remain, blockRemain) {
    fs.read(fd, buf, offset, length, pos, (er, bytesRead) => {
      if (er)
        return this[CLOSE](fd, _ => this.emit('error', er))
      this[ONREAD](fd, buf, offset, length, pos, remain, blockRemain, bytesRead)
    })
  }

  [CLOSE] (fd, cb) {
    fs.close(fd, cb)
  }

  [ONREAD] (fd, buf, offset, length, pos, remain, blockRemain, bytesRead) {
    if (bytesRead <= 0 && remain > 0) {
      const er = new Error('encountered unexpected EOF')
      er.path = this.absolute
      er.syscall = 'read'
      er.code = 'EOF'
      this[CLOSE](fd)
      return this.emit('error', er)
    }

    if (bytesRead > remain) {
      const er = new Error('did not encounter expected EOF')
      er.path = this.absolute
      er.syscall = 'read'
      er.code = 'EOF'
      this[CLOSE](fd)
      return this.emit('error', er)
    }

    // null out the rest of the buffer, if we could fit the block padding
    if (bytesRead === remain) {
      for (let i = bytesRead; i < length && bytesRead < blockRemain; i++) {
        buf[i + offset] = 0
        bytesRead ++
        remain ++
      }
    }

    const writeBuf = offset === 0 && bytesRead === buf.length ?
      buf : buf.slice(offset, offset + bytesRead)
    remain -= bytesRead
    blockRemain -= bytesRead
    pos += bytesRead
    offset += bytesRead

    this.write(writeBuf)

    if (!remain) {
      if (blockRemain)
        this.write(Buffer.alloc(blockRemain))
      this.end()
      this[CLOSE](fd, _ => _)
      return
    }

    if (offset >= length) {
      buf = Buffer.allocUnsafe(length)
      offset = 0
    }
    length = buf.length - offset
    this[READ](fd, buf, offset, length, pos, remain, blockRemain)
  }
})

class WriteEntrySync extends WriteEntry {
  constructor (path, opt) {
    super(path, opt)
  }

  [LSTAT] () {
    this[ONLSTAT](fs.lstatSync(this.absolute))
  }

  [SYMLINK] () {
    this[ONREADLINK](fs.readlinkSync(this.absolute))
  }

  [OPENFILE] () {
    this[ONOPENFILE](fs.openSync(this.absolute, 'r'))
  }

  [READ] (fd, buf, offset, length, pos, remain, blockRemain) {
    let threw = true
    try {
      const bytesRead = fs.readSync(fd, buf, offset, length, pos)
      this[ONREAD](fd, buf, offset, length, pos, remain, blockRemain, bytesRead)
      threw = false
    } finally {
      if (threw)
        try { this[CLOSE](fd) } catch (er) {}
    }
  }

  [CLOSE] (fd) {
    fs.closeSync(fd)
  }
}

const WriteEntryTar = warner(class WriteEntryTar extends MiniPass {
  constructor (readEntry, opt) {
    opt = opt || {}
    super(opt)
    this.preservePaths = !!opt.preservePaths
    this.portable = !!opt.portable
    this.strict = !!opt.strict
    this.noPax = !!opt.noPax
    this.noMtime = !!opt.noMtime

    this.readEntry = readEntry
    this.type = readEntry.type
    if (this.type === 'Directory' && this.portable)
      this.noMtime = true

    this.path = readEntry.path
    this.mode = this[MODE](readEntry.mode)
    this.uid = this.portable ? null : readEntry.uid
    this.gid = this.portable ? null : readEntry.gid
    this.uname = this.portable ? null : readEntry.uname
    this.gname = this.portable ? null : readEntry.gname
    this.size = readEntry.size
    this.mtime = this.noMtime ? null : opt.mtime || readEntry.mtime
    this.atime = this.portable ? null : readEntry.atime
    this.ctime = this.portable ? null : readEntry.ctime
    this.linkpath = readEntry.linkpath

    if (typeof opt.onwarn === 'function')
      this.on('warn', opt.onwarn)

    if (path.isAbsolute(this.path) && !this.preservePaths) {
      const parsed = path.parse(this.path)
      this.warn(
        'stripping ' + parsed.root + ' from absolute path',
        this.path
      )
      this.path = this.path.substr(parsed.root.length)
    }

    this.remain = readEntry.size
    this.blockRemain = readEntry.startBlockSize

    this.header = new Header({
      path: this.path,
      linkpath: this.linkpath,
      // only the permissions and setuid/setgid/sticky bitflags
      // not the higher-order bits that specify file type
      mode: this.mode,
      uid: this.portable ? null : this.uid,
      gid: this.portable ? null : this.gid,
      size: this.size,
      mtime: this.noMtime ? null : this.mtime,
      type: this.type,
      uname: this.portable ? null : this.uname,
      atime: this.portable ? null : this.atime,
      ctime: this.portable ? null : this.ctime
    })

    if (this.header.encode() && !this.noPax)
      super.write(new Pax({
        atime: this.portable ? null : this.atime,
        ctime: this.portable ? null : this.ctime,
        gid: this.portable ? null : this.gid,
        mtime: this.noMtime ? null : this.mtime,
        path: this.path,
        linkpath: this.linkpath,
        size: this.size,
        uid: this.portable ? null : this.uid,
        uname: this.portable ? null : this.uname,
        dev: this.portable ? null : this.readEntry.dev,
        ino: this.portable ? null : this.readEntry.ino,
        nlink: this.portable ? null : this.readEntry.nlink
      }).encode())

    super.write(this.header.block)
    readEntry.pipe(this)
  }

  [MODE] (mode) {
    return modeFix(mode, this.type === 'Directory')
  }

  write (data) {
    const writeLen = data.length
    if (writeLen > this.blockRemain)
      throw new Error('writing more to entry than is appropriate')
    this.blockRemain -= writeLen
    return super.write(data)
  }

  end () {
    if (this.blockRemain)
      this.write(Buffer.alloc(this.blockRemain))
    return super.end()
  }
})

WriteEntry.Sync = WriteEntrySync
WriteEntry.Tar = WriteEntryTar

const getType = stat =>
  stat.isFile() ? 'File'
  : stat.isDirectory() ? 'Directory'
  : stat.isSymbolicLink() ? 'SymbolicLink'
  : 'Unsupported'

module.exports = WriteEntry


/***/ }),

/***/ 3158:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const {Readable: ReadableStream} = __webpack_require__(2413);

const toReadableStream = input => (
	new ReadableStream({
		read() {
			this.push(input);
			this.push(null);
		}
	})
);

module.exports = toReadableStream;
// TODO: Remove this for the next major release
module.exports.default = toReadableStream;


/***/ }),

/***/ 91:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Native
const {URL} = __webpack_require__(8835);
const {join} = __webpack_require__(5622);
const fs = __webpack_require__(5747);
const {promisify} = __webpack_require__(1669);
const {tmpdir} = __webpack_require__(2087);

// Packages
const registryUrl = __webpack_require__(4182);

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const compareVersions = (a, b) => a.localeCompare(b, 'en-US', {numeric: true});
const encode = value => encodeURIComponent(value).replace(/^%40/, '@');

const getFile = async (details, distTag) => {
	const rootDir = tmpdir();
	const subDir = join(rootDir, 'update-check');

	if (!fs.existsSync(subDir)) {
		await mkdir(subDir);
	}

	let name = `${details.name}-${distTag}.json`;

	if (details.scope) {
		name = `${details.scope}-${name}`;
	}

	return join(subDir, name);
};

const evaluateCache = async (file, time, interval) => {
	if (fs.existsSync(file)) {
		const content = await readFile(file, 'utf8');
		const {lastUpdate, latest} = JSON.parse(content);
		const nextCheck = lastUpdate + interval;

		// As long as the time of the next check is in
		// the future, we don't need to run it yet
		if (nextCheck > time) {
			return {
				shouldCheck: false,
				latest
			};
		}
	}

	return {
		shouldCheck: true,
		latest: null
	};
};

const updateCache = async (file, latest, lastUpdate) => {
	const content = JSON.stringify({
		latest,
		lastUpdate
	});

	await writeFile(file, content, 'utf8');
};

const loadPackage = (url, authInfo) => new Promise((resolve, reject) => {
	const options = {
		host: url.hostname,
		path: url.pathname,
		port: url.port,
		headers: {
			accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*'
		},
		timeout: 2000
	};

	if (authInfo) {
		options.headers.authorization = `${authInfo.type} ${authInfo.token}`;
	}

	const {get} = __webpack_require__(url.protocol === 'https:' ? 7211 : 8605);
	get(options, response => {
		const {statusCode} = response;

		if (statusCode !== 200) {
			const error = new Error(`Request failed with code ${statusCode}`);
			error.code = statusCode;

			reject(error);

			// Consume response data to free up RAM
			response.resume();
			return;
		}

		let rawData = '';
		response.setEncoding('utf8');

		response.on('data', chunk => {
			rawData += chunk;
		});

		response.on('end', () => {
			try {
				const parsedData = JSON.parse(rawData);
				resolve(parsedData);
			} catch (e) {
				reject(e);
			}
		});
	}).on('error', reject).on('timeout', reject);
});

const getMostRecent = async ({full, scope}, distTag) => {
	const regURL = registryUrl(scope);
	const url = new URL(full, regURL);

	let spec = null;

	try {
		spec = await loadPackage(url);
	} catch (err) {
		// We need to cover:
		// 401 or 403 for when we don't have access
		// 404 when the package is hidden
		if (err.code && String(err.code).startsWith(4)) {
			// We only want to load this package for when we
			// really need to use the token
			const registryAuthToken = __webpack_require__(2968);
			const authInfo = registryAuthToken(regURL, {recursive: true});

			spec = await loadPackage(url, authInfo);
		} else {
			throw err;
		}
	}

	const version = spec['dist-tags'][distTag];

	if (!version) {
		throw new Error(`Distribution tag ${distTag} is not available`);
	}

	return version;
};

const defaultConfig = {
	interval: 3600000,
	distTag: 'latest'
};

const getDetails = name => {
	const spec = {
		full: encode(name)
	};

	if (name.includes('/')) {
		const parts = name.split('/');

		spec.scope = parts[0];
		spec.name = parts[1];
	} else {
		spec.scope = null;
		spec.name = name;
	}

	return spec;
};

module.exports = async (pkg, config) => {
	if (typeof pkg !== 'object') {
		throw new Error('The first parameter should be your package.json file content');
	}

	const details = getDetails(pkg.name);
	const time = Date.now();
	const {distTag, interval} = Object.assign({}, defaultConfig, config);
	const file = await getFile(details, distTag);

	let latest = null;
	let shouldCheck = true;

	({shouldCheck, latest} = await evaluateCache(file, time, interval));

	if (shouldCheck) {
		latest = await getMostRecent(details, distTag);

		// If we pulled an update, we need to update the cache
		await updateCache(file, latest, time);
	}

	const comparision = compareVersions(pkg.version, latest);

	if (comparision === -1) {
		return {
			latest,
			fromCache: !shouldCheck
		};
	}

	return null;
};


/***/ }),

/***/ 4150:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$')
var builtins = __webpack_require__(2008)
var blacklist = [
  'node_modules',
  'favicon.ico'
]

var validate = module.exports = function (name) {
  var warnings = []
  var errors = []

  if (name === null) {
    errors.push('name cannot be null')
    return done(warnings, errors)
  }

  if (name === undefined) {
    errors.push('name cannot be undefined')
    return done(warnings, errors)
  }

  if (typeof name !== 'string') {
    errors.push('name must be a string')
    return done(warnings, errors)
  }

  if (!name.length) {
    errors.push('name length must be greater than zero')
  }

  if (name.match(/^\./)) {
    errors.push('name cannot start with a period')
  }

  if (name.match(/^_/)) {
    errors.push('name cannot start with an underscore')
  }

  if (name.trim() !== name) {
    errors.push('name cannot contain leading or trailing spaces')
  }

  // No funny business
  blacklist.forEach(function (blacklistedName) {
    if (name.toLowerCase() === blacklistedName) {
      errors.push(blacklistedName + ' is a blacklisted name')
    }
  })

  // Generate warnings for stuff that used to be allowed

  // core module names like http, events, util, etc
  builtins.forEach(function (builtin) {
    if (name.toLowerCase() === builtin) {
      warnings.push(builtin + ' is a core module name')
    }
  })

  // really-long-package-names-------------------------------such--length-----many---wow
  // the thisisareallyreallylongpackagenameitshouldpublishdowenowhavealimittothelengthofpackagenames-poch.
  if (name.length > 214) {
    warnings.push('name can no longer contain more than 214 characters')
  }

  // mIxeD CaSe nAMEs
  if (name.toLowerCase() !== name) {
    warnings.push('name can no longer contain capital letters')
  }

  if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
    warnings.push('name can no longer contain special characters ("~\'!()*")')
  }

  if (encodeURIComponent(name) !== name) {
    // Maybe it's a scoped package name, like @user/package
    var nameMatch = name.match(scopedPackagePattern)
    if (nameMatch) {
      var user = nameMatch[1]
      var pkg = nameMatch[2]
      if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) {
        return done(warnings, errors)
      }
    }

    errors.push('name can only contain URL-friendly characters')
  }

  return done(warnings, errors)
}

validate.scopedPackagePattern = scopedPackagePattern

var done = function (warnings, errors) {
  var result = {
    validForNewPackages: errors.length === 0 && warnings.length === 0,
    validForOldPackages: errors.length === 0,
    warnings: warnings,
    errors: errors
  }
  if (!result.warnings.length) delete result.warnings
  if (!result.errors.length) delete result.errors
  return result
}


/***/ }),

/***/ 4207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = which
which.sync = whichSync

var isWindows = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys'

var path = __webpack_require__(5622)
var COLON = isWindows ? ';' : ':'
var isexe = __webpack_require__(7126)

function getNotFoundError (cmd) {
  var er = new Error('not found: ' + cmd)
  er.code = 'ENOENT'

  return er
}

function getPathInfo (cmd, opt) {
  var colon = opt.colon || COLON
  var pathEnv = opt.path || process.env.PATH || ''
  var pathExt = ['']

  pathEnv = pathEnv.split(colon)

  var pathExtExe = ''
  if (isWindows) {
    pathEnv.unshift(process.cwd())
    pathExtExe = (opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM')
    pathExt = pathExtExe.split(colon)


    // Always test the cmd itself first.  isexe will check to make sure
    // it's found in the pathExt set.
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('')
  }

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
    pathEnv = ['']

  return {
    env: pathEnv,
    ext: pathExt,
    extExe: pathExtExe
  }
}

function which (cmd, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var pathExtExe = info.extExe
  var found = []

  ;(function F (i, l) {
    if (i === l) {
      if (opt.all && found.length)
        return cb(null, found)
      else
        return cb(getNotFoundError(cmd))
    }

    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.join(pathPart, cmd)
    if (!pathPart && (/^\.[\\\/]/).test(cmd)) {
      p = cmd.slice(0, 2) + p
    }
    ;(function E (ii, ll) {
      if (ii === ll) return F(i + 1, l)
      var ext = pathExt[ii]
      isexe(p + ext, { pathExt: pathExtExe }, function (er, is) {
        if (!er && is) {
          if (opt.all)
            found.push(p + ext)
          else
            return cb(null, p + ext)
        }
        return E(ii + 1, ll)
      })
    })(0, pathExt.length)
  })(0, pathEnv.length)
}

function whichSync (cmd, opt) {
  opt = opt || {}

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var pathExtExe = info.extExe
  var found = []

  for (var i = 0, l = pathEnv.length; i < l; i ++) {
    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.join(pathPart, cmd)
    if (!pathPart && /^\.[\\\/]/.test(cmd)) {
      p = cmd.slice(0, 2) + p
    }
    for (var j = 0, ll = pathExt.length; j < ll; j ++) {
      var cur = p + pathExt[j]
      var is
      try {
        is = isexe.sync(cur, { pathExt: pathExtExe })
        if (is) {
          if (opt.all)
            found.push(cur)
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
}


/***/ }),

/***/ 2940:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 4091:
/***/ ((module) => {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ 665:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount /*, ...nodes */) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 2; i < arguments.length; i++) {
    walker = insert(this, walker, arguments[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(4091)(Yallist)
} catch (er) {}


/***/ }),

/***/ 390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/chalk/index.js
var chalk = __webpack_require__(8707);
var chalk_default = /*#__PURE__*/__webpack_require__.n(chalk);

// EXTERNAL MODULE: ./node_modules/commander/index.js
var commander = __webpack_require__(1904);
var commander_default = /*#__PURE__*/__webpack_require__.n(commander);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(5622);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);

// EXTERNAL MODULE: ./node_modules/prompts/index.js
var prompts = __webpack_require__(9646);
var prompts_default = /*#__PURE__*/__webpack_require__.n(prompts);

// EXTERNAL MODULE: ./node_modules/update-check/index.js
var update_check = __webpack_require__(91);
var update_check_default = /*#__PURE__*/__webpack_require__.n(update_check);

// EXTERNAL MODULE: ./node_modules/async-retry/lib/index.js
var lib = __webpack_require__(3415);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(5747);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);

// EXTERNAL MODULE: ./node_modules/got/dist/source/index.js
var source = __webpack_require__(3061);
var source_default = /*#__PURE__*/__webpack_require__.n(source);

// EXTERNAL MODULE: ./node_modules/tar/index.js
var tar = __webpack_require__(4674);
// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(2413);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(1669);
// CONCATENATED MODULE: ./helpers/examples.ts
/* eslint-disable import/no-extraneous-dependencies */




const pipeline = (0,external_util_.promisify)(external_stream_.Stream.pipeline);
async function isUrlOk(url) {
    const res = await source_default().head(url).catch((e) => e);
    return res.statusCode === 200;
}
async function getRepoInfo(url, examplePath) {
    const [, username, name, t, _branch, ...file] = url.pathname.split('/');
    const filePath = examplePath ? examplePath.replace(/^\//, '') : file.join('/');
    // Support repos whose entire purpose is to be a NLUDB example, e.g.
    // https://github.com/:username/:my-cool-nludb-example-repo-name.
    if (t === undefined) {
        const infoResponse = await source_default()(`https://api.github.com/repos/${username}/${name}`).catch((e) => e);
        if (infoResponse.statusCode !== 200) {
            return;
        }
        const info = JSON.parse(infoResponse.body);
        return { username, name, branch: info['default_branch'], filePath };
    }
    // If examplePath is available, the branch name takes the entire path
    const branch = examplePath
        ? `${_branch}/${file.join('/')}`.replace(new RegExp(`/${filePath}|/$`), '')
        : _branch;
    if (username && name && branch && t === 'tree') {
        return { username, name, branch, filePath };
    }
}
function hasRepo({ username, name, branch, filePath, }) {
    const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`;
    const packagePath = `${filePath ? `/${filePath}` : ''}/package.json`;
    return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`);
}
function hasExample(name) {
    return isUrlOk(`https://api.github.com/repos/nludb/nludb-examples/contents/examples/${encodeURIComponent(name)}/package.json`);
}
function downloadAndExtractRepo(root, { username, name, branch, filePath }) {
    return pipeline(source_default().stream(`https://codeload.github.com/${username}/${name}/tar.gz/${branch}`), tar.extract({ cwd: root, strip: filePath ? filePath.split('/').length + 1 : 1 }, [`${name}-${branch}${filePath ? `/${filePath}` : ''}`]));
}
function downloadAndExtractExample(root, name) {
    if (name === '__internal-testing-retry') {
        throw new Error('This is an internal example for testing the CLI.');
    }
    return pipeline(source_default().stream('https://codeload.github.com/nludb/nludb-examples/tar.gz/main'), tar.extract({ cwd: root, strip: 3 }, [`nludb-examples-main/examples/${name}`]));
}

// CONCATENATED MODULE: ./helpers/make-dir.ts

function makeDir(root, options = { recursive: true }) {
    return external_fs_default().promises.mkdir(root, options);
}

// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(3129);
// EXTERNAL MODULE: ./node_modules/rimraf/rimraf.js
var rimraf = __webpack_require__(4959);
var rimraf_default = /*#__PURE__*/__webpack_require__.n(rimraf);

// CONCATENATED MODULE: ./helpers/git.ts
/* eslint-disable import/no-extraneous-dependencies */



function isInGitRepository() {
    try {
        (0,external_child_process_.execSync)('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
        return true;
    }
    catch (_) { }
    return false;
}
function isInMercurialRepository() {
    try {
        (0,external_child_process_.execSync)('hg --cwd . root', { stdio: 'ignore' });
        return true;
    }
    catch (_) { }
    return false;
}
function tryGitInit(root) {
    let didInit = false;
    try {
        (0,external_child_process_.execSync)('git --version', { stdio: 'ignore' });
        if (isInGitRepository() || isInMercurialRepository()) {
            return false;
        }
        (0,external_child_process_.execSync)('git init', { stdio: 'ignore' });
        didInit = true;
        (0,external_child_process_.execSync)('git checkout -b main', { stdio: 'ignore' });
        (0,external_child_process_.execSync)('git add -A', { stdio: 'ignore' });
        (0,external_child_process_.execSync)('git commit -m "Initial commit from Create NLU App"', {
            stdio: 'ignore',
        });
        return true;
    }
    catch (e) {
        if (didInit) {
            try {
                rimraf_default().sync(external_path_default().join(root, '.git'));
            }
            catch (_) { }
        }
        return false;
    }
}

// EXTERNAL MODULE: ./node_modules/cross-spawn/index.js
var cross_spawn = __webpack_require__(2746);
var cross_spawn_default = /*#__PURE__*/__webpack_require__.n(cross_spawn);

// CONCATENATED MODULE: ./helpers/install.ts
/* eslint-disable import/no-extraneous-dependencies */


/**
 * Spawn a package manager installation with either Yarn or NPM.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
function install(root, dependencies, { useYarn, isOnline, devDependencies }) {
    /**
     * NPM-specific command-line flags.
     */
    const npmFlags = [];
    /**
     * Yarn-specific command-line flags.
     */
    const yarnFlags = [];
    /**
     * Return a Promise that resolves once the installation is finished.
     */
    return new Promise((resolve, reject) => {
        let args;
        let command = useYarn ? 'yarnpkg' : 'npm';
        if (dependencies && dependencies.length) {
            /**
             * If there are dependencies, run a variation of `{displayCommand} add`.
             */
            if (useYarn) {
                /**
                 * Call `yarn add --exact (--offline)? (-D)? ...`.
                 */
                args = ['add', '--exact'];
                if (!isOnline)
                    args.push('--offline');
                args.push('--cwd', root);
                if (devDependencies)
                    args.push('--dev');
                args.push(...dependencies);
            }
            else {
                /**
                 * Call `npm install [--save|--save-dev] ...`.
                 */
                args = ['install', '--save-exact'];
                args.push(devDependencies ? '--save-dev' : '--save');
                args.push(...dependencies);
            }
        }
        else {
            /**
             * If there are no dependencies, run a variation of `{displayCommand}
             * install`.
             */
            args = ['install'];
            if (useYarn) {
                if (!isOnline) {
                    console.log(chalk_default().yellow('You appear to be offline.'));
                    console.log(chalk_default().yellow('Falling back to the local Yarn cache.'));
                    console.log();
                    args.push('--offline');
                }
            }
            else {
                if (!isOnline) {
                    console.log(chalk_default().yellow('You appear to be offline.'));
                    console.log();
                }
            }
        }
        /**
         * Add any package manager-specific flags.
         */
        if (useYarn) {
            args.push(...yarnFlags);
        }
        else {
            args.push(...npmFlags);
        }
        /**
         * Spawn the installation process.
         */
        const child = cross_spawn_default()(command, args, {
            stdio: 'inherit',
            env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
        });
        child.on('close', (code) => {
            if (code !== 0) {
                reject({ command: `${command} ${args.join(' ')}` });
                return;
            }
            resolve();
        });
    });
}

// CONCATENATED MODULE: ./helpers/is-folder-empty.ts
/* eslint-disable import/no-extraneous-dependencies */



function isFolderEmpty(root, name) {
    const validFiles = [
        '.DS_Store',
        '.git',
        '.gitattributes',
        '.gitignore',
        '.gitlab-ci.yml',
        '.hg',
        '.hgcheck',
        '.hgignore',
        '.idea',
        '.npmignore',
        '.travis.yml',
        'LICENSE',
        'Thumbs.db',
        'docs',
        'mkdocs.yml',
        'npm-debug.log',
        'yarn-debug.log',
        'yarn-error.log',
    ];
    const conflicts = external_fs_default().readdirSync(root)
        .filter((file) => !validFiles.includes(file))
        // Support IntelliJ IDEA-based editors
        .filter((file) => !/\.iml$/.test(file));
    if (conflicts.length > 0) {
        console.log(`The directory ${chalk_default().green(name)} contains files that could conflict:`);
        console.log();
        for (const file of conflicts) {
            try {
                const stats = external_fs_default().lstatSync(external_path_default().join(root, file));
                if (stats.isDirectory()) {
                    console.log(`  ${chalk_default().blue(file)}/`);
                }
                else {
                    console.log(`  ${file}`);
                }
            }
            catch {
                console.log(`  ${file}`);
            }
        }
        console.log();
        console.log('Either try using a new directory name, or remove the files listed above.');
        console.log();
        return false;
    }
    return true;
}

// EXTERNAL MODULE: external "dns"
var external_dns_ = __webpack_require__(881);
var external_dns_default = /*#__PURE__*/__webpack_require__.n(external_dns_);

// EXTERNAL MODULE: external "url"
var external_url_ = __webpack_require__(8835);
var external_url_default = /*#__PURE__*/__webpack_require__.n(external_url_);

// CONCATENATED MODULE: ./helpers/is-online.ts



function getProxy() {
    if (process.env.https_proxy) {
        return process.env.https_proxy;
    }
    try {
        const httpsProxy = (0,external_child_process_.execSync)('npm config get https-proxy').toString().trim();
        return httpsProxy !== 'null' ? httpsProxy : undefined;
    }
    catch (e) {
        return;
    }
}
function getOnline() {
    return new Promise((resolve) => {
        external_dns_default().lookup('registry.yarnpkg.com', (registryErr) => {
            if (!registryErr) {
                return resolve(true);
            }
            const proxy = getProxy();
            if (!proxy) {
                return resolve(false);
            }
            const { hostname } = external_url_default().parse(proxy);
            if (!hostname) {
                return resolve(false);
            }
            external_dns_default().lookup(hostname, (proxyErr) => {
                resolve(proxyErr == null);
            });
        });
    });
}

// CONCATENATED MODULE: ./helpers/should-use-yarn.ts

function shouldUseYarn() {
    try {
        const userAgent = process.env.npm_config_user_agent;
        if (userAgent) {
            return Boolean(userAgent && userAgent.startsWith('yarn'));
        }
        (0,external_child_process_.execSync)('yarnpkg --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}

// CONCATENATED MODULE: ./helpers/is-writeable.ts

async function isWriteable(directory) {
    try {
        await external_fs_default().promises.access(directory, ((external_fs_default()).constants || (external_fs_default())).W_OK);
        return true;
    }
    catch (err) {
        return false;
    }
}

// CONCATENATED MODULE: ./helpers/package-types.ts


var PackageType;
(function (PackageType) {
    PackageType[PackageType["Jupyter"] = 0] = "Jupyter";
    PackageType[PackageType["Python"] = 1] = "Python";
    PackageType[PackageType["Typescript"] = 2] = "Typescript";
    PackageType[PackageType["React"] = 3] = "React";
    PackageType[PackageType["Unknown"] = 4] = "Unknown";
})(PackageType || (PackageType = {}));
function getPackageType(rootPath) {
    let packageJson = null;
    try {
        let rawFile = (0,external_fs_.readFileSync)(`${rootPath}/package.json`, 'utf-8');
        packageJson = JSON.parse(rawFile);
    }
    catch {
        console.error(`${chalk_default().red('Error. ')} Unable to read package.json from new project: ${rootPath}/package.json`);
        return PackageType.Unknown;
    }
    if (packageJson == null) {
        console.error(`${chalk_default().red('Error. ')} Unable to read package.json from new project: ${rootPath}/package.json`);
        return PackageType.Unknown;
    }
    if (typeof packageJson.nludb == 'undefined') {
        console.error(`${chalk_default().red('Error. ')} Example project's package.json did not include an 'nludb' setting block.`);
        return PackageType.Unknown;
    }
    if (typeof packageJson.nludb.packageType == 'string') {
        console.error(`${chalk_default().red('Error. ')} Example project's package.json did not include a 'packageType' string parameter in the 'nludb' setting block.`);
        return PackageType.Unknown;
    }
    switch (packageJson.nludb.packageType.toLowerCase()) {
        case 'jupyter':
            return PackageType.Jupyter;
        case 'python':
            return PackageType.Python;
        case 'typescript':
            return PackageType.Typescript;
        case 'react':
            return PackageType.React;
        default:
            return PackageType.Unknown;
    }
}
function displayPostInstallInstructionsJupyter() {
    console.log("jupyter-notebook");
}
function displayPostInstallInstructionsUnknown() {
    // console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`)
    // console.log('Inside that directory, you can run several commands:')
    // console.log()
    // console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}dev`))
    // console.log('    Starts the development server.')
    // console.log()
    // console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`))
    // console.log('    Builds the app for production.')
    // console.log()
    // console.log(chalk.cyan(`  ${displayedCommand} start`))
    // console.log('    Runs the built app in production mode.')
    // console.log()
    // console.log('We suggest that you begin by typing:')
    // console.log()
    // console.log(chalk.cyan('  cd'), cdpath)
    // console.log(
    //   `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`
    // )
    // console.log()
}
function displayPostInstallInstructions(appName, appPath, packageType) {
    console.log(`${chalk_default().green('Success!')} Created ${appName} at ${appPath}`);
    switch (packageType) {
        case PackageType.Jupyter:
            displayPostInstallInstructionsJupyter();
        default:
            displayPostInstallInstructionsUnknown();
    }
    console.log();
}

// CONCATENATED MODULE: ./create-app.ts
/* eslint-disable import/no-extraneous-dependencies */













class DownloadError extends Error {
}
async function createApp({ appPath, useNpm, example, examplePath, typescript, }) {
    let repoInfo;
    const template = typescript ? 'typescript' : 'default';
    if (example) {
        let repoUrl;
        try {
            repoUrl = new URL(example);
        }
        catch (error) {
            if (error.code !== 'ERR_INVALID_URL') {
                console.error(error);
                process.exit(1);
            }
        }
        if (repoUrl) {
            if (repoUrl.origin !== 'https://github.com') {
                console.error(`Invalid URL: ${chalk_default().red(`"${example}"`)}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`);
                process.exit(1);
            }
            repoInfo = await getRepoInfo(repoUrl, examplePath);
            if (!repoInfo) {
                console.error(`Found invalid GitHub URL: ${chalk_default().red(`"${example}"`)}. Please fix the URL and try again.`);
                process.exit(1);
            }
            const found = await hasRepo(repoInfo);
            if (!found) {
                console.error(`Could not locate the repository for ${chalk_default().red(`"${example}"`)}. Please check that the repository exists and try again.`);
                process.exit(1);
            }
        }
        else if (example !== '__internal-testing-retry') {
            const found = await hasExample(example);
            if (!found) {
                console.error(`Could not locate an example named ${chalk_default().red(`"${example}"`)}. It could be due to the following:\n`, `1. Your spelling of example ${chalk_default().red(`"${example}"`)} might be incorrect.\n`, `2. You might not be connected to the internet.`);
                process.exit(1);
            }
        }
    }
    const root = external_path_default().resolve(appPath);
    if (!(await isWriteable(external_path_default().dirname(root)))) {
        console.error('The application path is not writable, please check folder permissions and try again.');
        console.error('It is likely you do not have write permissions for this folder.');
        process.exit(1);
    }
    const appName = external_path_default().basename(root);
    await makeDir(root);
    if (!isFolderEmpty(root, appName)) {
        process.exit(1);
    }
    const useYarn = useNpm ? false : shouldUseYarn();
    const displayedCommand = useYarn ? 'yarn' : 'npm';
    const isOnline = !useYarn || (await getOnline());
    const originalDirectory = process.cwd();
    console.log(`Creating a new NLUDB app in ${chalk_default().green(root)}.`);
    console.log();
    await makeDir(root);
    process.chdir(root);
    if ((!example) || (typeof example == 'undefined')) {
        // TODO: Hot load the default from the server.
        example = 'jupyter-playground';
    }
    if (example) {
        /**
         * If an example repository is provided, clone it.
         */
        try {
            if (repoInfo) {
                const repoInfo2 = repoInfo;
                console.log(`Downloading files from repo ${chalk_default().cyan(example)}. This might take a moment.`);
                console.log();
                await lib_default()(() => downloadAndExtractRepo(root, repoInfo2), {
                    retries: 3,
                });
            }
            else {
                console.log(`Downloading files for example ${chalk_default().cyan(example)}. This might take a moment.`);
                console.log();
                await lib_default()(() => downloadAndExtractExample(root, example), {
                    retries: 3,
                });
            }
        }
        catch (reason) {
            function isErrorLike(err) {
                return (typeof err === 'object' &&
                    err !== null &&
                    typeof err.message === 'string');
            }
            throw new DownloadError(isErrorLike(reason) ? reason.message : reason + '');
        }
        // Copy our default `.gitignore` if the application did not provide one
        const ignorePath = external_path_default().join(root, '.gitignore');
        if (!external_fs_default().existsSync(ignorePath)) {
            external_fs_default().copyFileSync(__webpack_require__.ab + "templates/" + template + '/gitignore', ignorePath);
        }
        console.log('Installing packages. This might take a couple of minutes.');
        console.log();
        await install(root, null, { useYarn, isOnline });
        console.log();
    }
    if (tryGitInit(root)) {
        console.log('Initialized a git repository.');
        console.log();
    }
    let cdpath;
    if (external_path_default().join(originalDirectory, appName) === appPath) {
        cdpath = appName;
    }
    else {
        cdpath = appPath;
    }
    const packageType = getPackageType(root);
    displayPostInstallInstructions(appName, appPath, packageType);
    // if (isPython()) {
    // } else {
    // }
    // console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`)
    // console.log('Inside that directory, you can run several commands:')
    // console.log()
    // console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}dev`))
    // console.log('    Starts the development server.')
    // console.log()
    // console.log(chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`))
    // console.log('    Builds the app for production.')
    // console.log()
    // console.log(chalk.cyan(`  ${displayedCommand} start`))
    // console.log('    Runs the built app in production mode.')
    // console.log()
    // console.log('We suggest that you begin by typing:')
    // console.log()
    // console.log(chalk.cyan('  cd'), cdpath)
    // console.log(
    //   `  ${chalk.cyan(`${displayedCommand} ${useYarn ? '' : 'run '}dev`)}`
    // )
    // console.log()
}

// EXTERNAL MODULE: ./node_modules/validate-npm-package-name/index.js
var validate_npm_package_name = __webpack_require__(4150);
var validate_npm_package_name_default = /*#__PURE__*/__webpack_require__.n(validate_npm_package_name);

// CONCATENATED MODULE: ./helpers/validate-pkg.ts
// eslint-disable-next-line import/no-extraneous-dependencies

function validateNpmName(name) {
    const nameValidation = validate_npm_package_name_default()(name);
    if (nameValidation.validForNewPackages) {
        return { valid: true };
    }
    return {
        valid: false,
        problems: [
            ...(nameValidation.errors || []),
            ...(nameValidation.warnings || []),
        ],
    };
}

// CONCATENATED MODULE: ./package.json
const package_namespaceObject = JSON.parse("{\"name\":\"create-nlu-app\",\"version\":\"1.0.0\",\"keywords\":[\"nludb\",\"nlp\",\"nlu\",\"natural language processing\"],\"description\":\"Create natural language processing apps and services with one command\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/nludb/typescript-client\",\"directory\":\"packages/create-nlu-app\"},\"author\":\"NLUDB Team <support@nludb.com>\",\"license\":\"MIT\",\"bin\":{\"create-next-app\":\"./dist/index.js\"},\"files\":[\"dist\"],\"scripts\":{\"dev\":\"ncc build ./index.ts -w -o dist/\",\"prerelease\":\"rimraf ./dist/\",\"release\":\"ncc build ./index.ts -o ./dist/ --minify --no-cache --no-source-map-register\",\"prepublish\":\"yarn release\"},\"devDependencies\":{\"@types/async-retry\":\"1.4.2\",\"@types/cross-spawn\":\"^6.0.2\",\"@types/node\":\"^12.6.8\",\"@types/prompts\":\"2.0.1\",\"@types/rimraf\":\"3.0.0\",\"@types/tar\":\"4.0.3\",\"@types/validate-npm-package-name\":\"3.0.0\",\"@vercel/ncc\":\"0.25.1\",\"async-retry\":\"1.3.1\",\"chalk\":\"2.4.2\",\"commander\":\"2.20.0\",\"cpy\":\"7.3.0\",\"cross-spawn\":\"6.0.5\",\"got\":\"10.7.0\",\"prompts\":\"2.1.0\",\"rimraf\":\"3.0.0\",\"tar\":\"4.4.10\",\"update-check\":\"1.5.4\",\"validate-npm-package-name\":\"3.0.0\"},\"engines\":{\"node\":\">=12.22.0\"}}");
// CONCATENATED MODULE: ./index.ts
/* eslint-disable import/no-extraneous-dependencies */









let projectPath = '';
const program = new (commander_default()).Command(package_namespaceObject.name)
    .version(package_namespaceObject.version)
    .arguments('<project-directory>')
    .usage(`${chalk_default().green('<project-directory>')} [options]`)
    .action((name) => {
    projectPath = name;
})
    .option('--ts, --typescript', `

  Initialize as a TypeScript project.
`)
    .option('-e, --example [name]|[github-url]', `

  An example to bootstrap the app with. You can use an example name
  from the official NLUDB repo or a GitHub URL. The URL can use
  any branch and/or subdirectory
`)
    .option('--example-path <path-to-example>', `

  In a rare case, your GitHub URL might contain a branch name with
  a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar).
  In this case, you must specify the path to the example separately:
  --example-path foo/bar
`)
    .allowUnknownOption()
    .parse(process.argv);
async function run() {
    if (typeof projectPath === 'string') {
        projectPath = projectPath.trim();
    }
    if (!projectPath) {
        const res = await prompts_default()({
            type: 'text',
            name: 'path',
            message: 'What is your project named?',
            initial: 'my-app',
            validate: (name) => {
                const validation = validateNpmName(external_path_default().basename(external_path_default().resolve(name)));
                if (validation.valid) {
                    return true;
                }
                return 'Invalid project name: ' + validation.problems[0];
            },
        });
        if (typeof res.path === 'string') {
            projectPath = res.path.trim();
        }
    }
    if (!projectPath) {
        console.log();
        console.log('Please specify the project directory:');
        console.log(`  ${chalk_default().cyan(program.name())} ${chalk_default().green('<project-directory>')}`);
        console.log();
        console.log('For example:');
        console.log(`  ${chalk_default().cyan(program.name())} ${chalk_default().green('my-next-app')}`);
        console.log();
        console.log(`Run ${chalk_default().cyan(`${program.name()} --help`)} to see all options.`);
        process.exit(1);
    }
    const resolvedProjectPath = external_path_default().resolve(projectPath);
    const projectName = external_path_default().basename(resolvedProjectPath);
    const { valid, problems } = validateNpmName(projectName);
    if (!valid) {
        console.error(`Could not create a project called ${chalk_default().red(`"${projectName}"`)} because of naming restrictions:`);
        problems.forEach((p) => console.error(`    ${chalk_default().red.bold('*')} ${p}`));
        process.exit(1);
    }
    if (program.example === true) {
        console.error('Please provide an example name or url, otherwise remove the example option.');
        process.exit(1);
        return;
    }
    const example = typeof program.example === 'string' && program.example.trim();
    try {
        await createApp({
            appPath: resolvedProjectPath,
            useNpm: !!program.useNpm,
            example: example && example !== 'default' ? example : undefined,
            examplePath: program.examplePath,
            typescript: program.typescript,
        });
    }
    catch (reason) {
        if (!(reason instanceof DownloadError)) {
            throw reason;
        }
        const res = await prompts_default()({
            type: 'confirm',
            name: 'builtin',
            message: `Could not download "${example}" because of a connectivity issue between your machine and GitHub.\n` +
                `Do you want to use the default template instead?`,
            initial: true,
        });
        if (!res.builtin) {
            throw reason;
        }
        await createApp({
            appPath: resolvedProjectPath,
            useNpm: !!program.useNpm,
            typescript: program.typescript,
        });
    }
}
const update = update_check_default()(package_namespaceObject).catch(() => null);
async function notifyUpdate() {
    try {
        const res = await update;
        if (res === null || res === void 0 ? void 0 : res.latest) {
            const isYarn = shouldUseYarn();
            console.log();
            console.log(chalk_default().yellow.bold('A new version of `create-next-app` is available!'));
            console.log('You can update by running: ' +
                chalk_default().cyan(isYarn
                    ? 'yarn global add create-next-app'
                    : 'npm i -g create-next-app'));
            console.log();
        }
        process.exit();
    }
    catch {
        // ignore error
    }
}
run()
    .then(notifyUpdate)
    .catch(async (reason) => {
    console.log();
    console.log('Aborting installation.');
    if (reason.command) {
        console.log(`  ${chalk_default().cyan(reason.command)} has failed.`);
    }
    else {
        console.log(chalk_default().red('Unexpected error. Please report it as a bug:'));
        console.log(reason);
    }
    console.log();
    await notifyUpdate();
    process.exit(1);
});


/***/ }),

/***/ 2008:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("[\"assert\",\"buffer\",\"child_process\",\"cluster\",\"console\",\"constants\",\"crypto\",\"dgram\",\"dns\",\"domain\",\"events\",\"fs\",\"http\",\"https\",\"module\",\"net\",\"os\",\"path\",\"process\",\"punycode\",\"querystring\",\"readline\",\"repl\",\"stream\",\"string_decoder\",\"timers\",\"tls\",\"tty\",\"url\",\"util\",\"v8\",\"vm\",\"zlib\"]");

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");;

/***/ }),

/***/ 3129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 6417:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");;

/***/ }),

/***/ 881:
/***/ ((module) => {

"use strict";
module.exports = require("dns");;

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 1631:
/***/ ((module) => {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 1058:
/***/ ((module) => {

"use strict";
module.exports = require("readline");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 4304:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(390);
/******/ })()
;