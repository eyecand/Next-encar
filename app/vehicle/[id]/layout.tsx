import { HeaderVehicleId } from "@/components/shared/header-vehicle-id";
import YandexMetrika from "@/components/shared/yandex-metrika";

export default function VehicleIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HeaderVehicleId />
      {children} <YandexMetrika />
    </section>
  );
}
