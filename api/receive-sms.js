// Tunatumia hifadhi ya muda (Inabidi uunganishe na Supabase baadaye ili isipotee)
let database_miamala = []; 

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Tunatafuta muamala wa VODACOM (M-PESA)
        // Mfano: "9ZJ8S92X4 Imethibitishwa. Umepokea TSh2,000 kutoka kwa..."
        if (message.includes("Umepokea") && message.includes("TSh")) {
            
            // Tunachukua ile kodi ya muamala (mwanzoni mwa SMS ya M-Pesa)
            const txnId = message.split(" ")[0]; 
            
            // Tunachukua kiasi (mfano 2,000)
            const kiasiMatch = message.match(/TSh([\d,]+)/);
            const kiasi = kiasiMatch ? kiasiMatch[1].replace(',', '') : "0";

            database_miamala.push({ id: txnId, amount: kiasi });
            
            console.log(`Pesa Imeingia! ID: ${txnId}, Kiasi: ${kiasi}`);
            return res.status(200).json({ status: "recorded" });
        }
        return res.status(400).send("Sio SMS ya malipo");
    }
}

