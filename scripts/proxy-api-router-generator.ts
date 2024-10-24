import chokidar from "chokidar";
import path from "path";
import { generateApiRouter } from "./utils/api-router-generator-utils";

const watchPath = path.resolve("./src/features");

// chokidar 설정: 파일 변경 감시
const watcher = chokidar.watch(watchPath, {
  persistent: true,
  depth: 3,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

// 준비 완료
watcher.on("ready", () => {
  console.log("Generator : Watching for file changes...");
});

// 파일 변경
watcher.on("change", (filePath: string) => {
  if (filePath.endsWith(path.join("api", "index.ts"))) {
    console.log(`Generator : File changed: ${filePath}`);
    generateApiRouter(filePath);
  }
});

// 파일 추가
watcher.on("add", (filePath: string) => {
  if (filePath.endsWith(path.join("api", "index.ts"))) {
    console.log(`Generator : File added: ${filePath}`);
    generateApiRouter(filePath);
  }
});
