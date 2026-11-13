export type MenuItem = {
  title: string;
  description: string;
  price: number;
  category: string;
};

export const menuItems: MenuItem[] = [
  // --- КОФЕ ---
  { title: 'Двойной Эспрессо', description: '110 ₽ - 100 мл', price: 110, category: 'Кофе' },
  { title: 'Американо', description: '120 ₽ - 200 мл | 140 ₽ - 300 мл', price: 120, category: 'Кофе' },
  { title: 'Капучино', description: '190 ₽ - 200 мл | 210 ₽ - 300 мл | 230 ₽ - 400 мл', price: 190, category: 'Кофе' },
  { title: 'Флэт Уайт', description: '170 ₽', price: 170, category: 'Кофе' },
  { title: 'Раф Классик', description: '190 ₽ - 200 мл | 240 ₽ - 300 мл', price: 190, category: 'Кофе' },
  { title: 'Латте', description: '190 ₽ - 200 мл | 210 ₽ - 300 мл | 230 ₽ - 400 мл', price: 190, category: 'Кофе' },
  { title: 'Фраппе', description: '240 ₽ - 400 мл', price: 240, category: 'Кофе' },
  { title: 'Матча Латте', description: '110 ₽ - 200 мл | 190 ₽ - 300 мл', price: 110, category: 'Кофе' },
  { title: 'Бамбл Кофе', description: '240 ₽ - 300 мл', price: 240, category: 'Кофе' },
  { title: 'Раф Лавандовый', description: '210 ₽ - 200 мл | 250 ₽ - 300 мл', price: 210, category: 'Кофе' },
  { title: 'Раф Дыня Кумбат', description: '210 ₽ - 200 мл | 250 ₽ - 300 мл', price: 210, category: 'Кофе' },
  { title: 'Раф Сникерс', description: '210 ₽ - 200 мл | 250 ₽ - 300 мл', price: 210, category: 'Кофе' },

  // --- НЕ КОФЕ ---
  { title: 'Какао', description: '150 ₽ - 200 мл | 170 ₽ - 300 мл', price: 150, category: 'Не кофе' },
  { title: 'Горячий Шоколад', description: '150 ₽ - 200 мл | 170 ₽ - 300 мл', price: 150, category: 'Не кофе' },
  { title: 'Молочный Коктейль', description: '250 ₽', price: 250, category: 'Не кофе' },
  { title: 'Чай', description: '50 ₽ - 300 мл', price: 50, category: 'Не кофе' },

  // --- СЕЗОННОЕ МЕНЮ ---
  { title: 'Какао с пряностями', description: '350 ₽ - 300 мл', price: 350, category: 'Сезонное' },
  { title: 'Айриш Крем', description: 'Кофе 350 ₽ - 300 мл', price: 350, category: 'Сезонное' },
  { title: 'Пряничный домик', description: 'Латте 350 ₽ - 300 мл', price: 350, category: 'Сезонное' },
  { title: 'Лесной апельсин', description: 'Бабл-ти 350 ₽ - 500 мл', price: 350, category: 'Сезонное' },
  { title: 'Рождественский вечер', description: 'Глинтвейн 350 ₽ - 500 мл', price: 350, category: 'Сезонное' },

  // --- БАБЛ-ТИ ---
  { title: 'Классик', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Сакура Роза', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Малиновый шоколад', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Закат сакуры', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Орео', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Кокос миндаль', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Lemon Blu', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Манго Маракуйя', description: '500 мл', price: 250, category: 'Бабл-ти' },
  { title: 'Матча Клубника', description: '500 мл', price: 250, category: 'Бабл-ти' },

  // --- ВЫПЕЧКА ---
  { title: 'Круассан', description: 'С тунцом, пепперони или курицей', price: 260, category: 'Выпечка' },
  { title: 'Панини', description: 'Сытные сэндвичи с соусом', price: 260, category: 'Выпечка' },

  // --- ДОПОЛНИТЕЛЬНО ---
  { title: 'Сироп', description: '50 ₽', price: 50, category: 'Дополнительно' },
  { title: 'Маршмеллоу', description: '50 ₽', price: 50, category: 'Дополнительно' },
  { title: 'Тапиока', description: '50 ₽', price: 50, category: 'Дополнительно' },
  { title: 'Альтернативное молоко', description: '50 ₽', price: 50, category: 'Дополнительно' },
  { title: 'Безлактозное молоко', description: '50 ₽', price: 50, category: 'Дополнительно' },
  { title: 'Сублимированный кофе', description: '140 ₽', price: 140, category: 'Дополнительно' },
  { title: 'Дрип кофе', description: '140 ₽', price: 140, category: 'Дополнительно' },
];

const bestSellersTitles = [
  'Латте', 'Американо', 'Двойной Эспрессо', 'Орео', 'Панини', 'Круассан', 'Раф Лавандовый', 'Капучино', 'Молочный Коктейль', 'Рождественский вечер'
];

export const bestSellers = menuItems.filter(item => 
  bestSellersTitles.includes(item.title)
);

// --- ДАННЫЕ ДЛЯ ФОТОКАРТОЧЕК (ТОЛЬКО 8 ШТУК) ---
export type MenuCardItem = MenuItem & {
  image: string;
};

const photoSelection = [
  { title: 'Классик', image: '/menu/bubtea.jpg' },
  { title: 'Двойной Эспрессо', image: '/menu/expresso.jpg' },
  { title: 'Круассан', image: '/menu/cruas.jpg' },
  { title: 'Американо', image: '/menu/americano.jpg' },
  { title: 'Латте', image: '/menu/latte.jpg' },
  { title: 'Какао', image: '/menu/kakao.jpg' },
  { title: 'Капучино', image: '/menu/kapuch.jpg' },
  { title: 'Панини', image: '/menu/panini.jpg' },
] as const;

export const menuCards: MenuCardItem[] = photoSelection.map(({ title, image }) => {
  const item = menuItems.find((item) => item.title === title);
  if (!item) throw new Error(`Не найдена позиция для фотографии: ${title}`);
  return { ...item, image };
});