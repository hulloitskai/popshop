# typed: strong

class ActiveRecord::Base
  include MoneyRails::ActiveRecord::Monetizable
end

module ActiveRecord
  class Migration
    include MoneyRails::ActiveRecord::MigrationExtensions::SchemaStatements
  end

  module ConnectionAdapters
    class Table
      include MoneyRails::ActiveRecord::MigrationExtensions::Table
    end

    class TableDefinition
      include MoneyRails::ActiveRecord::MigrationExtensions::Table
    end
  end
end
