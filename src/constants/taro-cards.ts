import { TCard, TTypeCardTaro } from "../types";
import shut_0 from "../assets/taro/0_shut.png";
import mag_1 from "../assets/taro/1_mag.png";
import tuz_kubki_22 from "../assets/taro/22_tuz_kubki.png";

export const TARO_CARDS: { title: TTypeCardTaro; cards: TCard[] }[] = [
  {
    title: "Старшие арканы",
    cards: [
      {
        id: 0,
        name: "Шут",
        image: shut_0,
      },

      {
        id: 1,
        name: "Маг",
        image: mag_1,
      },
      // Дописать оставшиеся
    ],
  },
  {
    title: "Кубки",
    cards: [
      {
        id: 22,
        name: "Туз кубков",
        image: tuz_kubki_22,
      },
      // Дописать оставшиеся
    ],
  },

  {
    title: "Пентакли",
    cards: [
      // Дописать оставшиеся
    ],
  },

  {
    title: "Мечи",
    cards: [
      // Дописать оставшиеся
    ],
  },

  {
    title: "Жезлы",
    cards: [
      // Дописать оставшиеся
    ],
  },
];
