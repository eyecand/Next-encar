import { redirect } from "next/navigation";

interface EvolutionPageProps {
  makes: string;
  model: string;
  evolutions: string;
}

export default async function EvolutionPage({
  params,
}: {
  params: Promise<EvolutionPageProps>;
}) {
  const { makes, model, evolutions } = await params;
  // Перенаправляем на главную страницу при обращении к /marka/model/evolution
  redirect(`/?makes=${makes}&model=${model}&evolutions=${evolutions}`);
}
