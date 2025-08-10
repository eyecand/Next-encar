import YandexMetrika from "@/components/shared/yandex-metrika";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Users, Award, TrendingUp } from "lucide-react";
export default async function SchemaPage() {
  return (
    <>
      <section className="mx-auto flex flex-col flex-1 w-full  mt-28 lg:mt-44">
        <section className="bg-gradient-to-br from-blue-200 via-purple-200 to-blue-300 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 flex flex-col items-center lg:items-start">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Телеграм канал авто из Кореи
                </h1>
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Хочешь купить качественный автомобиль
                  <br />
                  из Южной Кореи и сэкономить максимум денег?
                </p>
                <div>
                  {" "}
                  <Link
                    href={"https://t.me/+Kd_gfq0IVGNiMDcy"}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  >
                    Подписаться на Телеграм-канал
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="/telegram/t.png"
                      alt="Telegram channel preview"
                      width={1000}
                      height={700}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Info */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-gray-700 text-center lg:text-left">
            Подписывайся на наш{" "}
            <Link
              href={"https://t.me/+Kd_gfq0IVGNiMDcy"}
              className="text-blue-600 underline hover:no-underline font-semibold"
            >
              Telegram-канал
            </Link>{" "}
            и получай ежедневные обновления по лучшим предложениям автомобилей
            известных брендов:
          </p>
        </section>

        {/* Brand Logos */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            <Link
              href={"https://autofish.ru/?makes=Mercedes-Benz"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/telegram/mercedes-benz.svg"
                alt="Mercedes-Benz"
                width={35}
                height={35}
              />{" "}
              <span className="ml-2">Mercedes-Benz</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=BMW"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image src="/telegram/bmw.svg" alt="BMW" width={35} height={35} />{" "}
              <span className="ml-2">BMW</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=Audi"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/telegram/audi.svg"
                alt="Audi"
                width={35}
                height={35}
              />{" "}
              <span className="ml-2">Audi</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=Hyundai"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/telegram/hyundai.svg"
                alt="Hyundai"
                width={35}
                height={35}
              />{" "}
              <span className="ml-2">Hyundai</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=Volkswagen"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/telegram/volkswagen.png"
                alt="Volkswagen"
                width={35}
                height={35}
              />{" "}
              <span className="ml-2">Volkswagen</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=Kia"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image src="/telegram/kia.svg" alt="KIA" width={35} height={35} />{" "}
              <span className="ml-2">KIA</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=Porsche"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/telegram/porsche.svg"
                alt="Porsche"
                width={35}
                height={35}
              />{" "}
              <span className="ml-2">Porsche</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=Genesis"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/telegram/genesis.svg"
                alt="Genesis"
                width={35}
                height={35}
              />{" "}
              <span className="ml-2">Genesis</span>
            </Link>
            <Link
              href={"https://autofish.ru/?makes=Toyota"}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/telegram/toyota.svg"
                alt="Toyota"
                width={35}
                height={35}
              />{" "}
              <span className="ml-2">Toyota</span>
            </Link>

            <div className="flex items-center justify-center p-4 font-semibold">
              и многих других...
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10">
              <div className="w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-center relative">
              <div className="space-y-4">
                <p className="text-blue-100 text-sm lg:text-base">
                  Мы ежедневно мониторим более
                </p>
                <div className="text-4xl lg:text-6xl font-bold">100 000+</div>
                <div className="text-lg lg:text-xl font-semibold">
                  Автомобилей
                </div>
                <p className="text-blue-100 text-sm lg:text-base leading-relaxed">
                  Выбирая самые выгодные варианты по соотношению цены и
                  качества. Никаких подводный КАМНЕЙ - только самые лучшие
                  автомобили, самая низкая цена и самое высокое качество!
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/telegram/car.png"
                  alt="Luxury cars"
                  width={600}
                  height={350}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
            Только в нашем канале
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-4">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Последние новости автопрома Южной Кореи
              </h3>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Сравнительные характеристики лучших автомобилей
              </h3>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Практические советы по выбору идеального транспорта
              </h3>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Реальные истории успешных покупок
              </h3>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              Уже больше{" "}
              <span className="font-bold text-red-600">
                9 лет мы уверенно лидируем
              </span>{" "}
              в области поставок качественных автомобилей из Южной Кореи.
              <br />
              Присоединись к нашей команде и приобрети лучший автомобиль по
              самой выгодной цене!
            </p>

            <div className="bg-blue-50 rounded-2xl p-6 lg:p-8 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-700">
                      Подписывайтесь на наш{" "}
                      <Link
                        href={"https://t.me/+Kd_gfq0IVGNiMDcy"}
                        className="text-blue-600 underline font-semibold"
                      >
                        Telegram-канал
                      </Link>{" "}
                      прямо сейчас и узнайте, почему тысячи автовладельцев
                      доверяют именно нам!
                    </p>
                  </div>
                </div>
                <Link
                  href={"https://t.me/+Kd_gfq0IVGNiMDcy"}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap"
                >
                  Подписаться на Telegram-канал
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* <YandexMetrika /> */}
    </>
  );
}
