document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });

      // Закрываем мобильное меню после клика
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    }
  });
});

// Изменение навбара при скролле
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Кнопка "Наверх"
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Галерея изображений
const galleryModal = document.getElementById("galleryModal");
if (galleryModal) {
  galleryModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const imgSrc = button.getAttribute("data-img");
    const modalImage = document.getElementById("modalImage");
    modalImage.src = imgSrc;
  });
}

// Обработчик формы контактов
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.disabled = true;
  submitBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Отправка...';

  // Здесь должен быть код для отправки данных на сервер
  // Вместо этого мы просто эмулируем отправку
  setTimeout(() => {
    alert("Ваше сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Отправить сообщение";
  }, 1500);
});

// Backend часть
async function sendForm(data) {
  try {
    const response = await fetch("http://localhost:3001/send-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке формы:", error);
    throw error; // Можно обработать ошибку в месте вызова
  }
}

// Обработчик формы
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };

  try {
    const result = await sendForm(formData);
    alert(result.message || "Форма успешно отправлена!");
    e.target.reset(); // Очистка формы после отправки
  } catch (error) {
    alert("Произошла ошибка при отправке. Проверьте консоль для деталей.");
  }
});
