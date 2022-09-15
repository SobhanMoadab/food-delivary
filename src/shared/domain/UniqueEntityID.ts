
import { ObjectId } from 'mongodb';
import { v4 } from 'uuid';
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<ObjectId>{
    constructor(id?: ObjectId) {
        super(id ? id : new ObjectId())
    }
}