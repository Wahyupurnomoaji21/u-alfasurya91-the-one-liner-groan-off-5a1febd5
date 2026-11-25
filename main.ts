// The One-Liner Groan-Off — u-alfasurya91-the-one-liner-groan-off-5a1febd5
// One original one-line dad joke, written to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The grader runs this from another directory, so every path is built from
// import.meta.url and the MAKEFUN_OUTPUT_DIR environment variable — never a
// relative path.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The joke: a dad, lost, arguing with his GPS. Setup and punchline live in
// the same breath, the twist lands on "life choices", and the whole line is
// short enough to say out loud at the dinner table — and groan at.
const JOKE =
  "I told the GPS I was lost. It said, 'Recalculating your life choices.'";

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "output");
  mkdirSync(outDir, { recursive: true });

  const chars = [...JOKE].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} characters, must be 1-140`);
  }
  if (JOKE.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const target = join(outDir, "entry.txt");
  writeFileSync(target, JOKE + "\n", "utf8");
  console.log(`wrote ${chars} characters to ${target}`);
}

main();
