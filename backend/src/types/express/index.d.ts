// types/express/index.d.ts
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: Pick<User, "id" | "name" | "email" | "role" | "image">;
    }
  }
}
