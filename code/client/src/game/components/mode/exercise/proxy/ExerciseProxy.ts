class ExerciseProxy {

    private static s_instance: ExerciseProxy;

    private m_data: ExerciseModeData;

    constructor() {
        this.m_data = new ExerciseModeData();
    }

    public getData(): ExerciseModeData {
        return this.m_data;
    }
    
    public createMapData(id:number): MapData {
        let map: MapData = new MapData();
        map.update(id);
        this.m_data.map = map;
        return map;
    }

    public static instance(): ExerciseProxy {
        if (!ExerciseProxy.s_instance) {
            ExerciseProxy.s_instance = new ExerciseProxy();
        }
        return ExerciseProxy.s_instance;
    }
}