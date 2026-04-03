import { TCard, TTypeCardTaro } from "../types";

// Старшие арканы (0-21)
import shut_0 from "../assets/taro/0_fool.png";
import magician_1 from "../assets/taro/1_magician.png";
import high_priestess_2 from "../assets/taro/2_high_priestess.png";
import imperatritsa_3 from "../assets/taro/3_imperatritsa.png";
import imperator_4 from "../assets/taro/4_imperator.png";
import hierophant_5 from "../assets/taro/5_hierophant.png";
import lovers_6 from "../assets/taro/6_lovers.png";
import kolestnitsa_7 from "../assets/taro/7_kolesnitsa.png";
import sila_8 from "../assets/taro/8_sila.png";
import otshelinek_9 from "../assets/taro/9_otshelinek.png";
import koleso_fortuna_10 from "../assets/taro/10_koleso_fortuna.png";
import justice_11 from "../assets/taro/11_justice.png";
import hangedman_12 from "../assets/taro/12_hangedman.png";
import death_13 from "../assets/taro/13_death.png";
import temperance_14 from "../assets/taro/14_temperance.png";
import devil_15 from "../assets/taro/15_devil.png";
import tower_16 from "../assets/taro/16_tower.png";
import star_17 from "../assets/taro/17_star.png";
import moon_18 from "../assets/taro/18_moon.png";
import sun_19 from "../assets/taro/19_sun.png";
import judgement_20 from "../assets/taro/20_judgement.png";
import world_21 from "../assets/taro/21_world.png";

// Жезлы / Wands (22-35)
import ace_wands from "../assets/taro/ace_wands.png";
import _2_wands from "../assets/taro/2_wands.png";
import _3_wands from "../assets/taro/3_wands.png";
import _4_wands from "../assets/taro/4_wands.png";
import _5_wands from "../assets/taro/5_wands.png";
import _6_wands from "../assets/taro/6_wands.png";
import _7_wands from "../assets/taro/7_wands.png";
import _8_wands from "../assets/taro/8_wands.png";
import _9_wands from "../assets/taro/9_wands.png";
import _10_wands from "../assets/taro/10_wands.png";
import page_wands from "../assets/taro/page_wands.png";
import knight_wands from "../assets/taro/knight_wands.png";
import queen_wands from "../assets/taro/queen_wands.png";
import king_wands from "../assets/taro/king_wands.png";

// Кубки / Cups (36-49)
import ace_cups from "../assets/taro/ace_cups.png";
import _2_cups from "../assets/taro/2_cups.png";
import _3_cups from "../assets/taro/3_cups.png";
import _4_cups from "../assets/taro/4_cups.png";
import _5_cups from "../assets/taro/5_cups.png";
import _6_cups from "../assets/taro/6_cups.png";
import _7_cups from "../assets/taro/7_cups.png";
import _8_cups from "../assets/taro/8_cups.png";
import _9_cups from "../assets/taro/9_cups.png";
import _10_cups from "../assets/taro/10_cups.png";
import page_cups from "../assets/taro/page_cups.png";
import knight_cups from "../assets/taro/knight_cups.png";
import queen_cups from "../assets/taro/queen_cups.png";
import king_cups from "../assets/taro/king_cups.png";

// Мечи / Swords (50-63)
import ace_swords from "../assets/taro/ace_swords.png";
import _2_swords from "../assets/taro/2_swords.png";
import _3_swords from "../assets/taro/3_swords.png";
import _4_swords from "../assets/taro/4_swords.png";
import _5_swords from "../assets/taro/5_swords.png";
import _6_swords from "../assets/taro/6_swords.png";
import _7_swords from "../assets/taro/7_swords.png";
import _8_swords from "../assets/taro/8_swords.png";
import _9_swords from "../assets/taro/9_swords.png";
import _10_swords from "../assets/taro/10_swords.png";
import page_swords from "../assets/taro/page_swords.png";
import knight_swords from "../assets/taro/knight_swords.png";
import queen_swords from "../assets/taro/queen_swords.png";
import king_swords from "../assets/taro/king_swords.png";

// Пентакли / Pentacles (64-77)
import ace_pentacles from "../assets/taro/ace_pentacles.png";
import _2_pentacles from "../assets/taro/2_pentacles.png";
import _3_pentacles from "../assets/taro/3_pentacles.png";
import _4_pentacles from "../assets/taro/4_pentacles.png";
import _5_pentacles from "../assets/taro/5_pentacles.png";
import _6_pentacles from "../assets/taro/6_pentacles.png";
import _7_pentacles from "../assets/taro/7_pentacles.png";
import _8_pentacles from "../assets/taro/8_pentacles.png";
import _9_pentacles from "../assets/taro/9_pentacles.png";
import _10_pentacles from "../assets/taro/10_pentacles.png";
import page_pentacles from "../assets/taro/page_pentacles.png";
import knight_pentacles from "../assets/taro/knight_pentacles.png";
import queen_pentacles from "../assets/taro/queen_pentacles.png";
import king_pentacles from "../assets/taro/king_pentacles.png";

