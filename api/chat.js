export default async function handler(req, res) {

  try {

    const API_KEY = process.env.GEMINI_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        answer: "Ошибка: API ключ не найден"
      });
    }

    const question = req.body?.question;

    if (!question) {
      return res.status(400).json({
        answer: "Ошибка: вопрос пустой"
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: question }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Ошибка ответа AI";

    res.status(200).json({
      answer: answer
    });

  } catch (error) {

    res.status(200).json({
    answer: data.candidates?.[0]?.content?.parts?.[0]?.text 
    || JSON.stringify(data)
    });

  }

}