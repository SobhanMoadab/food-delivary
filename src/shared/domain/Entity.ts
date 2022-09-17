import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {

    public readonly _id?: UniqueEntityID;
    public  props: T;

    constructor(props: T, id?: UniqueEntityID) {
        this.props = props;
    }

}