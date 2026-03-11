export default async function handler(req, res) {

const API_KEY = process.env.GEMINI_KEY;

const question = req.body.question;

const response = await fetch(
httpsgenerativelanguage.googleapis.comv1betamodelsgemini-progenerateContentkey= + API_KEY,
{
method POST,
headers { Content-Type applicationjson },
body JSON.stringify({
contents [{ parts [{ text question }] }]
})
}
);

const data = await response.json();

res.json({
answer data.candidates[0].content.parts[0].text
});

}