import { Comment } from "../domain/Comment";
import { CommentId } from "../domain/CommentId";

export interface ICommentRepository {
    saveBulk(comments: Comment[]): Promise<void>
    save(comment: Comment): Promise<void>
    exists(commentId: CommentId): Promise<boolean>
    
}