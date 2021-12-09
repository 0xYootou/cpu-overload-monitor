import psList from "ps-list";
import chalk from "chalk";
import "console.table";
const MAX_OVERFLOAD = 20;
const detectOverload = async () => {
  let processes = await psList();
  const overloadProcessed = [];
  processes.sort((a, b) => {
    return a.cpu - b.cpu > 0 ? -1 : 1;
  });
  const table = [];
  processes.slice(0, 10).forEach((process) => {
    table.push(getTableCol(process));
  });
  let hasOverload = false;
  console.clear();

  // //   console.log(overloadProcessed);
  // if (overloadProcessed.length > 0) {
  //   console.log(chalk.red("Overload detected"));

  //   console.table(table);
  // } else {
  //   console.log(chalk.green("No overload detected"));

  console.table(table);
  // }
};

setInterval(detectOverload, 1000);

function getTableCol(process) {
  const name = process.cmd
    .replace(/^.*?\/([^/]*$)/, "$1")
    .replace(/(.*?) .*/, "$1");
  if (process.cpu < MAX_OVERFLOAD) {
    return {
      name: chalk.green(name.padEnd(20).substr(0, 20)),
      pid: chalk.green(String(process.pid).padEnd(10)),
      cpu: chalk.white.bgGreen.bold((process.cpu + "%").padStart(8)),
      memery: chalk.white.bgGreen.bold((process.memory + "%").padStart(8)),
    };
  } else {
    return {
      name: chalk.red(name.padEnd(20).substr(0, 20)),
      pid: chalk.red(String(process.pid).padEnd(10)),
      cpu: chalk.white.bgRed.bold((process.cpu + "%").padStart(8)),
      memery: chalk.white.bgRed.bold((process.memory + "%").padStart(8)),
    };
  }
}
