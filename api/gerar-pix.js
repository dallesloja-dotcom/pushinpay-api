export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { valor } = req.body;
  const token = process.env.PUSHINPAY_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "Token PushinPay não configurado" });
  }

  try {
    const response = await fetch("https://api.pushinpay.com/api/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        valor: valor,
        descricao: "Pagamento via PushinPay",
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao gerar PIX:", error);
    return res.status(500).json({ error: "Erro ao gerar PIX" });
  }
}
