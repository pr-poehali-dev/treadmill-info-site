import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Treadmill {
  id: number;
  name: string;
  model: string;
  maxSpeed: string;
  power: string;
  runningArea: string;
  price: string;
  image: string;
  features: string[];
  description: string;
  pros: string[];
  cons: string[];
  specs: { label: string; value: string }[];
}

const treadmills: Treadmill[] = [
  {
    id: 1,
    name: 'ProRunner X5',
    model: 'PRX-5000',
    maxSpeed: '20 км/ч',
    power: '3.0 HP',
    runningArea: '140 x 50 см',
    price: '89 990 ₽',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
    features: ['Амортизация', 'LCD дисплей', 'Bluetooth'],
    description: 'Профессиональная беговая дорожка ProRunner X5 создана для интенсивных тренировок дома. Мощный двигатель 3.0 HP обеспечивает плавный ход даже на максимальных скоростях до 20 км/ч. Широкое беговое полотно 140x50 см подходит для бегунов любого роста.',
    pros: [
      'Мощный двигатель 3.0 HP',
      'Максимальная скорость 20 км/ч',
      'Система амортизации защищает суставы',
      'Большой LCD дисплей с подсветкой',
      'Bluetooth для синхронизации с приложениями'
    ],
    cons: [
      'Высокая цена',
      'Требует много места',
      'Не складывается'
    ],
    specs: [
      { label: 'Максимальная скорость', value: '20 км/ч' },
      { label: 'Мощность двигателя', value: '3.0 HP' },
      { label: 'Размер бегового полотна', value: '140 x 50 см' },
      { label: 'Максимальный вес пользователя', value: '150 кг' },
      { label: 'Угол наклона', value: '0-15%' },
      { label: 'Количество программ', value: '24' },
      { label: 'Габариты', value: '180 x 85 x 145 см' },
      { label: 'Вес', value: '85 кг' }
    ]
  },
  {
    id: 2,
    name: 'HomeRun Elite',
    model: 'HRE-2500',
    maxSpeed: '16 км/ч',
    power: '2.5 HP',
    runningArea: '130 x 45 см',
    price: '54 990 ₽',
    image: 'https://images.unsplash.com/photo-1638443115523-0d7e538f7e3a?w=800&h=600&fit=crop',
    features: ['Складная', 'USB порт', '12 программ'],
    description: 'HomeRun Elite — идеальное решение для домашних тренировок. Складная конструкция экономит место в квартире, а 12 встроенных программ разнообразят ваши пробежки.',
    pros: [
      'Компактная складная конструкция',
      'Доступная цена',
      '12 тренировочных программ',
      'USB порт для зарядки',
      'Тихий двигатель'
    ],
    cons: [
      'Небольшое беговое полотно',
      'Максимальная скорость 16 км/ч',
      'Базовая амортизация'
    ],
    specs: [
      { label: 'Максимальная скорость', value: '16 км/ч' },
      { label: 'Мощность двигателя', value: '2.5 HP' },
      { label: 'Размер бегового полотна', value: '130 x 45 см' },
      { label: 'Максимальный вес пользователя', value: '120 кг' },
      { label: 'Угол наклона', value: '0-10%' },
      { label: 'Количество программ', value: '12' },
      { label: 'Габариты', value: '160 x 75 x 130 см' },
      { label: 'Вес', value: '55 кг' }
    ]
  },
  {
    id: 3,
    name: 'FitMax Pro',
    model: 'FMP-3000',
    maxSpeed: '18 км/ч',
    power: '2.8 HP',
    runningArea: '135 x 48 см',
    price: '67 990 ₽',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop',
    features: ['Wi-Fi', 'Пульсометр', 'Наклон 15%'],
    description: 'FitMax Pro сочетает современные технологии и надежность. Wi-Fi подключение позволяет синхронизировать тренировки с облаком, а встроенный пульсометр контролирует ваш пульс.',
    pros: [
      'Wi-Fi и облачная синхронизация',
      'Встроенный пульсометр',
      'Угол наклона до 15%',
      'Хорошее соотношение цена-качество',
      'Среднее беговое полотно'
    ],
    cons: [
      'Не складывается',
      'Средний вес пользователя',
      'Шумноват на высоких скоростях'
    ],
    specs: [
      { label: 'Максимальная скорость', value: '18 км/ч' },
      { label: 'Мощность двигателя', value: '2.8 HP' },
      { label: 'Размер бегового полотна', value: '135 x 48 см' },
      { label: 'Максимальный вес пользователя', value: '130 кг' },
      { label: 'Угол наклона', value: '0-15%' },
      { label: 'Количество программ', value: '18' },
      { label: 'Габариты', value: '170 x 80 x 135 см' },
      { label: 'Вес', value: '68 кг' }
    ]
  }
];

const TreadmillDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [treadmill, setTreadmill] = useState<Treadmill | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      const found = treadmills.find(t => t.id === parseInt(id));
      setTreadmill(found || null);
    }
  }, [location]);

  if (!treadmill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Беговая дорожка не найдена</h2>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Activity" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-secondary">RunReview</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <img 
              src={treadmill.image} 
              alt={treadmill.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div>
            <Badge variant="secondary" className="mb-3">{treadmill.model}</Badge>
            <h2 className="text-4xl font-bold text-secondary mb-4">{treadmill.name}</h2>
            <p className="text-3xl font-bold text-primary mb-6">{treadmill.price}</p>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {treadmill.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {treadmill.features.map((feature, idx) => (
                <Badge key={idx} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Купить
              </Button>
              <Button size="lg" variant="outline">
                <Icon name="Heart" size={20} />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="specs" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="pros">Преимущества</TabsTrigger>
            <TabsTrigger value="cons">Недостатки</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {treadmill.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pros" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {treadmill.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cons" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {treadmill.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icon name="XCircle" size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Остались вопросы?</h3>
          <p className="text-muted-foreground mb-6">Наши эксперты помогут подобрать идеальную беговую дорожку</p>
          <Button size="lg">
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Связаться с экспертом
          </Button>
        </div>
      </div>

      <footer className="py-8 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 RunReview. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default TreadmillDetail;
