#!/bin/bash

# Variables
DB_CONNECTION_STRING="postgres://postgres:postgres@2.56.29.152:5432/pertento_statistics"
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d%H%M)
LOG_FILE="$BACKUP_DIR/statistics_backup_log.txt"
MAX_BACKUPS=5

# Create a backup
nice -n 19 ionice -c2 -n7 pg_dump $DB_CONNECTION_STRING > $BACKUP_DIR/statistics_backup_$DATE.sql

if [ $? -eq 0 ]; then
    echo "Backup created successfully at $DATE" >> $LOG_FILE
else
    echo "Backup failed at $DATE" >> $LOG_FILE
    exit 1
fi

# Compress the backup
nice -n 19 ionice -c2 -n7 gzip $BACKUP_DIR/statistics_backup_$DATE.sql

if [ $? -eq 0 ]; then
    echo "Backup compressed successfully at $DATE" >> $LOG_FILE
else
    echo "Backup compression failed at $DATE" >> $LOG_FILE
    exit 1
fi

# restore data into my local server same database name
export PGPASSWORD="postgres"
psql -U postgres -d pertento_statistics -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
psql -U postgres -d pertento_statistics -c "DROP SCHEMA drizzle CASCADE; CREATE SCHEMA drizzle;"
gunzip -c $BACKUP_DIR/statistics_backup_$DATE.sql.gz | psql -U postgres -d pertento_statistics

if [ $? -eq 0 ]; then
    echo "Backup successfully restored to local database at $DATE" >> $LOG_FILE
else
    echo "Restore failed at $DATE" >> $LOG_FILE
    exit 1
fi

# Rotate backups
backups=$(ls -1t $BACKUP_DIR/statistics_backup_*.sql.gz | wc -l)
if [ $backups -gt $MAX_BACKUPS ]; then
    delete=$(expr $backups - $MAX_BACKUPS)
    for file in $(ls -1t $BACKUP_DIR/statistics_backup_*.sql.gz | tail -$delete); do
        rm -f $file
        echo "Deleted $file" >> $LOG_FILE
    done
fi



