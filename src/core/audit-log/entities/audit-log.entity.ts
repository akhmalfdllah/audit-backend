export enum AuditAction {
    CREATE_USER = "CREATE_USER",
    UPDATE_USER = "UPDATE_USER",
    DELETE_USER = "DELETE_USER",
    SIGNOUT = "SIGNOUT",
    SIGNIN = "SIGNIN",
    CREATE_TRANSACTION = "CREATE_TRANSACTION",
    APPROVE_TRANSACTION = "APPROVE_TRANSACTION",
    REJECT_TRANSACTION = "REJECT_TRANSACTION",
    CREATE_GROUP = "CREATE_GROUP",
    UPDATE_GROUP = "UPDATE_GROUP",
    DELETE_GROUP = "DELETE_GROUP",
}

export class AuditLog {
    constructor(
        public id: string | null,
        public actorId: string,
        public action: AuditAction,
        public targetEntity: string,
        public targetId: string,
        public metadata: Record<string, any> | null = null,
        public createdAt: Date | null = null,
    ) { }
}
