import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export default function formatDate(date: Date): string {
  const formattedDate = format(date, "dd 'de' MMM 'de' yyyy", { 
    locale: pt
  });

  return formattedDate;
}