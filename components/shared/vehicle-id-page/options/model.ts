export type OptionsProps = {
  options: {
    lib_options: {
      description_russian: string | null;
      option_name_russian: string | null;
      lib_option_types: {
        option_type_key: string;
      };
      option_images: {
        s3_url: string | null;
        base_64: string | null;
      } | null;
    };
  }[];
};

export type OptionItemProps = {
  name: string | null;
  image: string | null;
  description: string | null;
};
