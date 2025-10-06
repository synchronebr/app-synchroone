export function formatDateByLocale(dateInput: any, locale = 'pt-BR') {
    const timeZone = locale === 'pt-BR' ? 'America/Sao_Paulo' : 'UTC';
  
    const date = new Date(dateInput);
  
    return date.toLocaleString(locale, {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }