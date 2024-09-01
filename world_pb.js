/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Vector2 = (function() {

    /**
     * Properties of a Vector2.
     * @exports IVector2
     * @interface IVector2
     * @property {number|null} [x] Vector2 x
     * @property {number|null} [y] Vector2 y
     */

    /**
     * Constructs a new Vector2.
     * @exports Vector2
     * @classdesc Represents a Vector2.
     * @implements IVector2
     * @constructor
     * @param {IVector2=} [properties] Properties to set
     */
    function Vector2(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Vector2 x.
     * @member {number} x
     * @memberof Vector2
     * @instance
     */
    Vector2.prototype.x = 0;

    /**
     * Vector2 y.
     * @member {number} y
     * @memberof Vector2
     * @instance
     */
    Vector2.prototype.y = 0;

    /**
     * Creates a new Vector2 instance using the specified properties.
     * @function create
     * @memberof Vector2
     * @static
     * @param {IVector2=} [properties] Properties to set
     * @returns {Vector2} Vector2 instance
     */
    Vector2.create = function create(properties) {
        return new Vector2(properties);
    };

    /**
     * Encodes the specified Vector2 message. Does not implicitly {@link Vector2.verify|verify} messages.
     * @function encode
     * @memberof Vector2
     * @static
     * @param {IVector2} message Vector2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector2.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.x != null && Object.hasOwnProperty.call(message, "x"))
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
        if (message.y != null && Object.hasOwnProperty.call(message, "y"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
        return writer;
    };

    /**
     * Encodes the specified Vector2 message, length delimited. Does not implicitly {@link Vector2.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Vector2
     * @static
     * @param {IVector2} message Vector2 message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Vector2.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Vector2 message from the specified reader or buffer.
     * @function decode
     * @memberof Vector2
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Vector2} Vector2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector2.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vector2();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.x = reader.float();
                    break;
                }
            case 2: {
                    message.y = reader.float();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Vector2 message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Vector2
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Vector2} Vector2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Vector2.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Vector2 message.
     * @function verify
     * @memberof Vector2
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Vector2.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (typeof message.x !== "number")
                return "x: number expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (typeof message.y !== "number")
                return "y: number expected";
        return null;
    };

    /**
     * Creates a Vector2 message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Vector2
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Vector2} Vector2
     */
    Vector2.fromObject = function fromObject(object) {
        if (object instanceof $root.Vector2)
            return object;
        var message = new $root.Vector2();
        if (object.x != null)
            message.x = Number(object.x);
        if (object.y != null)
            message.y = Number(object.y);
        return message;
    };

    /**
     * Creates a plain object from a Vector2 message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Vector2
     * @static
     * @param {Vector2} message Vector2
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Vector2.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
        return object;
    };

    /**
     * Converts this Vector2 to JSON.
     * @function toJSON
     * @memberof Vector2
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Vector2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Vector2
     * @function getTypeUrl
     * @memberof Vector2
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Vector2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Vector2";
    };

    return Vector2;
})();

$root.Body = (function() {

    /**
     * Properties of a Body.
     * @exports IBody
     * @interface IBody
     * @property {number|null} [id] Body id
     * @property {string|null} [label] Body label
     * @property {IVector2|null} [position] Body position
     * @property {number|null} [angle] Body angle
     * @property {IVector2|null} [velocity] Body velocity
     * @property {number|null} [angularVelocity] Body angularVelocity
     * @property {boolean|null} [isStatic] Body isStatic
     * @property {boolean|null} [isSleeping] Body isSleeping
     */

    /**
     * Constructs a new Body.
     * @exports Body
     * @classdesc Represents a Body.
     * @implements IBody
     * @constructor
     * @param {IBody=} [properties] Properties to set
     */
    function Body(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Body id.
     * @member {number} id
     * @memberof Body
     * @instance
     */
    Body.prototype.id = 0;

    /**
     * Body label.
     * @member {string} label
     * @memberof Body
     * @instance
     */
    Body.prototype.label = "";

    /**
     * Body position.
     * @member {IVector2|null|undefined} position
     * @memberof Body
     * @instance
     */
    Body.prototype.position = null;

    /**
     * Body angle.
     * @member {number} angle
     * @memberof Body
     * @instance
     */
    Body.prototype.angle = 0;

    /**
     * Body velocity.
     * @member {IVector2|null|undefined} velocity
     * @memberof Body
     * @instance
     */
    Body.prototype.velocity = null;

    /**
     * Body angularVelocity.
     * @member {number} angularVelocity
     * @memberof Body
     * @instance
     */
    Body.prototype.angularVelocity = 0;

    /**
     * Body isStatic.
     * @member {boolean} isStatic
     * @memberof Body
     * @instance
     */
    Body.prototype.isStatic = false;

    /**
     * Body isSleeping.
     * @member {boolean} isSleeping
     * @memberof Body
     * @instance
     */
    Body.prototype.isSleeping = false;

    /**
     * Creates a new Body instance using the specified properties.
     * @function create
     * @memberof Body
     * @static
     * @param {IBody=} [properties] Properties to set
     * @returns {Body} Body instance
     */
    Body.create = function create(properties) {
        return new Body(properties);
    };

    /**
     * Encodes the specified Body message. Does not implicitly {@link Body.verify|verify} messages.
     * @function encode
     * @memberof Body
     * @static
     * @param {IBody} message Body message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Body.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        if (message.label != null && Object.hasOwnProperty.call(message, "label"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.label);
        if (message.position != null && Object.hasOwnProperty.call(message, "position"))
            $root.Vector2.encode(message.position, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.angle != null && Object.hasOwnProperty.call(message, "angle"))
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.angle);
        if (message.velocity != null && Object.hasOwnProperty.call(message, "velocity"))
            $root.Vector2.encode(message.velocity, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.angularVelocity != null && Object.hasOwnProperty.call(message, "angularVelocity"))
            writer.uint32(/* id 6, wireType 5 =*/53).float(message.angularVelocity);
        if (message.isStatic != null && Object.hasOwnProperty.call(message, "isStatic"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isStatic);
        if (message.isSleeping != null && Object.hasOwnProperty.call(message, "isSleeping"))
            writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isSleeping);
        return writer;
    };

    /**
     * Encodes the specified Body message, length delimited. Does not implicitly {@link Body.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Body
     * @static
     * @param {IBody} message Body message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Body.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Body message from the specified reader or buffer.
     * @function decode
     * @memberof Body
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Body} Body
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Body.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Body();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.uint32();
                    break;
                }
            case 2: {
                    message.label = reader.string();
                    break;
                }
            case 3: {
                    message.position = $root.Vector2.decode(reader, reader.uint32());
                    break;
                }
            case 4: {
                    message.angle = reader.float();
                    break;
                }
            case 5: {
                    message.velocity = $root.Vector2.decode(reader, reader.uint32());
                    break;
                }
            case 6: {
                    message.angularVelocity = reader.float();
                    break;
                }
            case 7: {
                    message.isStatic = reader.bool();
                    break;
                }
            case 8: {
                    message.isSleeping = reader.bool();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Body message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Body
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Body} Body
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Body.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Body message.
     * @function verify
     * @memberof Body
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Body.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.label != null && message.hasOwnProperty("label"))
            if (!$util.isString(message.label))
                return "label: string expected";
        if (message.position != null && message.hasOwnProperty("position")) {
            var error = $root.Vector2.verify(message.position);
            if (error)
                return "position." + error;
        }
        if (message.angle != null && message.hasOwnProperty("angle"))
            if (typeof message.angle !== "number")
                return "angle: number expected";
        if (message.velocity != null && message.hasOwnProperty("velocity")) {
            var error = $root.Vector2.verify(message.velocity);
            if (error)
                return "velocity." + error;
        }
        if (message.angularVelocity != null && message.hasOwnProperty("angularVelocity"))
            if (typeof message.angularVelocity !== "number")
                return "angularVelocity: number expected";
        if (message.isStatic != null && message.hasOwnProperty("isStatic"))
            if (typeof message.isStatic !== "boolean")
                return "isStatic: boolean expected";
        if (message.isSleeping != null && message.hasOwnProperty("isSleeping"))
            if (typeof message.isSleeping !== "boolean")
                return "isSleeping: boolean expected";
        return null;
    };

    /**
     * Creates a Body message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Body
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Body} Body
     */
    Body.fromObject = function fromObject(object) {
        if (object instanceof $root.Body)
            return object;
        var message = new $root.Body();
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.label != null)
            message.label = String(object.label);
        if (object.position != null) {
            if (typeof object.position !== "object")
                throw TypeError(".Body.position: object expected");
            message.position = $root.Vector2.fromObject(object.position);
        }
        if (object.angle != null)
            message.angle = Number(object.angle);
        if (object.velocity != null) {
            if (typeof object.velocity !== "object")
                throw TypeError(".Body.velocity: object expected");
            message.velocity = $root.Vector2.fromObject(object.velocity);
        }
        if (object.angularVelocity != null)
            message.angularVelocity = Number(object.angularVelocity);
        if (object.isStatic != null)
            message.isStatic = Boolean(object.isStatic);
        if (object.isSleeping != null)
            message.isSleeping = Boolean(object.isSleeping);
        return message;
    };

    /**
     * Creates a plain object from a Body message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Body
     * @static
     * @param {Body} message Body
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Body.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = 0;
            object.label = "";
            object.position = null;
            object.angle = 0;
            object.velocity = null;
            object.angularVelocity = 0;
            object.isStatic = false;
            object.isSleeping = false;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.label != null && message.hasOwnProperty("label"))
            object.label = message.label;
        if (message.position != null && message.hasOwnProperty("position"))
            object.position = $root.Vector2.toObject(message.position, options);
        if (message.angle != null && message.hasOwnProperty("angle"))
            object.angle = options.json && !isFinite(message.angle) ? String(message.angle) : message.angle;
        if (message.velocity != null && message.hasOwnProperty("velocity"))
            object.velocity = $root.Vector2.toObject(message.velocity, options);
        if (message.angularVelocity != null && message.hasOwnProperty("angularVelocity"))
            object.angularVelocity = options.json && !isFinite(message.angularVelocity) ? String(message.angularVelocity) : message.angularVelocity;
        if (message.isStatic != null && message.hasOwnProperty("isStatic"))
            object.isStatic = message.isStatic;
        if (message.isSleeping != null && message.hasOwnProperty("isSleeping"))
            object.isSleeping = message.isSleeping;
        return object;
    };

    /**
     * Converts this Body to JSON.
     * @function toJSON
     * @memberof Body
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Body.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Body
     * @function getTypeUrl
     * @memberof Body
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Body.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Body";
    };

    return Body;
})();

$root.Constraint = (function() {

    /**
     * Properties of a Constraint.
     * @exports IConstraint
     * @interface IConstraint
     * @property {number|null} [id] Constraint id
     * @property {string|null} [label] Constraint label
     * @property {number|null} [bodyA] Constraint bodyA
     * @property {number|null} [bodyB] Constraint bodyB
     * @property {IVector2|null} [pointA] Constraint pointA
     * @property {IVector2|null} [pointB] Constraint pointB
     * @property {number|null} [length] Constraint length
     * @property {number|null} [stiffness] Constraint stiffness
     */

    /**
     * Constructs a new Constraint.
     * @exports Constraint
     * @classdesc Represents a Constraint.
     * @implements IConstraint
     * @constructor
     * @param {IConstraint=} [properties] Properties to set
     */
    function Constraint(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Constraint id.
     * @member {number} id
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.id = 0;

    /**
     * Constraint label.
     * @member {string} label
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.label = "";

    /**
     * Constraint bodyA.
     * @member {number} bodyA
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.bodyA = 0;

    /**
     * Constraint bodyB.
     * @member {number} bodyB
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.bodyB = 0;

    /**
     * Constraint pointA.
     * @member {IVector2|null|undefined} pointA
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.pointA = null;

    /**
     * Constraint pointB.
     * @member {IVector2|null|undefined} pointB
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.pointB = null;

    /**
     * Constraint length.
     * @member {number} length
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.length = 0;

    /**
     * Constraint stiffness.
     * @member {number} stiffness
     * @memberof Constraint
     * @instance
     */
    Constraint.prototype.stiffness = 0;

    /**
     * Creates a new Constraint instance using the specified properties.
     * @function create
     * @memberof Constraint
     * @static
     * @param {IConstraint=} [properties] Properties to set
     * @returns {Constraint} Constraint instance
     */
    Constraint.create = function create(properties) {
        return new Constraint(properties);
    };

    /**
     * Encodes the specified Constraint message. Does not implicitly {@link Constraint.verify|verify} messages.
     * @function encode
     * @memberof Constraint
     * @static
     * @param {IConstraint} message Constraint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Constraint.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        if (message.label != null && Object.hasOwnProperty.call(message, "label"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.label);
        if (message.bodyA != null && Object.hasOwnProperty.call(message, "bodyA"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.bodyA);
        if (message.bodyB != null && Object.hasOwnProperty.call(message, "bodyB"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.bodyB);
        if (message.pointA != null && Object.hasOwnProperty.call(message, "pointA"))
            $root.Vector2.encode(message.pointA, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.pointB != null && Object.hasOwnProperty.call(message, "pointB"))
            $root.Vector2.encode(message.pointB, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.length != null && Object.hasOwnProperty.call(message, "length"))
            writer.uint32(/* id 7, wireType 5 =*/61).float(message.length);
        if (message.stiffness != null && Object.hasOwnProperty.call(message, "stiffness"))
            writer.uint32(/* id 8, wireType 5 =*/69).float(message.stiffness);
        return writer;
    };

    /**
     * Encodes the specified Constraint message, length delimited. Does not implicitly {@link Constraint.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Constraint
     * @static
     * @param {IConstraint} message Constraint message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Constraint.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Constraint message from the specified reader or buffer.
     * @function decode
     * @memberof Constraint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Constraint} Constraint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Constraint.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Constraint();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.id = reader.uint32();
                    break;
                }
            case 2: {
                    message.label = reader.string();
                    break;
                }
            case 3: {
                    message.bodyA = reader.uint32();
                    break;
                }
            case 4: {
                    message.bodyB = reader.uint32();
                    break;
                }
            case 5: {
                    message.pointA = $root.Vector2.decode(reader, reader.uint32());
                    break;
                }
            case 6: {
                    message.pointB = $root.Vector2.decode(reader, reader.uint32());
                    break;
                }
            case 7: {
                    message.length = reader.float();
                    break;
                }
            case 8: {
                    message.stiffness = reader.float();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Constraint message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Constraint
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Constraint} Constraint
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Constraint.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Constraint message.
     * @function verify
     * @memberof Constraint
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Constraint.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.label != null && message.hasOwnProperty("label"))
            if (!$util.isString(message.label))
                return "label: string expected";
        if (message.bodyA != null && message.hasOwnProperty("bodyA"))
            if (!$util.isInteger(message.bodyA))
                return "bodyA: integer expected";
        if (message.bodyB != null && message.hasOwnProperty("bodyB"))
            if (!$util.isInteger(message.bodyB))
                return "bodyB: integer expected";
        if (message.pointA != null && message.hasOwnProperty("pointA")) {
            var error = $root.Vector2.verify(message.pointA);
            if (error)
                return "pointA." + error;
        }
        if (message.pointB != null && message.hasOwnProperty("pointB")) {
            var error = $root.Vector2.verify(message.pointB);
            if (error)
                return "pointB." + error;
        }
        if (message.length != null && message.hasOwnProperty("length"))
            if (typeof message.length !== "number")
                return "length: number expected";
        if (message.stiffness != null && message.hasOwnProperty("stiffness"))
            if (typeof message.stiffness !== "number")
                return "stiffness: number expected";
        return null;
    };

    /**
     * Creates a Constraint message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Constraint
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Constraint} Constraint
     */
    Constraint.fromObject = function fromObject(object) {
        if (object instanceof $root.Constraint)
            return object;
        var message = new $root.Constraint();
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.label != null)
            message.label = String(object.label);
        if (object.bodyA != null)
            message.bodyA = object.bodyA >>> 0;
        if (object.bodyB != null)
            message.bodyB = object.bodyB >>> 0;
        if (object.pointA != null) {
            if (typeof object.pointA !== "object")
                throw TypeError(".Constraint.pointA: object expected");
            message.pointA = $root.Vector2.fromObject(object.pointA);
        }
        if (object.pointB != null) {
            if (typeof object.pointB !== "object")
                throw TypeError(".Constraint.pointB: object expected");
            message.pointB = $root.Vector2.fromObject(object.pointB);
        }
        if (object.length != null)
            message.length = Number(object.length);
        if (object.stiffness != null)
            message.stiffness = Number(object.stiffness);
        return message;
    };

    /**
     * Creates a plain object from a Constraint message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Constraint
     * @static
     * @param {Constraint} message Constraint
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Constraint.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = 0;
            object.label = "";
            object.bodyA = 0;
            object.bodyB = 0;
            object.pointA = null;
            object.pointB = null;
            object.length = 0;
            object.stiffness = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.label != null && message.hasOwnProperty("label"))
            object.label = message.label;
        if (message.bodyA != null && message.hasOwnProperty("bodyA"))
            object.bodyA = message.bodyA;
        if (message.bodyB != null && message.hasOwnProperty("bodyB"))
            object.bodyB = message.bodyB;
        if (message.pointA != null && message.hasOwnProperty("pointA"))
            object.pointA = $root.Vector2.toObject(message.pointA, options);
        if (message.pointB != null && message.hasOwnProperty("pointB"))
            object.pointB = $root.Vector2.toObject(message.pointB, options);
        if (message.length != null && message.hasOwnProperty("length"))
            object.length = options.json && !isFinite(message.length) ? String(message.length) : message.length;
        if (message.stiffness != null && message.hasOwnProperty("stiffness"))
            object.stiffness = options.json && !isFinite(message.stiffness) ? String(message.stiffness) : message.stiffness;
        return object;
    };

    /**
     * Converts this Constraint to JSON.
     * @function toJSON
     * @memberof Constraint
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Constraint.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Constraint
     * @function getTypeUrl
     * @memberof Constraint
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Constraint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Constraint";
    };

    return Constraint;
})();

$root.WorldUpdate = (function() {

    /**
     * Properties of a WorldUpdate.
     * @exports IWorldUpdate
     * @interface IWorldUpdate
     * @property {Array.<IBody>|null} [bodies] WorldUpdate bodies
     * @property {Array.<IConstraint>|null} [constraints] WorldUpdate constraints
     */

    /**
     * Constructs a new WorldUpdate.
     * @exports WorldUpdate
     * @classdesc Represents a WorldUpdate.
     * @implements IWorldUpdate
     * @constructor
     * @param {IWorldUpdate=} [properties] Properties to set
     */
    function WorldUpdate(properties) {
        this.bodies = [];
        this.constraints = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WorldUpdate bodies.
     * @member {Array.<IBody>} bodies
     * @memberof WorldUpdate
     * @instance
     */
    WorldUpdate.prototype.bodies = $util.emptyArray;

    /**
     * WorldUpdate constraints.
     * @member {Array.<IConstraint>} constraints
     * @memberof WorldUpdate
     * @instance
     */
    WorldUpdate.prototype.constraints = $util.emptyArray;

    /**
     * Creates a new WorldUpdate instance using the specified properties.
     * @function create
     * @memberof WorldUpdate
     * @static
     * @param {IWorldUpdate=} [properties] Properties to set
     * @returns {WorldUpdate} WorldUpdate instance
     */
    WorldUpdate.create = function create(properties) {
        return new WorldUpdate(properties);
    };

    /**
     * Encodes the specified WorldUpdate message. Does not implicitly {@link WorldUpdate.verify|verify} messages.
     * @function encode
     * @memberof WorldUpdate
     * @static
     * @param {IWorldUpdate} message WorldUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WorldUpdate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.bodies != null && message.bodies.length)
            for (var i = 0; i < message.bodies.length; ++i)
                $root.Body.encode(message.bodies[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.constraints != null && message.constraints.length)
            for (var i = 0; i < message.constraints.length; ++i)
                $root.Constraint.encode(message.constraints[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified WorldUpdate message, length delimited. Does not implicitly {@link WorldUpdate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WorldUpdate
     * @static
     * @param {IWorldUpdate} message WorldUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WorldUpdate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WorldUpdate message from the specified reader or buffer.
     * @function decode
     * @memberof WorldUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WorldUpdate} WorldUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WorldUpdate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WorldUpdate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.bodies && message.bodies.length))
                        message.bodies = [];
                    message.bodies.push($root.Body.decode(reader, reader.uint32()));
                    break;
                }
            case 2: {
                    if (!(message.constraints && message.constraints.length))
                        message.constraints = [];
                    message.constraints.push($root.Constraint.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WorldUpdate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WorldUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WorldUpdate} WorldUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WorldUpdate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WorldUpdate message.
     * @function verify
     * @memberof WorldUpdate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WorldUpdate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.bodies != null && message.hasOwnProperty("bodies")) {
            if (!Array.isArray(message.bodies))
                return "bodies: array expected";
            for (var i = 0; i < message.bodies.length; ++i) {
                var error = $root.Body.verify(message.bodies[i]);
                if (error)
                    return "bodies." + error;
            }
        }
        if (message.constraints != null && message.hasOwnProperty("constraints")) {
            if (!Array.isArray(message.constraints))
                return "constraints: array expected";
            for (var i = 0; i < message.constraints.length; ++i) {
                var error = $root.Constraint.verify(message.constraints[i]);
                if (error)
                    return "constraints." + error;
            }
        }
        return null;
    };

    /**
     * Creates a WorldUpdate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WorldUpdate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WorldUpdate} WorldUpdate
     */
    WorldUpdate.fromObject = function fromObject(object) {
        if (object instanceof $root.WorldUpdate)
            return object;
        var message = new $root.WorldUpdate();
        if (object.bodies) {
            if (!Array.isArray(object.bodies))
                throw TypeError(".WorldUpdate.bodies: array expected");
            message.bodies = [];
            for (var i = 0; i < object.bodies.length; ++i) {
                if (typeof object.bodies[i] !== "object")
                    throw TypeError(".WorldUpdate.bodies: object expected");
                message.bodies[i] = $root.Body.fromObject(object.bodies[i]);
            }
        }
        if (object.constraints) {
            if (!Array.isArray(object.constraints))
                throw TypeError(".WorldUpdate.constraints: array expected");
            message.constraints = [];
            for (var i = 0; i < object.constraints.length; ++i) {
                if (typeof object.constraints[i] !== "object")
                    throw TypeError(".WorldUpdate.constraints: object expected");
                message.constraints[i] = $root.Constraint.fromObject(object.constraints[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a WorldUpdate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WorldUpdate
     * @static
     * @param {WorldUpdate} message WorldUpdate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WorldUpdate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.bodies = [];
            object.constraints = [];
        }
        if (message.bodies && message.bodies.length) {
            object.bodies = [];
            for (var j = 0; j < message.bodies.length; ++j)
                object.bodies[j] = $root.Body.toObject(message.bodies[j], options);
        }
        if (message.constraints && message.constraints.length) {
            object.constraints = [];
            for (var j = 0; j < message.constraints.length; ++j)
                object.constraints[j] = $root.Constraint.toObject(message.constraints[j], options);
        }
        return object;
    };

    /**
     * Converts this WorldUpdate to JSON.
     * @function toJSON
     * @memberof WorldUpdate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WorldUpdate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for WorldUpdate
     * @function getTypeUrl
     * @memberof WorldUpdate
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    WorldUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/WorldUpdate";
    };

    return WorldUpdate;
})();

module.exports = $root;
