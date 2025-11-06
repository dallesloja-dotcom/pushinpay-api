import axios from "axios";

export default async function handler(req, res) {
  try {
    const { value } = req.body;

    const response = await axios.post(
      "https://api.pushinpay.com.br/api/pix/cashIn",
      {
        value,
        webhook_url: "https://seudominio.com/webhook",
        split_rules: []
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PUSHINPAY_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ error: "Erro ao gerar Pix" });
  }
}
