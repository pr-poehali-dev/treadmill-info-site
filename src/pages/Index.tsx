import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
}

const treadmills: Treadmill[] = [
  {
    id: 1,
    name: 'Swollen Compact T3',
    model: 'SC-T3',
    maxSpeed: '20 км/ч',
    power: '3.0 HP',
    runningArea: '140 x 50 см',
    price: '89 990 ₽',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=300&fit=crop',
    features: ['Амортизация', 'LCD дисплей', 'Bluetooth']
  },
  {
    id: 2,
    name: 'Swollen Compact T5',
    model: 'SC-T5',
    maxSpeed: '16 км/ч',
    power: '2.5 HP',
    runningArea: '130 x 45 см',
    price: '54 990 ₽',
    image: 'https://images.unsplash.com/photo-1638443115523-0d7e538f7e3a?w=400&h=300&fit=crop',
    features: ['Складная', 'USB порт', '12 программ']
  },
  {
    id: 3,
    name: 'Swollen Compact T9',
    model: 'SC-T9',
    maxSpeed: '18 км/ч',
    power: '2.8 HP',
    runningArea: '135 x 48 см',
    price: '67 990 ₽',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=300&fit=crop',
    features: ['Wi-Fi', 'Пульсометр', 'Наклон 15%']
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedTreadmills, setSelectedTreadmills] = useState<number[]>([]);

  const toggleComparison = (id: number) => {
    if (selectedTreadmills.includes(id)) {
      setSelectedTreadmills(selectedTreadmills.filter(tid => tid !== id));
    } else {
      setSelectedTreadmills([...selectedTreadmills, id]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Activity" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold text-secondary">RunReview</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">Обзоры</a>
          </nav>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Выбери свою беговую дорожку
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Профессиональные обзоры, детальные характеристики и честные сравнения
            </p>
            <Button size="lg" className="text-lg px-8">
              <Icon name="Search" size={20} className="mr-2" />
              Подобрать дорожку
            </Button>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-secondary mb-2">Популярные модели</h3>
              <p className="text-muted-foreground">Топовые беговые дорожки 2024 года</p>
            </div>
            {selectedTreadmills.length > 0 && (
              <Button variant="outline" className="gap-2">
                <Icon name="BarChart3" size={18} />
                Сравнить ({selectedTreadmills.length})
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treadmills.map((treadmill) => (
              <Card key={treadmill.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-muted">
                  <img 
                    src={treadmill.image} 
                    alt={treadmill.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{treadmill.name}</CardTitle>
                    <Badge variant="secondary">{treadmill.model}</Badge>
                  </div>
                  <CardDescription className="text-2xl font-bold text-primary">
                    {treadmill.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Gauge" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Макс. скорость:</span>
                      <span className="font-semibold">{treadmill.maxSpeed}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Zap" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Мощность:</span>
                      <span className="font-semibold">{treadmill.power}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Maximize2" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Беговое полотно:</span>
                      <span className="font-semibold">{treadmill.runningArea}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {treadmill.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => navigate(`/treadmill?id=${treadmill.id}`)}>
                      Подробнее
                    </Button>
                    <Button 
                      variant={selectedTreadmills.includes(treadmill.id) ? "default" : "outline"}
                      size="icon"
                      onClick={() => toggleComparison(treadmill.id)}
                    >
                      <Icon name="BarChart3" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Почему выбирают нас</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle2" size={32} />
                </div>
                <h4 className="font-bold text-lg mb-2">Честные обзоры</h4>
                <p className="text-sm text-white/80">Только реальные тесты и объективные оценки</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="LineChart" size={32} />
                </div>
                <h4 className="font-bold text-lg mb-2">Детальные сравнения</h4>
                <p className="text-sm text-white/80">Сравнивайте характеристики разных моделей</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} />
                </div>
                <h4 className="font-bold text-lg mb-2">Отзывы экспертов</h4>
                <p className="text-sm text-white/80">Мнения профессиональных тренеров</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 RunReview. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;