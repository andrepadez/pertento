cat .env
pg_dump -U postgres -h localhost -p 5432 -W -F p -d pertento > ~/pertento.sql
