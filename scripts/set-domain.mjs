import { execSync } from "child_process";
import fs from "fs";
import os from "os";

const HOSTS_FILE =
  os.platform() === "win32"
    ? "C:\\Windows\\System32\\drivers\\etc\\hosts"
    : "/etc/hosts";
const DOMAIN = "local.fineants.co";
const IP_ADDRESS = "127.0.0.1";
const ENTRY = `${IP_ADDRESS} ${DOMAIN}`;


// 관리자 권한 여부 확인 함수
function isAdmin() {
  try {
    if (os.platform() === "win32") {
      execSync("net session", { stdio: "ignore" });
      return true;
    } else {
      return process.getuid && process.getuid() === 0;
    }
  } catch (err) {
    return false;
  }
}

// hosts 파일에서 특정 도메인이 존재하는지 확인하는 함수
function isDomainInHosts(domain) {
  try {
    const content = fs.readFileSync(HOSTS_FILE, "utf8");
    return content.split("\n").some((line) => line.includes(domain));
  } catch (err) {
    console.error("❌ hosts 파일을 읽는 중 오류가 발생했습니다:", err);
    return false;
  }
}

// hosts 파일에 도메인 추가
function appendToHosts() {
  try {
    fs.appendFileSync(HOSTS_FILE, `\n${ENTRY}\n`);
    console.log(`✅ ${DOMAIN} 도메인을 hosts 파일에 성공적으로 추가했습니다.`);
  } catch (err) {
    console.error("❌ hosts 파일을 수정하는 중 오류가 발생했습니다:", err);
  }
}

function run() {
  if (isDomainInHosts(DOMAIN)) {
    console.log(`✅ ${DOMAIN} 도메인이 이미 hosts 파일에 등록되어 있습니다.`);
    return;
  }

  console.log(`⚠️  ${DOMAIN} 도메인이 hosts 파일에 없습니다. 추가를 시도합니다.`);

  if (isAdmin()) {
    appendToHosts();
  } else {
    console.log("⚠️ hosts 파일을 수정하려면 관리자 권한이 필요합니다.");
    if (os.platform() === "win32") {
      console.log("🔒 관리자 권한으로 이 스크립트를 실행해주세요.");
    } else {
      console.log(`🔒 다음 명령어를 사용해 sudo로 실행해주세요:\n  sudo node ${process.argv[1]}`);
    }
  }
}

run();
