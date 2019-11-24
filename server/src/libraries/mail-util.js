import nodemailer from 'nodemailer';
import replace from './replace';

const { DEFAULT_DOMAIN_NAME, MAIL_AUTH_USER, MAIL_AUTH_PASS, SMTP_PORT } = process.env;

const getSingleMailData = ({ from, to, subject, text, attachments = [] }) => {
  // filename, buffer -> content, mimetype -> contentType
  attachments = attachments.map(({ originalname, buffer, mimetype }) => ({
    filename: originalname,
    content: buffer.toString('base64'),
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

const createMailTemplateToFindId = id => {
  return `
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <h1 style="font-family: 'Noto Sans KR', sans-serif;">요청하신 아이디를</h1>
    <h1 style="color: #3742fa; font-family: 'Noto Sans KR', sans-serif;">알려드립니다.</h1>
    <img src="https://user-images.githubusercontent.com/33617083/68571001-457a9d80-04a5-11ea-9a47-98c0fd36a1d9.png"/>
    <p style="font-family: 'Noto Sans KR', sans-serif;"><span style="font-size: 20px; margin-left: 5px; font-weight: bold">아이디: </span><span style="color: #3742fa; font-size: 20px; font-weight: bold;">${id}</span></p>
    <br>
    <p style="font-size: 16px; font-family: 'Noto Sans KR', sans-serif;">

    Daitnu를 이용해 주셔서 감사합니다.<br>
    더욱 편리한 서비스를 제공하기 위해 항상 최선을 다하겠습니다.<br>
    </p>
    </p><span style="font-style: italic;">Copyright ⓒ Daitnu Corp. All Rights Reserved.</span>`;
};

const sendMail = data => {
  const transport = getTransport();
  const transporter = nodemailer.createTransport(transport);

  transporter.sendMail(data);
};

const sendMailToFindId = ({ id, email }) => {
  const hideStartIndex = 1;
  const hideEndIndex = 4;

  id = replace.hideIdUseAsterisk(id, hideStartIndex, hideEndIndex);

  const mailData = {
    from: '"Daitnu" root@daitnu.com',
    to: email,
    subject: '[Daitnu] 요청하신 아이디를 알려드립니다.',
    html: createMailTemplateToFindId(id),
  };

  sendMail(mailData);
};

export default {
  getSingleMailData,
  getTransport,
  sendMailToFindId,
};
