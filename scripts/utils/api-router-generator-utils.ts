import fs from "fs";
import path from "path";

type MethodDetails = {
  url: string | null;
  httpMethod: string | null;
};

// API 라우터 생성 함수
export const generateApiRouter = (filePath: string) => {
  const content = fs.readFileSync(filePath, "utf-8");

  const apiMethods = extractApiMethods(content);
  const methodDetails = extractMethodDetails(apiMethods);

  createApiFiles(methodDetails);
};

// 파일 생성 함수
const createApiFiles = (methodDetails: MethodDetails[]) => {
  const groupedByRoute = methodDetails.reduce(
    (acc, { url, httpMethod }) => {
      if (!url || !httpMethod) return acc;
      if (!acc[url]) acc[url] = [];
      acc[url].push(httpMethod);
      return acc;
    },
    {} as Record<string, string[]>
  );

  Object.entries(groupedByRoute).forEach(([url, methods]) => {
    const urlParts = url
      .split("/")
      .filter((part) => part !== "")
      .map((part) => (part.startsWith("${") ? `[${part.slice(2, -1)}]` : part));

    const filePath = path.join("./src/pages/api/proxy", ...urlParts) + `.ts`;

    // 파일 디렉토리 없을 경우 생성
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 템플릿 리터럴이 있는지 확인 ex) `/stocks/${tickerSymbol}`
    const templateVariables = url.match(/\$\{(\w+)\}/g);
    const queryExtract = templateVariables
      ? templateVariables
          .map((variable) => `const { ${variable.slice(2, -1)} } = req.query;`)
          .join("\n")
      : "";

    // Method 별 처리
    const methodHandlers = methods
      .map((method) => {
        const hasBody = ["POST", "PUT", "PATCH"].includes(method);
        const bodyContent = hasBody ? `, req.body` : ``;

        return `
      case "${method}":
        try {
          const { data, cookies: { accessToken, refreshToken } = {} } =
            await proxyFetcher.${method.toLowerCase()}<Response<unknown>>(\`${url.replace(
              /\$\{(\w+)\}/g,
              (_, variable) => `\${${variable}}`
            )}\`${bodyContent}, {
              headers: {
                Cookie: cookieString || "",
              },
            });

          if (accessToken && refreshToken) {
            const updatedAccessToken = replaceCookieDomain(
              accessToken,
              "localhost"
            );
            const updatedRefreshToken = replaceCookieDomain(
              refreshToken,
              "localhost"
            );

            res.setHeader("Set-Cookie", [updatedAccessToken, updatedRefreshToken]);
          }

          return res.status(200).json(data);
        } catch (error) {
          return res.status(500).json({ error: "Internal server error" });
        }
      `;
      })
      .join("\n");

    // 템플릿 코드
    const template = `import { proxyFetcher } from "@/api/fetcher";
import { Response } from "@/api/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.cookies;
  const cookieString = Object.entries(cookies)
    .map(([key, value]) => \`\${key}=\${value}\`)
    .join("; ");

  ${queryExtract}

  switch (req.method) {
    ${methodHandlers}
    default:
      res.setHeader("Allow", [${methods.map((m) => `"${m}"`).join(", ")}]);
      res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}

const replaceCookieDomain = (cookieStr: string, newDomain: string) => {
  const cookieParts = cookieStr.split(";");
  const updatedCookieParts = cookieParts.map((part) => {
    if (part.trim().startsWith("Domain=")) {
      return \` Domain=\${newDomain}\`;
    }
    return part;
  });
  return updatedCookieParts.join(";");
};
    `;

    fs.writeFileSync(filePath, template, "utf8");
    console.log(`Generator: Created API file: ${filePath}`);
  });
};

// 메서드 추출 함수
export const extractApiMethods = (content: string): string[] => {
  const methodRegex =
    /export\s+const\s+\w+\s*=\s*async\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\};/g;
  const methods: string[] = [];
  let match;

  while ((match = methodRegex.exec(content)) !== null) {
    methods.push(match[0]);
  }

  return methods;
};

// 메서드 상세 정보 추출 함수
const extractMethodDetails = (apiMethods: string[]): MethodDetails[] => {
  return apiMethods.map((method) => {
    const urlMatch = method.match(/["'`](\/[^"'`]+)["'`]/);
    const url = urlMatch ? urlMatch[1] : null;

    const httpMethodMatch = method.match(
      /(?:fetcher|fetcherWithoutCredentials|proxyFetcher)\.(\w+)/
    );
    const httpMethod = httpMethodMatch
      ? httpMethodMatch[1].toUpperCase()
      : null;

    return {
      url,
      httpMethod,
    };
  });
};
