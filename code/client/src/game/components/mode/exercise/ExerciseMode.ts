class ExerciseMode implements IGameMode {

    private roles: RoleData[];

    constructor() {
        
    }

    public enter(): void {
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, ModuleEnum.GAME, ModuleEnum.NONE, 101));
    }

    private onGetInfo(data:any):void{
    }

    public exit(): void {
    }
}