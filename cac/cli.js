const cli = require('cac')();
const fs = require('fs');

cli
  .command('rename <dir> <newdir>', 'rename a dir')
  .option('-r, --recursive', 'Remove recursively')
  .action((dir, newdir, options) => {
    console.log(dir, newdir, options);
    fs.renameSync(dir, newdir);
  });

cli.help();

cli.parse();
