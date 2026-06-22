export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {

        const query = new URLSearchParams(req.query).toString();

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbw8vpOi71H1ZSBVBfgh_uJyR1GPxP1yBgGq5mF3wjiXFTQLhW6UPaDA9gl8AOsooKGkBQ/exec?" +
            query
        );

        const text = await response.text();

        return res
            .status(200)
            .setHeader("Content-Type", "application/json")
            .send(text);

    } catch (err) {

        return res.status(500).json({
            status: "error",
            message: err.message
        });

    }
}
