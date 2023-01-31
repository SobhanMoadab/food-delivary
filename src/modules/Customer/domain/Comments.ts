
import { WatchedList } from "../../../shared/domain/WatchedlList";
import { Comment } from "./Comment";

export class Comments extends WatchedList<Comment> {
    private constructor(initialVotes: Comment[]) {
        super(initialVotes)
    }

    public compareItems(a: Comment, b: Comment): boolean {
        return a.equals(b)
    }

    public static create(comments?: Comment[]): Comments {
        return new Comments(comments ? comments : []);
    }
}