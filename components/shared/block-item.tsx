type BlockItemProps = {
  value: string | number | undefined | null;
  title: string;
};
export function BlockItem({ title, value }: BlockItemProps) {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-400 text-base md:text-lg w-1/2">
        {title === "Двигатель" ? (
          <>
            {title}, см<sup>3</sup>
          </>
        ) : (
          title
        )}
      </span>
      <span className="font-semibold text-base md:text-lg">
        {title === "Двигатель"
          ? value
            ? Number(value) < 500
              ? "-"
              : value
            : "-"
          : value}
      </span>
    </div>
  );
}
