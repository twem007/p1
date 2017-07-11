class ExerciseMode implements IGameMode {

    private roles: RoleData[];

    private goods: GoodsData[];

    constructor() {

    }

    public enter(): void {
        // core.InputManager.getInstance().enable(true);
        let data:ExerciseModeData = ExerciseProxy.instance().getData();
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.GAME, ModuleEnum.NONE, data.mapID));
    }

    public exit(): void {
        // core.InputManager.getInstance().enable(false);
    }
}