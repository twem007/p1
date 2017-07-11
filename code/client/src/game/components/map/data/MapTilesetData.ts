class MapTilesetData {

    public tileWidth: number;

    public tileHeight: number;

    public tileCount: number;

    public spacing: number;

    public name: string;

    public margin: number;

    public image: string;

    public imageWidth: number;

    public imageHeight: number;

    public columns: number;

    public firstgid: number;

    public propertytypes: any;

    public properties: any;

    public tileproperties: any;

    public tilepropertytypes: any;

    constructor(data: any) {
        this.columns = data.columns;
        this.firstgid = data.firstgid;
        this.image = data.image;
        this.imageHeight = data.imageheight;
        this.imageWidth = data.imagewidth;
        this.margin = data.margin;
        this.name = data.name;
        this.properties = data.properties;
        this.propertytypes = data.propertytypes;
        this.spacing = data.spacing;
        this.tileCount = data.tilecount;
        this.tileHeight = data.tileheight;
        this.tileproperties = data.tileproperties;
        this.tilepropertytypes = data.tilepropertytypes;
        this.tileWidth = data.tilewidth;
    }

    public getProp(id: number): any {
        return this.properties[id - this.firstgid];
    }

    public getTileProp(id: number): any {
        return this.tileproperties[id - this.firstgid];
    }
}