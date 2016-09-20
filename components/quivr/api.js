import rest from "restler"

export const login = (email, password) => new Promise((resolve) => {
    rest.postJson("https://quivr.be/v1/api/login", { email, password }).on("complete", resolve)
})

export const getSchedule = (authToken) => new Promise((resolve) => {
    const now = new Date()
    rest.postJson("https://quivr.be/v3/ScheduleItem/list", {
        "userIDList": [],
        "startDate": `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-${("0" + now.getDate()).slice(-2)}T00:00:00+02:00`,
        "endDate": `${now.getFullYear()}-${("0" + (now.getMonth() + 2)).slice(-2)}-${("0" + now.getDate()).slice(-2)}T00:00:00+02:00`,
    }, {
        headers: {
            "Accept": "application/json",
            "X-Auth-Token": authToken,
            "X-SW-Accept": "x-fetch/only",
            "X-Api": "Quivr",
            "X-Quivr": "WEB;2.2.10",
        },
    }).on("complete", resolve)
})
