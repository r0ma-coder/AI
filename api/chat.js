export default async function handler(req, res) {

  try {

    const API_KEY = process.env.GEMINI_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        answer: "API ключ не найден"
      });
    }

    const question = req.body?.question;

    if (!question) {
      return res.status(400).json({
        answer: "Вопрос пустой"
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

    // ВАЖНО: показываем реальный ответ API
    res.status(200).json({
      answer: JSON.stringify(data)
    });

  } catch (error) {

    res.status(500).json({
      answer: error.message
    });

  }

}