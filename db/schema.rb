# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_11_215102) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "accounts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.uuid "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at", precision: nil
    t.string "stripe_account_id"
    t.string "stripe_account_email"
    t.index ["owner_id"], name: "index_accounts_on_owner_id"
    t.index ["stripe_account_id"], name: "index_accounts_on_stripe_account_id", unique: true
  end

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.uuid "record_id", null: false
    t.uuid "blob_id", null: false
    t.timestamp "created_at", precision: 6, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.timestamp "created_at", precision: 6, null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "customers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", null: false
    t.uuid "account_id", null: false
    t.string "stripe_customer_id"
    t.index ["account_id", "email"], name: "index_customers_on_account_id_and_email", unique: true
    t.index ["account_id"], name: "index_customers_on_account_id"
    t.index ["stripe_customer_id"], name: "index_customers_on_stripe_customer_id", unique: true
  end

  create_table "good_job_processes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "state"
  end

  create_table "good_job_settings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "key"
    t.jsonb "value"
    t.index ["key"], name: "index_good_job_settings_on_key", unique: true
  end

  create_table "good_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "queue_name"
    t.integer "priority"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "performed_at"
    t.datetime "finished_at"
    t.text "error"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "active_job_id"
    t.text "concurrency_key"
    t.text "cron_key"
    t.uuid "retried_good_job_id"
    t.datetime "cron_at"
    t.index ["active_job_id", "created_at"], name: "index_good_jobs_on_active_job_id_and_created_at"
    t.index ["active_job_id"], name: "index_good_jobs_on_active_job_id"
    t.index ["concurrency_key"], name: "index_good_jobs_on_concurrency_key_when_unfinished", where: "(finished_at IS NULL)"
    t.index ["cron_key", "created_at"], name: "index_good_jobs_on_cron_key_and_created_at"
    t.index ["cron_key", "cron_at"], name: "index_good_jobs_on_cron_key_and_cron_at", unique: true
    t.index ["finished_at"], name: "index_good_jobs_jobs_on_finished_at", where: "((retried_good_job_id IS NULL) AND (finished_at IS NOT NULL))"
    t.index ["priority", "created_at"], name: "index_good_jobs_jobs_on_priority_created_at_when_unfinished", order: { priority: "DESC NULLS LAST" }, where: "(finished_at IS NULL)"
    t.index ["queue_name", "scheduled_at"], name: "index_good_jobs_on_queue_name_and_scheduled_at", where: "(finished_at IS NULL)"
    t.index ["scheduled_at"], name: "index_good_jobs_on_scheduled_at", where: "(finished_at IS NULL)"
  end

  create_table "icloud_credentials", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "password", null: false
    t.text "cookies"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "session"
    t.string "email", null: false
  end

  create_table "obsidian_ghost_notes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_obsidian_ghost_notes_on_name", unique: true
  end

  create_table "obsidian_notes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "aliases", default: [], null: false, array: true
    t.string "tags", default: [], null: false, array: true
    t.text "content", null: false
    t.datetime "modified_at", precision: nil, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "analyzed_at", precision: nil
    t.index ["aliases"], name: "index_obsidian_notes_on_aliases"
    t.index ["analyzed_at"], name: "index_obsidian_notes_on_analyzed_at"
    t.index ["modified_at"], name: "index_obsidian_notes_on_modified_at"
    t.index ["name"], name: "index_obsidian_notes_on_name", unique: true
    t.index ["tags"], name: "index_obsidian_notes_on_tags"
  end

  create_table "obsidian_relations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "from_id", null: false
    t.uuid "to_id", null: false
    t.string "to_type", default: "nil", null: false
    t.index ["from_id", "to_id"], name: "index_obsidian_relations_uniqueness", unique: true
    t.index ["from_id"], name: "index_obsidian_relations_on_from_id"
    t.index ["to_id"], name: "index_obsidian_relations_on_to_id"
  end

  create_table "order_items", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "order_id", null: false
    t.uuid "product_item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_item_id"], name: "index_order_items_on_product_item_id"
  end

  create_table "order_question_responses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "question_id", null: false
    t.uuid "order_item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "answer", null: false
    t.index ["order_item_id"], name: "index_order_question_responses_on_order_item_id"
    t.index ["question_id"], name: "index_order_question_responses_on_question_id"
  end

  create_table "order_questions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "prompt", null: false
    t.uuid "product_item_id", null: false
    t.string "type", null: false
    t.string "choices", default: [], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_item_id"], name: "index_order_questions_on_product_item_id"
  end

  create_table "orders", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "code", null: false
    t.string "status", null: false
    t.uuid "customer_id", null: false
    t.uuid "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_checkout_session_id"
    t.string "stripe_checkout_session_url"
    t.uuid "account_id", null: false
    t.integer "subtotal_cents", null: false
    t.integer "total_cents", null: false
    t.index ["account_id"], name: "index_orders_on_account_id"
    t.index ["code"], name: "index_orders_on_code", unique: true
    t.index ["customer_id"], name: "index_orders_on_customer_id"
    t.index ["product_id"], name: "index_orders_on_product_id"
    t.index ["status"], name: "index_orders_on_status"
    t.index ["stripe_checkout_session_id"], name: "index_orders_on_stripe_checkout_session_id", unique: true
    t.index ["stripe_checkout_session_url"], name: "index_orders_on_stripe_checkout_session_url", unique: true
  end

  create_table "product_items", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "product_id", null: false
    t.integer "price_cents", null: false
    t.string "name", null: false
    t.string "order_scope", null: false
    t.string "units"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.string "stripe_product_id"
    t.string "stripe_price_id"
    t.datetime "discarded_at", precision: nil
    t.uuid "question_ids", default: [], null: false, array: true
    t.uuid "tax_rate_id"
    t.index ["product_id"], name: "index_product_items_on_product_id"
    t.index ["stripe_price_id"], name: "index_product_items_on_stripe_price_id", unique: true
    t.index ["stripe_product_id"], name: "index_product_items_on_stripe_product_id", unique: true
    t.index ["tax_rate_id"], name: "index_product_items_on_tax_rate_id"
  end

  create_table "products", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.string "name", null: false
    t.text "description"
    t.datetime "published_at", precision: nil
    t.datetime "discarded_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "currency_code", limit: 3, null: false
    t.string "slug", null: false
    t.index ["account_id", "name"], name: "index_products_on_account_id_and_name", unique: true
    t.index ["account_id", "slug"], name: "index_products_on_account_id_and_slug", unique: true
    t.index ["account_id"], name: "index_products_on_account_id"
  end

  create_table "tax_rates", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "account_id", null: false
    t.string "name", null: false
    t.float "percentage", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_tax_rate_id"
    t.index ["account_id", "name"], name: "index_tax_rates_uniqueness", unique: true
    t.index ["account_id"], name: "index_tax_rates_on_account_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.uuid "primary_account_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["primary_account_id"], name: "index_users_on_primary_account_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "accounts", "users", column: "owner_id"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "customers", "accounts"
  add_foreign_key "obsidian_relations", "obsidian_notes", column: "from_id"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "product_items"
  add_foreign_key "order_question_responses", "order_items"
  add_foreign_key "order_question_responses", "order_questions", column: "question_id"
  add_foreign_key "order_questions", "product_items"
  add_foreign_key "orders", "accounts"
  add_foreign_key "orders", "customers"
  add_foreign_key "orders", "products"
  add_foreign_key "product_items", "products"
  add_foreign_key "product_items", "tax_rates"
  add_foreign_key "products", "accounts"
  add_foreign_key "tax_rates", "accounts"
  add_foreign_key "users", "accounts", column: "primary_account_id"
end
