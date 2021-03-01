import { createTransport, createTestAccount, getTestMessageUrl } from "nodemailer";
import { constants, models } from "@fakelook/common";
import { appLoggerService } from ".";
const { clientDomain, clientPort } = constants.URLS;

export const sendSignUpEmail = async (emailAddress: string) => {
    appLoggerService.verbose("Send an email to user on signup", { emailAddress });
    const body = `<p>Hi there ${emailAddress}!</p><p>You completed signing up to Fakelook, and can now log in to <a href="${clientDomain}:${clientPort}/login">Fakelook</a>.</p>`;
    const msg: models.interfaces.Email = {
        subject: "Welcome to Fakelook! 🤗",
        body,
        plainBody: getMsgPlainText(body),
    };
    appLoggerService.verbose("Email for new user was built.", { msg });
    await sendEmail(emailAddress, msg);
};

export const sendPasswordResetEmail = async (emailAddress: string, resetToken: string) => {
    appLoggerService.verbose("Send an email to user with reset token", { emailAddress });
    const resetUrl = `${clientDomain}:${clientPort}/reset/${resetToken}`;
    const body = `<p>Hi there ${emailAddress}!</p><p>A password reset was requested fot your Fakelook account. If you did not request the reset, simply ignore this email.</p><p>In order to reset your password please <a href="${resetUrl}">click here</a>.</p><p>If the link does not work, copy this link to the browser: ${resetUrl}</p>`;
    const msg: models.interfaces.Email = {
        subject: "Fakelook - password reset",
        body,
        plainBody: getMsgPlainText(body),
    };
    appLoggerService.verbose("Email for reset password was built.", { msg });
    await sendEmail(emailAddress, msg);
};

const getMsgPlainText = (text: string) => {
    const stripped = text
        .replace(/(<\/p>|<br \/>)/g, "\n")
        .replace(/<\/?[a-z]+( [a-z\-]+=".*")*>/g, "");
    appLoggerService.verbose("Strip message from HTML tags", { text, stripped });
    return stripped;
};

const sendEmail = async (to: string, email: models.interfaces.Email) => {
    const testAccount = await createTestAccount();
    appLoggerService.verbose("Start generating a transporter, to send email", { to, email });

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    appLoggerService.verbose("Generated fake account and transporter", { ...testAccount });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Fakelook auth 🔐" <auth@fakelook.io>',
        to,
        subject: email.subject,
        text: email.plainBody,
        html: email.body,
    });
    appLoggerService.verbose("Email was sent", { msgId: info.messageId });
    appLoggerService.verbose(`Preview sent Email: ${getTestMessageUrl(info)}`, { info });
};
