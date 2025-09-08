import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const changePasswordSchema = z.object({
  currentPassword: z.string().nonempty('Password lama wajib diisi').min(6, 'Password lama minimal 6 karakter'),
  newPassword: z.string().nonempty('Password baru wajib diisi').min(6, 'Password baru minimal 6 karakter'),
  confirmPassword: z.string().nonempty('Konfirmasi password wajib diisi').min(6, 'Password baru minimal 6 karakter'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirmPassword"],
});

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldPassword123' })
  currentPassword: string;

  @ApiProperty({ example: 'Password123' })
  newPassword: string;

  @ApiProperty({ example: 'Password123' })
  confirmPassword: string;
}
