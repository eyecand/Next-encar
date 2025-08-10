import { redirect } from "next/navigation";

interface MakesPageProps {
  makes: string;
}

export default async function MarkaPage({
  params,
}: {
  params: Promise<MakesPageProps>;
}) {
  const { makes } = await params;
  // Перенаправляем на главную страницу при обращении к /marka
  redirect(`/?makes=${makes}`);
}
