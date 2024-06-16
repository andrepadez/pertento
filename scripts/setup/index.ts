#!/usr/bin/env bun
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { checkDependencies } from './check-dependencies';

import { db, Users } from 'drizzledb';

const user = await db.query.Users.findFirst();
// console.log(user);

// prettier-ignore
// const gradients = [ "atlas","teen", "summer", "pastel"];
// console.log(Object.keys(chalkAnimation))
[ "rainbow", "pulse", "glitch", "radar", "neon", "karaoke" ]

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('\n\n');
  let rainbowTitle;

  figlet('Pertento', { font: 'Basic', width: 80 }, (err, data) => {
    console.log(gradient.pastel(data));
  });

  await sleep(2000);
  // rainbowTitle.stop();
  console.log('\n');
  await checkDependencies();
  console.log('\n');

  const { devOrProd } = await inquirer.prompt({
    name: 'devOrProd',
    type: 'list',
    message: 'Are you setting up for development?',
    choices: ['Development', 'Production servers'],
  });

  console.log(devOrProd);

  console.log('\n\n\n');
}

await main();
