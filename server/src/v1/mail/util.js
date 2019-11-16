const getMailData = ({ from, to, subject, text, attachments = [] }) => {
  // filename, buffer -> content, mimetype -> contentType
  attachments = attachments.map(attachment => ({
    filename: attachment.originalname,
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

export default {
  getMailData,
};
