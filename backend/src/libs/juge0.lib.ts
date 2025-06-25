export const getJudge0LanguageId = (language: string): number | null => {
    const languageMap: Record<string, number> = {
      python: 71,
      java: 62,
      javascript: 63,
    };
  
    return languageMap[language.toLowerCase()] ?? null;
  };
  