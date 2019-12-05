import nodemailer from 'nodemailer';
import uuidv4 from 'uuid/v4';
import replace from './replace';

const { DEFAULT_DOMAIN_NAME, SMTP_PORT, MAIL_AUTH_USER, MAIL_AUTH_PASS } = process.env;

const getSingleMailData = ({ from, to, subject, text, html, attachments = [] }) => {
  // filename, buffer -> content, mimetype -> contentType
  attachments = attachments.map(({ originalname, buffer, mimetype, url, size }) => ({
    filename: originalname,
    content: buffer.toString('base64'),
    url,
    contentType: mimetype,
    encoding: 'base64',
    size,
  }));

  const dsn = {
    id: uuidv4(),
    return: 'full',
    notify: ['failure'],
    recipient: from,
  };

  return {
    from,
    to,
    subject: subject || '제목없음',
    text,
    html,
    attachments,
    dsn,
  };
};

const getTransport = (user = {}) => {
  return {
    host: `mail.${DEFAULT_DOMAIN_NAME}`,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: user.email || MAIL_AUTH_USER,
      pass: user.password || MAIL_AUTH_PASS,
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

const createMailTemplateToFindPassword = password => {
  return `
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet">
    <h1 style="font-family: 'Noto Sans KR', sans-serif;">임시 비밀번호를</h1>
    <h1 style="color: #3742fa; font-family: 'Noto Sans KR', sans-serif;">알려드립니다.</h1>
    <img src="https://user-images.githubusercontent.com/33617083/68571001-457a9d80-04a5-11ea-9a47-98c0fd36a1d9.png"/>
    <p style="font-family: 'Noto Sans KR', sans-serif;"><span style="font-size: 20px; margin-left: 5px; font-weight: bold">임시 비밀번호: </span>
    <span style="color: #3742fa; font-size: 20px; font-weight: bold;">${password}</span></p>
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
    from: '"Daitnu" no-reply@daitnu.com',
    to: email,
    subject: '[Daitnu] 요청하신 아이디를 알려드립니다.',
    html: createMailTemplateToFindId(id),
  };

  sendMail(mailData);
};

const sendMailToFindPassword = ({ password, email }) => {
  const mailData = {
    from: '"Daitnu" no-reply@daitnu.com',
    to: email,
    subject: '[Daitnu] 임시 비밀번호를 알려드립니다.',
    html: createMailTemplateToFindPassword(password),
  };

  sendMail(mailData);
};

export default {
  getSingleMailData,
  getTransport,
  sendMailToFindId,
  sendMailToFindPassword,
};
