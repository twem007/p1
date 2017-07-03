module core {
    export abstract class EUIComponent extends eui.Component {
        constructor() {
            super();
        }

        public abstract release(): void
    }
}