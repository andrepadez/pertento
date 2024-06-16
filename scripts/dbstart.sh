#!/bin/bash
# Parse the database URL
DATABASE_NAME="pertento"
POSTGRES_USER="$(whoami)"
SQL_FILE_PATH="$(pwd)/pertento.sql"

# Check if the database exists
DB_EXISTS=$(psql -U "$POSTGRES_USER" -h localhost -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DATABASE_NAME'")

# If the database does not exist, create it
if [ "$DB_EXISTS" != "1" ]; then
    createdb -U "$POSTGRES_USER" -h localhost "$DATABASE_NAME"
fi

# Set the owner of the database to the postgres user
psql -U "$POSTGRES_USER" -h localhost -d "$DATABASE_NAME" -c "ALTER DATABASE $DATABASE_NAME OWNER TO postgres;"

# Restore the .sql file into the database
psql -U "$POSTGRES_USER" -h localhost -d "$DATABASE_NAME" -f "$SQL_FILE_PATH"

