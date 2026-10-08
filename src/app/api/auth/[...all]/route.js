import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

let handlers;

function getHandlers() {
  if (!handlers) handlers = toNextJsHandler(getAuth());
  return handlers;
}

export async function GET(request) {
  return getHandlers().GET(request);
}

export async function POST(request) {
  return getHandlers().POST(request);
}