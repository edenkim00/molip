import {
  selectAllActiveChallenges,
  aggregateRankingForChallenge,
  insertRankings,
} from "./lib/db.js";
import _ from "lodash";
const KST_OFFSET = 9 * 60 * 60 * 1000;

export async function handler() {
  const challenges = await selectAllActiveChallenges();
  const challengeRankings = [];

  const dt = new Date(Date.now() + KST_OFFSET).toISOString().substring(0, 10);

  // let start = "2024-12-04";
  // let end = "2024-12-28";

  // WARN: avoid using promise.
  // let dt = start;
  // while (dt <= end) {
  //   for (const challenge of challenges) {
  //     challengeRankings.push(
  //       await aggregateRankingForChallenge(challenge.id, dt)
  //     );
  //   }
  //   dt = new Date(new Date(dt).getTime() + 24 * 60 * 60 * 1000)
  //     .toISOString()
  //     .substring(0, 10);
  // }

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
