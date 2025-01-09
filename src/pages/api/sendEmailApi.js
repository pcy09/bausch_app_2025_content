import nodemailer from 'nodemailer';

const generateRandomNumber = () => {
  const number = Math.floor(Math.random() * 90000) + 10000; // 10000에서 99999 사이의 숫자
  return number.toString();
};

const sendEmail = async (req, res) => {
  const { email } = req.body;

  const randomNumber = generateRandomNumber(); // 랜덤 숫자 생성

  const transporter = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
      user: 'wldnr1208@naver.com',
      pass: 'Z24MSUX88788',
    },
  });

  try {
    const response = await transporter.sendMail({
      from: 'wldnr1208@naver.com', // 발신자 주소
      to: email, // 수신자 주소
      subject: 'Test Email from Next.js using Naver', // 제목
      text: `Your verification code is: ${randomNumber}`, // 본문, 랜덤 숫자 포함
    });
    console.log('Email sent: ', response);
    console.log('Message sent: %s', response.messageId);
    res.status(200).json({ status: 'success', message: `${randomNumber}`, response });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to send email', error });
  }
};

export default sendEmail;
