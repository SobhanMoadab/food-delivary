import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {

    protected readonly _id?: UniqueEntityID;
    public readonly props: T;

    constructor(props: T, id?: UniqueEntityID) {
        this.props = props;
    }

}