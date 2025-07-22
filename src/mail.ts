import nodemailer, { Transporter } from "nodemailer";
import config from "config";
import { Message, NotificationTransport } from "./types/notification-type";

export class MailTransport implements NotificationTransport {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get("mail.host"),
      port: config.get("mail.port"),
      secure: false, 
      auth: {
        user: config.get("mail.auth.user"),
        pass: config.get("mail.auth.pass"),
      },
    });
  }

  async send(message: Message) {
    const info = await this.transporter.sendMail({
      from: config.get('mail.from'),
      //todo: validate for valid email.
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    //use logger
     console.log("Message sent:", info.messageId);
  }
}

