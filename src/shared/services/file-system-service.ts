import * as path from "path";
import * as fs from "fs";
import { Injectable } from "@nestjs/common";
import { RootDir } from "src/config/constant.config";

Injectable()
export class FileSystemService {
    isFileExists = fs.existsSync;

    sourcePath(filePathUrl: string) {
        return path.join(RootDir, filePathUrl);
    }
}
