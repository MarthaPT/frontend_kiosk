import { useTranslation } from "react-i18next";

const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLanguage = (language : string) => {
    i18n.changeLanguage(language);
  };

  return { switchLanguage };
};

export default useLanguageSwitcher;
