"use client";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import React from "react";
type ListProps = {
  id: number;
  name: string;
};
interface Props {
  list?: ListProps[];
}

export const Categories: React.FC<Props> = () => {
  const list = [
    {
      id: 1,
      name: "Корея",
    },
    {
      id: 2,
      name: "Остальной мир",
    },
  ];
  const categoryActive = useCategoryStore((state) => state.activeId);
  const setCategory = useCategoryStore((state) => state.setActiveId);
  return (
    <div className="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
      {list.map(({ name, id }, index) => (
        <a
          onClick={() => setCategory(id)}
          key={index}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActive === id &&
              "transition-colors duration-400 bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
