export class AuditLog {
    constructor(
        public id: string | null,
        public actorId: string,
        public action: string,
        public targetEntity: string,
        public targetId: string,
        public metadata: Record<string, any> | null = null,
        public createdAt: Date | null = null,
    ) { }
}
