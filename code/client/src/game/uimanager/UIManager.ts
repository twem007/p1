class UIManager {

    private static s_instance: UIManager;

    private m_moduleList: ModuleData[];

    private m_popupList: ModuleEnum[];

    constructor() {
        this.m_moduleList = [];
        this.m_popupList = [];
    }
    
    /**
     * 得到Module索引
     * @param  {ModuleEnum} moduleEnum
     */
    private getIndex(moduleEnum: ModuleEnum): number {
        let list: ModuleData[] = this.m_moduleList;
        for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
            if (list[i].moduleEnum == moduleEnum) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @param  {ModuleEnum} openModule  打开的module
     * @param  {any} openData?  打开所需参数
     */
    public openModule(openModule: ModuleEnum, openData?: any): void {
        let list: ModuleData[] = this.m_moduleList;
        if (list.length > 0) {
            let moduleData: ModuleData = list[list.length - 1];
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, moduleData.moduleEnum));
        }
        list.push(new ModuleData(openModule, openData));
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, openModule, openData));
    }
    /**
     * 
     * @param  {ModuleEnum} closeModule 关闭的module
     */
    public closeModule(closeModule: ModuleEnum): void {
        let index: number = this.getIndex(closeModule);
        let list: ModuleData[] = this.m_moduleList;
        if (index >= 0) {
            let moduleData: ModuleData = list.splice(index, 1)[0];
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, moduleData.moduleEnum));
        }
        if (list.length > 0) {
            let moduleData: ModuleData = list[list.length - 1];
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, moduleData.moduleEnum, moduleData.data));
        }
    }
    /**
     * @param  {ModuleEnum} openModule  要打开的Popup
     * @param  {any} openData?          打开附加参数
     */
    public openPopup(openModule: ModuleEnum, openData?: any): void {
        if (this.m_popupList.indexOf(openModule) < 0) {
            this.m_popupList.push(openModule);
        }
        core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_SHOW, openModule, openData));
    }
    /**
     * @param  {ModuleEnum} closeModule 要关闭的Popup
     */
    public closePopup(closeModule: ModuleEnum): void {
        let index: number = this.m_popupList.indexOf(closeModule);
        if (index >= 0) {
            this.m_popupList.splice(index, 1);
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, closeModule));
        }
    }
   
    /**
     * 关闭所有module
     */
    public closeAllModule(): void {
        let list: ModuleData[] = this.m_moduleList;
        for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
            let moduleData: ModuleData = list[i];
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, moduleData.moduleEnum));
        }
        list.length = 0;
    }
    /**
     * 关闭所有module及Popup
     */
    public closeAll(): void {
        this.closeAllModule();
        let list: ModuleEnum[] = this.m_popupList;
        for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
            core.EventCenter.getInstance().sendEvent(new core.ModuleEventData(core.EventID.MODULE_HIDE, list[i]));
        }
        list.length = 0;
    }

    public static get instance(): UIManager {
        if (!UIManager.s_instance) {
            UIManager.s_instance = new UIManager();
        }
        return UIManager.s_instance;
    }
}

class ModuleData {

    public moduleEnum: ModuleEnum;

    public data: any;
    /**
     * @param  {ModuleEnum} moduleEnum
     * @param  {any} data
     */
    constructor(moduleEnum: ModuleEnum, data: any) {
        this.moduleEnum = moduleEnum;
        this.data = data;
    }
}