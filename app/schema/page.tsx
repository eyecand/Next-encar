import YandexMetrika from "@/components/shared/yandex-metrika";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  FileText,
  Search,
  CreditCard,
  Truck,
  Clock,
  Package,
  Coins,
} from "lucide-react";
export default async function SchemaPage() {
  return (
    <>
      <section className="mx-auto flex flex-col flex-1 w-full  mt-28 lg:mt-44">
        {/* Header */}
        <div className="max-w-7xl mx-auto  px-3">
          <div className="flex flex-col lg:flex-row bg-[url(/schema/encar-fon.png)] rounded-md bg-no-repeat min-h-[320px] bg-cover px-5 py-8">
            <div className="flex flex-col items-start w-full lg:flex-[30%] ">
              <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl text-white">
                Каталог авто с площадки Encar
              </h1>
              <p className="font-semibold text-base sm:text-sm md:text-base mt-5  text-white">
                Encar (Енкар) основана в 2000 году — это онлайн-платформа для
                продажи автомобилей с пробегом,офис расположен в Корее по
                адресу: 18-19F, Aia Tower 16, Тонгил-ро, 2-гил, Чун-гу, Сеул,
                04511, Южная Корея
              </p>
              <Link
                href={"https://www.encar.com/"}
                className="underline text-white"
              >
                encar.com
              </Link>
            </div>
            <div className="flex-[50%] mt-10 lg:mt-0 ">
              <div className="flex flex-col items-center">
                {" "}
                <Image
                  alt="encar"
                  src={"/schema/encar.png"}
                  width={430}
                  height={122}
                />
                <Image
                  className="-mt-12 lg:-mt-0"
                  alt="car"
                  src={"/schema/car.png"}
                  width={453}
                  height={275}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Information-text*/}
        <div className="max-w-7xl mx-auto my-10 px-6">
          <p className="text-base font-semibold">
            Encar предлагает широкий ассортимент автомобилей различных марок и
            моделей Hyundai, Kia, Samsung, Chevrolet, Ssangyong, Toyota, Mini,
            Porshe, Tesla, Jaguar, Lexus, BMW, Mercedes-Benz, Audi и многие
            другие. На платформе можно найти седаны, кроссоверы, внедорожники и
            другие типы автомобилей. Так же присутствуют мотоциклы и скутеры.
            Все автомобили на сайте Encar проходят предварительную проверку и
            находятся в хорошем состоянии.
          </p>
        </div>
        {/* Advantages */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-50 flex flex-col md:flex-row gap-10 rounded-md p-3">
            <div className="flex justify-center">
              <Image
                alt="details.png"
                src={"/schema/details.png"}
                width={548}
                height={344}
              />
            </div>
            <div className="flex-[70%] flex items-center">
              <p className="text-base">
                Покупку физическому лицу из России напрямую сделать невозможно.
                Для покупки необходимо найти надежную компанию или физическое
                лицо в Корее, которое сможет связаться с продавцом, договориться
                о продаже, подготовить все документы и помочь с отправкой
                автомобиля. Гораздо проще обратиться в компанию в России.
                <br />
                <br />
                На нашем сайте реализован каталог с объявлениями с площадки
                Encar. В отличие от официального сайта , у нас вся информация
                представлена на русском языке, а цены указаны в рублях со всеми
                расходами. Мы помогаем нашим клиентам приобрести автомобиль из
                Кореи и доставить его в регионы России.
              </p>
            </div>
          </div>
        </div>
        {/* Step */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center lg:text-left">
            Как заказать автомобиль из Кореи с нашей помощью?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 1</div>
                  <div className="font-semibold text-sm">
                    Заключение договора и первый платеж
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  Вы подписываете договор в офисе или дистанционно. Вносите 100
                  000 руб - это депозит, он необходим для начала работы с нашей
                  компанией и оплаты залога за выбранное Вами авто.
                </p>
                <p>
                  Этот платеж будет учтен при последующей оплате автомобиля.
                  Оплата производится нашему представителю в РФ, наличными или
                  на счет в банке. Если Вы передумали заказывать авто - депозит
                  полностью возвращается. Если были осмотры, мы вычтем 10 000
                  руб за каждый.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 2</div>
                  <div className="font-semibold text-sm">
                    Проверка автомобиля в Корее
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  По подходящим авто, согласно Вашим критериям, мы изучаем
                  документы и информацию доступную онлайн:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Пробег</li>
                  <li>Комплектацию по VIN</li>
                  <li>Дату выпуска</li>
                  <li>Сервисную и страховую историю</li>
                </ul>
                <p>
                  Это позволяет принять решение о целесообразности выезда на
                  осмотр.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div className="">
                  <div className="text-sm text-gray-500">Шаг 3</div>
                  <div className="font-semibold text-sm">Осмотр автомобиля</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Первые 3 осмотра в нашей компании, включены в стоимость!
                  </li>
                  <li>Последующие осмотры - 10 000 руб.</li>
                </ul>
                <p>Во время осмотра мы проверяем:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Лакокрасочное покрытие на предмет окрасов</li>
                  <li>
                    Состояние двигателя и агрегатов (подтеки, шумы, короткий
                    тест-драйн (если возможно), компьютерная диагностика)
                  </li>
                  <li>Состояние салона</li>
                  <li>Особенности конкретной модели</li>
                </ul>
                <p>
                  Результаты осмотра отправляются Вам в ТГ, Ватсап или на почту.
                </p>
                <p>
                  Примеры доступны в нашем{" "}
                  <Link
                    href={"https://t.me/+Kd_gfq0IVGNiMDcy"}
                    className="text-blue-600 underline"
                  >
                    телеграм-канале
                  </Link>
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 4</div>
                  <div className="font-semibold text-sm">
                    Резервирование авто
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <p>
                  После осмотра и принятии Вами положительного решения о покупки
                  авто, мы вносим дилеру в Корее залог (Ваш депозит) для
                  резервирования авто до полной оплаты. Обычно продавцы в Корее,
                  дают до 7 дней на оплату. Но мы рекомендуем делать платежи
                  быстрее, тк всегда остается шанс колебания курсов валют.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 5</div>
                  <div className="font-semibold text-sm">
                    Оплата автомобиля и доставки
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  Сумма, которую Вы оплачиваете в Корею: Стоимость авто на Encar
                  + 2.000.000 Won Мы выставляем Вам счет на оплату (инвойс):
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    В рублях через банки можно оплатить авто стоимостью до $50
                    000 и объемом ДВС до 2000 см3, список банков постоянно
                    сокращается из-за санкционального давления, наблюдаются
                    задержки платежей, а так же их возвраты, что грозит потерей
                    депозита.
                  </li>
                  <li>
                    Через платежного агента любые авто, так же стоимостью свыше
                    $50 000 или объемом более 2000 см3, только наличными
                    рублями, во всех крупных городах России.
                  </li>
                </ul>
                <p>Платежи в Корею поступает мгновенно.</p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 6</div>
                  <div className="font-semibold text-sm">
                    Отправка автомобиля из Кореи
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <p>
                  После покупки авто, автомобиль отправляется автовозом в порт
                  Пусан, далее мы готовим экспортные документы для вывоза авто
                  из Кореи, оплачиваем фрахт за паром и Ваш автомобиль
                  доставляется в порт Владивосток (1-3 дня). Автомобиль
                  застрахован на всем пути следования до Владивостока. Именно за
                  этот шаг, Вы платите 2.000.000 Won.
                </p>
              </div>
            </div>

            {/* Step 7 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 7</div>
                  <div className="font-semibold text-sm">
                    Таможенное оформление во Владивостоке
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  Авто растамаживается на Ваше имя или на любое физ.лицо,
                  документы на которого Вы нам пришлете. ВАЖНО:
                </p>
                <p>
                  За предыдущий календарный год, до оформления автомобиля, Вы не
                  должны ввозить любое авто из-за рубежа на Ваше имя. Если Вы
                  ввозили авто в течении прошедшего года, выберете другое
                  физическое лицо, для оформления автомобиля в таможенных
                  органах РФ. Процедура оформления в ФТС занимает 3-5 дней.{" "}
                </p>
                <p>
                  Мы выставляем Вам счет напрямую от Федеральной таможенной
                  службы России, оплату должно производить лицо, которое указано
                  в документах, оплатить можно с личного счета через банк онлайн
                  или по QR - коду, он есть на каждом счете. Также Вы можете
                  оплатить счет наличными через любой банк РФ.
                </p>
                <p>
                  После оплаты счета ФТС, наш брокер готовит документы для
                  списания утиль сбора, получения СБКТС и электронного ПТС на
                  Ваше имя.
                </p>
                <p>
                  Услуги брокера в среднем стоят 100 000 руб, в эту сумму входят
                  все платежи необходимые для оформления автомобиля на Ваше имя.
                </p>
              </div>
            </div>

            {/* Step 8 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Coins className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 8</div>
                  <div className="font-semibold text-sm">
                    Дополнительные услуги.
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <p>
                  Мы можем оказать Вам содействие в постановке Вашего автомобиля
                  на Российский учет, получение регистрационных знаков и СТС.
                </p>
                <p>Стоимость услуги 20 000 руб</p>
              </div>
            </div>
            {/* Step 9 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-3 mb-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Шаг 9</div>
                  <div className="font-semibold text-sm">
                    Доставка в Ваш город
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <p>
                  После прохождения таможни и получения всех разрешительных
                  документов на Ваше имя, автомобиль транспортируется закрытой
                  фурой (по 3 автомобиля), автовозом или ЖД контейнером в Ваш
                  город. В Москве, мы вместе встретим Ваш автомобиль. В других
                  городах, наш перевозчик поможет Вам произвести осмотр и
                  подписать акт приема-передачи на Ваш автомобиль. Вы можете
                  выбрать любую ТК для перевозки Вашего авто в Ваш город.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <YandexMetrika /> */}
    </>
  );
}
