db.users.insertOne({
    _id: "tom",
    joinDate: new Date(),
    server: "servilla",
    job: "merchant",
    logInfo: []
})

log = {
    loginTime: new Date(),
    visits: [],
    sails: [],
    trades: [],
    battles: [],
    quests: [],
    fishings: [],
    gambles: [],
    castings: [],
    farmings: []
}
log.visits.push({
    location: "Barcelona",
    time: new Date()
})

log.visits.push({
    location: "Sevilla",
    time: new Date()
})

log.visits.push({
    location: "London",
    time: new Date()
})

log.trades.push({
    item: "Musket",
    qty: 50,
    price: 1800
})
log.trades.push({
    item: "Musket",
    qty: -50,
    price: 2300
})

log.quests.push({
    name: "Cave Invenstigation",
    reward: 50000
})

db.users.updateOne(
    { _id: "tom"},
    {
        $addToSet: {
            logInfo: log
        }
    }
)

// 배열이 커지면 로그인 로그아웃을 못하게 될 수도 있다.
db.users.find()
db.users.drop()

log.user = "tom"
log.logoutTime = new Date()
db.logs.insertOne(log)


// 인덱스가 모든 필드에 대해 인덱스를 만들어줘야하는 문제가 발생
// 관리적인 측면에서 좋지 않은 모델링

db.logs.find()
db.logs.drop()

// =============================== Attribute 패턴 =========================

date = new Date()

log = {
    user: "tom",
    loginTime: date,
    logoutTime: new Date(),
    actions: [
        {action: "visit", value: "Barcelona", time: date},
        {action: "visit", value: "Sevilla", time: date},
        {action: "visit", value: "London", time: date},
        {action: "trades", value: "Musket", type: "buy", qty: 50, price: 1800, time: date},
        {action: "trades", value: "Musket", type: "sell", qty: -50, price: 2300, time: date},
        {action: "quests", value: "Cave Invenstigation", reward: 50000, status: "In Process", time: date},
    ]
}
db.logs.insertOne(log)

// 간단히 복합 인덱스 사용할 수 있다.
db.logs.createIndex({"actions.action": 1, "actions.value": 1})
