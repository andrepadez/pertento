import { $ } from 'bun';
import inquirer from 'inquirer';

const validator = (input) => ['y', 'n'].includes(input.toLowerCase());

const starters = [
  `pm2 start --name "AUTHENTICATION" "bun start:auth"`,
  `pm2 start --name "API SERVER" "bun start:api"`,
  `pm2 start --name "EXPERIMENTS SERVER" "bun start:experiments"`,
  `pm2 start --name "STATISTICS SERVER" "bun start:statistics" `,
  `pm2 start --name "GAN SERVER" "bun start:gan"`,
  `pm2 start --name "NOTIFIER SERVER" "bun start:notifier"`,
  `pm2 start --name "AGGREGATOR SERVICE" "bun start:aggregator"`,
  `pm2 start --name "DASHBOARD" "bun start:dashboard"`,
  `pm2 start --name "EDITOR" "bun start:editor"`,
  `pm2 start --name "DRIZZLE STUDIO" "bun db:studio"`,
];

const questions = starters.map((starter) => ({
  type: 'input',
  name: starter.match(/--name "(.*?)"/).at(1),
  command: starter,
  default: 'n',
  validate: validator,
}));

for (let question of questions) {
  const answer = await inquirer.prompt(question);
  console.log(answer[question.name]);

  if (['y', 'Y'].includes(answer[question.name])) {
    await $`${{ raw: question.command }}`.text();
  }
}

await $`${{ raw: 'pm2 save' }}`.text();
await $`${{ raw: 'pm2 list' }}`;
