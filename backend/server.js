const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "renatdasania8@gmail.com",
    pass: "lhez jffg zonc dcsi",
  },
});

app.post("/send-form", (req, res) => {
  console.log("Получены данные:", req.body);

  const { name, phone, message } = req.body; // Изменил с email на phone

  if (!name || !phone) {
    return res.status(400).json({ error: "Не хватает name или phone" });
  }

  const mailOptions = {
    from: "renatdasania8@gmail.com",
    to: "renatdasania8@gmail.com",
    subject: "Новая заявка с сайта",
    text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${
      message || "Не указано"
    }`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Ошибка отправки:", error);
      return res.status(500).json({ error: "Ошибка при отправке письма" });
    }
    console.log("Письмо отправлено:", info.response);
    res.json({ message: "Сообщение отправлено!" });
  });
});

app.get("/", (req, res) => {
  res.send(
    "Бэкенд работает! Теперь можно отправлять POST-запросы на /send-form"
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
