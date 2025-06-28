import { ApiOperationOptions } from "@nestjs/swagger";

export const groupDocs = {
  post_group: {
    summary: "Create Group",
    description: "Digunakan untuk membuat group baru. Hanya dapat diakses oleh admin.",
  } satisfies ApiOperationOptions,

  get_all_group: {
    summary: "Get All Groups",
    description: "Mengambil seluruh daftar group yang tersedia dalam sistem.",
  } satisfies ApiOperationOptions,

  get_groupId: {
    summary: "Get Group by ID",
    description: "Mengambil detail group berdasarkan ID. Digunakan oleh admin atau audit.",
  } satisfies ApiOperationOptions,

  delete_groupId: {
    summary: "Delete Group by ID",
    description: "Menghapus group berdasarkan ID. Hanya admin yang dapat melakukan ini.",
  } satisfies ApiOperationOptions,
};
