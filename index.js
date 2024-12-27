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
    "generate a tweet saying we have successfully developed an AI Agent and just applied for listings in 4 new major platforms which we have paid and approved for priortised listing, asking the people to join the $LuckyMoo herd & pump together to make it the 1st cow-themed coin to hit $1B Market Cap, breaking all time highs after all time highs, promote either Dextools: https://www.dextools.io/app/en/solana/pair-explorer/5mnKKcKWKvW8Ejr8qFLkuEXr9AN9Gm1YeLvufNjfZe4u?t=1732281338179 or join $LUCKYMOO telegram group: https://t.me/LUCKYMOOCOIN or visit Luckymoo website at https://luckymoosol.com/, it should not be vague and should be unique, under 280 characters and should be plain text, you can use emojis and crypto and meme related hashtags";

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
