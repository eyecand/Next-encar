import { Categories } from "./categories";

export const TopBar = () => {
  return (
    <div className="max-w-[261px] rounded-lg">
      <div className="bg-white py-5 shadow-black/5">
        <div className=" flex items-center justify-between">
          <Categories />
        </div>
      </div>
    </div>
  );
};
