-- Essential database indexes for query optimization

-- Index for active_lots vehicle_id (if not already exists)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_active_lots_vehicle_id 
ON active_lots(vehicle_id);

-- Composite index for vehicle search filters
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_vehicle_details_search 
ON vehicle_details(make_id, model_id, form_year, mileage, engine_displacement_liters);

-- Index for price filtering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_advertisements_price 
ON advertisements(price, registered_date_time);

-- Index for release date filtering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_vehicle_details_release_date 
ON vehicle_details(release_date);

-- Index for accident details filtering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_accident_details_insurance 
ON accident_details(vehicle_id, insurance_benefit);

-- Index for photo upload status
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_vehicle_photos_upload_status 
ON vehicle_photos(vehicle_id, upload_status, created_at);

-- Index for vehicle options
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_vehicle_options_vehicle_id 
ON vehicle_options(vehicle_id, option_id);

-- Composite index for lib tables joins
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_lib_makes_short_name 
ON lib_makes(make_short_name);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_lib_models_short_name 
ON lib_models(model_short_name, model_english);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_lib_grades_english 
ON lib_grades(grade_english, grade_detail_english);

-- Index for system update controls
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sys_update_controls_status 
ON sys_update_controls(update_status, translate_status, data_missing_flag);
