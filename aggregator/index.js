import {
  selectAllActiveChallenges,
  aggregateRankingForChallenge,
  insertRankings,
} from "./lib/db.js";
import _ from "lodash";
const KST_OFFSET = 9 * 60 * 60 * 1000;

export async function handler() {
  const dt = new Date(Date.now() + KST_OFFSET).toISOString().substring(0, 10);

  const challenges = await selectAllActiveChallenges();
  const challengeRankings = [];

  // WARN: avoid using promise.
  for (const challenge of challenges) {
    challengeRankings.push(
      await aggregateRankingForChallenge(challenge.id, dt)
    );
  }

  const rankings = _.flatten(challengeRankings);
  await insertRankings(rankings);
  return {
    statusCode: 200,
    body: "Success",
  };
}
