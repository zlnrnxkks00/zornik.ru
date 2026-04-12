export type TCard = {
  id: number;
  name: string;
  image: string;
};

export type TTypeCardTaro = "Старшие арканы" | "Кубки" | "Пентакли" | "Мечи" | "Жезлы";

export interface TaroCardData {
  General_Meaning: string;
  Personal_State: string;
  On_a_Deeper_Level: string;
  Professional_Situation: string;
  Financial_and_Housing_Status: string;
  Relationships: string;
  Health_Status: string;
  Reversed_Card: string;
  Manifestations_in_Combinations: string;
  Archetypal_Correspondences: string;
  Observation_Bank: string;
  Combinations: Record<string, string>;
}

export interface TaroCardResponse {
  data: Record<string, TaroCardData>;
}

export interface LenormandCardData {
  Main_Meaning: string;
  Key_value: string;
  Negative_Meaning: string;
  Relationships: string;
  Business_and_Finance: string;
  Health: string;
  Personality: string;
  Combinations: Record<string, string>;
}

export interface LenormandCardResponse {
  data: Record<string, LenormandCardData>;
}

export interface CombinationItem {
  text: string;
}

export interface CombinationResponse {
  data: {
    combination: CombinationItem[];
  };
  message: string;
}
