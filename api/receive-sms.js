import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    const { message } = req.body;
    const txnId = message.split(" ")[0].toUpperCase();
    await supabase.from('payments').insert([{ txn_id: txnId, status: 'unused' }]);
    return res.status(200).send("Poa");
}
