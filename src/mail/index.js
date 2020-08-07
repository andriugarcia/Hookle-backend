const sgMail = require('@sendgrid/mail');
const template = require('./templates/confirmation.js')
sgMail.setApiKey('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');

const msg = {
  to: 'gvdrews@gmail.com',
  from: 'noreply@pickalook.co',
  subject: 'Verifica tu Email',
  text: 'and easy to do anywhere, even with Node.js',
  html: template(),
};
sgMail.send(msg).then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })