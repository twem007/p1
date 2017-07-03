module core {
    export interface IComponent {

        init(): void;

        release(): void;
    }
}