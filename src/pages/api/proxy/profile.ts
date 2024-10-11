import { proxyFetcher } from "@/api/fetcher";
import { Response } from "@/api/types";
import { User } from "@/features/user/api/types";
import { NextApiRequest, NextApiResponse } from "next";

const replaceCookieDomain = (cookieStr: string, newDomain: string) => {
  const cookieParts = cookieStr.split(";");
  const updatedCookieParts = cookieParts.map((part) => {
    if (part.trim().startsWith("Domain=")) {
      return ` Domain=${newDomain}`;
    }
    return part;
  });
  return updatedCookieParts.join(";");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cookies = req.cookies;
      const cookieString = Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join("; ");

      const { data, cookies: { accessToken, refreshToken } = {} } =
        await proxyFetcher.get<Response<{ user: User }>>("/profile", {
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
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
