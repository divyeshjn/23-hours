import Settings from "../models/Settings.js";
import DailyLog from "../models/DailyLog.js";
import WeeklyCheckIn from "../models/WeeklyCheckIn.js";

async function initialiseDatabase() {
  await Promise.all([
    Settings.init(),
    DailyLog.init(),
    WeeklyCheckIn.init()
  ]);

  await Settings.findOneAndUpdate(
    { profileId: "default" },
    {
      $setOnInsert: {
        profileId: "default"
      }
    },
    {
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    }
  );

  console.log("Database models initialised");
}

export default initialiseDatabase;