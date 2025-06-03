import z from "zod";
import { UserRole } from "src/modules/user/dto/user-payload.dto";

export const searchUserQuerySchema = z.object({
    role: z.nativeEnum(UserRole, {message: "invalid role!"}).optional(),
    group: z.string().optional().transform(Find.transformId),
})