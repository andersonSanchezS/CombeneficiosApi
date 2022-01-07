const nodemailer = require('nodemailer');

module.exports = {
  sendEmail(email, subject, message) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'combeneficios@gmail.com',
        pass: 'imxfozzavjyusbpb',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const MailOptions = {
      from: 'Combeneficios',
      to: `${email}`,
      subject: subject,

      html: `
    ${message}
            `,
    };

    transporter.sendMail(MailOptions, (error, info) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log('email enviado');
      }
    });
  },
};
