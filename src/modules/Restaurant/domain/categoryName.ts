import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";



interface CategoryNameProps {
    value: string
}

export class CategoryName extends ValueObject<CategoryNameProps>{

    constructor(props: CategoryNameProps) {
        super(props)
    }

    get value(): string{
        return this.props.value
    }

    public static create (props: CategoryNameProps): Result<CategoryName> {

        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'categoryName');
    
        if (nullGuardResult.isFailure) {
          return Result.fail<CategoryName>(nullGuardResult.getErrorValue());
        }
      
    
        return Result.ok<CategoryName>(new CategoryName(props));
      }
}