// import { DataSource } from 'typeorm';
// import { UserORM } from '../infrastructure/database/typeorm/entities/user.orm-entity';
// import { GroupORM } from '../infrastructure/database/typeorm/entities/group.orm-entity';
// import { hash } from 'argon2';
// import { UserRole, UserStatus } from 'src/core/user/entities/user.entity'; // pastikan path ini sesuai

// const seed = async () => {
//     const dataSource = new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'audit_user',
//         password: 'audit_pass',
//         database: 'audit_system',
//         entities: [UserORM, GroupORM],
//         synchronize: false,
//     });

//     await dataSource.initialize();

//     const userRepo = dataSource.getRepository(UserORM);

//     const admin = userRepo.create({
//         username: 'admin',
//         email: 'admin@gmail.com',
//         fullName: 'Admin Budi',
//         password: await hash('admin123'),
//         role: UserRole.Admin,          // ✅ pakai enum
//         status: UserStatus.Active,     // ✅ pakai enum
//     });

//     await userRepo.save(admin);

//     console.log('✅ Admin seeded!');
//     await dataSource.destroy();
// };

// seed().catch((err) => {
//     console.error('❌ Gagal seed admin:', err);
// });
