// import * as argon2 from 'argon2';
// import { v4 as uuidv4 } from 'uuid';

// async function main() {
//   const users = [
//     {
//       username: 'ERP Sistem',
//       password: 'Erp123!',
//       role: 'ERP',
//       status: 'Active',
//       email: 'erp@gmail.com',
//       fullName: 'ERP System',
//       apiKey: 'erp-1234-key',
//     },
//   ];

//   console.log('-- COPY-PASTE SQL INSERT INI KE DATABASE --\n');

//   for (const user of users) {
//     const id = uuidv4();
//     const hash = await argon2.hash(user.password);

//     console.log(`
// INSERT INTO "User" (
//   id, username, password, role, email, fullName, status, "groupId", "apiKey", "hashedRefreshToken", "createdAt", "updatedAt"
// ) VALUES (
//   '${id}',
//   '${user.username}',
//   '${hash}',
//   '${user.role}',
//   ${user.email ? `'${user.email}'` : 'NULL'},
//   ${user.fullName ? `'${user.fullName}'` : 'NULL'},
//   '${user.status}',
//   NULL,
//   ${user.apiKey ? `'${user.apiKey}'` : 'NULL'},
//   NULL,
//   NOW(),
//   NOW()
// );
//     `);
//   }
// }

// main().catch(console.error);
