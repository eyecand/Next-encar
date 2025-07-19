import YandexMetrika from "@/components/shared/yandex-metrika";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const leftColumnQuestions = [
  {
    id: "item-1",
    question: "Являетесь ли вы посредниками?",
    answer:
      "Мы работаем напрямую с производителями и официальными дилерами, что позволяет нам предлагать лучшие цены и гарантировать качество обслуживания.",
  },
  {
    id: "item-2",
    question: "Какие гарантии что автомобиль придет целый?",
    answer:
      "Мы предоставляем полную страховку на время транспортировки, а также детальную фото и видео документацию состояния автомобиля на всех этапах доставки.",
  },
  {
    id: "item-3",
    question: "Из какого порта Кореи происходит отправка автомобилей?",
    answer:
      "Отправка осуществляется из основных портов Южной Кореи: Пусан, Инчхон и Ульсан, в зависимости от местоположения автомобиля и оптимального маршрута доставки.",
  },
  {
    id: "item-4",
    question: "Можем ли мы отправить автомобиль в регионы?",
    answer:
      "Мы занимаемся отправкой автомобилей по всей территории страны, нам не доставит никакого труда отправить ваш автомобиль в любой регион, заранее согласовав с вами транспортную компанию.",
  },
  {
    id: "item-5",
    question: "Сколько времени занимает поиск и доставка автомобиля?",
    answer:
      "Поиск подходящего автомобиля занимает от 3 до 14 дней, доставка морским транспортом - 14-21 день, плюс время на таможенное оформление 3-7 дней.",
  },
];

const rightColumnQuestions = [
  {
    id: "item-6",
    question: "С какого года можно привезти автомобиль под полную пошлину?",
    answer:
      "Под полную пошлину можно ввозить автомобили возрастом до 3 лет включительно. Для более старых автомобилей действуют льготные ставки.",
  },
  {
    id: "item-7",
    question: "Какова стоимость ваших услуг?",
    answer:
      "Стоимость наших услуг составляет от 1500 до 2500 долларов США в зависимости от сложности поиска, класса автомобиля и дополнительных услуг.",
  },
  {
    id: "item-8",
    question:
      "Как происходит покупка автомобиля, и что нужно для начала работы?",
    answer:
      "Для начала работы необходимо внести предоплату 50%, предоставить копию паспорта и определиться с критериями поиска. После нахождения автомобиля производится доплата.",
  },
  {
    id: "item-9",
    question: "Как узнать в каком состоянии автомобиль?",
    answer:
      "Мы предоставляем детальный фотоотчет, видеоосмотр автомобиля, а также можем организовать независимую экспертизу состояния автомобиля перед покупкой.",
  },
];
export default async function QuestionsPage() {
  return (
    <>
      <section className="w-full py-12 px-4 mt-20 lg:mt-32">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Часто задаваемые вопросы
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Левая колонка */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                {leftColumnQuestions.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-blue-50 rounded-lg border-0 px-6 py-2"
                  >
                    <AccordionTrigger className="text-left text-gray-800 font-medium hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Правая колонка */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                {rightColumnQuestions.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-blue-50 rounded-lg border-0 px-6 py-2"
                  >
                    <AccordionTrigger className="text-left text-gray-800 font-medium hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      {/* <YandexMetrika /> */}
    </>
  );
}
