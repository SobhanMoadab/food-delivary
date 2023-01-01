import { Middleware } from "./utils/Middleware";
import { authService } from "../../../modules/Customer/services"
const middleware = new Middleware(authService);

export { middleware }

