import db from "../db/index.js";
const TABLES = {
  Challenges: "Molip_Challenges",
  UserChallengeConnections: "Molip_User_Challenge_Connections",
  Records: "Molip_Records",
  Rankings: "Molip_Rankings",
};

export async function selectAllActiveChallenges() {
  return db(TABLES.Challenges).select("id").where("status", "active");
}

export async function aggregateRankingForChallenge(challengeId, dt) {
  const records = await db(TABLES.Records)
    .select("user_id", db.raw("SUM(end - start) AS time"))
    .where("challenge_id", challengeId)
    .where("status", "active")
    .groupBy("user_id")
    .orderBy("time", "desc");

  return records.map((record, index) => ({
    dt,
    user_id: record.user_id,
    challenge_id: challengeId,
    ranking: index + 1,
  }));
}

export async function insertRankings(rankings) {
  return db(TABLES.Rankings).insert(rankings);
}
