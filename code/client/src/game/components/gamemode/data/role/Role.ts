class Role extends core.Component {

    private m_data: RoleData;

    private m_avatar: egret.MovieClip;

    constructor(data: RoleData) {
        super();
        this.m_data = data;
        this.initAvatar();
    }

    private initAvatar(): void {
        
    }

    public release(): void {

    }
}