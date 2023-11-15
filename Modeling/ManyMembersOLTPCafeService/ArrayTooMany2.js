const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
}
jobs = ["DBA", "SE", "DA", "FE", "BE"];
date = new Date();

db.members.insertMany([
    {
        id: "tom93",
        first_name: "Tom",
        last_name: "Park",
        phone: "000-0000-1234",
        job: "DBA",
        joined_cafes: [
            {
                _id: 1,
                name: "IT Community",
                desc: "A Cafe where developer's share information",
                created_at: ISODate("2018-08-09"),
                last_article: ISODate("2022-06-01T10:56:32.000Z"),
                level: 5,
                joined_at: ISODate("2018-09-12"),
            },
            {
                _id: 2,
                name: "Game Community",
                desc: "Share information about games",
                created_at: ISODate("2020-01-23"),
                last_article: ISODate("2022-06-02T10:56:32.000Z"),
                level: 4,
                joined_at: ISODate("2020-09-12")
            }
        ]
    },
    {
        id: "asddwd12",
        first_name: "Jenny",
        last_name: "Kim",
        phone: "000-0000-1111",
        job: "Frontend Dev",
        joined_cafes: [
            {
                _id: 1,
                name: "IT Community",
                desc: "A Cafe where developer's share information",
                created_at: ISODate("2018-08-09"),
                last_article: ISODate("2022-06-01T10:56:32.000Z"),
                level: 5,
                joined_at: ISODate("2018-10-02"),
            },
            {
                _id: 2,
                name: "Game Community",
                desc: "Share information about games",
                created_at: ISODate("2020-01-23"),
                last_article: ISODate("2022-06-02T10:56:32.000Z"),
                level: 4,
                joined_at: ISODate("2021-10-01")
            }
        ]
    },
    {
        id: "candy12",
        first_name: "Zen",
        last_name: "Ko",
        phone: "000-0000-1233",
        job: "DA",
        joined_cafes: [
            {
                _id: 1,
                name: "IT Community",
                desc: "A Cafe where developer's share information",
                created_at: ISODate("2018-08-09"),
                last_article: ISODate("2022-06-01T10:56:32.000Z"),
                level: 5,
                joined_at: ISODate("2019-01-01"),
            }
        ]
    },
    {
        id: "java1",
        first_name: "Kevin",
        last_name: "Shin",
        phone: "000-0000-1233",
        job: "Game Dev",
        joined_cafes: [
            {
                _id: 2,
                name: "Game Community",
                desc: "Share information about games",
                created_at: ISODate("2020-01-23"),
                last_article: ISODate("2022-06-02T10:56:32.000Z"),
                level: 4,
                joined_at: ISODate("2022-08-10")
            }
        ]
    }
])
db.members.drop()
db.members.find()

arr = [];
for (i = 0; i < 300000; i++) {
    document = {
        id: generateRandomString(4),
        first_name: generateRandomString(10),
        last_name: generateRandomString(15),
        phone: "000-0000-1234",
        job: jobs[Math.floor(Math.random() * jobs.length)],
        joined_cafes: [
            {
                _id: 2,
                name: "Game Community",
                desc: "Share information about games",
                created_at: ISODate("2020-01-23"),
                last_article: ISODate("2022-06-02T10:56:32.000Z"),
                level: 4,
                joined_at: new Date(date - Math.floor(Math.random() * 10000000000))
            }
        ]
    };
    arr.push(document);
}
db.members.find()
db.members.insertMany(arr)

db.cafe.updateOne(
    { _id: 1},
    { $set: { last_article: date }}
)

db.cafe.updateOne(
    { _id: 2 },
    { $set: { last_article: date }}
)

db.members.updateMany(
    {
        "joined_cafes._id": 1
    },
    {
        $set: {
            "joined_cafes.$.last_article": date
        }
    }
)

db.members.updateMany(
    {
        "joined_cafes._id": 2
    },
    {
        $set: {
            "joined_cafes.$.last_article": date
        }
    }
)

db.cafe.deleteMany({})
db.members.deleteMany({})



