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
import { AccidentDetailsProps } from "./car-info";
import { detectFuels } from "@/hooks/use-fuels";
type Props = {
  model: string | null | undefined;
  make: string | null | undefined;
  fuel: string | null | undefined;
  grades: string | null | undefined;
  engine: number | undefined;
  plate_number: string | null;
  accident_details: AccidentDetailsProps[];
  buisness: boolean | undefined;
  goverment: boolean | undefined;
  loan: boolean | undefined;
  robber: number | undefined;
  years: number | undefined;
};
export const StatisticAlertDialog = ({
  make,
  model,
  grades,
  engine,
  fuel,
  buisness,
  goverment,
  loan,
  robber,
  plate_number,
  accident_details,
  years,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-6 py-6 w-full  bg-blue-400 hover:bg-blue-600 uppercase font-gilroy font-semibold rounded-xl transition-color flex items-center justify-center relative">
          отчет страховой компании
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Отчёт страховой компании для авто {plate_number}
          </AlertDialogTitle>
          <div className="grid grid-cols-2 bg-gray-200/50 p-4 rounded-md gap-x-10 gap-y-4 text-sm text-zinc-600">
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Производитель:
              <span className="text-base font-semibold text-black">{make}</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Модель:
              <span className="text-base font-semibold text-black uppercase">
                {model}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Версия:
              <span className="text-base font-semibold text-black uppercase">
                {grades}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Год производства:
              <span className="text-base font-semibold text-black uppercase">
                {years}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Объем двигателя:
              <span className="text-base font-semibold text-black uppercase">
                {engine}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Тип топлива:
              <span className="text-base font-semibold text-black">
                {detectFuels(fuel ? fuel : "")}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Дата первой страховке:
              <span className="text-base font-semibold text-black">
                {accident_details.length > 0 &&
                  accident_details.reverse()[0].date.toLocaleDateString()}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Номер авто:
              <span className="text-base font-semibold text-black">
                {plate_number}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Угоны:
              <span className="text-base font-semibold text-black">
                {robber ? "Да" : "Нет"}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Использование бизнесом (такси, аренды и т.д.):
              <span className="text-base font-semibold text-black">
                {buisness ? "Да" : "Нет"}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Находилось в залоге:
              <span className="text-base font-semibold text-black">
                {loan ? "Да" : "Нет"}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1 flex justify-between items-center gap-2">
              Использовался правительством:
              <span className="text-base font-semibold text-black">
                {goverment ? "Да" : "Нет"}
              </span>
            </div>
            {/* <div className="rounded-xl p-6 order-first md:order-last bg-light-gray dark:bg-dark-gray grow"></div> */}
          </div>
          <div className="sm:flex sm:items-center mt-12">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-zinc-900">
                Аварии по вине владельца иного авто
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Список аварий, стоимость которых компенсировала страховка иного
                участника аварии.Обращаем Ваше внимание, что в данном отчёте
                отображаются только те аварии, о которых было заявлено в
                страховую компанию (где застрахован этот автомобиль или иной
                участник аварии).
              </p>
            </div>
          </div>
          {/* Информация о авриях */}
          {accident_details.length > 0 &&
            accident_details.map((item) => (
              <div key={item.date.toLocaleDateString()}>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <div className="bg-gray-200/50 py-3.5 pl-4 pr-3 sm:pl-6 text-sm text-zinc-600">
                    <div className="flex gap-3 justify-between items-center">
                      <div>
                        <span className="hidden sm:flex">Дата: </span>
                        <span className="font-semibold text-black dark:text-white">
                          {" "}
                          {item.date.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="hidden sm:flex">
                          Стоимость ремонта:{" "}
                        </span>
                        <span className="text-base text-red-500 font-semibold">
                          {new Intl.NumberFormat("ru-RU")
                            .format(
                              item.painting_cost +
                                item.part_cost +
                                item.labor_cost
                            )
                            .replace(",", ".")}{" "}
                          ₩
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-sm text-zinc-600">
                      <div className="col-span-1 py-3.5 pr-3 flex items-center gap-2">
                        Запчасти
                        <span className="font-semibold text-base text-black whitespace-nowrap">
                          {new Intl.NumberFormat("ru-RU")
                            .format(item.part_cost)
                            .replace(",", ".")}{" "}
                          ₩
                        </span>
                      </div>
                      <div className="col-span-1 py-3.5 pl-0 pr-3 sm:pl-6 flex items-center gap-2">
                        Покраска
                        <span className="font-semibold text-base text-black whitespace-nowrap">
                          {new Intl.NumberFormat("ru-RU")
                            .format(item.painting_cost)
                            .replace(",", ".")}{" "}
                          ₩
                        </span>
                      </div>
                      <div className="col-span-1 py-3.5 pl-0 sm:pl-6 flex items-center gap-2">
                        Работа
                        <span className="font-semibold text-base text-black whitespace-nowrap">
                          {new Intl.NumberFormat("ru-RU")
                            .format(item.labor_cost)
                            .replace(",", ".")}{" "}
                          ₩
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Страховая выплата */}
                <div className="text-sm text-zinc-600 mt-4 mb-4">
                  Страховая выплата:
                  <span className="font-semibold">
                    {" "}
                    {new Intl.NumberFormat("ru-RU")
                      .format(item.insurance_benefit)
                      .replace(",", ".")}{" "}
                    ₩
                  </span>
                </div>
              </div>
            ))}
          <p className="pt-4 mt-4 border-t border-zinc-100 text-zinc-600 text-sm">
            Обращаем Ваше внимание, что информация, представленная в этом
            отчёте, не всегда является полной и достаточной в силу её возможного
            частичного отсутствия в периоды, когда владелец авто не приобретал
            страховку, кроме того в списке аварий содержатся только те события,
            о которых было заявлено в страховую любым из участников
            происшествия. Таким образом, данный отчёт не может являться
            гарантией отсутствия повреждения автомобиля.
          </p>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
