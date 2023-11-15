db.cafe.insertMany([
    {
        _id: 1,
        name: "IT Community",
        desc: "A Cafe where developer's share information",
        created_at: ISODate("2018-08-09"),
        last_article: ISODate("2022-06-01T10:56:32.000Z"),
        level: 5,
    },
    {
        _id: 2,
        name: "Game Community",
        desc: "Share information about games",
        created_at: ISODate("2020-01-23"),
        last_article: ISODate("2022-06-02T10:56:32.000Z"),
        level: 4,
    }
])

db.members.insertMany([
    {
        id: "tom93",
        first_name: "Tom",
        last_name: "Park",
        phone: "000-0000-1234",
        job: "DBA",
        joined_cafes: [1,2]
    },
    {
        id: "asddwd12",
        first_name: "Jenny",
        last_name: "Kim",
        phone: "000-0000-1111",
        job: "Frontend Dev",
        joined_cafes: [1,2]
    },
    {
        id: "candy12",
        first_name: "Zen",
        last_name: "Ko",
        phone: "000-0000-1233",
        job: "DA",
        joined_cafes: [1]
    },
    {
        id: "java1",
        first_name: "Kevin",
        last_name: "Shin",
        phone: "000-0000-1233",
        job: "Game Dev",
        joined_cafes: [2]
    }
])

db.cafe.aggregate([
    {
        $lookup: {
            from: "members",
            localField: "_id",
            foreignField: "joined_cafes",
            as: "members",
            pipeline: [
                {
                    $match: {
                        job: "DBA"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        id: 1,
                        job: 1
                    }
                }
            ]
        }
    },
    {
        $project: {
            name: 1,
            desc: 1,
            created_at: 1,
            joinedMemberJob: {$first: "$members.job"},
            cnt: {$size: "$members"}
        }
    }
])

arr = [];
for (i = 0; i < 300000; i++) {
    document = {
        id: generateRandomString(4),
        first_name: generateRandomString(10),
        last_name: generateRandomString(15),
        phone: "000-0000-1234",
        job: jobs[Math.floor(Math.random() * jobs.length)],
        joined_cafes: [2]
    };
    arr.push(document);
}

db.members.insertMany(arr)

db.cafe.aggregate([
    {
        $lookup: {
            from: "members",
            localField: "_id",
            foreignField: "joined_cafes",
            as: "members",
            pipeline: [
                {
                    $match: {
                        job: "DBA"
                    }
                },
                {
                    $project: {
                        _id: 0,
                        id: 1,
                        job: 1
                    }
                }
            ]
        }
    },
    {
        $project: {
            name: 1,
            desc: 1,
            created_at: 1,
            joinedMemberJob: {$first: "$members.job"},
            cnt: {$size: "$members"}
        }
    }
]).explain('executionStats')

// 310ms 인덱스 생성전

db.members.createIndex({"joined_cafes": 1})

// 394ms 인덱스 생성후

// Extended Reference pattern
// 처음에 document를 insert 할때 절때 변하지 않는 값들은 내장시킨다.
// 예를 들어 cafe의 name,created_at이 변경되지 않고
// 조회할때 꼭 필요한 필드는 desc라고 한다면
// members 컬렉션에 cafe의 name, created_at, desc 값을 내장시킨다.

db.cafe.insertMany([
    {
        _id: 1,
        name: "IT Community",
        desc: "A Cafe where developer's share information",
        created_at: ISODate("2018-08-09"),
        last_article: ISODate("2022-06-01T10:56:32.000Z"),
        level: 5,
    },
    {
        _id: 2,
        name: "Game Community",
        desc: "Share information about games",
        created_at: ISODate("2020-01-23"),
        last_article: ISODate("2022-06-02T10:56:32.000Z"),
        level: 4,
    }
])

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
            },
            {
                _id: 2,
                name: "Game Community",
                desc: "Share information about games",
                created_at: ISODate("2020-01-23"),
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
            },
            {
                _id: 2,
                name: "Game Community",
                desc: "Share information about games",
                created_at: ISODate("2020-01-23"),
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
            }
        ]
    }
])

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
            }
        ]
    };
    arr.push(document);
}

db.members.insertMany(arr)

db.members.aggregate([
    {
        $match: {
            job: "DBA"
        }
    },
    {
        $unwind: "$joined_cafes"
    },
    {
        $group: {
            _id: "$joined_cafes._id",
            joined_cafes: {
                $first: "$joined_cafes"
            },
            joinedMemberJob: {
                $first: "$job"
            },
            cnt: {
                $sum: 1
            }
        }
    },
    {
        $project: {
            _id: 0,
            name: "$joined_cafes.name",
            desc: "$joined_cafes.desc",
            created_at: "$joined_cafes.created_at",
            joinedMemberJob: 1,
            cnt: 1

        }
    }
]).explain('executionStats')

// 215 index 생성 전

db.members.createIndex({job: 1})

// 122 index 생성 후