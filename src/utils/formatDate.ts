const formatDate = {
  short: (dateString: string, locale = 'es-ES') =>
    new Date(dateString).toLocaleDateString(locale),

  full: (dateString: string, locale = 'es-ES') =>
    new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
};

export default formatDate;
