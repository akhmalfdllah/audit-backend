// // applications/auth/use-cases/store-refresh-token.use-case.ts
// import { Injectable } from "@nestjs/common";
// import * as argon2 from "argon2";
// import { UserRepositoryImpl } from "src/infrastructure/database/repositories/user.repository.impl";

// @Injectable()
// export class StoreRefreshTokenUseCase {
//     constructor(private readonly userRepository: UserRepositoryImpl) { }

//     async execute(userId: string, refreshToken: string) {
//         const hashed = await argon2.hash(refreshToken);
//         await this.userRepository.updateHashedRefreshToken(userId, hashed);
//     }
// }
