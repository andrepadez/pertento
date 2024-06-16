import fs from 'node:fs';
import inquirer from 'inquirer';

// Define an array of environment variables with their default values
const envVariables = [
  {
    name: 'Are you setting up for production (P) or development (D)?',
    default: 'development',
    validate: (input) => {
      return ['p', 'd', 'production', 'development'].includes(input.toLowerCase());
    },
  },
  { name: 'AUTH_PORT', default: '8000' },
  { name: 'API_PORT', default: '8001' },
  { name: 'EXPERIMENTS_PORT', default: '8002' },
  { name: 'GAN_PORT', default: '8003' },
  { name: 'STATISTICS_PORT', default: '8004' },
  { name: 'NOTIFIER_PORT', default: '8005' },
  { name: 'DASHBOARD_PORT', default: '3000' },
  { name: 'EDITOR_PORT', default: '3001' },
  { name: 'POSTGRES_URL', default: 'postgres://postgres:postgres@localhost:5432/pertento' },
  { name: 'JWT_SECRET', default: 'pertento' },
  { name: 'MAIL_TRANSPORT', default: 'smtp://127.0.0.1:1025' },
  { name: 'GOOGLE_AUTH_CLIENT_ID' },
  { name: 'GOOGLE_AUTH_CLIENT_SECRET' },
];

// Create an array of questions for inquirer.prompt()
const questions = envVariables.map((variable) => {
  const question = {
    type: 'input',
    name: variable.name,
    default: variable.default,
  };
  question.validate = variable.validate || (() => true);
  if (!variable.default) {
    question.message = `Enter value for ${variable.name} (you can leave this blank for now):`;
    question.default = '';
  } else {
    question.message = `Enter value for ${variable.name}`;
  }

  return question;
});

// Prompt the user for input
inquirer.prompt(questions).then((answers) => {
  // Write the user's answers to a new .env file
  const productionAnswer = Object.values(answers)[0].toLowerCase();
  const isProduction = productionAnswer === 'p' || productionAnswer === 'production';

  const newEnv = Object.entries(answers)
    .slice(1)
    .map(([key, value]) => `${key}="${value}"`)
    .concat(
      isProduction
        ? [
            `VITE_AUTH_URL="https://auth.pertento.ai"`,
            `VITE_API_URL="https://api.pertento.ai"`,
            `VITE_EXPERIMENTS_URL="https://experiments.pertento.ai"`,
            `VITE_GAN_URL="https://gan.pertento.ai"`,
            `VITE_STATISTICS_URL="https://statistics.pertento.ai"`,
            `VITE_NOTIFIER_URL="https://notifier.pertento.ai"`,
            `VITE_EDITOR_URL="https://editor.pertento.ai"`,
            `VITE_DASHBOARD_URL="https://app.pertento.ai"`,
            `VITE_GOOGLE_AUTH_CLIENT_ID="${answers.GOOGLE_AUTH_CLIENT_ID}"`,
          ]
        : [
            `VITE_AUTH_URL="http://localhost:${answers.AUTH_PORT}"`,
            `VITE_API_URL="http://localhost:${answers.API_PORT}"`,
            `VITE_EXPERIMENTS_URL="http://localhost:${answers.EXPERIMENTS_PORT}"`,
            `VITE_GAN_URL="http://localhost:${answers.GAN_PORT}"`,
            `VITE_STATISTICS_URL="http://localhost:${answers.STATISTICS_PORT}"`,
            `VITE_NOTIFIER_URL="http://localhost:${answers.NOTIFIER_PORT}"`,
            `VITE_EDITOR_URL="http://localhost:${answers.EDITOR_PORT}"`,
            `VITE_DASHBOARD_URL="http://localhost:${answers.DASHBOARD_PORT}"`,
            `VITE_GOOGLE_AUTH_CLIENT_ID="${answers.GOOGLE_AUTH_CLIENT_ID}"`,
            'BUILD_ENV="development"',
          ],
    )
    .join('\n');

  fs.writeFileSync('.env', newEnv);

  console.log('\n\n\n');
  console.log('Global .env file created with the following contents:');
  console.log('\n');
  console.log(newEnv);
  console.log('\n');
});
