import chokidar from "chokidar";
import fs from "fs";
import path from "path";
import { generateApiRouter } from "./utils/api-router-generator-utils";

const watchPath = path.resolve("./src/features");
const proxyPath = path.resolve("./src/pages/api/proxy");

// ./src/features/api 아래에 있는 index.ts 체크
function isApiIndexFile(filePath: string): boolean {
  return filePath.endsWith(path.join("api", "index.ts"));
}

// 초기화: ./src/pages/api/proxy 경로 삭제 후 생성
function initializeProxyPath() {
  fs.rmSync(proxyPath, { recursive: true, force: true });
  fs.mkdirSync(proxyPath, { recursive: true }); // proxyPath를 재생성

  console.log(`Generator: Cleared and recreated directory: ${proxyPath}`);
}

// 전체 재생성: watchPath 내부의 모든 index.ts 파일을 다시 생성
function regenerateAllApiRouters() {
  const files = getAllIndexFiles(watchPath);

  files.forEach((filePath) => {
    console.log(`Generator: Regenerating API router for: ${filePath}`);
    generateApiRouter(filePath);
  });
}

// watchPath 내부의 모든 index.ts 파일 경로를 가져오는 함수
function getAllIndexFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllIndexFiles(filePath));
    } else if (isApiIndexFile(filePath)) {
      results.push(filePath);
    }
  });
  return results;
}

// 초기화 함수 실행
initializeProxyPath();

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
  console.log("Generator: Watching for file changes...");
});

// 파일 변경
watcher.on("change", (filePath: string) => {
  if (isApiIndexFile(filePath)) {
    console.log(`Generator: File changed: ${filePath}`);

    generateApiRouter(filePath);
  }
});

// 파일 추가
watcher.on("add", (filePath: string) => {
  if (isApiIndexFile(filePath)) {
    console.log(`Generator: File added: ${filePath}`);

    generateApiRouter(filePath);
  }
});

// 파일 삭제
watcher.on("unlink", (filePath: string) => {
  if (isApiIndexFile(filePath)) {
    console.log(`Generator: File deleted: ${filePath}`);

    initializeProxyPath();
    regenerateAllApiRouters();

    console.log(
      "Generator: Re-initialized proxy path and regenerated all API routers due to deletion."
    );
  }
});
