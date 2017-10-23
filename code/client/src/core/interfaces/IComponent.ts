module core {
    export interface IComponent {
        release(): void;

        removeFromParent(): void;
    }
}