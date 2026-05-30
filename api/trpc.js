import { proxyToUpstream } from "./_utils/proxy.js";

export const config = {
  runtime: "nodejs",
};

export default function handler(req, res) {
  return proxyToUpstream(req, res, process.env.UPSTREAM_API_PREFIX || "/api/trpc");
}
