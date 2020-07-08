# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_08_202549) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer "user_id"
    t.text "post"
    t.datetime "created_at", precision: 6, null: false
    t.date "updated_at", null: false
    t.integer "trail_id"
    t.string "user_name"
    t.string "trail_name"
  end

  create_table "favorites", force: :cascade do |t|
    t.integer "user_id"
    t.integer "fav_trail_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "questionnaires", force: :cascade do |t|
    t.boolean "question1"
    t.boolean "question2"
    t.boolean "question3"
    t.boolean "question4"
    t.boolean "question5"
    t.boolean "question6"
    t.boolean "question7"
    t.boolean "question8"
    t.boolean "question9"
    t.boolean "question10"
    t.boolean "question11"
    t.boolean "question12"
    t.boolean "question13"
    t.boolean "question14"
    t.boolean "question15"
    t.boolean "question16"
    t.boolean "question17"
    t.boolean "question18"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "trail_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "user_name"
    t.string "avatar"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
