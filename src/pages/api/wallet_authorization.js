import axios from "axios";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { wallet_address } = req.body;
    const scope = process.env.SCOPE;
    const claims = process.env.CLAIMS;

    const auth = Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString("base64");

    const headers = {
      Authorization: `Basic ${auth}`,
    };

    const data = {};
    if (scope) data["scope"] = scope;
    if (wallet_address) data["wallet_address"] = wallet_address;
    if (claims) data["claims"] = claims;

    try {
      const wallet_authorization_response = await axios.post(
        process.env.API_URL + "wallet_authorization/",
        data,
        { headers }
      );
      res
        .status(wallet_authorization_response.status)
        .json(wallet_authorization_response.data);
    } catch (error) {
      const errorData = error.response?.data || { message: error.message };
      res.status(error.response?.status || 500).json(errorData);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed lol");
  }
};

export default handler;
