import { createTRPCReact } from "@trpc/react-query";

// The upstream API is proxied through Vercel. Keeping the client generic avoids
// coupling the public project to the original backend implementation.
export const trpc = createTRPCReact<any>();
