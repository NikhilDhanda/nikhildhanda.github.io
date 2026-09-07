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

  try {
    localStorage.setItem("portfolio-language", language);
  } catch {
    // The language switch still works when storage is unavailable.
  }
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
  }
});

let savedLanguage;
try {
  savedLanguage = localStorage.getItem("portfolio-language");
} catch {
  savedLanguage = null;
}
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

const navLinks = [...navigation.querySelectorAll("a[href^='#']")];
const trackedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-current", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-30% 0px -60%", threshold: [0, .2, .5] });
  trackedSections.forEach((section) => sectionObserver.observe(section));
}
