
import { ObjectId } from 'mongodb';
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<ObjectId>{
    constructor(id?: string | ObjectId) {
        if (typeof id === 'string') {
            id = new ObjectId(id)
        }
        super(id ? id : new ObjectId())
    }
}