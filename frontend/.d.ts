export {}

declare global {
    interface URLSearchParams {
      get(key: string | null): string | null;
    }
  }