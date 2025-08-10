import { redirect } from "next/navigation";

interface CategoryPageProps {
  makes: string;
  model: string;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<CategoryPageProps>;
}) {
  const { makes, model } = await params;
  // Перенаправляем на главную страницу при обращении к /marka/model
  redirect(`/?makes=${makes}&model=${model}`);
}
