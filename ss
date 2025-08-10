generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL")
}

/// We could not retrieve columns for the underlying table. Either it has none or you are missing rights to see them. Please check your privileges.
// model SequelizeMeta {
// }

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model accident_and_change_histories {
  id                     BigInt    @id @default(autoincrement())
  vehicle_id             BigInt    @unique
  current_accident_count Int       @default(0)
  other_accident_count   Int       @default(0)
  robber_count           Int       @default(0)
  robber_date            DateTime? @db.Date
  total_loss_count       Int       @default(0)
  total_loss_date        DateTime? @db.Date
  flood_total_loss_count Int       @default(0)
  flood_part_loss_count  Int       @default(0)
  flood_date             DateTime? @db.Date
  current_accident_cost  Int       @default(0)
  other_accident_cost    Int       @default(0)
  government             Boolean   @default(false)
  business               Boolean   @default(false)
  loan                   Boolean   @default(false)
  created_at             DateTime  @db.Timestamptz(6)
  updated_at             DateTime  @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model accident_details {
  id                BigInt   @id @default(autoincrement())
  vehicle_id        BigInt
  type              String   @db.VarChar(15)
  date              DateTime @db.Date
  insurance_benefit Int      @default(0)
  part_cost         Int      @default(0)
  labor_cost        Int      @default(0)
  painting_cost     Int      @default(0)
  created_at        DateTime @db.Timestamptz(6)
  updated_at        DateTime @db.Timestamptz(6)

  @@unique([vehicle_id, date], map: "accident_details_vehicle_id_date_unique")
}

model active_lots {
  id                      BigInt   @id @default(autoincrement())
  vehicle_id              BigInt   @unique
  vehicle_fake_id_on_site Int?
  is_checked              Boolean  @default(false)
  created_at              DateTime @db.Timestamptz(6)
  updated_at              DateTime @db.Timestamptz(6)
}

model advertisement_trust_label {
  id               BigInt   @id @default(autoincrement())
  trust_label_id   Int
  advertisement_id BigInt
  created_at       DateTime @db.Timestamptz(6)
  updated_at       DateTime @db.Timestamptz(6)

  @@unique([advertisement_id, trust_label_id], map: "advertisement_trust_label_unique_index")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model advertisements {
  id                         BigInt   @id @default(autoincrement())
  vehicle_id                 BigInt   @unique
  registered_date_time       DateTime @db.Timestamptz(6)
  first_advertised_date_time DateTime @db.Timestamptz(6)
  price                      Int      @default(0)
  subscribe_count            Int      @default(0)
  view_count                 Int      @default(0)
  advertisement_status_id    BigInt
  created_at                 DateTime @db.Timestamptz(6)
  updated_at                 DateTime @db.Timestamptz(6)
}

model car_info_changes {
  id           BigInt   @id @default(autoincrement())
  vehicle_id   BigInt
  date         DateTime @db.Date
  plate_number String   @db.VarChar(25)
  created_at   DateTime @db.Timestamptz(6)
  updated_at   DateTime @db.Timestamptz(6)

  @@unique([vehicle_id, date, plate_number], map: "car_info_changes_unique")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model companies {
  id                           Int      @id @default(autoincrement())
  company_type_id              Int
  company_name                 String   @db.VarChar(255)
  company_name_english         String?  @db.VarChar(255)
  error_translate              Boolean  @default(false)
  brn                          String   @unique @db.VarChar(100)
  association_id               Int?
  certificated_employee_number String?  @db.VarChar(55)
  province_id                  Int?
  district_id                  Int?
  address_id                   Int?
  zipcode                      Int?
  created_at                   DateTime @db.Timestamptz(6)
  updated_at                   DateTime @db.Timestamptz(6)
}

model diagnosis_items {
  id                  BigInt   @id @default(autoincrement())
  diagnostic_id       BigInt
  diagnosis_code_id   Int
  diagnosis_result_id Int?
  comment_id          Int?
  created_at          DateTime @db.Timestamptz(6)
  updated_at          DateTime @db.Timestamptz(6)

  @@unique([diagnostic_id, diagnosis_code_id], map: "diagnostic_diagnosis_code_unique_index")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model diagnostic_centers {
  id                    Int      @id @default(autoincrement())
  checker_id_code       String   @unique @db.VarChar(55)
  checker_name          String   @db.VarChar(255)
  checker_name_english  String?  @db.VarChar(255)
  error_translate       Boolean  @default(false)
  center_code           String   @db.VarChar(55)
  reservation_center_id Int?
  created_at            DateTime @db.Timestamptz(6)
  updated_at            DateTime @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model diagnostics {
  id                       BigInt   @id @default(autoincrement())
  vehicle_id               BigInt   @unique
  diagnosis_number         Int
  scheduled_diagnosis_date DateTime @db.Date
  actual_diagnostic_date   DateTime @db.Date
  diagnostic_center_id     Int
  order_number             Int?
  register_id_code         String   @db.VarChar(55)
  created_at               DateTime @db.Timestamptz(6)
  updated_at               DateTime @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model encar_vehicles {
  id                    BigInt            @id @default(autoincrement())
  vehicle_id_on_auction Int               @unique
  vehicle_plate_number  String?           @db.VarChar(55)
  vehicle_type_id       Int
  extend_warranty       Boolean?
  diagnosis_passed      Boolean?
  pre_verified          Boolean?
  sell_type_id          Int
  seller_id             Int?
  created_at            DateTime          @db.Timestamptz(6)
  updated_at            DateTime          @db.Timestamptz(6)
  vehicle_vin_number    String?           @db.VarChar(55)
  inspections           inspections?
  vehicle_options       vehicle_options[]
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model insurance_certificates {
  id                BigInt   @id @default(autoincrement())
  vehicle_id        BigInt
  registration_date DateTime @db.Date
  first_date        DateTime @db.Date
  car_kind          String   @db.VarChar(55)
  use_type          String   @db.VarChar(55)
  created_at        DateTime @db.Timestamptz(6)
  updated_at        DateTime @db.Timestamptz(6)

  @@unique([vehicle_id, registration_date], map: "insurance_certificates_vehicle_unique")
}

model lib_addresses {
  id              Int      @id @default(autoincrement())
  address         String   @unique @db.VarChar(255)
  address_english String?  @db.VarChar(255)
  error_translate Boolean  @default(false)
  created_at      DateTime @db.Timestamptz(6)
  updated_at      DateTime @db.Timestamptz(6)
  geo_point       String?  @db.VarChar(255)
  error_geo_point Boolean?
}

model lib_advertisement_statuses {
  id         Int      @id @default(autoincrement())
  status     String   @unique @db.VarChar(55)
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model lib_associations {
  id                       Int      @id @default(autoincrement())
  association_name         String   @unique @db.VarChar(255)
  association_name_english String?  @db.VarChar(255)
  error_translate          Boolean  @default(false)
  created_at               DateTime @db.Timestamptz(6)
  updated_at               DateTime @db.Timestamptz(6)
}

model lib_body_types {
  id                Int      @id @default(autoincrement())
  body_type         String   @unique @db.VarChar(55)
  body_type_english String?  @db.VarChar(55)
  error_translate   Boolean  @default(false)
  created_at        DateTime @db.Timestamptz(6)
  updated_at        DateTime @db.Timestamptz(6)
}

model lib_certificate_types {
  id               Int      @id @default(autoincrement())
  certificate_type String   @unique @db.VarChar(255)
  created_at       DateTime @db.Timestamptz(6)
  updated_at       DateTime @db.Timestamptz(6)
}

model lib_colours {
  id              Int      @id @default(autoincrement())
  color           String   @unique @db.VarChar(55)
  color_english   String?  @db.VarChar(55)
  error_translate Boolean  @default(false)
  created_at      DateTime @db.Timestamptz(6)
  updated_at      DateTime @db.Timestamptz(6)
}

model lib_company_types {
  id           Int      @id @default(autoincrement())
  company_type String   @unique @db.VarChar(55)
  created_at   DateTime @db.Timestamptz(6)
  updated_at   DateTime @db.Timestamptz(6)
}

model lib_diagnosis_codes {
  id         Int      @id @default(autoincrement())
  code       String   @unique @db.VarChar(55)
  name       String   @db.VarChar(55)
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)
}

model lib_diagnosis_comments {
  id              Int      @id @default(autoincrement())
  comment         String   @unique @db.VarChar(1000)
  comment_english String?  @db.VarChar(1000)
  error_translate Boolean  @default(false)
  created_at      DateTime @db.Timestamptz(6)
  updated_at      DateTime @db.Timestamptz(6)
  comment_russian String?  @db.VarChar(3000)
}

model lib_diagnosis_results {
  id              Int      @id @default(autoincrement())
  result_code     String   @unique @db.VarChar(55)
  result          String   @db.VarChar(55)
  result_english  String?  @db.VarChar(55)
  error_translate Boolean  @default(false)
  created_at      DateTime @db.Timestamptz(6)
  updated_at      DateTime @db.Timestamptz(6)
}

model lib_districts {
  id               Int      @id @default(autoincrement())
  district         String   @unique @db.VarChar(55)
  district_english String?  @db.VarChar(55)
  error_translate  Boolean  @default(false)
  created_at       DateTime @db.Timestamptz(6)
  updated_at       DateTime @db.Timestamptz(6)
}

model lib_fuels {
  id              Int      @id @default(autoincrement())
  fuel            String   @unique @db.VarChar(55)
  fuel_english    String?  @db.VarChar(55)
  error_translate Boolean  @default(false)
  created_at      DateTime @db.Timestamptz(6)
  updated_at      DateTime @db.Timestamptz(6)
}

model lib_grades {
  id                   Int      @id @default(autoincrement())
  grade                String   @db.VarChar(100)
  grade_english        String?  @db.VarChar(100)
  error_translate      Boolean  @default(false)
  grade_detail         String?  @db.VarChar(100)
  grade_detail_english String?  @db.VarChar(100)
  created_at           DateTime @db.Timestamptz(6)
  updated_at           DateTime @db.Timestamptz(6)

  @@unique([grade, grade_detail, grade_detail_english], map: "lib_grades_grade_grade_detail_grade_detail_english_unique")
}

model lib_makes {
  id              Int      @id @default(autoincrement())
  make            String   @unique @db.VarChar(55)
  make_english    String?  @db.VarChar(55)
  make_short_name String?  @db.VarChar(55)
  error_translate Boolean  @default(false)
  created_at      DateTime @db.Timestamptz(6)
  updated_at      DateTime @db.Timestamptz(6)
}

model lib_models {
  id               Int      @id @default(autoincrement())
  model            String   @unique @db.VarChar(55)
  model_short_name String?  @db.VarChar(55)
  model_english    String?  @db.VarChar(55)
  error_translate  Boolean  @default(false)
  created_at       DateTime @db.Timestamptz(6)
  updated_at       DateTime @db.Timestamptz(6)
}

model lib_provinces {
  id               Int      @id @default(autoincrement())
  province         String   @unique @db.VarChar(55)
  province_english String?  @db.VarChar(55)
  error_translate  Boolean  @default(false)
  created_at       DateTime @db.Timestamptz(6)
  updated_at       DateTime @db.Timestamptz(6)
}

model lib_reservation_center {
  id                              Int      @id @default(autoincrement())
  reservation_center_name         String   @unique @db.VarChar(255)
  reservation_center_name_english String?  @db.VarChar(255)
  error_translate                 Boolean  @default(false)
  created_at                      DateTime @db.Timestamptz(6)
  updated_at                      DateTime @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model lib_sell_types {
  id         Int      @id @default(autoincrement())
  sell_type  String   @unique @db.VarChar(55)
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)
}

model lib_transmissions {
  id                   Int      @id @default(autoincrement())
  transmission         String   @unique @db.VarChar(100)
  transmission_english String?  @db.VarChar(100)
  error_translate      Boolean  @default(false)
  created_at           DateTime @db.Timestamptz(6)
  updated_at           DateTime @db.Timestamptz(6)
}

model lib_trust_labels {
  id         Int      @id @default(autoincrement())
  label      String   @unique @db.VarChar(55)
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)
}

model lib_user_types {
  id         Int      @id @default(autoincrement())
  user_type  String?  @unique @db.VarChar(55)
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model lib_vehicle_photo_types {
  id         Int      @id @default(autoincrement())
  type       String   @unique @db.VarChar(55)
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model lib_vehicle_types {
  id           Int      @id @default(autoincrement())
  vehicle_type String   @unique @db.VarChar(55)
  created_at   DateTime @db.Timestamptz(6)
  updated_at   DateTime @db.Timestamptz(6)
}

model not_joined_periods {
  id         BigInt   @id @default(autoincrement())
  vehicle_id BigInt
  start_date DateTime @db.Date
  end_date   DateTime @db.Date
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)

  @@unique([vehicle_id, start_date, end_date], map: "vehicle_not_joined_unique")
}

model owner_changes {
  id         BigInt   @id @default(autoincrement())
  vehicle_id BigInt
  date       DateTime @db.Date
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)

  @@unique([vehicle_id, date], map: "vehicle_owner_changes_unique_index")
}

model seller_company {
  id         BigInt   @id @default(autoincrement())
  seller_id  Int
  company_id Int
  created_at DateTime @db.Timestamptz(6)
  updated_at DateTime @db.Timestamptz(6)

  @@unique([seller_id, company_id], map: "seller_company_unique_index")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model sellers {
  id                              Int       @id @default(autoincrement())
  id_user_on_auction              String    @unique @db.VarChar(55)
  phone_number                    String?   @db.VarChar(55)
  address_id                      Int?
  user_type_id                    Int?
  user_name                       String?   @db.VarChar(55)
  user_name_english               String?   @db.VarChar(255)
  nickname                        String?   @db.VarChar(100)
  nickname_english                String?   @db.VarChar(255)
  error_translate                 Boolean   @default(false)
  joined_date_time                DateTime? @db.Timestamptz(6)
  latest_modified_date_time       DateTime? @db.Timestamptz(6)
  certification                   Boolean?
  certificate_type_id             Int?
  receive_sms                     Boolean?
  receive_email                   Boolean?
  profile_image_url               String?   @db.VarChar(500)
  use_company_name                Boolean?
  currently_on_sales              Int       @default(0)
  total_sales                     Int       @default(0)
  recent_year_sales               Int       @default(0)
  safe_sale_start_date            DateTime? @db.Date
  safe_sale_for_year              Int       @default(0)
  safe_sale_for_days_on_this_year Int       @default(0)
  created_at                      DateTime  @db.Timestamptz(6)
  updated_at                      DateTime  @db.Timestamptz(6)
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
/// We could not retrieve columns for the underlying table. Either it has none or you are missing rights to see them. Please check your privileges.
// model sys_filter_parse_control {
// }

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
/// We could not retrieve columns for the underlying table. Either it has none or you are missing rights to see them. Please check your privileges.
// model sys_update_controls {
// }

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model vehicle_details {
  id                         BigInt    @id @default(autoincrement())
  vehicle_id                 BigInt    @unique
  make_id                    Int
  model_id                   Int
  grade_id                   Int
  form_year                  Int
  origin_price               Int?
  mileage                    Int
  engine_displacement        Int
  transmission_id            Int
  fuel_id                    Int
  colour_id                  Int
  body_type_id               Int
  created_at                 DateTime  @db.Timestamptz(6)
  updated_at                 DateTime  @db.Timestamptz(6)
  release_date               DateTime? @db.Date
  engine_displacement_liters Decimal?  @db.Decimal(3, 1)
  drive_type_id              Int?
  seat_count                 Int?
}

model vehicle_photos {
  id                    BigInt                            @id @default(autoincrement())
  vehicle_id            BigInt
  vehicle_photo_type_id Int
  url                   String                            @db.VarChar(500)
  created_at            DateTime                          @db.Timestamptz(6)
  updated_at            DateTime                          @db.Timestamptz(6)
  upload_status         enum_vehicle_photos_upload_status @default(PENDING)
  error_message         String?                           @db.VarChar(500)
  tries                 Int                               @default(0)
  s3_images             s3_images?

  @@index([vehicle_id, url], map: "vehicle_photos_vehicle_id_url")
  @@index([upload_status, tries])
}

model lib_drive_types {
  id         Int      @id @default(autoincrement())
  drive_type String   @unique @db.VarChar(55)
  created_at DateTime @default(now()) @db.Timestamptz(6)
  updated_at DateTime @default(now()) @db.Timestamptz(6)
}

model currency_rates {
  char_code String  @id
  name      String
  value     Decimal @db.Decimal
}

model component_conditions {
  id                     BigInt                  @id @default(autoincrement())
  component_item_id      Int
  component_subitem_id   Int?
  condition_id           Int
  created_at             DateTime                @default(now()) @db.Timestamptz(6)
  updated_at             DateTime                @default(now()) @db.Timestamptz(6)
  lib_component_items    lib_component_items     @relation(fields: [component_item_id], references: [id])
  lib_component_subitems lib_component_subitems? @relation(fields: [component_subitem_id], references: [id])
  lib_conditions         lib_conditions          @relation(fields: [condition_id], references: [id])

  @@unique([component_item_id, component_subitem_id, condition_id], map: "component_conditions_unique_idx")
}

model inspection_details {
  id                     BigInt                  @id @default(autoincrement())
  inspection_id          BigInt
  main_component_id      Int
  component_item_id      Int
  component_subitem_id   Int?
  condition_id           Int?
  remark                 String?
  remark_english         String?
  error_translate        Boolean                 @default(false)
  created_at             DateTime                @default(now()) @db.Timestamptz(6)
  updated_at             DateTime                @default(now()) @db.Timestamptz(6)
  lib_component_items    lib_component_items     @relation(fields: [component_item_id], references: [id])
  lib_component_subitems lib_component_subitems? @relation(fields: [component_subitem_id], references: [id])
  lib_conditions         lib_conditions?         @relation(fields: [condition_id], references: [id])
  inspections            inspections             @relation(fields: [inspection_id], references: [id], onDelete: Cascade)
  lib_main_components    lib_main_components     @relation(fields: [main_component_id], references: [id])

  @@unique([inspection_id, main_component_id, component_item_id, component_subitem_id], map: "inspection_details_unique_index")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model inspection_estimates {
  id                  BigInt              @id @default(autoincrement())
  inspection_id       BigInt
  main_component_id   Int
  estimated_amount    Int?
  created_at          DateTime            @default(now()) @db.Timestamptz(6)
  updated_at          DateTime            @default(now()) @db.Timestamptz(6)
  inspections         inspections         @relation(fields: [inspection_id], references: [id], onDelete: Cascade)
  lib_main_components lib_main_components @relation(fields: [main_component_id], references: [id], onDelete: Cascade)

  @@unique([inspection_id, main_component_id], map: "inspection_estimates_inspection_id_main_component_id_unique")
}

/// This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
model inspections {
  id                       BigInt                     @id @default(autoincrement())
  vehicle_id               BigInt                     @unique
  engine_type_id           Int
  registration_date        DateTime                   @db.Date
  created_at               DateTime                   @default(now()) @db.Timestamptz(6)
  updated_at               DateTime                   @default(now()) @db.Timestamptz(6)
  inspection_details       inspection_details[]
  inspection_estimates     inspection_estimates[]
  lib_engine_types         lib_engine_types           @relation(fields: [engine_type_id], references: [id])
  encar_vehicles           encar_vehicles             @relation(fields: [vehicle_id], references: [id], onDelete: Cascade)
  outer_inspection_details outer_inspection_details[]
}

model lib_component_items {
  id                   Int                    @id @default(autoincrement())
  code                 String                 @unique @db.VarChar(255)
  name                 String                 @db.VarChar(255)
  name_english         String?                @db.VarChar(255)
  error_translate      Boolean                @default(false)
  created_at           DateTime               @default(now()) @db.Timestamptz(6)
  updated_at           DateTime               @default(now()) @db.Timestamptz(6)
  component_conditions component_conditions[]
  inspection_details   inspection_details[]
}

model lib_component_subitems {
  id                   Int                    @id @default(autoincrement())
  code                 String                 @unique @db.VarChar(255)
  name                 String                 @db.VarChar(255)
  name_english         String?                @db.VarChar(255)
  error_translate      Boolean                @default(false)
  created_at           DateTime               @default(now()) @db.Timestamptz(6)
  updated_at           DateTime               @default(now()) @db.Timestamptz(6)
  component_conditions component_conditions[]
  inspection_details   inspection_details[]
}

model lib_conditions {
  id                   Int                    @id @default(autoincrement())
  code                 String                 @unique @db.VarChar(255)
  name                 String                 @db.VarChar(255)
  name_english         String?                @db.VarChar(255)
  error_translate      Boolean                @default(false)
  created_at           DateTime               @default(now()) @db.Timestamptz(6)
  updated_at           DateTime               @default(now()) @db.Timestamptz(6)
  component_conditions component_conditions[]
  inspection_details   inspection_details[]
}

model lib_engine_types {
  id          Int           @id @default(autoincrement())
  name        String        @unique @db.VarChar(55)
  created_at  DateTime      @default(now()) @db.Timestamptz(6)
  updated_at  DateTime      @default(now()) @db.Timestamptz(6)
  inspections inspections[]
}

model lib_main_components {
  id                   Int                    @id @default(autoincrement())
  code                 String                 @unique @db.VarChar(255)
  name                 String                 @db.VarChar(255)
  name_english         String?                @db.VarChar(255)
  error_translate      Boolean                @default(false)
  created_at           DateTime               @default(now()) @db.Timestamptz(6)
  updated_at           DateTime               @default(now()) @db.Timestamptz(6)
  inspection_details   inspection_details[]
  inspection_estimates inspection_estimates[]
}

model lib_option_types {
  id                       Int           @id @default(autoincrement())
  option_type_key          String        @unique @db.VarChar(255)
  option_type_name         String        @db.VarChar(255)
  option_type_name_english String?       @db.VarChar(255)
  error_translate          Boolean       @default(false)
  created_at               DateTime      @default(now()) @db.Timestamptz(6)
  updated_at               DateTime      @default(now()) @db.Timestamptz(6)
  lib_options              lib_options[]
}

model lib_options {
  id                  Int               @id @default(autoincrement())
  option_cd           String            @unique @db.VarChar(255)
  option_type_id      Int
  option_name         String            @db.VarChar(255)
  option_name_english String?           @db.VarChar(255)
  description         String?
  description_english String?
  location            String?
  location_english    String?
  error_translate     Boolean           @default(false)
  created_at          DateTime          @default(now()) @db.Timestamptz(6)
  updated_at          DateTime          @default(now()) @db.Timestamptz(6)
  description_russian String?
  location_russian    String?
  option_name_russian String?           @db.VarChar(255)
  lib_option_types    lib_option_types  @relation(fields: [option_type_id], references: [id])
  option_images       option_images?
  vehicle_options     vehicle_options[]
}

model lib_outer_item_conditions {
  id                                 Int                                  @id @default(autoincrement())
  code                               String                               @unique @db.VarChar(255)
  name                               String                               @db.VarChar(255)
  name_english                       String?                              @db.VarChar(255)
  error_translate                    Boolean                              @default(false)
  created_at                         DateTime                             @default(now()) @db.Timestamptz(6)
  updated_at                         DateTime                             @default(now()) @db.Timestamptz(6)
  outer_inspection_detail_conditions outer_inspection_detail_conditions[]
}

model lib_outer_items {
  id                       Int                        @id @default(autoincrement())
  code                     String                     @unique @db.VarChar(255)
  name                     String                     @db.VarChar(255)
  name_english             String?                    @db.VarChar(255)
  error_translate          Boolean                    @default(false)
  created_at               DateTime                   @default(now()) @db.Timestamptz(6)
  updated_at               DateTime                   @default(now()) @db.Timestamptz(6)
  outer_inspection_details outer_inspection_details[]
}

model lib_ranks {
  id                            Int                             @id @default(autoincrement())
  name                          String                          @unique @db.VarChar(255)
  created_at                    DateTime                        @default(now()) @db.Timestamptz(6)
  updated_at                    DateTime                        @default(now()) @db.Timestamptz(6)
  outer_inspection_detail_ranks outer_inspection_detail_ranks[]
}

model option_images {
  id            Int                              @id @default(autoincrement())
  option_id     Int                              @unique
  original_url  String                           @db.VarChar(500)
  s3_url        String?                          @db.VarChar(500)
  base_64       String?
  upload_status enum_option_images_upload_status @default(PENDING)
  error_message String?                          @db.VarChar(500)
  tries         Int                              @default(0)
  created_at    DateTime                         @default(now()) @db.Timestamptz(6)
  updated_at    DateTime                         @default(now()) @db.Timestamptz(6)
  lib_options   lib_options                      @relation(fields: [option_id], references: [id])

  @@unique([option_id, original_url], map: "option_images_option_id_original_url_unique")
  @@index([upload_status, tries], map: "option_images_upload_status_tries_index")
}

model outer_inspection_detail_conditions {
  id                         BigInt                    @id @default(autoincrement())
  outer_inspection_detail_id BigInt
  outer_item_condition_id    Int
  created_at                 DateTime                  @default(now()) @db.Timestamptz(6)
  updated_at                 DateTime                  @default(now()) @db.Timestamptz(6)
  outer_inspection_details   outer_inspection_details  @relation(fields: [outer_inspection_detail_id], references: [id], onDelete: Cascade, map: "outer_inspection_detail_conditi_outer_inspection_detail_id_fkey")
  lib_outer_item_conditions  lib_outer_item_conditions @relation(fields: [outer_item_condition_id], references: [id], onDelete: Cascade)

  @@unique([outer_inspection_detail_id, outer_item_condition_id], map: "outer_inspection_detail_conditions_unique_idx")
}

model outer_inspection_detail_ranks {
  id                         BigInt                   @id @default(autoincrement())
  outer_inspection_detail_id BigInt
  rank_id                    Int
  created_at                 DateTime                 @default(now()) @db.Timestamptz(6)
  updated_at                 DateTime                 @default(now()) @db.Timestamptz(6)
  outer_inspection_details   outer_inspection_details @relation(fields: [outer_inspection_detail_id], references: [id], onDelete: Cascade)
  lib_ranks                  lib_ranks                @relation(fields: [rank_id], references: [id], onDelete: Cascade)

  @@unique([outer_inspection_detail_id, rank_id], map: "outer_inspection_detail_ranks_unique_idx")
}

model outer_inspection_details {
  id                                 BigInt                               @id @default(autoincrement())
  inspection_id                      BigInt
  outer_item_id                      Int
  created_at                         DateTime                             @default(now()) @db.Timestamptz(6)
  updated_at                         DateTime                             @default(now()) @db.Timestamptz(6)
  outer_inspection_detail_conditions outer_inspection_detail_conditions[]
  outer_inspection_detail_ranks      outer_inspection_detail_ranks[]
  inspections                        inspections                          @relation(fields: [inspection_id], references: [id])
  lib_outer_items                    lib_outer_items                      @relation(fields: [outer_item_id], references: [id])

  @@unique([inspection_id, outer_item_id], map: "outer_inspection_details_unique_idx")
}

model s3_images {
  id               BigInt         @id @default(autoincrement())
  vehicle_photo_id BigInt         @unique
  s3_key           String
  url              String         @db.VarChar(500)
  uploaded_at      DateTime       @default(now()) @db.Timestamptz(6)
  created_at       DateTime       @default(now()) @db.Timestamptz(6)
  updated_at       DateTime       @default(now()) @db.Timestamptz(6)
  vehicle_photos   vehicle_photos @relation(fields: [vehicle_photo_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@unique([vehicle_photo_id, s3_key], map: "s3_images_vehicle_photo_id_s3_key_unique")
}

model vehicle_options {
  id             BigInt         @id @default(autoincrement())
  vehicle_id     BigInt
  option_id      Int
  created_at     DateTime       @default(now()) @db.Timestamptz(6)
  updated_at     DateTime       @default(now()) @db.Timestamptz(6)
  lib_options    lib_options    @relation(fields: [option_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  encar_vehicles encar_vehicles @relation(fields: [vehicle_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@unique([vehicle_id, option_id], map: "vehicle_options_vehicle_id_option_id_unique")
}

enum enum_option_images_upload_status {
  PENDING
  UPLOADED
  FAILED
  INVALID
  IN_PROGRESS
}

enum enum_vehicle_photos_upload_status {
  PENDING
  UPLOADED
  FAILED
  INVALID
  IN_PROGRESS
}
