// use cafe

db.cafe.insertMany([
    {
        _id: 1,
        name: "IT Community",
        desc: "A Cafe where developer's share information",
        created_at: ISODate("2018-08-09"),
        last_article: ISODate("2022-06-01T10:56:32.000Z"),
        level: 5,
        members: [
            {
                id: "tom93",
                first_name: "Tom",
                last_name: "Park",
                phone: "000-0000-1234",
                joined_at: ISODate("2018-09-12"),
                job: "DBA"
            },
            {
                id: "asddwd12",
                first_name: "Jenny",
                last_name: "Kim",
                phone: "000-0000-1111",
                joined_at: ISODate("2018-10-02"),
                job: "Frontend Dev"
            },
            {
                id: "candy12",
                first_name: "Zen",
                last_name: "Ko",
                phone: "000-0000-1233",
                joined_at: ISODate("2019-01-01"),
                job: "DA"
            }
        ]
    },
    {
        _id: 2,
        name: "Game Community",
        desc: "Share information about games",
        created_at: ISODate("2020-01-23"),
        last_article: ISODate("2022-06-02T10:56:32.000Z"),
        level: 4,
        members: [
            {
                id: "tom93",
                first_name: "Tom",
                last_name: "Park",
                phone: "000-0000-1234",
                joined_at: ISODate("2020-09-12"),
                job: "DBA"
            },
            {
                id: "asddwd12",
                first_name: "Jenny",
                last_name: "Kim",
                phone: "000-0000-1111",
                joined_at: ISODate("2021-10-01"),
                job: "Frontend Dev"
            },
            {
                id: "java1",
                first_name: "Kevin",
                last_name: "Shin",
                phone: "000-0000-1233",
                joined_at: ISODate("2022-08-10"),
                job: "Game Dev"
            }
        ]
    }
])

db.cafe.find()

const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
}

generateRandomString(5)

jobs = ["DBA", "SE", "DA", "FE", "BE"];

jobs[Math.floor(Math.random() * jobs.length)]

date = new Date();
new Date(date - Math.floor(Math.random() * 10000000000))

arr = [];
for (i = 0; i < 100000; i++) {
    document = {
        id: generateRandomString(5),
        first_name: generateRandomString(10),
        last_name: generateRandomString(15),
        phone: "000-0000-1234",
        joined_at: new Date(date - Math.floor(Math.random() * 10000000000)),
        job: jobs[Math.floor(Math.random() * jobs.length)]
    };
    arr.push(document);
}

db.cafe.updateOne(
    { _id: 2 },
    {
        $addToSet: {
            members: {$each: arr}
        }
    }
)

db.cafe.stats().size / 1024 / 1024

db.cafe.aggregate([
    {
        $project: {
            arrSize: {
                $size: "$members"
            }
        }
    }
])