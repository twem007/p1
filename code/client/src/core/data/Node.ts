module core {
	/**
	 *
	 * @author 
	 *
	 */
	export class Node {
    	
    	public data:any;
    	
    	public preNode:core.Node;
    	
        public nextNode:core.Node;
    	
		public constructor(data:any) {
            this.data = data;
		}
	}
}
