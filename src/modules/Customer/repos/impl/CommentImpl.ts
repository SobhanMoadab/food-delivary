import { Model } from "mongoose";
import { Comment, CommentProps } from "../../domain/Comment";
import { CommentId } from "../../domain/CommentId";
import { CommentMapper } from "../../mappers/commentMapper";
import { ICommentRepository } from "../ICommentRepository";

export class CommentRepository implements ICommentRepository {

    private _model: Model<CommentProps>

    constructor(
        schemaModel: Model<CommentProps>,
    ) {

        this._model = schemaModel;
    }
    async exists(commentId: CommentId): Promise<boolean> {
        const id = commentId.id.toString()
        const founded = await this._model.findById(id)
        if (founded) return true
        else return false
    }

    async saveBulk(comments: Comment[]): Promise<void> {
        for (let comment of comments) {
            await this.save(comment)
        }
    }

    async save(comment: Comment): Promise<void> {
        const exists = await this.exists(comment.commentId)
        const isNew = !exists
        const toPers = CommentMapper.toPersistence(comment)
        if (isNew) {
            await this._model.create(toPers)
            // await this.saveProducts(category.products)
            return
        } else {
            await this._model.findByIdAndUpdate(comment.commentId.id.toString(), toPers)
        }
    }

}