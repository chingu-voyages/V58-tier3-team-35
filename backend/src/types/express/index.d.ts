import { jwtPayload } from "../auth";

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload;
    }
  }
}
