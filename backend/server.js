const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Настройка отправки писем (например, заявки с сайта)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "renatdasania8@gmail.com", // Замените на ваш Gmail
    pass: "lhez jffg zonc dcsi", // Пароль или ключ приложения
  },
});

// Обработка формы
app.post("/send-form", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: "renatdasania8@gmail.com",
    to: "renatdasania8@gmail.com", // Ваш email для заявок
    subject: "Новая заявка с сайта",
    text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Сообщение отправлено!");
  });
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(
    "Бэкенд работает! Теперь можно отправлять POST-запросы на /send-form"
  );
});
