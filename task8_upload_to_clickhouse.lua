box.cfg()

http_client = require('http.client').new({max_connections = 500})

local json = require('json')

count = box.space.userlogs:count()
print(count)
--count = 4000

partsize = 5000;


result = ''

for i=1350000,count,partsize do 
    data = box.space.userlogs.index.primary:select({},{offset=i, limit=partsize})
    for k=1,partsize,1 do
        rowData = data[k]
        result = result .. json.encode({day = rowData.Day, ticktime = rowData.TickTime, speed = rowData.Speed}, { __serialize="map"})
    end
    print(i/count*100)
    resp = http_client:post('http://localhost:8123','insert into db_task8.userlog FORMAT JSONEachRow ' .. result)
    result = ''
end

resp = http_client:post('http://localhost:8123','insert into db_task8.userlog FORMAT JSONEachRow ' .. result)
print(resp)