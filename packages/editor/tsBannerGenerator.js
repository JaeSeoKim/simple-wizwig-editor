import pkg from "./package.json";
import rootPkg from "../../package.json";
import fs from "fs";
import glob from "glob";

const tsVersion = /[0-9.]+/.exec(rootPkg.devDependencies.typescript)[0];

const BANNER = [
  `/**`,
  ` * type definitions for ${pkg.name}`,
  ` * @ts version: ${tsVersion}`,
  ` * @version ${pkg.version}`,
  ` * @author ${pkg.author}`,
  ` * @license ${pkg.license}`,
  ` */`,
  ``,
].join("\n");

glob("dist/**/*.d.ts", async (err, matches) => {
  if (err) throw err;

  matches.forEach((match) => {
    try {
      const data = fs.readFileSync(match, {
        encoding: "utf8",
      });
      fs.writeFileSync(match, BANNER + data);
    } catch (error) {
      console.warn(`error on : ${match}`);
      throw error;
    }
  });
});
