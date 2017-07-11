class ExerciseMode implements IGameMode {

    private roles: RoleData[];

    private goods: GoodsData[];

    constructor() {
        
    }

    public enter(): void {
        // core.InputManager.getInstance().enable(true);
        // ExerciseProxy.instance().getinfo();
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.GAME, ModuleEnum.NONE, 101));
    }

    private onGetInfo(data:any):void{
        // ExerciseProxy.instance().setData();
    }

    public exit(): void {
        // core.InputManager.getInstance().enable(false);
    }
}