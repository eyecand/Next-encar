import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const StatisticAlertDialog = () => {
  return (
    <div className="flex justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="px-6 py-4 w-full lg:w-[80%] bg-blue-300/90 hover:bg-blue-300 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative">
            отчет страховой компании
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Отчёт страховой компании для авто 177어8899
            </AlertDialogTitle>
            <div className="grid grid-cols-2 bg-gray-200/50 p-4 rounded-md gap-x-10 gap-y-4 text-sm text-zinc-600">
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Производитель:
                <span className="text-base font-semibold text-black">KIA</span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Модель:
                <span className="text-base font-semibold text-black uppercase">
                  Sorrento
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Версия:
                <span className="text-base font-semibold text-black uppercase">
                  Sorento 4th Generation
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Год производства:
                <span className="text-base font-semibold text-black uppercase">
                  2025
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Объем двигателя:
                <span className="text-base font-semibold text-black uppercase">
                  2000
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Тип топлива:
                <span className="text-base font-semibold text-black">
                  Дизель
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Дата первой страховке:
                <span className="text-base font-semibold text-black">
                  01.01.2024
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Номер авто:
                <span className="text-base font-semibold text-black">
                  7777777
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Угоны:
                <span className="text-base font-semibold text-black">Нет</span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Использование бизнесом (такси, аренды и т.д.):
                <span className="text-base font-semibold text-black">Нет</span>
              </div>
              <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
                Находилось в залоге:
                <span className="text-base font-semibold text-black">Да</span>
              </div>
              {/* <div className="rounded-xl p-6 order-first md:order-last bg-light-gray dark:bg-dark-gray grow"></div> */}
            </div>
            <div className="sm:flex sm:items-center mt-12">
              <div className="sm:flex-auto">
                <h2 className="text-xl font-semibold text-zinc-900">
                  Аварии по вине владельца иного авто
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Список аварий, стоимость которых компенсировала страховка
                  иного участника аварии.Обращаем Ваше внимание, что в данном
                  отчёте отображаются только те аварии, о которых было заявлено
                  в страховую компанию (где застрахован этот автомобиль или иной
                  участник аварии).
                </p>
              </div>
            </div>
            {/* Информация о авриях */}
            <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="bg-gray-200/50 py-3.5 pl-4 pr-3 sm:pl-6 text-sm text-zinc-600">
                <div className="flex gap-3 justify-between items-center">
                  <div>
                    <span className="hidden sm:flex">Дата: </span>
                    <span className="font-semibold text-black dark:text-white">
                      {" "}
                      20.01.2025
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="hidden sm:flex">Стоимость ремонта: </span>
                    <span className="text-base text-red-500 font-semibold">
                      1 845 936 ₩
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Страховая выплата */}
            <div className="text-sm text-zinc-600 mt-4 mb-12">
              Страховая выплата:
              <span className="font-semibold"> 2 059 530 ₩ </span>
            </div>
            <p className="pt-4 mt-4 border-t border-zinc-100 text-zinc-600 text-sm">
              Обращаем Ваше внимание, что информация, представленная в этом
              отчёте, не всегда является полной и достаточной в силу её
              возможного частичного отсутствия в периоды, когда владелец авто не
              приобретал страховку, кроме того в списке аварий содержатся только
              те события, о которых было заявлено в страховую любым из
              участников происшествия. Таким образом, данный отчёт не может
              являться гарантией отсутствия повреждения автомобиля.
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
