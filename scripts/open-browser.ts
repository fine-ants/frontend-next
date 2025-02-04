import { exec } from "child_process";
import os from "os";

const url = "https://local.fineants.co:3000";

if (os.platform() === "win32") {
  exec(`start ${url}`);
} else if (os.platform() === "darwin") {
  exec(`open ${url}`);
} else {
  console.log("이 OS는 지원되지 않습니다.");
}
