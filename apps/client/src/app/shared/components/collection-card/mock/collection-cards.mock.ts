import { CollectionCard } from '@knigolub/shared';

export const COLLECTION_CARDS_MOCK: CollectionCard[] = [
  {
    id: '1',
    previewImage: '/assets/images/raster/collection-card-1.jpg',
    subtitle: 'Медленное чтение',
    title: '12 книг для долгих вечеров',
    description:
      'Спокойные истории, которые не хочется заканчивать: ' + 'семейные саги, письма и дневники.',
    avatar: null,
    author: 'Анна Верхова',
    participants: 86,
    books: 12,
  },
  {
    id: '2',
    previewImage: '/assets/images/raster/collection-card-2.jpg',
    subtitle: 'Нон-фикшн',
    title: 'Как читать внимательнее',
    description:
      'Пять книг о памяти, привычках и внимании — с практическими ' + 'заданиями для читателя.',
    avatar: null,
    author: 'Павел Крамер',
    participants: 124,
    books: 8,
  },
  {
    id: '3',
    previewImage: '/assets/images/raster/collection-card-3.jpg',
    subtitle: 'Дебюты года',
    title: 'Первые романы, о которых говорят',
    description: 'Семь дебютов 2024 года, которые собрали больше всего отзывов в клубе.',
    avatar: null,
    author: 'Мария Левина',
    participants: 58,
    books: 7,
  },
] as const;
