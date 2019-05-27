import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport"; 
import jwt from "jsonwebtoken";

// 비밀값을 생성할 함수 
export const secretGenerator = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

// 이메일을 보낼 함수 
export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }
    const client = nodemailer.createTransport(sgTransport(options)); 
    return client.sendMail(email);
}; 

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "woochan@prismagram.com", 
        to: address, 
        subject: "Login Secret for Prismagram  🔒",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/> Copy paste on the app/website to Log in`
    };
    return sendMail(email);
}

// passport- JWT token 생성 함수 
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET); 