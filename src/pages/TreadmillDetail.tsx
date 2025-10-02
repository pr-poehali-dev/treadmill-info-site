import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Treadmill {
  id: number;
  name: string;
  model: string;
  image: string;
  gallery: string[];
  features: string[];
  description: string;
  setup: string[];
  usage: string[];
  maintenance: string[];
  safety: string[];
  troubleshooting: { problem: string; solution: string }[];
}

const treadmills: Treadmill[] = [
  {
    id: 1,
    name: 'ProRunner X5',
    model: 'PRX-5000',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop'
    ],
    features: ['Амортизация', 'LCD дисплей', 'Bluetooth'],
    description: 'Полная инструкция по эксплуатации беговой дорожки ProRunner X5. Следуйте указаниям для безопасного и эффективного использования.',
    setup: [
      'Распакуйте беговую дорожку и проверьте комплектацию',
      'Установите дорожку на ровную поверхность на расстоянии минимум 1 метр от стен',
      'Подключите консоль к основному блоку, соединив разъемы',
      'Вставьте ключ безопасности в консоль',
      'Подключите дорожку к источнику питания 220В',
      'Проверьте натяжение бегового полотна перед первым использованием'
    ],
    usage: [
      'Встаньте на боковые платформы дорожки, не наступая на полотно',
      'Вставьте ключ безопасности и закрепите клипсу на одежде',
      'Нажмите кнопку "Start" для запуска полотна на минимальной скорости',
      'Начинайте движение с ходьбы, постепенно увеличивая скорость кнопками',
      'Используйте поручни для баланса, но не опирайтесь на них полностью',
      'Для остановки нажмите "Stop" или потяните ключ безопасности',
      'Дождитесь полной остановки полотна перед сходом'
    ],
    maintenance: [
      'Очищайте беговое полотно влажной тканью после каждого использования',
      'Пылесосьте пространство под дорожкой раз в неделю',
      'Проверяйте натяжение полотна каждые 2 недели',
      'Смазывайте беговое полотно силиконовой смазкой каждые 3 месяца',
      'Проверяйте болты и винты на затяжку раз в месяц',
      'Очищайте двигатель от пыли раз в 6 месяцев'
    ],
    safety: [
      'ВСЕГДА используйте ключ безопасности, закрепленный на одежде',
      'Не позволяйте детям использовать дорожку без присмотра',
      'Не используйте дорожку босиком - только в спортивной обуви',
      'Не прыгайте на беговое полотно во время движения',
      'Не превышайте максимальный вес пользователя (150 кг)',
      'При головокружении немедленно остановите тренировку',
      'Держите домашних животных подальше от работающей дорожки'
    ],
    troubleshooting: [
      { problem: 'Дорожка не включается', solution: 'Проверьте подключение к сети. Убедитесь, что ключ безопасности вставлен. Проверьте автоматический выключатель.' },
      { problem: 'Полотно проскальзывает', solution: 'Остановите дорожку и подтяните болты натяжения полотна по бокам. Проверьте смазку.' },
      { problem: 'Дорожка издает скрип', solution: 'Смажьте беговое полотно силиконовой смазкой. Проверьте затяжку всех болтов.' },
      { problem: 'Консоль не отображает данные', solution: 'Проверьте соединение кабелей консоли. Перезапустите дорожку.' },
      { problem: 'Полотно смещается в сторону', solution: 'Отрегулируйте болты выравнивания на задней части дорожки.' }
    ]
  },
  {
    id: 2,
    name: 'HomeRun Elite',
    model: 'HRE-2500',
    image: 'https://images.unsplash.com/photo-1638443115523-0d7e538f7e3a?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1638443115523-0d7e538f7e3a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop'
    ],
    features: ['Складная', 'USB порт', '12 программ'],
    description: 'Инструкция по эксплуатации складной беговой дорожки HomeRun Elite для домашнего использования.',
    setup: [
      'Аккуратно распакуйте дорожку и разложите на полу',
      'Поднимите деку дорожки до щелчка фиксатора',
      'Установите на ровную поверхность',
      'Подключите консольный кабель',
      'Включите дорожку в розетку 220В',
      'Откалибруйте консоль согласно инструкции'
    ],
    usage: [
      'Разблокируйте деку, опустив фиксатор и медленно опустив полотно',
      'Встаньте на боковые платформы',
      'Вставьте ключ безопасности',
      'Запустите дорожку на скорости 1-2 км/ч',
      'Начните движение с медленной ходьбы',
      'Регулируйте скорость кнопками на консоли или поручнях',
      'Для складывания: остановите дорожку, поднимите деку до щелчка'
    ],
    maintenance: [
      'Протирайте полотно после каждой тренировки',
      'Смазывайте полотно каждые 40 часов использования',
      'Проверяйте складной механизм на исправность раз в месяц',
      'Очищайте USB порт от пыли',
      'Проверяйте электрические соединения раз в 3 месяца'
    ],
    safety: [
      'Используйте ключ безопасности обязательно',
      'Перед складыванием убедитесь, что полотно остановлено',
      'Не складывайте дорожку с людьми или предметами рядом',
      'Максимальный вес пользователя - 120 кг',
      'Не используйте на неровной поверхности'
    ],
    troubleshooting: [
      { problem: 'Дорожка не складывается', solution: 'Проверьте, нет ли препятствий. Смажьте шарнирный механизм.' },
      { problem: 'USB не заряжает устройство', solution: 'Проверьте кабель. Убедитесь, что дорожка включена.' },
      { problem: 'Программы не запускаются', solution: 'Перезагрузите консоль, отключив дорожку на 30 секунд.' }
    ]
  },
  {
    id: 3,
    name: 'FitMax Pro',
    model: 'FMP-3000',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop'
    ],
    features: ['Wi-Fi', 'Пульсометр', 'Наклон 15%'],
    description: 'Руководство по эксплуатации беговой дорожки FitMax Pro с функциями Wi-Fi и автоматическим наклоном.',
    setup: [
      'Установите дорожку на расстоянии 2м от стен',
      'Подключите Wi-Fi модуль к консоли',
      'Подключите датчики пульсометра к консоли',
      'Включите дорожку в сеть',
      'Настройте Wi-Fi через мобильное приложение FitMax',
      'Проверьте работу системы наклона'
    ],
    usage: [
      'Подключитесь к Wi-Fi через приложение на телефоне',
      'Возьмитесь за датчики пульсометра для измерения',
      'Выберите программу тренировки на консоли',
      'Начните тренировку, следуя указаниям на экране',
      'Система автоматически изменит наклон согласно программе',
      'Данные тренировки сохранятся в облако',
      'После завершения дождитесь возврата наклона в 0%'
    ],
    maintenance: [
      'Очищайте датчики пульсометра спиртовыми салфетками',
      'Проверяйте Wi-Fi модуль на обновления раз в месяц',
      'Смазывайте механизм наклона каждые 6 месяцев',
      'Калибруйте систему наклона раз в год',
      'Обновляйте прошивку консоли при наличии обновлений'
    ],
    safety: [
      'При наклоне более 10% держитесь за поручни',
      'Не блокируйте механизм наклона руками',
      'Отключайте Wi-Fi во время грозы',
      'Максимальный угол наклона - 15%',
      'Не используйте при неисправности датчиков наклона'
    ],
    troubleshooting: [
      { problem: 'Wi-Fi не подключается', solution: 'Проверьте пароль сети. Перезагрузите модуль Wi-Fi через настройки.' },
      { problem: 'Пульсометр не работает', solution: 'Протрите датчики. Убедитесь, что руки влажные для лучшего контакта.' },
      { problem: 'Наклон не меняется', solution: 'Проверьте предохранитель механизма наклона. Перекалибруйте систему.' }
    ]
  }
];

const TreadmillDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [treadmill, setTreadmill] = useState<Treadmill | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

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
          <h2 className="text-2xl font-bold mb-4">Инструкция не найдена</h2>
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
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-4">
              <img 
                src={treadmill.gallery[currentImage]} 
                alt={treadmill.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {treadmill.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-20 h-20 rounded border-2 overflow-hidden ${
                    currentImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${treadmill.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Badge variant="secondary" className="mb-3">{treadmill.model}</Badge>
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Инструкция: {treadmill.name}
            </h2>
            
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

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="AlertTriangle" size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-900 mb-1">Важно!</h4>
                  <p className="text-sm text-yellow-800">
                    Перед использованием внимательно прочитайте инструкцию по технике безопасности
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Package" size={24} className="text-primary" />
                Сборка и установка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {treadmill.setup.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Badge variant="outline" className="flex-shrink-0">{idx + 1}</Badge>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="PlayCircle" size={24} className="text-primary" />
                Использование
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {treadmill.usage.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <Badge variant="outline" className="flex-shrink-0">{idx + 1}</Badge>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wrench" size={24} className="text-primary" />
                Обслуживание
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {treadmill.maintenance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900">
                <Icon name="ShieldAlert" size={24} className="text-red-600" />
                Техника безопасности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {treadmill.safety.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Icon name="AlertCircle" size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-red-900">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Tool" size={24} className="text-primary" />
                Устранение неисправностей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {treadmill.troubleshooting.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {item.problem}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.solution}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="bg-primary text-white rounded-lg p-8 text-center mt-12">
          <Icon name="HeadphonesIcon" size={48} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Нужна помощь?</h3>
          <p className="mb-6 text-white/90">Наша служба поддержки работает круглосуточно</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Icon name="Phone" size={20} className="mr-2" />
              8-800-555-35-35
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Icon name="Mail" size={20} className="mr-2" />
              support@runreview.ru
            </Button>
          </div>
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
