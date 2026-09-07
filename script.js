const languageButtons = document.querySelectorAll("[data-language]");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".primary-nav");

function setLanguage(language) {
  const isJapanese = language === "ja";
  document.documentElement.lang = language;
  document.title = isJapanese
    ? "Nikhil Dhanda — サイバーセキュリティ＆コンピューティング"
    : "Nikhil Dhanda — Cybersecurity & Computing";

  document.querySelectorAll(".lang-en").forEach((element) => {
    element.hidden = isJapanese;
  });
  document.querySelectorAll(".lang-ja").forEach((element) => {
    element.hidden = !isJapanese;
  });
  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("portfolio-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const savedLanguage = localStorage.getItem("portfolio-language");
const preferredLanguage = navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
setLanguage(savedLanguage || preferredLanguage);

document.querySelector("#year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
