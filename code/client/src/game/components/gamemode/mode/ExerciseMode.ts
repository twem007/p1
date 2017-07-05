class ExerciseMode implements IGameMode {

    public map: Map;

    private m_data: GameModeData;

    constructor() {

    }

    public enter(data: GameModeData): void {
        this.m_data = data;
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.GAME, ModuleEnum.NONE, data.mapID));
    }

    public exit(): void {

    }

    public getData(): GameModeData {
        return this.m_data;
    }

}