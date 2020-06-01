import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import Mailgen from 'mailgen';

dotenv.config();

const gen = new Mailgen({
  theme: 'salted',
  product: {
    name: 'Recall Sequelize',
    link: '#',
  },
});

const generateEmail = (name, intro, instructions, buttonText, link) => ({
  body: {
    name,
    intro,
    action: {
      instructions,
      button: {
        color: '#33b5e5',
        text: buttonText,
        link,
      },
    },
    outro: 'Need help, or have questions? Just reply to this email, we would love to help.',
  },
});

const sendMail = async (email, name) => {
  const emailBody = generateEmail(
    name,
    'Welcome, this is Barefoot Nomad',
    'Please confirm your email',
    'Confirm email',
    '#',
  );
  const template = gen.generate(emailBody);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`,
    from: 'recall@noreply',
    subject: 'Recall Sequelize confirmation email',
    text: `${name} Welcome to recall, please confirm your email`,
    html: template,
  };

  await sgMail.send(msg);
};

sendMail('abdoulniyigena@gmail.com', 'Abdoul');
