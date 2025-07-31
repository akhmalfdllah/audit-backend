import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuditLogFacade } from "./audit-log.facade";
import { GetAuditLogsByTargetDto, GetAuditLogsByTargetZodSchema } from "src/applications/audit-log/dto/get-audit-logs-by-target.dto";
import { GetAuditLogsByActionDto, GetAuditLogsByActionSchema } from "src/applications/audit-log/dto/get-by-action.dto";
import { EnsureValid } from "src/shared/decorators/ensure-valid.decorator";
import { TokenGuard } from "src/shared/decorators/token-guard.decorator";

@Controller("audit-logs")
@ApiBearerAuth()
export class AuditLogController {
    constructor(private readonly auditLogFacade: AuditLogFacade) { }

    @Get()
    @TokenGuard(["Admin", "Auditor"])
    async getAllLogs(@Query('page') page = '1') {
        const limit = 10;
        const pageNum = parseInt(page, 10);
        const offset = (pageNum - 1) * limit;
        return await this.auditLogFacade.findPaginated(offset, limit);
    }

    @Get("by-action/:action")
    @TokenGuard(["Admin", "Auditor"])
    @EnsureValid(GetAuditLogsByActionSchema, 'param')
    async getByAction(@Param() params: GetAuditLogsByActionDto) {
        return await this.auditLogFacade.findByAction(params.action);
    }

    @Get('by-target/:targetId')
    @TokenGuard(['Admin', 'Auditor'])
    @EnsureValid(GetAuditLogsByTargetZodSchema, 'param')
    async getByTarget(@Param() params: GetAuditLogsByTargetDto) {
        return this.auditLogFacade.getLogsByTarget(params.targetId);
    }


}
