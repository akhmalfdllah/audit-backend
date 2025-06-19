import { Controller, Get, Query } from "@nestjs/common";
import { AuditLogFacade } from "./audit-log.facade";
import { GetAuditLogsByTargetDto } from "src/applications/audit-log/dto/get-audit-logs-by-target.dto";

@Controller("audit-logs")
export class AuditLogController {
    constructor(private readonly auditLogFacade: AuditLogFacade) { }

    @Get()
    async getByTarget(@Query() query: GetAuditLogsByTargetDto) {
        return await this.auditLogFacade.findByTarget(query);
    }
}
