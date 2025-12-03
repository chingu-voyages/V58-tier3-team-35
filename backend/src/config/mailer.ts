import { UseSend } from "usesend-js";

const mailer = new UseSend(process.env.MAILER_API_KEY);
if (!mailer)
  throw new Error(
    "Mailer could not be initialized, Please ensure you have a valid API Key"
  );

const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  mailer.emails.send({
    to,
    from: "ChinguVerse <chinguverse@mail.afuwapetunde.com>",
    subject,
    html,
  });
};

export default sendEmail;
