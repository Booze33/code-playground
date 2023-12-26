class CreateUserCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :user_codes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :programming_language
      t.text :code_content

      t.timestamps
    end
  end
end
