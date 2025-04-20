import { tpl } from "./model";

export function detectMake(make: string) {
  const currentMake: tpl = {
    Hyundai: "Hyundai",
    Genesis: "Genesis",
    Kia: "Kia",
    ChevroletGMDaewoo: "Chevrolet (GM Daewoo)",
    ["Renault-KoreaSamsung"]: "Renault Korea (Samsung)",
    KG_Mobility_Ssangyong: "KG Mobility (Ssangyong)",
    Others: "Other manufacturers",
  };
  return currentMake[make];
}
