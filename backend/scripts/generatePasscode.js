import bcrypt from "bcryptjs";
import readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

try {
  const passcode = await rl.question(
    "Enter your private passcode: "
  );

  if (
    passcode.length < 16 ||
    Buffer.byteLength(passcode, "utf8") > 72
  ) {
    console.error(
      "Use at least 16 characters and at most 72 UTF-8 bytes."
    );

    process.exitCode = 1;

  } else {
    const hash = await bcrypt.hash(passcode, 12);

    console.log("\nYour passcode hash:\n");
    console.log(hash);
  }

} finally {
  rl.close();
}