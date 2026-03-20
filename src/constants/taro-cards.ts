import { TCard, TTypeCardTaro } from "../types";

import shut_0 from "../assets/taro/0_fool.png";
import magician_1 from "../assets/taro/1_magician.png";
import high_priestess_2 from "../assets/taro/2_high_priestess.png"
import imperatritsa_3 from "../assets/taro/3_imperatritsa.png"
import imperator_4 from "../assets/taro/4_imperator.png"
import hierophant_5 from "../assets/taro/5_hierophant.png"
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
import tuz_kubki_22 from "../assets/taro/2_cups.png";

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
      { id: 16, name: "Башня", image: tower_16},
      { id: 17, name: "Звезда", image: star_17 },
      { id: 18, name: "Луна", image: moon_18 },
      { id: 19, name: "Солнце", image: sun_19 },
      { id: 20, name: "Суд", image: judgement_20 },
      { id: 21, name: "Мир", image: world_21 },
    ],
  },
  {
    title: "Кубки",
    cards: [
      { id: 22, name: "Туз кубков", image: tuz_kubki_22 },
      { id: 23, name: "Двойка кубков", image: shut_0 },
      { id: 24, name: "Тройка кубков", image: shut_0 },
      { id: 25, name: "Четверка кубков", image: shut_0 },
      { id: 26, name: "Пятерка кубков", image: shut_0 },
      { id: 27, name: "Шестерка кубков", image: shut_0 },
      { id: 28, name: "Семерка кубков", image: shut_0 },
      { id: 29, name: "Восьмерка кубков", image: shut_0 },
      { id: 30, name: "Девятка кубков", image: shut_0 },
      { id: 31, name: "Десятка кубков", image: shut_0 },
      { id: 32, name: "Паж кубков", image: shut_0 },
      { id: 33, name: "Рыцарь кубков", image: shut_0 },
      { id: 34, name: "Королева кубков", image: shut_0 },
      { id: 35, name: "Король кубков", image: shut_0 },
    ],
  },
  {
    title: "Пентакли",
    cards: [
      { id: 36, name: "Туз пентаклей", image: shut_0 },
      { id: 37, name: "Двойка пентаклей", image: shut_0 },
      { id: 38, name: "Тройка пентаклей", image: shut_0 },
      { id: 39, name: "Четверка пентаклей", image: shut_0 },
      { id: 40, name: "Пятерка пентаклей", image: shut_0 },
      { id: 41, name: "Шестерка пентаклей", image: shut_0 },
      { id: 42, name: "Семерка пентаклей", image: shut_0 },
      { id: 43, name: "Восьмерка пентаклей", image: shut_0 },
      { id: 44, name: "Девятка пентаклей", image: shut_0 },
      { id: 45, name: "Десятка пентаклей", image: shut_0 },
      { id: 46, name: "Паж пентаклей", image: shut_0 },
      { id: 47, name: "Рыцарь пентаклей", image: shut_0 },
      { id: 48, name: "Королева пентаклей", image: shut_0 },
      { id: 49, name: "Король пентаклей", image: shut_0 },
    ],
  },
  {
    title: "Мечи",
    cards: [
      { id: 50, name: "Туз мечей", image: shut_0 },
      { id: 51, name: "Двойка мечей", image: shut_0 },
      { id: 52, name: "Тройка мечей", image: shut_0 },
      { id: 53, name: "Четверка мечей", image: shut_0 },
      { id: 54, name: "Пятерка мечей", image: shut_0 },
      { id: 55, name: "Шестерка мечей", image: shut_0 },
      { id: 56, name: "Семерка мечей", image: shut_0 },
      { id: 57, name: "Восьмерка мечей", image: shut_0 },
      { id: 58, name: "Девятка мечей", image: shut_0 },
      { id: 59, name: "Десятка мечей", image: shut_0 },
      { id: 60, name: "Паж мечей", image: shut_0 },
      { id: 61, name: "Рыцарь мечей", image: shut_0 },
      { id: 62, name: "Королева мечей", image: shut_0 },
      { id: 63, name: "Король мечей", image: shut_0 },
    ],
  },
  {
    title: "Жезлы",
    cards: [
      { id: 64, name: "Туз жезлов", image: shut_0 },
      { id: 65, name: "Двойка жезлов", image: shut_0 },
      { id: 66, name: "Тройка жезлов", image: shut_0 },
      { id: 67, name: "Четверка жезлов", image: shut_0 },
      { id: 68, name: "Пятерка жезлов", image: shut_0 },
      { id: 69, name: "Шестерка жезлов", image: shut_0 },
      { id: 70, name: "Семерка жезлов", image: shut_0 },
      { id: 71, name: "Восьмерка жезлов", image: shut_0 },
      { id: 72, name: "Девятка жезлов", image: shut_0 },
      { id: 73, name: "Десятка жезлов", image: shut_0 },
      { id: 74, name: "Паж жезлов", image: shut_0 },
      { id: 75, name: "Рыцарь жезлов", image: shut_0 },
      { id: 76, name: "Королева жезлов", image: shut_0 },
      { id: 77, name: "Король жезлов", image: shut_0 },
    ],
  },
];