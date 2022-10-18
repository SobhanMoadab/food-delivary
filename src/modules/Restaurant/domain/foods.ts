
import { WatchedList } from "../../../shared/domain/WatchedlList";
import { Food } from "./food";

export class Foods extends WatchedList<Food> {
    private constructor(initialVotes: Food[]) {
        super(initialVotes)
    }

    public compareItems(a: Food, b: Food): boolean {
        return a.equals(b)
    }

    public static create(foods?: Food[]): Foods {
        return new Foods(foods ? foods : []);
    }
}