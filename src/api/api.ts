import type {
  TaroCardData,
  TaroCardResponse,
  LenormandCardData,
  LenormandCardResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage может быть переполнен
  }
}

export async function fetchTaroCard(id: number): Promise<TaroCardData | null> {
  const cacheKey = `taro-card-${id}`;
  const cached = getCached<TaroCardData>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_URL}/taro/cards/${id}`);
  if (!response.ok) return null;

  const json: TaroCardResponse = await response.json();
  const cardData = Object.values(json.data)[0];
  if (!cardData) return null;

  setCache(cacheKey, cardData);
  return cardData;
}

export async function fetchLenormandCard(id: number): Promise<LenormandCardData | null> {
  const cacheKey = `lenormand-card-${id}`;
  const cached = getCached<LenormandCardData>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_URL}/lenormand/cards/${id}`);
  if (!response.ok) return null;

  const json: LenormandCardResponse = await response.json();
  const cardData = Object.values(json.data)[0];
  if (!cardData) return null;

  setCache(cacheKey, cardData);
  return cardData;
}
