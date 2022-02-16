import fs from "fs";
import glob from "glob";

const pkg = JSON.parse(fs.readFileSync("./package.json").toString('utf-8'));
const rootPkg = JSON.parse(fs.readFileSync("../../package.json").toString('utf-8'));

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
