export default async function handler(req, res) {

const API_KEY = process.env.GEMINI_KEY;

const question = req.body.question;

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
contents: [{ parts: [{ text: question }] }]
})
}
);

const data = await response.json();

res.status(200).json({
answer: data.candidates?.[0]?.content?.parts?.[0]?.text || "Ошибка ответа AI"
});

}
