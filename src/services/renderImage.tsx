import selectedKarina from "../assets/resource/karinaSelected.webp";
import selectedYoona from "../assets/resource/jangSelected.webp";
import selectedjangWonyoung from "../assets/resource/jangSelected.webp";
import selectedSulyoon from "../assets/resource/sulyoonSelected.webp";

export const selectedPhoto = (menubar) => {
  switch (menubar) {
    case "jang":
      return selectedjangWonyoung;
      break;
    case "karina":
      return selectedKarina;
      break;
    case "yoona":
      return selectedYoona;
      break;
    case "sulyoon":
      return selectedYoona;
      break;
    default:
      return null;
  }
};
