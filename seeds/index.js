const libUsers = require("../src/controllers/mongodb/user/index");

const createUsers = () => {
    const userList = [
        {
            name: "Admin",
            lastname: "Admin",
            username: process.env.APP_ADMIN_NAME,
            password: process.env.APP_ADMIN_PASS,
            email: "admin@example.com",
            role: "admin",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 18,
                gender: "male",
                education: "university",
                city: "XXX",
                physicalCondition: "curvy",
                activity: "homeLover",
                lifeStyle: "studying",
                kidsLover: false,
                petsLover: true
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "both",
                ageRange: {
                    min: 18,
                    max: 80
                }
            }
        },
        {
            name: "user01",
            lastname: "user01",
            username: "user01",
            password: "user01",
            email: "user01@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 31,
                gender: "male",
                education: "university",
                city: "Madrid",
                physicalCondition: "fitness",
                activity: "energetic",
                lifeStyle: "studying",
                kidsLover: true,
                petsLover: false
            },
            preferences: {
                culturalInterest: "low",
                sportCadence: "high",
                travelCadence: "high",
                owlOrSkyLark: "owl",
                sexualPreferences: "female",
                ageRange: {
                    min: 22,
                    max: 32
                }
            }
        },
        {
            name: "user02",
            lastname: "user02",
            username: "user02",
            password: "user02",
            email: "user02@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 35,
                gender: "female",
                education: "university",
                city: "Madrid",
                physicalCondition: "curvy",
                activity: "homeLover",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: true
            },
            preferences: {
                culturalInterest: "high",
                sportCadence: "low",
                travelCadence: "low",
                owlOrSkyLark: "owl",
                sexualPreferences: "male",
                ageRange: {
                    min: 28,
                    max: 40
                }
            }
        },
        {
            name: "user03",
            lastname: "user03",
            username: "user03",
            password: "user03",
            email: "user03@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 24,
                gender: "male",
                education: "university",
                city: "Madrid",
                physicalCondition: "thin",
                activity: "active",
                lifeStyle: "studying",
                kidsLover: false,
                petsLover: true
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "female",
                ageRange: {
                    min: 20,
                    max: 30
                }
            }
        },
        {
            name: "user04",
            lastname: "user04",
            username: "user04",
            password: "user04",
            email: "user04@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 31,
                gender: "male",
                education: "elementary",
                city: "Madrid",
                physicalCondition: "thin",
                activity: "homeLover",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: false
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "low",
                owlOrSkyLark: "skylark",
                sexualPreferences: "male",
                ageRange: {
                    min: 28,
                    max: 40
                }
            }
        },
        {
            name: "user05",
            lastname: "user05",
            username: "user05",
            password: "user05",
            email: "user05@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 42,
                gender: "female",
                education: "highSchool",
                city: "Madrid",
                physicalCondition: "thin",
                activity: "active",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: true
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "medium",
                travelCadence: "high",
                owlOrSkyLark: "owl",
                sexualPreferences: "male",
                ageRange: {
                    min: 35,
                    max: 42
                }
            }
        },
        {
            name: "user06",
            lastname: "user06",
            username: "user06",
            password: "user06",
            email: "user06@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 26,
                gender: "female",
                education: "highSchool",
                city: "Madrid",
                physicalCondition: "curvy",
                activity: "homeLover",
                lifeStyle: "enjoying",
                kidsLover: false,
                petsLover: true
            },
            preferences: {
                culturalInterest: "high",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "male",
                ageRange: {
                    min: 22,
                    max: 30
                }
            }
        },
        {
            name: "user07",
            lastname: "user07",
            username: "user07",
            password: "user07",
            email: "user07@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 27,
                gender: "female",
                education: "elementary",
                city: "Madrid",
                physicalCondition: "curvy",
                activity: "energetic",
                lifeStyle: "enjoying",
                kidsLover: true,
                petsLover: false
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "male",
                ageRange: {
                    min: 28,
                    max: 30
                }
            }
        },
        {
            name: "user08",
            lastname: "user08",
            username: "user08",
            password: "user08",
            email: "user08@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 33,
                gender: "male",
                education: "university",
                city: "Madrid",
                physicalCondition: "fitness",
                activity: "active",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: true
            },
            preferences: {
                culturalInterest: "low",
                sportCadence: "high",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "male",
                ageRange: {
                    min: 32,
                    max: 36
                }
            }
        },
        {
            name: "user09",
            lastname: "user09",
            username: "user09",
            password: "user09",
            email: "user09@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 27,
                gender: "female",
                education: "elementary",
                city: "Madrid",
                physicalCondition: "curvy",
                activity: "active",
                lifeStyle: "enjoying",
                kidsLover: false,
                petsLover: true
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "both",
                ageRange: {
                    min: 22,
                    max: 28
                }
            }
        },
        {
            name: "user10",
            lastname: "user10",
            username: "user10",
            password: "user10",
            email: "user10@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 33,
                gender: "female",
                education: "elementary",
                city: "Madrid",
                physicalCondition: "curvy",
                activity: "active",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: false
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "both",
                ageRange: {
                    min: 28,
                    max: 30
                }
            }
        },
        {
            name: "user11",
            lastname: "user11",
            username: "user11",
            password: "user11",
            email: "user11@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 31,
                gender: "female",
                education: "highSchool",
                city: "Madrid",
                physicalCondition: "curvy",
                activity: "active",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: true
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "both",
                ageRange: {
                    min: 28,
                    max: 30
                }
            }
        },
        {
            name: "user12",
            lastname: "user12",
            username: "user12",
            password: "user12",
            email: "user12@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 29,
                gender: "male",
                education: "highSchool",
                city: "Madrid",
                physicalCondition: "thin",
                activity: "active",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: true
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "both",
                ageRange: {
                    min: 28,
                    max: 30
                }
            }
        },
        {
            name: "user13",
            lastname: "user13",
            username: "user13",
            password: "user13",
            email: "user13@example.com",
            role: "user",
            status: "active",
            photos: ["http://photo1.es", "http://photo2.es"],
            information: {
                age: 29,
                gender: "male",
                education: "highSchool",
                city: "Madrid",
                physicalCondition: "thin",
                activity: "active",
                lifeStyle: "working",
                kidsLover: true,
                petsLover: true
            },
            preferences: {
                culturalInterest: "medium",
                sportCadence: "low",
                travelCadence: "high",
                owlOrSkyLark: "skylark",
                sexualPreferences: "both",
                ageRange: {
                    min: 28,
                    max: 30
                }
            }
        }
    ];

    userList.map(async user => {
        try {
            await libUsers.new(user);
        } catch (error) {
            console.log("Creating seeds...");
        }
    });
};

module.exports = { createUsers };
