import YandexMetrika from "@/components/shared/yandex-metrika";
import Image from "next/image";

export default async function AboutPage() {
  return (
    <>
      <div className="mx-auto flex flex-col flex-1 w-full  mt-28 lg:mt-44">
        {/* Header */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-12">
          <div className="flex flex-col w-full lg:flex-[50%] xl:flex-[30%]">
            <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl">
              Мы -{" "}
              <span className="text-rose-600">
                лидеры в сфере экспорта автомобилей
              </span>{" "}
              с вторичного рынка Южной Кореи.
            </h1>
            <p className="font-semibold text-base sm:text-[18px] md:text-xl mt-5 md:mt-10">
              С момента нашего основания в 2016 году, мы успешно подбираем и
              доставляем автомобили клиентам по всему миру
            </p>
          </div>
          <div className="relative h-auto lg:-mt-10">
            <Image
              alt="About title"
              src={"/about/about-background.png"}
              width={600}
              height={300}
            />
          </div>
        </div>
        {/* Information */}
        <div className="bg-white p-6 rounded-lg shadow-[0_-0.25rem_0.5rem_rgba(0,0,0,0.15)] mt-16">
          <div className="px-2  md:px-6 flex flex-col lg:flex-row gap-4 mt-4 max-w-7xl mx-auto">
            <div className="bg-[#F8F9FA] flex-[100%] lg:flex-[25%] px-4 py-5 rounded-xl">
              <div className="flex justify-between">
                <h3 className="text-3xl font-medium">9</h3>
                <Image
                  alt="Information-logo"
                  src={"/about/about-guard.png"}
                  width={42}
                  height={42}
                ></Image>
              </div>
              <p className="text-base">
                лет доставляем <br /> качественные авто из Кореи!
              </p>
            </div>
            <div className="bg-[#F8F9FA] flex-[100%] lg:flex-[25%] px-4 py-5 rounded-xl">
              <div className="flex justify-between">
                <h3 className="text-3xl font-medium">135</h3>
                <Image
                  alt="Information-logo"
                  src={"/about/about-city.png"}
                  width={42}
                  height={42}
                ></Image>
              </div>
              <p className="text-base">
                городов, куда мы можем <br /> доставить ваше авто
              </p>
            </div>
            <div className="bg-[#F8F9FA] flex-[100%] lg:flex-[25%] px-4 py-5 rounded-xl">
              <div className="flex justify-between">
                <h3 className="text-3xl font-medium">150</h3>
                <Image
                  alt="Information-logo"
                  src={"/about/about-photo.png"}
                  width={42}
                  height={42}
                ></Image>
              </div>
              <p className="text-base">
                фото и видео автомобиля <br /> перед покупкой
              </p>
            </div>
            <div className="bg-[#F8F9FA] flex-[100%] lg:flex-[25%] px-4 py-5 rounded-xl">
              <div className="flex justify-between">
                <h3 className="text-3xl font-medium">+150 000</h3>
                <Image
                  alt="Information-logo"
                  src={"/about/about-car.png"}
                  width={42}
                  height={42}
                ></Image>
              </div>
              <p className="text-base">
                актуальных объявлений авто <br /> на онлайн-платформе Encar
              </p>
            </div>
          </div>

          {/* text */}
          <div className="px-6 py-2 mt-2 font-semibold text-sm max-w-7xl mx-auto">
            Наш принцип прост: прямые продажи без посредников, что обеспечивает
            нам возможность гарантировать достоверность данных и предложить вам
            лучшее соотношение цены и качества. Надежность и прозрачность в
            каждой сделке — вот наши обещания!
          </div>
          <div className="px-6 py-2 text-sm max-w-7xl mx-auto">
            Мы делаем всё, чтобы сотрудничество с нами было максимально удобным:
            вы можете работать с нами дистанционно.
          </div>
          {/* Advantages */}
          <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Вертикальный блок  слева-long*/}
              <div className="flex flex-col flex-[100%] lg:flex-[25%] bg-[#F8F9FA] px-4 py-5 rounded-xl gap-3">
                <div className="flex lg:flex-col mb-4 lg:mb-0">
                  <Image
                    className="w-[55px] h-[55px] lg:w-[200px] lg:h-[180px] ml-0 lg:ml-5"
                    alt="wallet-mob.png"
                    width={200}
                    height={180}
                    src={"/about/debit-card-3.webp"}
                  />
                  <p className="text-base font-medium">
                    Выгодная цена <br /> (открытая, без скрытых <br /> комиссий
                    и сборов)
                  </p>
                </div>
                <p className="text-base">
                  Экономия составляет до 40% в сравнении с российским рынком.
                  Учитывая, что мы работаем без посредников — сами осматриваем и
                  отправляем, стоимость авто ниже, чем у конкурентов
                </p>
              </div>
              {/* Вертикальный блок справа состоящий из двух частей */}
              <div className="flex flex-col flex-[100%]  lg:flex-[75%] gap-3">
                {/* Первая часть */}
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="bg-[#F8F9FA]  flex-[100%] lg:flex-[33%] px-4 py-5 rounded-xl">
                    <div className="flex lg:flex-col gap-4 lg:justify-center lg:items-center">
                      <div className="flex justify-center items-center mr-6 lg:mr-0">
                        <Image
                          className="w-[50px] h-[50px] lg:w-[65px] lg:h-[65px]"
                          alt="about-car.png"
                          src={"/about/advantages_1.png"}
                          width={65}
                          height={65}
                        ></Image>
                      </div>

                      <p className="text-lg font-semibold">
                        Поможем выбрать авто <br /> из актуального каталога{" "}
                        <br />с 150 000+ вариантов
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#F8F9FA]  flex-[100%] lg:flex-[33%] px-4 py-5 rounded-xl">
                    <div className="flex lg:flex-col gap-4 lg:justify-center lg:items-center">
                      <div className="flex justify-center items-center mr-6 lg:mr-0">
                        <Image
                          className="w-[50px] h-[50px] lg:w-[65px] lg:h-[65px]"
                          alt="advantages_2.png"
                          src={"/about/advantages_2.png"}
                          width={65}
                          height={65}
                        ></Image>
                      </div>

                      <p className="text-lg font-semibold">
                        Организуем выкуп <br /> и таможенное <br />
                        оформление
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#F8F9FA]  flex-[100%] lg:flex-[33%] px-4 py-5 rounded-xl">
                    <div className="flex lg:flex-col gap-4 lg:justify-center lg:items-center">
                      <div className="flex justify-center items-center mr-6 lg:mr-0">
                        <Image
                          className="w-[50px] h-[50px] lg:w-[65px] lg:h-[65px]"
                          alt="advantages_3.png"
                          src={"/about/advantages_3.png"}
                          width={65}
                          height={65}
                        ></Image>
                      </div>

                      <p className="text-lg font-semibold">
                        Доставим до двери <br />
                        или до ближайшего <br />
                        крупного города
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row bg-[#F8F9FA] rounded-xl px-4 py-5">
                  {/* Картинка и текст */}
                  <div className="flex items-center mb-4 lg:mb-0 lg:flex-[40%] xl:flex-[30%]">
                    <Image
                      className="w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] "
                      alt="engine.png"
                      src={"/about/engine.png"}
                      width={150}
                      height={150}
                    />
                    <h4 className="font-semibold text-xl ">
                      Истинное техническое состояние
                    </h4>
                  </div>
                  {/* Текст */}
                  <div className="flex flex-col gap-3 lg:flex-[60%] xl:flex-[70%]">
                    Вы можете быть уверены, что получите авто в заявленном
                    состоянии. <br />
                    <br />
                    Во-первых, в Корее по закону продавец обязан предоставить
                    покупателю страховую историю автомобиля, технический лист с
                    детальной информацией о состоянии машины, иначе рискует
                    лишиться лицензии автодилера. <br />
                    <br />
                    Во-вторых, за скручивание пробега или скрытие дефектов
                    машины при продаже в Корее предусмотрена уголовная
                    ответственность.
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Advantages-2 */}
          <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex flex-col lg:flex-row lg:flex-[33%] bg-[#F8F9FA] px-4 py-5 rounded-xl gap-3">
                <div className="flex items-center gap-2 lg:flex-[50%]">
                  <Image
                    className="w-[50px] h-[50px] lg:w-[55px] lg:h-[55px] mr-6 lg:mr-0"
                    alt="advantages_4.png"
                    src={"/about/advantages_4.png"}
                    width={65}
                    height={65}
                  />
                  <h4 className="text-lg font-semibold ">
                    Юридическая чистота,
                    <br />
                    надежность
                    <br />и безопасность сделки.
                  </h4>
                </div>
                <div className="text-base flex items-center lg:flex-[25%] xl:flex-[50px]">
                  Оформляем договор, оплата производится через банк.
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:flex-[33%] bg-[#F8F9FA] px-4 py-5 rounded-xl gap-3 ">
                <div className="flex items-center gap-2 lg:flex-[50%]">
                  <Image
                    className="w-[50px] h-[50px] lg:w-[55px] lg:h-[55px] mr-6 lg:mr-0"
                    alt="advantages_5.png"
                    src={"/about/advantages_5.png"}
                    width={65}
                    height={65}
                  />
                  <h4 className="text-lg font-semibold">
                    Машины с левым рулем
                  </h4>
                </div>
                <div className="text-base flex items-center lg:flex-[25%] xl:flex-[50px]">
                  Без пробега по российским
                  <br /> дорогам, эксплуатировались
                  <br /> в умеренном климате.
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:flex-[33%] bg-[#F8F9FA] px-4 py-5 rounded-xl gap-3">
                <div className="flex items-center gap-2  lg:flex-[20%]">
                  <Image
                    className="w-[50px] h-[50px] lg:w-[55px] lg:h-[55px] mr-6 lg:mr-0"
                    alt="advantages_6.png"
                    src={"/about/advantages_6.png"}
                    width={65}
                    height={65}
                  />
                  <h4 className="text-xl font-semibold">Кредит</h4>
                </div>
                <div className="text-base flex items-center lg:flex-[25%] xl:flex-[80px] ">
                  Предоставляем
                  <br /> возможность покупки
                  <br /> в кредит на лучших условиях.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <YandexMetrika />
    </>
  );
}
