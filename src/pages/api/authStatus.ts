import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken, refreshToken } = req.cookies;
  const hasTokens = !!accessToken && !!refreshToken;

  res.status(200).json({ data: hasTokens });
}
