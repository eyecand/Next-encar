import { HeaderVehicleId } from "@/components/shared/header-vehicle-id";

export default function VehicleIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HeaderVehicleId />
      {children}
    </section>
  );
}
