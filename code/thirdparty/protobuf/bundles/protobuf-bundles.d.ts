type Long = protobuf.Long;

/** Namespace game. */
declare namespace game {

    /** E_ErrorCode enum. */
    enum E_ErrorCode {
        NO_ERROR = 0,
        LOGIN_ON_OTHER_DEVICE = 1
    }

    /** Properties of a GameLoginReq. */
    interface IGameLoginReq {

        /** GameLoginReq token */
        token: string;

        /** GameLoginReq open_id */
        open_id: string;
    }

    /** Represents a GameLoginReq. */
    class GameLoginReq implements IGameLoginReq {

        /**
         * Constructs a new GameLoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IGameLoginReq);

        /** GameLoginReq token. */
        public token: string;

        /** GameLoginReq open_id. */
        public open_id: string;

        /**
         * Creates a new GameLoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameLoginReq instance
         */
        public static create(properties?: game.IGameLoginReq): game.GameLoginReq;

        /**
         * Encodes the specified GameLoginReq message. Does not implicitly {@link game.GameLoginReq.verify|verify} messages.
         * @param message GameLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IGameLoginReq, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GameLoginReq message, length delimited. Does not implicitly {@link game.GameLoginReq.verify|verify} messages.
         * @param message GameLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IGameLoginReq, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GameLoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): game.GameLoginReq;

        /**
         * Decodes a GameLoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): game.GameLoginReq;

        /**
         * Verifies a GameLoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a GameLoginResp. */
    interface IGameLoginResp {

        /** GameLoginResp player */
        player: game.IG_Player;

        /** GameLoginResp gold */
        gold: number;

        /** GameLoginResp volume */
        volume: number;

        /** GameLoginResp diamonds */
        diamonds: number;

        /** GameLoginResp time */
        time: (number|Long);

        /** GameLoginResp checkCode */
        checkCode: number;
    }

    /** Represents a GameLoginResp. */
    class GameLoginResp implements IGameLoginResp {

        /**
         * Constructs a new GameLoginResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IGameLoginResp);

        /** GameLoginResp player. */
        public player: game.IG_Player;

        /** GameLoginResp gold. */
        public gold: number;

        /** GameLoginResp volume. */
        public volume: number;

        /** GameLoginResp diamonds. */
        public diamonds: number;

        /** GameLoginResp time. */
        public time: (number|Long);

        /** GameLoginResp checkCode. */
        public checkCode: number;

        /**
         * Creates a new GameLoginResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameLoginResp instance
         */
        public static create(properties?: game.IGameLoginResp): game.GameLoginResp;

        /**
         * Encodes the specified GameLoginResp message. Does not implicitly {@link game.GameLoginResp.verify|verify} messages.
         * @param message GameLoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IGameLoginResp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GameLoginResp message, length delimited. Does not implicitly {@link game.GameLoginResp.verify|verify} messages.
         * @param message GameLoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IGameLoginResp, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GameLoginResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): game.GameLoginResp;

        /**
         * Decodes a GameLoginResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): game.GameLoginResp;

        /**
         * Verifies a GameLoginResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a G_Player. */
    interface IG_Player {

        /** G_Player id */
        id: (number|Long);

        /** G_Player account */
        account: string;

        /** G_Player nickname */
        nickname: string;

        /** G_Player level */
        level: number;

        /** G_Player exp */
        exp: number;

        /** G_Player vipLv */
        vipLv: number;
    }

    /** Represents a G_Player. */
    class G_Player implements IG_Player {

        /**
         * Constructs a new G_Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: game.IG_Player);

        /** G_Player id. */
        public id: (number|Long);

        /** G_Player account. */
        public account: string;

        /** G_Player nickname. */
        public nickname: string;

        /** G_Player level. */
        public level: number;

        /** G_Player exp. */
        public exp: number;

        /** G_Player vipLv. */
        public vipLv: number;

        /**
         * Creates a new G_Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns G_Player instance
         */
        public static create(properties?: game.IG_Player): game.G_Player;

        /**
         * Encodes the specified G_Player message. Does not implicitly {@link game.G_Player.verify|verify} messages.
         * @param message G_Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game.IG_Player, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified G_Player message, length delimited. Does not implicitly {@link game.G_Player.verify|verify} messages.
         * @param message G_Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game.IG_Player, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a G_Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns G_Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): game.G_Player;

        /**
         * Decodes a G_Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns G_Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): game.G_Player;

        /**
         * Verifies a G_Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }
}
