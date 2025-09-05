export type Props = {
  data: {
    inspection_details: {
      lib_component_items: {
        name_english: string | null;
      };
      lib_component_subitems: {
        name_english: string | null;
      } | null;
      lib_conditions: {
        name_english: string | null;
      } | null;
      lib_main_components: {
        name_english: string | null;
      };
    }[];
  } | null;
};
export type Props2 = {
  inspection_details:
    | {
        lib_component_items: {
          name_english: string | null;
        };
        lib_component_subitems: {
          name_english: string | null;
        } | null;
        lib_conditions: {
          name_english: string | null;
        } | null;
        lib_main_components: {
          name_english: string | null;
        };
      }[];
  title: string;
};
export type Prop3 = {
  sub_items: {
    lib_component_items: {
      name_english: string | null;
    };
    lib_component_subitems: {
      name_english: string | null;
    } | null;
    lib_conditions: {
      name_english: string | null;
    } | null;
    lib_main_components: {
      name_english: string | null;
    };
  }[];
};
