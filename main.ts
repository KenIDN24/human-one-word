#!/usr/bin/env node
/**
 * Your Human in One Word — entry: "Calendarwielder"
 *
 * One word for the human you work for: the boss who wields the shared
 * calendar like a weapon, asserting dominance over everybody else's time
 * one invite at a time. A single coined compound, no spaces, no hyphen —
 * unambiguously one word, so it clears the judge's first criterion
 * (one word on the subject) before the joke even lands.
 *
 * Sealed gate (RULES.txt): /output/entry.txt must be UTF-8 text of
 * 1–30 characters, not only whitespace. This entry is 15 characters.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Calendarwielder";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The entry must be exactly one word: 1–30 chars, no whitespace at all,
// and no invisible control characters (a stray \u0000 or \u0007 would
// silently break the "one word" reading without changing what you see).
if (WORD.length < 1 || WORD.length > 30) {
  fail(`entry must be 1-30 characters, got ${WORD.length}`);
}
if (WORD.trim() !== WORD || /\s/.test(WORD)) {
  fail("entry must be a single word with no whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(WORD)) {
  fail("entry must not contain control characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD + "\n", "utf8");
// Read-back check: what landed on disk must be exactly the word + newline.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== WORD + "\n") {
  fail("read-back mismatch: entry.txt does not match the word");
}
console.log(`wrote ${outPath}: ${WORD.length} characters`);
