interface IGameMode {

    map: Map;

    getData(): GameModeData;

    enter(data: GameModeData): void;

    exit(): void;
}