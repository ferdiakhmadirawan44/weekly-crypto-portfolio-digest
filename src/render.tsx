// Render "The Ledger" digest to static HTML (+ plain text) and validate it
// against Hyper Elements' checks, including the email-client checks from
// @hyper-elements/email-clients. Run with: npm run render
import { mkdir, writeFile } from "node:fs/promises";
import {
  ElementsError,
  formatDiagnostics,
  outline,
  render,
  validate,
} from "@hyper-elements/react";
import { emailClients } from "@hyper-elements/email-clients";
import Digest from "./Digest.js";

const element = <Digest />;

const clientPlugin = await emailClients();
const { valid, diagnostics } = validate(element, { plugins: [clientPlugin] });
console.log("— validate() —");
console.log(formatDiagnostics(diagnostics) || "(no diagnostics)");
if (!valid) {
  console.error("Validation failed — not rendering.");
  process.exit(1);
}

console.log("— outline() —");
console.log(outline(element));

try {
  const { html, text, diagnostics: renderDiagnostics } = await render(element);
  console.log("— render() diagnostics —");
  console.log(formatDiagnostics(renderDiagnostics) || "(no diagnostics)");
  await mkdir("output", { recursive: true });
  await writeFile("output/digest.html", html);
  await writeFile("output/digest.txt", text);
  console.log(`Wrote output/digest.html (${html.length.toLocaleString()} bytes)`);
  console.log(`Wrote output/digest.txt (${text.length.toLocaleString()} bytes)`);
} catch (e) {
  if (!(e instanceof ElementsError)) throw e;
  console.error(formatDiagnostics(e.diagnostics));
  process.exit(1);
}