export const TARO_CARDS: { title: TTypeCardTaro; cards: TCard[] }[] = [
  {
    title: "Старшие арканы",
    cards: [
      { id: 0, name: "Шут", image: shut_0 },
      { id: 1, name: "Маг", image: magician_1 },
      { id: 2, name: "Верховная Жрица", image: high_priestess_2 },
      { id: 3, name: "Императрица", image: imperatritsa_3 },
      { id: 4, name: "Император", image: imperator_4 },
      { id: 5, name: "Иерофант", image: hierophant_5 },
      { id: 6, name: "Влюбленные", image: lovers_6 },
      { id: 7, name: "Колесница", image: kolestnitsa_7 },
      { id: 8, name: "Сила", image: sila_8 },
      { id: 9, name: "Отшельник", image: otshelinek_9 },
      { id: 10, name: "Колесо Фортуны", image: koleso_fortuna_10 },
      { id: 11, name: "Справедливость", image: justice_11 },
      { id: 12, name: "Повешенный", image: hangedman_12 },
      { id: 13, name: "Смерть", image: death_13 },
      { id: 14, name: "Умеренность", image: temperance_14 },
      { id: 15, name: "Дьявол", image: devil_15 },
      { id: 16, name: "Башня", image: tower_16 },
      { id: 17, name: "Звезда", image: star_17 },
      { id: 18, name: "Луна", image: moon_18 },
      { id: 19, name: "Солнце", image: sun_19 },
      { id: 20, name: "Суд", image: judgement_20 },
      { id: 21, name: "Мир", image: world_21 },
    ],
  },
  {
    title: "Жезлы",
    cards: [
      { id: 22, name: "Туз жезлов", image: ace_wands },
      { id: 23, name: "Двойка жезлов", image: _2_wands },
      { id: 24, name: "Тройка жезлов", image: _3_wands },
      { id: 25, name: "Четверка жезлов", image: _4_wands },
      { id: 26, name: "Пятерка жезлов", image: _5_wands },
      { id: 27, name: "Шестерка жезлов", image: _6_wands },
      { id: 28, name: "Семерка жезлов", image: _7_wands },
      { id: 29, name: "Восьмерка жезлов", image: _8_wands },
      { id: 30, name: "Девятка жезлов", image: _9_wands },
      { id: 31, name: "Десятка жезлов", image: _10_wands },
      { id: 32, name: "Паж жезлов", image: page_wands },
      { id: 33, name: "Рыцарь жезлов", image: knight_wands },
      { id: 34, name: "Королева жезлов", image: queen_wands },
      { id: 35, name: "Король жезлов", image: king_wands },
    ],
  },
  {
    title: "Кубки",
    cards: [
      { id: 36, name: "Туз кубков", image: ace_cups },
      { id: 37, name: "Двойка кубков", image: _2_cups },
      { id: 38, name: "Тройка кубков", image: _3_cups },
      { id: 39, name: "Четверка кубков", image: _4_cups },
      { id: 40, name: "Пятерка кубков", image: _5_cups },
      { id: 41, name: "Шестерка кубков", image: _6_cups },
      { id: 42, name: "Семерка кубков", image: _7_cups },
      { id: 43, name: "Восьмерка кубков", image: _8_cups },
      { id: 44, name: "Девятка кубков", image: _9_cups },
      { id: 45, name: "Десятка кубков", image: _10_cups },
      { id: 46, name: "Паж кубков", image: page_cups },
      { id: 47, name: "Рыцарь кубков", image: knight_cups },
      { id: 48, name: "Королева кубков", image: queen_cups },
      { id: 49, name: "Король кубков", image: king_cups },
    ],
  },
  {
    title: "Мечи",
    cards: [
      { id: 50, name: "Туз мечей", image: ace_swords },
      { id: 51, name: "Двойка мечей", image: _2_swords },
      { id: 52, name: "Тройка мечей", image: _3_swords },
      { id: 53, name: "Четверка мечей", image: _4_swords },
      { id: 54, name: "Пятерка мечей", image: _5_swords },
      { id: 55, name: "Шестерка мечей", image: _6_swords },
      { id: 56, name: "Семерка мечей", image: _7_swords },
      { id: 57, name: "Восьмерка мечей", image: _8_swords },
      { id: 58, name: "Девятка мечей", image: _9_swords },
      { id: 59, name: "Десятка мечей", image: _10_swords },
      { id: 60, name: "Паж мечей", image: page_swords },
      { id: 61, name: "Рыцарь мечей", image: knight_swords },
      { id: 62, name: "Королева мечей", image: queen_swords },
      { id: 63, name: "Король мечей", image: king_swords },
    ],
  },
  {
    title: "Пентакли",
    cards: [
      { id: 64, name: "Туз пентаклей", image: ace_pentacles },
      { id: 65, name: "Двойка пентаклей", image: _2_pentacles },
      { id: 66, name: "Тройка пентаклей", image: _3_pentacles },
      { id: 67, name: "Четверка пентаклей", image: _4_pentacles },
      { id: 68, name: "Пятерка пентаклей", image: _5_pentacles },
      { id: 69, name: "Шестерка пентаклей", image: _6_pentacles },
      { id: 70, name: "Семерка пентаклей", image: _7_pentacles },
      { id: 71, name: "Восьмерка пентаклей", image: _8_pentacles },
      { id: 72, name: "Девятка пентаклей", image: _9_pentacles },
      { id: 73, name: "Десятка пентаклей", image: _10_pentacles },
      { id: 74, name: "Паж пентаклей", image: page_pentacles },
      { id: 75, name: "Рыцарь пентаклей", image: knight_pentacles },
      { id: 76, name: "Королева пентаклей", image: queen_pentacles },
      { id: 77, name: "Король пентаклей", image: king_pentacles },
    ],
  },
];
