class GameModeManager {

    private static s_instance: GameModeManager;

    private m_curMode: IGameMode;

    constructor() {
    }

    public enterGame(gameMode: GameTypeEnum): void {
        switch (gameMode) {
            case GameTypeEnum.EXERCISE:
                {
                    let modeData: GameModeData = new GameModeData();
                    modeData.mapID = 101;
                    this.m_curMode = new ExerciseMode();
                    this.m_curMode.enter(modeData);
                }
                break;
            case GameTypeEnum.RANK:
                {

                }
                break;
        }
    }

    public getCurMode(): IGameMode {
        return this.m_curMode;
    }

    public static getInstance(): GameModeManager {
        if (!GameModeManager.s_instance) {
            GameModeManager.s_instance = new GameModeManager();
        }
        return GameModeManager.s_instance;
    }
}