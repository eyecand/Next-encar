import { optionMakes } from "@/components/shared/form-korea-cars/first-line/constant";
import { prisma } from "@/prisma/prisma-client";
import { MetadataRoute } from "next";

interface ModelData {
  model_short_name: string;
}

interface ApiResponse {
  models: ModelData[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Create entries for makes (skip the first placeholder item)
  const makesEntries: MetadataRoute.Sitemap = optionMakes
    .slice(1)
    .map((make) => ({
      url: `${baseUrl}/${make.label}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // Fetch models for each make and create model entries
  const modelEntries: MetadataRoute.Sitemap = [];
  // const evolutionEntries: MetadataRoute.Sitemap = [];
  // Process each make sequentially to avoid overwhelming the API
  for (const make of optionMakes.slice(1)) {
    try {
      const model = await prisma.lib_models.findMany({
        distinct: ["model_short_name"],
        where: {
          details: {
            some: {
              makes: {
                make_short_name: make.value,
              },
            },
          },
        },
        select: {
          model_short_name: true,
        },
      });
      if (model.length > 0) {
        const makeModelEntries = model.map((model) => ({
          url: `${baseUrl}/${make.label}/${model.model_short_name}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
        modelEntries.push(...makeModelEntries);
        // for (const m of model) {
        //   const modelsGrouped = await prisma.vehicle_details.groupBy({
        //     by: ["model_id"],
        //     where: {
        //       encar: {
        //         active: {
        //           isNot: null,
        //         },
        //       },
        //       makes: make
        //         ? {
        //             make_short_name: make.value,
        //           }
        //         : undefined,
        //       model: m.model_short_name
        //         ? {
        //             model_short_name: m.model_short_name,
        //           }
        //         : undefined,
        //       release_date: {
        //         gte: new Date(`2000-01-01T00:00:00.000Z`),
        //         lte: new Date(`2025-12-31T23:59:59.999Z`),
        //       },
        //     },
        //   });

        //   const modelIds = modelsGrouped.map((m) => m.model_id);
        //   const evolution = await prisma.lib_models.findMany({
        //     where: {
        //       id: {
        //         in: modelIds,
        //       },
        //     },
        //     select: {
        //       model_english: true,
        //     },
        //   });
        //   if (evolution.length > 0) {
        //     const makeModelEvolutionEntries = evolution.map((e) => ({
        //       url: `${baseUrl}/${make.label}/${m.model_short_name}/${e.model_english}`,
        //       lastModified: new Date(),
        //       changeFrequency: "monthly" as const,
        //       priority: 0.6,
        //     }));
        //     evolutionEntries.push(...makeModelEvolutionEntries);
        //   }
        // }
      }
    } catch (error) {
      console.error(`[v0] Error fetching models for ${make.label}:`, error);
      // Continue with other makes even if one fails
    }
  }

  return [
    {
      url: "https://autofish.ru/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://autofish.ru/schema",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://autofish.ru/questions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://autofish.ru/telegram",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...makesEntries,
    ...modelEntries,
  ];
}
