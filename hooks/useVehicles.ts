// import { encarType } from "@/app/api/vehicles/route";
// import { Api } from "@/services/api-client";

// import React from "react";
// interface ReturnProps {
//   vehicles: encarType[];
// }
// export const useVehicles = (): ReturnProps => {
//   const [vehicles, setVehicles] = React.useState<encarType[]>([]);
//   React.useEffect(() => {
//     async function fetchVehicles() {
//       try {
//         const vehicles = await Api.vehicles.getAll();
//         setVehicles(vehicles);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchVehicles();
//   }, []);
//   return { vehicles };
// };
