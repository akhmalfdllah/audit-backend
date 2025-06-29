import { UserRole } from 'src/core/user/entities/user.entity';

export type ErpAuthenticatedUser = {
    id: string;
    fullName: string;
    role: UserRole.ERP; // ✅ ENUM, bukan string literal
};
