import psList from "ps-list";
import chalk from "chalk";
import "console.table";
const MAX_OVERFLOAD = 80;
const detectOverload = async () => {
  let processes = await psList();
  const overloadProcessed = [];
  processes.sort((a, b) => {
    return a.cpu - b.cpu > 0 ? -1 : 1;
  });
  processes.forEach((process) => {
    if (process.cpu > MAX_OVERFLOAD) {
      overloadProcessed.push(process);
    }
  });
  console.clear();
  //   console.log(overloadProcessed);
  if (overloadProcessed.length > 0) {
    console.log(chalk.red("Overload detected"));
    const table = [];
    overloadProcessed.forEach((process) => {
      const name = process.cmd
        .replace(/^.*?\/([^/]*$)/, "$1")
        .replace(/(.*?) .*/, "$1");

      table.push({
        name: chalk.green(name.padEnd(20)),
        pid: chalk.blue(String(process.pid).padEnd(10)),
        cpu: `${chalk.red(process.cpu)}%`.padEnd(10),
        memery: `${chalk.red(process.memory)}%`.padEnd(10),
      });
    });
    console.table(table);
  } else {
    console.log(chalk.green("No overload detected"));
    const table = [];
    processes.slice(0, 5).forEach((process) => {
      const name = process.cmd
        .replace(/^.*?\/([^/]*$)/, "$1")
        .replace(/(.*?) .*/, "$1");
      table.push({
        name: chalk.green(name.padEnd(20)),
        pid: chalk.green(String(process.pid).padEnd(10)),
        cpu: `${chalk.green(process.cpu)}%`.padEnd(10),
        memery: `${chalk.green(process.memory)}%`.padEnd(10),
      });
    });
    console.table(table);
  }
};

setInterval(detectOverload, 1000);
