const { DEFAULT_DOMAIN_NAME, MAIL_AUTH_USER, MAIL_AUTH_PASS, SMTP_PORT } = process.env;

const getSingleMailData = ({ from, to, subject, text, attachments = [] }) => {
  // filename, buffer -> content, mimetype -> contentType
  attachments = attachments.map(({ originalname, buffer, mimetype }) => ({
    filename: originalname,
    content: buffer,
    contentType: mimetype,
  }));

  return {
    from,
    to,
    subject,
    text,
    attachments,
  };
};

const getTransport = () => {
  return {
    host: `mail.${DEFAULT_DOMAIN_NAME}`,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: MAIL_AUTH_USER,
      pass: MAIL_AUTH_PASS,
    },
  };
};

export default {
  getSingleMailData,
  getTransport,
};
