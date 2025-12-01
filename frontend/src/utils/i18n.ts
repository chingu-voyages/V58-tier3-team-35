import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import ar from "../locales/ar.json";
import es from "../locales/es.json";
import ja from "../locales/ja.json";
import ru from "../locales/ru.json";
import hi from "../locales/hi.json";
import de from "../locales/de.json";
import fr from "../locales/fr.json";
import pt from "../locales/pt.json";
import zh from "../locales/zh.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      es: { translation: es },
      ja: { translation: ja },
      ru: { translation: ru },
      hi: { translation: hi },
      de: { translation: de },
      fr: { translation: fr },
      pt: { translation: pt },
      zh: { translation: zh },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    debug: true,
  });

export default i18n;
