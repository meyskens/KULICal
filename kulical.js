import ical from "ical-toolkit"
import * as quivrAPI from "./components/quivr/api"
import fs from "fs"

const config = JSON.parse(fs.readFileSync("config.json"))

const updateIcal = async () => {
    const builder = ical.createIcsFileBuilder();
    builder.spacers = true; // Add space in ICS file, better human reading. Default: true
    builder.NEWLINE_CHAR = "\r\n"; // Newline char to use.
    builder.ignoreTZIDMismatch = true;
    builder.tzid = "europe/brussels";
    builder.method = "PUBLISH"

    const userInfo = await quivrAPI.login(config.auth.email, config.auth.password)
    builder.calname = `${userInfo.firstName} ${userInfo.lastName}`

    const scheduleItems = (await quivrAPI.getSchedule(userInfo.access_token)).body[0].scheduleItems
    console.log(scheduleItems)
    for (let item of scheduleItems) {
        builder.events.push({
            start: new Date(item.startDate),
            end: new Date(item.endDate),
            // transp. Will add TRANSP:OPAQUE to block calendar.
            transp: "OPAQUE",
            // Event summary, Required: type String
            summary: item.title,
            // Location of event, optional.
            location: `${(item.scheduleItemData.locations[0] || {}).buildingName} ${(item.scheduleItemData.locations[0] || {}).roomNumber}`,
            // What to do on addition
            method: "PUBLISH",
            // Status of event
            status: "CONFIRMED",
            uid: item.scheduleItemID,
        })
    }

    const content = builder.toString()

    try {
        fs.unlinkSync(config.path)
    } catch (error) {
        console.log(error)
    }
    fs.writeFileSync(config.path, content)

}

updateIcal()
