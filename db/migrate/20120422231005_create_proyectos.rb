class CreateProyectos < ActiveRecord::Migration
  def change
    create_table :proyectos do |t|

      t.timestamps
    end
  end
end
