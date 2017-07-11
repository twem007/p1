class MapLayerData {

    public x: number;

    public y: number;

    public width: number;

    public height: number;

    public name: string;

    public type: string;

    public opacity: number;

    public visible: boolean;

    public data: number[];

    public propertytypes: any;

    public properties: any;

    constructor(data: any) {
        this.data = data.data;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.name = data.name;
        this.opacity = data.opacity;
        this.properties = data.properties;
        this.propertytypes = data.propertytypes;
        this.type = data.type;
        this.visible = data.visible;
    }

    public getProp(key: string): any {
        return this.properties[key];
    }
}