import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
interface ReturnPros {
  makesType: string | null;
  modelType: string | null;
  gradesType: string | null;
  evolutonsType: string | null;
  gradeEng: string | null;
  gradeDetail: string | null;
  fuels: string | null;
  yearsMin: string | null;
  yearsMax: string | null;
  priceMin: string | null;
  priceMax: string | null;
  engineMin: string | null;
  engineMax: string | null;
  buisness: string | null;
  robber: string | null;
  changeNumber: string | null;
  changeOwner: string | null;
  insuare: string | null;
  insuarePrice: string | null;
  sort: string | null;
  privod: string | null;
  transmission: string | null;
  mileageMin: string | null;
  mileageMax: string | null;
  cities: string | null;
  check: string | null;
  checkNewCar: string | null;
  checkOldCar: string | null;
  setMakesType: (value: string | null) => void;
  setModelType: (value: string | null) => void;
  setGradesType: (value: string | null) => void;
  setGradesEng: (value: string | null) => void;
  setGradesDetail: (value: string | null) => void;
  setEvolutionsType: (value: string | null) => void;
  setFuels: (value: string | null) => void;
  setYearsMin: (value: string | null) => void;
  setYearsMax: (value: string | null) => void;
  setPriceMin: (value: string | null) => void;
  setPriceMax: (value: string | null) => void;
  setEngineMin: (value: string | null) => void;
  setEngineMax: (value: string | null) => void;
  setBuisness: (value: string | null) => void;
  setRobber: (value: string | null) => void;
  setChangeNumber: (value: string | null) => void;
  setChangeOwner: (value: string | null) => void;
  setInsuare: (value: string | null) => void;
  setInsuarePrice: (value: string | null) => void;
  setPrivod: (value: string | null) => void;
  setSort: (value: string | null) => void;
  setTransmission: (value: string | null) => void;
  setMileageMin: (value: string | null) => void;
  setMileageMax: (value: string | null) => void;
  setCities: (value: string | null) => void;
  setCheck: (value: string | null) => void;
  setCheckNewCar: (value: string | null) => void;
  setCheckOldCar: (value: string | null) => void;
}
export const useFilters = (): ReturnPros => {
  const searchParams = useSearchParams();
  const [makesType, setMakesType] = useState(
    searchParams.has("makes") ? searchParams.get("makes") : null
  );
  const [modelType, setModelType] = useState(
    searchParams.has("model") ? searchParams.get("model") : null
  );
  const [gradesType, setGradesType] = useState(
    searchParams.has("grades") ? searchParams.get("grades") : null
  );
  const [evolutonsType, setEvolutionsType] = useState(
    searchParams.has("evolutons") ? searchParams.get("evolutons") : null
  );
  const [gradeEng, setGradesEng] = useState(
    searchParams.has("grade_eng") ? searchParams.get("grade_eng") : null
  );
  const [gradeDetail, setGradesDetail] = useState(
    searchParams.has("grade_detail") ? searchParams.get("grade_detail") : null
  );
  const [fuels, setFuels] = useState(
    searchParams.has("fuels") ? searchParams.get("fuels") : null
  );
  const [yearsMin, setYearsMin] = useState(
    searchParams.has("yearsMin") ? searchParams.get("yearsMin") : null
  );
  const [yearsMax, setYearsMax] = useState(
    searchParams.has("yearsMax") ? searchParams.get("yearsMax") : null
  );
  const [priceMin, setPriceMin] = useState<string | null>(
    searchParams.has("priceMin") ? searchParams.get("priceMin") : null
  );
  const [priceMax, setPriceMax] = useState<string | null>(
    searchParams.has("priceMax") ? searchParams.get("priceMax") : null
  );
  const [engineMin, setEngineMin] = useState<string | null>(
    searchParams.has("engineMin") ? searchParams.get("engineMin") : null
  );
  const [engineMax, setEngineMax] = useState<string | null>(
    searchParams.has("engineMax") ? searchParams.get("engineMax") : null
  );
  const [buisness, setBuisness] = useState(
    searchParams.has("buisness") ? searchParams.get("buisness") : null
  );
  const [robber, setRobber] = useState(
    searchParams.has("robber") ? searchParams.get("robber") : null
  );
  const [changeNumber, setChangeNumber] = useState(
    searchParams.has("changeNumber") ? searchParams.get("changeNumber") : null
  );
  const [changeOwner, setChangeOwner] = useState(
    searchParams.has("changeOwner") ? searchParams.get("changeOwner") : null
  );
  const [insuare, setInsuare] = useState(
    searchParams.has("insuare") ? searchParams.get("insuare") : null
  );
  const [insuarePrice, setInsuarePrice] = useState(
    searchParams.has("insuarePrice") ? searchParams.get("insuarePrice") : null
  );
  const [sort, setSort] = useState(
    searchParams.has("sort") ? searchParams.get("sort") : null
  );
  const [privod, setPrivod] = useState(
    searchParams.has("privod") ? searchParams.get("privod") : null
  );
  const [transmission, setTransmission] = useState(
    searchParams.has("transmission") ? searchParams.get("transmission") : null
  );
  const [mileageMin, setMileageMin] = useState(
    searchParams.has("mileageMin") ? searchParams.get("mileageMin") : null
  );
  const [mileageMax, setMileageMax] = useState(
    searchParams.has("mileageMax") ? searchParams.get("mileageMax") : null
  );
  const [cities, setCities] = useState(
    searchParams.has("cities") ? searchParams.get("cities") : null
  );
  const [check, setCheck] = useState(
    searchParams.has("check") ? searchParams.get("check") : null
  );
  const [checkNewCar, setCheckNewCar] = useState(
    searchParams.has("checkNew") ? searchParams.get("checkNew") : null
  );
  const [checkOldCar, setCheckOldCar] = useState(
    searchParams.has("checkOld") ? searchParams.get("checkOld") : null
  );
  return useMemo(
    () => ({
      makesType,
      modelType,
      gradesType,
      gradeEng,
      gradeDetail,
      evolutonsType,
      fuels,
      yearsMin,
      yearsMax,
      priceMin,
      priceMax,
      engineMin,
      engineMax,
      buisness,
      robber,
      changeNumber,
      changeOwner,
      insuare,
      insuarePrice,
      sort,
      privod,
      transmission,
      mileageMin,
      mileageMax,
      cities,
      check,
      checkNewCar,
      checkOldCar,
      setMakesType,
      setModelType,
      setGradesType,
      setGradesEng,
      setGradesDetail,
      setEvolutionsType,
      setFuels,
      setYearsMin,
      setYearsMax,
      setPriceMin,
      setPriceMax,
      setEngineMin,
      setEngineMax,
      setBuisness,
      setRobber,
      setChangeNumber,
      setChangeOwner,
      setInsuare,
      setInsuarePrice,
      setSort,
      setPrivod,
      setTransmission,
      setMileageMin,
      setMileageMax,
      setCities,
      setCheck,
      setCheckNewCar,
      setCheckOldCar,
    }),
    [
      makesType,
      modelType,
      gradesType,
      gradeEng,
      gradeDetail,
      evolutonsType,
      fuels,
      yearsMin,
      yearsMax,
      priceMin,
      priceMax,
      engineMin,
      engineMax,
      buisness,
      robber,
      changeNumber,
      changeOwner,
      insuare,
      insuarePrice,
      sort,
      privod,
      transmission,
      mileageMin,
      mileageMax,
      cities,
      check,
      checkNewCar,
      checkOldCar,
    ]
  );
};
