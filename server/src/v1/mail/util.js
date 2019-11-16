const getMailData = ({ from, to, subject, text, attachments = [] }) => {
  // filename, buffer -> content, mimetype -> contentType
  attachments = attachments.map(attachment => ({
    name: attachment.originalname,
    content: attachment.buffer,
    contentType: attachment.mimetype,
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
  const { DEFAULT_DOMAIN_NAME, MAIL_AUTH_USER, MAIL_AUTH_PASS } = process.env;
  return {
    host: `mail.${DEFAULT_DOMAIN_NAME}`,
    port: 465,
    secure: true,
    auth: {
      user: MAIL_AUTH_USER,
      pass: MAIL_AUTH_PASS,
    },
  };
};

export default {
  getMailData,
  getTransport,
};
