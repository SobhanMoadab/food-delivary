import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {

    protected readonly _id: UniqueEntityID;
    public  props: T;

    constructor(props: T, id?: UniqueEntityID) {
        this._id = id ? id : new UniqueEntityID();
        this.props = props;
        
    }

    public equals(object?: Entity<T>): boolean {

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        return this._id.equals(object._id);
    }
}