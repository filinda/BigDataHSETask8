CREATE DATABASE db_task8;
create table db_task8.userlog(day Int32, ticktime Float64, speed Float64) ENGINE = MergeTree;
select count(), day from db_task8.userlog group by day;
select day, speed from db_task8.userlog where day = 1 order by speed limit 1 offset 516942
