// The One-Liner Groan-Off — u-alfasurya91-the-one-liner-groan-off-5a1febd5
// One original one-line dad joke, written to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The grader runs this from another directory, so every path is built from
// import.meta.url and the MAKEFUN_OUTPUT_DIR environment variable — never a
// relative path.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The joke, kept as two halves so the setup and the punchline can be read
// separately: a dad, lost, arguing with his GPS. The twist lands on "life
// choices", and the whole line is short enough to say out loud at the dinner
// table — and groan at.
const SETUP = "I told the GPS I was lost.";
const PUNCHLINE = "It said, 'Recalculating your life choices.'";

// One line, built from the two halves with exactly one space between them.
const JOKE = `${SETUP} ${PUNCHLINE}`;

// Competition gate: one line, 1-140 characters, no leading/trailing space.
const MIN_CHARS = 1;
const MAX_CHARS = 140;

function validateEntry(text: string): number {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry is ${chars} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  return chars;
}

function resolveOutputDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "output");
}

function main(): void {
  const chars = validateEntry(JOKE);
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });

  const target = join(outDir, "entry.txt");
  writeFileSync(target, JOKE + "\n", "utf8");
  console.log(`wrote ${chars} characters to ${target}`);
}

main();
