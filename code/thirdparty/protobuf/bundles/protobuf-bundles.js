var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.game = (function() {

    /**
     * Namespace game.
     * @exports game
     * @namespace
     */
    var game = {};

    /**
     * E_ErrorCode enum.
     * @name game.E_ErrorCode
     * @enum {string}
     * @property {number} NO_ERROR=0 NO_ERROR value
     * @property {number} LOGIN_ON_OTHER_DEVICE=1 LOGIN_ON_OTHER_DEVICE value
     */
    game.E_ErrorCode = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_ERROR"] = 0;
        values[valuesById[1] = "LOGIN_ON_OTHER_DEVICE"] = 1;
        return values;
    })();

    game.GameLoginReq = (function() {

        /**
         * Properties of a GameLoginReq.
         * @memberof game
         * @interface IGameLoginReq
         * @property {string} token GameLoginReq token
         * @property {string} openId GameLoginReq openId
         */

        /**
         * Constructs a new GameLoginReq.
         * @memberof game
         * @classdesc Represents a GameLoginReq.
         * @implements IGameLoginReq
         * @constructor
         * @param {game.IGameLoginReq=} [properties] Properties to set
         */
        function GameLoginReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameLoginReq token.
         * @member {string} token
         * @memberof game.GameLoginReq
         * @instance
         */
        GameLoginReq.prototype.token = "";

        /**
         * GameLoginReq openId.
         * @member {string} openId
         * @memberof game.GameLoginReq
         * @instance
         */
        GameLoginReq.prototype.openId = "";

        /**
         * Creates a new GameLoginReq instance using the specified properties.
         * @function create
         * @memberof game.GameLoginReq
         * @static
         * @param {game.IGameLoginReq=} [properties] Properties to set
         * @returns {game.GameLoginReq} GameLoginReq instance
         */
        GameLoginReq.create = function create(properties) {
            return new GameLoginReq(properties);
        };

        /**
         * Encodes the specified GameLoginReq message. Does not implicitly {@link game.GameLoginReq.verify|verify} messages.
         * @function encode
         * @memberof game.GameLoginReq
         * @static
         * @param {game.IGameLoginReq} message GameLoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameLoginReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.openId);
            return writer;
        };

        /**
         * Encodes the specified GameLoginReq message, length delimited. Does not implicitly {@link game.GameLoginReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.GameLoginReq
         * @static
         * @param {game.IGameLoginReq} message GameLoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameLoginReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameLoginReq message from the specified reader or buffer.
         * @function decode
         * @memberof game.GameLoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.GameLoginReq} GameLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameLoginReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.GameLoginReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.openId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("token"))
                throw $util.ProtocolError("missing required 'token'", { instance: message });
            if (!message.hasOwnProperty("openId"))
                throw $util.ProtocolError("missing required 'openId'", { instance: message });
            return message;
        };

        /**
         * Decodes a GameLoginReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.GameLoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.GameLoginReq} GameLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameLoginReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameLoginReq message.
         * @function verify
         * @memberof game.GameLoginReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameLoginReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.token))
                return "token: string expected";
            if (!$util.isString(message.openId))
                return "openId: string expected";
            return null;
        };

        /**
         * Creates a GameLoginReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.GameLoginReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.GameLoginReq} GameLoginReq
         */
        GameLoginReq.fromObject = function fromObject(object) {
            if (object instanceof $root.game.GameLoginReq)
                return object;
            var message = new $root.game.GameLoginReq();
            if (object.token != null)
                message.token = String(object.token);
            if (object.openId != null)
                message.openId = String(object.openId);
            return message;
        };

        /**
         * Creates a plain object from a GameLoginReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.GameLoginReq
         * @static
         * @param {game.GameLoginReq} message GameLoginReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameLoginReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.token = "";
                object.openId = "";
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.openId != null && message.hasOwnProperty("openId"))
                object.openId = message.openId;
            return object;
        };

        /**
         * Converts this GameLoginReq to JSON.
         * @function toJSON
         * @memberof game.GameLoginReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameLoginReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameLoginReq;
    })();

    game.GameLoginResp = (function() {

        /**
         * Properties of a GameLoginResp.
         * @memberof game
         * @interface IGameLoginResp
         * @property {game.IG_Player} player GameLoginResp player
         * @property {number} gold GameLoginResp gold
         * @property {number} volume GameLoginResp volume
         * @property {number} diamonds GameLoginResp diamonds
         * @property {number|Long} time GameLoginResp time
         * @property {number} checkCode GameLoginResp checkCode
         */

        /**
         * Constructs a new GameLoginResp.
         * @memberof game
         * @classdesc Represents a GameLoginResp.
         * @implements IGameLoginResp
         * @constructor
         * @param {game.IGameLoginResp=} [properties] Properties to set
         */
        function GameLoginResp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameLoginResp player.
         * @member {game.IG_Player} player
         * @memberof game.GameLoginResp
         * @instance
         */
        GameLoginResp.prototype.player = null;

        /**
         * GameLoginResp gold.
         * @member {number} gold
         * @memberof game.GameLoginResp
         * @instance
         */
        GameLoginResp.prototype.gold = 0;

        /**
         * GameLoginResp volume.
         * @member {number} volume
         * @memberof game.GameLoginResp
         * @instance
         */
        GameLoginResp.prototype.volume = 0;

        /**
         * GameLoginResp diamonds.
         * @member {number} diamonds
         * @memberof game.GameLoginResp
         * @instance
         */
        GameLoginResp.prototype.diamonds = 0;

        /**
         * GameLoginResp time.
         * @member {number|Long} time
         * @memberof game.GameLoginResp
         * @instance
         */
        GameLoginResp.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GameLoginResp checkCode.
         * @member {number} checkCode
         * @memberof game.GameLoginResp
         * @instance
         */
        GameLoginResp.prototype.checkCode = 0;

        /**
         * Creates a new GameLoginResp instance using the specified properties.
         * @function create
         * @memberof game.GameLoginResp
         * @static
         * @param {game.IGameLoginResp=} [properties] Properties to set
         * @returns {game.GameLoginResp} GameLoginResp instance
         */
        GameLoginResp.create = function create(properties) {
            return new GameLoginResp(properties);
        };

        /**
         * Encodes the specified GameLoginResp message. Does not implicitly {@link game.GameLoginResp.verify|verify} messages.
         * @function encode
         * @memberof game.GameLoginResp
         * @static
         * @param {game.IGameLoginResp} message GameLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameLoginResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.game.G_Player.encode(message.player, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gold);
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.volume);
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.diamonds);
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.time);
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.checkCode);
            return writer;
        };

        /**
         * Encodes the specified GameLoginResp message, length delimited. Does not implicitly {@link game.GameLoginResp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.GameLoginResp
         * @static
         * @param {game.IGameLoginResp} message GameLoginResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameLoginResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameLoginResp message from the specified reader or buffer.
         * @function decode
         * @memberof game.GameLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.GameLoginResp} GameLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameLoginResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.GameLoginResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.player = $root.game.G_Player.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.gold = reader.int32();
                    break;
                case 3:
                    message.volume = reader.int32();
                    break;
                case 4:
                    message.diamonds = reader.int32();
                    break;
                case 5:
                    message.time = reader.int64();
                    break;
                case 6:
                    message.checkCode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("player"))
                throw $util.ProtocolError("missing required 'player'", { instance: message });
            if (!message.hasOwnProperty("gold"))
                throw $util.ProtocolError("missing required 'gold'", { instance: message });
            if (!message.hasOwnProperty("volume"))
                throw $util.ProtocolError("missing required 'volume'", { instance: message });
            if (!message.hasOwnProperty("diamonds"))
                throw $util.ProtocolError("missing required 'diamonds'", { instance: message });
            if (!message.hasOwnProperty("time"))
                throw $util.ProtocolError("missing required 'time'", { instance: message });
            if (!message.hasOwnProperty("checkCode"))
                throw $util.ProtocolError("missing required 'checkCode'", { instance: message });
            return message;
        };

        /**
         * Decodes a GameLoginResp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.GameLoginResp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.GameLoginResp} GameLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameLoginResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameLoginResp message.
         * @function verify
         * @memberof game.GameLoginResp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameLoginResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            {
                var error = $root.game.G_Player.verify(message.player);
                if (error)
                    return "player." + error;
            }
            if (!$util.isInteger(message.gold))
                return "gold: integer expected";
            if (!$util.isInteger(message.volume))
                return "volume: integer expected";
            if (!$util.isInteger(message.diamonds))
                return "diamonds: integer expected";
            if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                return "time: integer|Long expected";
            if (!$util.isInteger(message.checkCode))
                return "checkCode: integer expected";
            return null;
        };

        /**
         * Creates a GameLoginResp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.GameLoginResp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.GameLoginResp} GameLoginResp
         */
        GameLoginResp.fromObject = function fromObject(object) {
            if (object instanceof $root.game.GameLoginResp)
                return object;
            var message = new $root.game.GameLoginResp();
            if (object.player != null) {
                if (typeof object.player !== "object")
                    throw TypeError(".game.GameLoginResp.player: object expected");
                message.player = $root.game.G_Player.fromObject(object.player);
            }
            if (object.gold != null)
                message.gold = object.gold | 0;
            if (object.volume != null)
                message.volume = object.volume | 0;
            if (object.diamonds != null)
                message.diamonds = object.diamonds | 0;
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            if (object.checkCode != null)
                message.checkCode = object.checkCode | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameLoginResp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.GameLoginResp
         * @static
         * @param {game.GameLoginResp} message GameLoginResp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameLoginResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.player = null;
                object.gold = 0;
                object.volume = 0;
                object.diamonds = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
                object.checkCode = 0;
            }
            if (message.player != null && message.hasOwnProperty("player"))
                object.player = $root.game.G_Player.toObject(message.player, options);
            if (message.gold != null && message.hasOwnProperty("gold"))
                object.gold = message.gold;
            if (message.volume != null && message.hasOwnProperty("volume"))
                object.volume = message.volume;
            if (message.diamonds != null && message.hasOwnProperty("diamonds"))
                object.diamonds = message.diamonds;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            if (message.checkCode != null && message.hasOwnProperty("checkCode"))
                object.checkCode = message.checkCode;
            return object;
        };

        /**
         * Converts this GameLoginResp to JSON.
         * @function toJSON
         * @memberof game.GameLoginResp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameLoginResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameLoginResp;
    })();

    game.G_Player = (function() {

        /**
         * Properties of a G_Player.
         * @memberof game
         * @interface IG_Player
         * @property {number|Long} id G_Player id
         * @property {string} account G_Player account
         * @property {string} nickname G_Player nickname
         * @property {number} level G_Player level
         * @property {number} exp G_Player exp
         * @property {number} vipLv G_Player vipLv
         */

        /**
         * Constructs a new G_Player.
         * @memberof game
         * @classdesc Represents a G_Player.
         * @implements IG_Player
         * @constructor
         * @param {game.IG_Player=} [properties] Properties to set
         */
        function G_Player(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * G_Player id.
         * @member {number|Long} id
         * @memberof game.G_Player
         * @instance
         */
        G_Player.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * G_Player account.
         * @member {string} account
         * @memberof game.G_Player
         * @instance
         */
        G_Player.prototype.account = "";

        /**
         * G_Player nickname.
         * @member {string} nickname
         * @memberof game.G_Player
         * @instance
         */
        G_Player.prototype.nickname = "";

        /**
         * G_Player level.
         * @member {number} level
         * @memberof game.G_Player
         * @instance
         */
        G_Player.prototype.level = 0;

        /**
         * G_Player exp.
         * @member {number} exp
         * @memberof game.G_Player
         * @instance
         */
        G_Player.prototype.exp = 0;

        /**
         * G_Player vipLv.
         * @member {number} vipLv
         * @memberof game.G_Player
         * @instance
         */
        G_Player.prototype.vipLv = 0;

        /**
         * Creates a new G_Player instance using the specified properties.
         * @function create
         * @memberof game.G_Player
         * @static
         * @param {game.IG_Player=} [properties] Properties to set
         * @returns {game.G_Player} G_Player instance
         */
        G_Player.create = function create(properties) {
            return new G_Player(properties);
        };

        /**
         * Encodes the specified G_Player message. Does not implicitly {@link game.G_Player.verify|verify} messages.
         * @function encode
         * @memberof game.G_Player
         * @static
         * @param {game.IG_Player} message G_Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G_Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.account);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.level);
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.exp);
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.vipLv);
            return writer;
        };

        /**
         * Encodes the specified G_Player message, length delimited. Does not implicitly {@link game.G_Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game.G_Player
         * @static
         * @param {game.IG_Player} message G_Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        G_Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a G_Player message from the specified reader or buffer.
         * @function decode
         * @memberof game.G_Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game.G_Player} G_Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G_Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.G_Player();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int64();
                    break;
                case 2:
                    message.account = reader.string();
                    break;
                case 3:
                    message.nickname = reader.string();
                    break;
                case 4:
                    message.level = reader.int32();
                    break;
                case 5:
                    message.exp = reader.int32();
                    break;
                case 6:
                    message.vipLv = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("account"))
                throw $util.ProtocolError("missing required 'account'", { instance: message });
            if (!message.hasOwnProperty("nickname"))
                throw $util.ProtocolError("missing required 'nickname'", { instance: message });
            if (!message.hasOwnProperty("level"))
                throw $util.ProtocolError("missing required 'level'", { instance: message });
            if (!message.hasOwnProperty("exp"))
                throw $util.ProtocolError("missing required 'exp'", { instance: message });
            if (!message.hasOwnProperty("vipLv"))
                throw $util.ProtocolError("missing required 'vipLv'", { instance: message });
            return message;
        };

        /**
         * Decodes a G_Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game.G_Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game.G_Player} G_Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        G_Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a G_Player message.
         * @function verify
         * @memberof game.G_Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        G_Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
            if (!$util.isString(message.account))
                return "account: string expected";
            if (!$util.isString(message.nickname))
                return "nickname: string expected";
            if (!$util.isInteger(message.level))
                return "level: integer expected";
            if (!$util.isInteger(message.exp))
                return "exp: integer expected";
            if (!$util.isInteger(message.vipLv))
                return "vipLv: integer expected";
            return null;
        };

        /**
         * Creates a G_Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game.G_Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game.G_Player} G_Player
         */
        G_Player.fromObject = function fromObject(object) {
            if (object instanceof $root.game.G_Player)
                return object;
            var message = new $root.game.G_Player();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            if (object.account != null)
                message.account = String(object.account);
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.level != null)
                message.level = object.level | 0;
            if (object.exp != null)
                message.exp = object.exp | 0;
            if (object.vipLv != null)
                message.vipLv = object.vipLv | 0;
            return message;
        };

        /**
         * Creates a plain object from a G_Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game.G_Player
         * @static
         * @param {game.G_Player} message G_Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        G_Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                object.account = "";
                object.nickname = "";
                object.level = 0;
                object.exp = 0;
                object.vipLv = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            if (message.exp != null && message.hasOwnProperty("exp"))
                object.exp = message.exp;
            if (message.vipLv != null && message.hasOwnProperty("vipLv"))
                object.vipLv = message.vipLv;
            return object;
        };

        /**
         * Converts this G_Player to JSON.
         * @function toJSON
         * @memberof game.G_Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        G_Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return G_Player;
    })();

    return game;
})();