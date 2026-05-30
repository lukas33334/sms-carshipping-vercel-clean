import { proxyToUpstream } from "../_utils/proxy.js";

export const config = {
  runtime: "nodejs",
};

export default function handler(req, res) {
  const path = Array.isArray(req.query.path)
    ? req.query.path.join("/")
    : req.query.path || "";
  const prefix = process.env.UPSTREAM_API_PREFIX || "/api/trpc";
  return proxyToUpstream(req, res, `${prefix}/${path}`);
}
