import { proxyToUpstream } from "../_utils/proxy.js";

export const config = {
  runtime: "nodejs",
};

export default function handler(req, res) {
  const path = Array.isArray(req.query.path)
    ? req.query.path.join("/")
    : req.query.path || "";
  const prefix = process.env.UPSTREAM_ASSET_PREFIX;

  if (!prefix) {
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Missing UPSTREAM_ASSET_PREFIX environment variable.");
    return;
  }
  return proxyToUpstream(req, res, `${prefix}/${path}`);
}
