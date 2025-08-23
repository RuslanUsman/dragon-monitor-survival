export const formatDateTime = (iso) =>
  new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));

export const secondsToHours = (sec) => (sec / 3600).toFixed(1);
