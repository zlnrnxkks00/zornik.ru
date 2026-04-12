import type {
  TaroCardData,
  TaroCardResponse,
  LenormandCardData,
  LenormandCardResponse,
  CombinationResponse,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа
const REQUEST_TIMEOUT = 15000; // 15 секунд

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

function fetchWithTimeout(input: RequestInfo, init?: RequestInit): Promise<Response> {
  return fetch(input, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT) });
}

export async function fetchTaroCard(id: number): Promise<TaroCardData | null> {
  const cacheKey = `taro-card-${id}`;
  const cached = getCached<TaroCardData>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetchWithTimeout(`${API_URL}/taro/cards/${id}`);
    if (!response.ok) {
      console.error(`[fetchTaroCard] HTTP ${response.status} for card ${id}`);
      throw new Error(`HTTP error ${response.status}`);
    }

    const json: TaroCardResponse = await response.json();
    const cardData = Object.values(json.data)[0];
    if (!cardData) throw new Error(`HTTP error ${response.status}`);

    setCache(cacheKey, cardData);
    return cardData;
  } catch (error) {
    console.error(`[fetchTaroCard] Error fetching card ${id}:`, error);
    throw error;
  }
}

export async function fetchLenormandCard(id: number): Promise<LenormandCardData | null> {
  const cacheKey = `lenormand-card-${id}`;
  const cached = getCached<LenormandCardData>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetchWithTimeout(`${API_URL}/lenormand/cards/${id}`);
    if (!response.ok) {
      console.error(`[fetchLenormandCard] HTTP ${response.status} for card ${id}`);
      throw new Error(`HTTP error ${response.status}`);
    }

    const json: LenormandCardResponse = await response.json();
    const cardData = Object.values(json.data)[0];
    if (!cardData) throw new Error(`HTTP error ${response.status}`);

    setCache(cacheKey, cardData);
    return cardData;
  } catch (error) {
    console.error(`[fetchLenormandCard] Error fetching card ${id}:`, error);
    throw error;
  }
}

export async function fetchCombination(
  deck: "taro" | "lenormand",
  ids: [number, number]
): Promise<string[] | null> {
  const cacheKey = `combination-${deck}-${ids[0]}_${ids[1]}`;
  const cached = getCached<string[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetchWithTimeout(`${API_URL}/${deck}/combination`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!response.ok) {
      console.error(`[fetchCombination] HTTP ${response.status} for ${deck} ids=${ids}`);
      return null;
    }

    const json: CombinationResponse = await response.json();
    const texts = json.data.combination.map((item) => item.text);

    setCache(cacheKey, texts);
    return texts;
  } catch (error) {
    console.error(`[fetchCombination] Error for ${deck} ids=${ids}:`, error);
    throw error;
  }
}
