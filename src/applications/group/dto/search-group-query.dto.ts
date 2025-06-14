import z from "zod";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Find } from "src/shared/utils/common.util";

// ✅ Validasi Zod — wajib ada member
export const searchGroupQuerySchema = z.object({
  member: z.string().transform(Find.transformId), // tidak pakai `.optional()`
});

// ✅ DTO awal (raw input dari query, untuk Swagger juga)
export class SearchGroupQueryDto {
  @ApiProperty({ required: true })
  member: string;
}

// ✅ DTO akhir yang sudah ditransformasi
export class SearchGroupQueryTransformed extends OmitType(SearchGroupQueryDto, ['member'] as const) {
  member: { id: string } // atau bisa juga { id: string } tergantung cara filter
}
