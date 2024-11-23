// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "generate a tweet encouraging people to buy LUCKYMOO $LUCKYMOO token, which is a AI MEME Token, constantly achieving new all time highs, for each tweet choose to either promote to buy from https://www.dextools.io/app/en/solana/pair-explorer/5mnKKcKWKvW8Ejr8qFLkuEXr9AN9Gm1YeLvufNjfZe4u?t=1732281338179 or https://birdeye.so/token/CbbCD8B43sGxCUCcNTuy8ASCAkhVkuveVwraGQC11Hmf/5mnKKcKWKvW8Ejr8qFLkuEXr9AN9Gm1YeLvufNjfZe4u?chain=solana or courage community to join the $LUCKYMOO telegram group at https://t.me/LUCKYMOOCOIN or visit Luckymoo website at https://luckymoosol.com/, asking community to pump together to make $LuckyMoo the first cow-themed coin to reach a $1B Market Cap, it should not be vague and should be unique; under 280 characters and should be plain text, you can use emojis and crypto and meme related hashtags";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
