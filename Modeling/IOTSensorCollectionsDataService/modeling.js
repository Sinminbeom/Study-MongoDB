// 1분마다 수집
const addMinutes = (min, date) => {
    date.setMinutes(date.getMinutes() + min)
    return new Date(date.getTime())
}

addMinutes(1, new Date())

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max -min + 1)) + min;
}

getRandomNumber(10, 30)

arr = [];
date = new Date("2022-01-01T00:00:00.000Z");
for (range = 0; range < 60 * 24 * 30; range++) {
    time = addMinutes(1, date);
    for (floor = 1; floor < 21; floor++) {
        arr.push({
            sensor_id: floor,
            timestamp: time,
            temparature: getRandomNumber(17, 30)
        })
    }
}

// arr 갯수 864000

bucket pattern
{
    sensor_id: floor,
    timestamp: time,
    temparature: getRandomNumber(17, 30)
}

{
    sensor_id: floor,
    start_date: date,
    end_date: date,
    //start_date, end_date가 1시간 차이면 60개가 들어있는 것이다.
    temparature: [
        {
            timestamp: time,
            temparature: getRandomNumber(17, 30)
        }
    ]
}

db.sensor1.insertMany(arr)

// 60MB
db.sensor1.stats().size / 1024 / 1024

arr = [];
date = new Date('2022-01-01T00:00:000Z');
for (hour = 0; hour < 24 * 30; hour++) {
    start_date = addMinutes(0, date);
    measurement = []
    for (sec = 0; sec < 60; sec++) {
        time = addMinutes(1, date)
        measurement.push({
            timestamp: time,
            temparature: 0
        })
    }
    for (floor = 1; floor < 21; floor++) {
        for(i = 0; i < 60; i++) {
            measurement[i].temparature = getRandomNumber(17, 30)
        }
        arr.push({
            sensor_id: floor,
            start_date: start_date,
            end_date: addMinutes(0, date),
            measurements: measurement
        })
    }
}
// arr 갯수 14400

db.sensor2.insertMany(arr)

// 38MB
db.sensor2.stats().size / 1024 / 1024

// 만약 1시간 간격인데 30분마다 통계를 얻고 싶다면 얻기가 힘들다
// mongodb time series 컬렉션을 사용

db.createCollection(
    "sensor3",
    {
        timeseries: {
            timeField: "timestamp",
            metaField: "metadata",
            granularity: "minutes"
        }
    }
)

/*
rs1 [direct: primary] IOT> show collections
sensor1
sensor2
sensor3                     [time-series]
system.buckets.sensor3
system.views
*/

arr = [];
date = new Date("2022-01-01T00:00:00.000Z");
for (range = 0; range < 60 * 24 * 30; range++) {
    time = addMinutes(1, date);
    for (floor = 1; floor < 21; floor++) {
        arr.push({
            timestamp: time,
            metadata: {
                sensor_id: floor,
                temparature: getRandomNumber(17, 30)
            }
        })
    }
}

db.sensor3.insertMany(arr)

// 7MB
db.sensor3.stats().size / 1024 / 1024

db.sensor1.stats().size / 1024 / 1024 // 60MB
db.sensor2.stats().size / 1024 / 1024 // 38MB
db.sensor3.stats().size / 1024 / 1024 // 7MB

// time series 클러스터 인덱스를 지원한다.
// time series collection에서 계산을 쉽게 하는 aggregation => setWindowFields