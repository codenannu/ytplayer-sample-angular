#!/usr/bin/env node
/**
 * Run `ng serve` with PORT / HOSTNAME / NODE_ENV from `.env*`.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const DEFAULT_PORT = "4200";
const ENV_FILES = [".env", ".env.local"];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const body = line.startsWith("export ") ? line.slice(7).trim() : line;
    const eq = body.indexOf("=");
    if (eq <= 0) continue;
    const key = body.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    let value = body.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const fileEnv = {};
for (const name of ENV_FILES) Object.assign(fileEnv, parseEnvFile(path.join(root, name)));

function pick(name, fallback) {
  if (process.env[name]) return process.env[name];
  if (fileEnv[name]) return fileEnv[name];
  return fallback;
}

const port = pick("PORT", DEFAULT_PORT);
const host = (
  pick("HOSTNAME", "") ||
  pick("HOST", "") ||
  "0.0.0.0"
).trim();
const env = {
  ...process.env,
  ...fileEnv,
  NODE_ENV: pick("NODE_ENV", "development"),
  PORT: port,
  HOSTNAME: host,
  HOST: host,
};

const ngBin = path.join(root, "node_modules", "@angular", "cli", "bin", "ng.js");
const child = spawn(
  process.execPath,
  [ngBin, "serve", "--port", String(port), "--host", String(host), ...process.argv.slice(2)],
  { cwd: root, env, stdio: "inherit" },
);
child.on("exit", (code) => process.exit(code ?? 1));
