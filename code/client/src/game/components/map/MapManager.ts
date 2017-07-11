class MapManager {

    private static s_instance: MapManager;

    private m_map: Map;

    constructor() {
        this.m_map = new Map();
    }

    public get map(): Map {
        return this.m_map;
    }

    public static instance(): MapManager {
        if (!MapManager.s_instance) {
            MapManager.s_instance = new MapManager();
        }
        return MapManager.s_instance;
    }
}