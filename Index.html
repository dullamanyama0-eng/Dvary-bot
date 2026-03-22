<!DOCTYPE html>
<html lang="sw">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DVARY UNBAN METHOD - NEON</title>
    <style>
        /* 1. Mipangilio ya Msingi na Rangi Inayowaka */
        :root {
            --neon-blue: #00f2ff;
            --neon-green: #0f9b0f;
            --bg-dark: #0a0a0a;
            --text-color: #ffffff;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-color);
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            overflow: hidden; /* Kwa ajili ya background animation */
        }

        /* 2. Background Animation (Madoa yanayotembea) */
        body::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            background-image: radial-gradient(var(--neon-green) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0.1;
            animation: moveBackground 20s linear infinite;
        }

        @keyframes moveBackground {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-50px, -50px); }
        }

        /* 3. Panel Kuu Inayowaka (The Glow Container) */
        .container {
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 0 20px rgba(0, 242, 255, 0.3); /* Mwanga wa nje */
            border: 1px solid rgba(0, 242, 255, 0.2);
            text-align: center;
            max-width: 400px;
            width: 90%;
            z-index: 1;
            backdrop-filter: blur(5px); /* Blur ya kisasa */
        }

        /* 4. Kichwa cha Habari Kina "Pumua" (Title Animation) */
        h1 {
            color: var(--neon-blue);
            text-shadow: 0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue);
            animation: breathe 3s ease-in-out infinite;
            font-size: 24px;
            margin-bottom: 5px;
        }

        p.subtitle {
            color: #aaaaaa;
            font-size: 14px;
            margin-bottom: 30px;
        }

        @keyframes breathe {
            0%, 100% { text-shadow: 0 0 10px var(--neon-blue); opacity: 0.8; }
            50% { text-shadow: 0 0 25px var(--neon-blue); opacity: 1; }
        }

        /* 5. Input Boxes Zenye Neon Border */
        input[type="text"], select {
            width: 100%;
            padding: 15px;
            margin-bottom: 20px;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid var(--neon-green);
            border-radius: 10px;
            color: #ffffff;
            font-size: 16px;
            box-sizing: border-box;
            transition: all 0.3s ease;
            box-shadow: 0 0 5px rgba(15, 155, 15, 0.3);
        }

        input[type="text"]:focus, select:focus {
            outline: none;
            border-color: var(--neon-blue);
            box-shadow: 0 0 15px var(--neon-blue);
        }

        /* 6. Kitufe Kinachowaka Sana (Glowing Button) */
        button {
            width: 100%;
            padding: 15px;
            background: none;
            border: 2px solid var(--neon-green);
            border-radius: 10px;
            color: var(--neon-green);
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        button:hover {
            background-color: var(--neon-green);
            color: #ffffff;
            box-shadow: 0 0 30px var(--neon-green);
        }

        /* 7. Matokeo ya Barua (The Output) */
        #result {
            margin-top: 30px;
            background: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            display: none;
            border: 1px dashed var(--neon-blue);
            text-align: left;
        }

        #result h3 { color: var(--neon-blue); margin-top: 0; }
        #unbanText { color: #ccc; font-size: 14px; white-space: pre-wrap; }
        
        #copyBtn {
            margin-top: 10px;
            padding: 10px;
            font-size: 14px;
            border-color: var(--neon-blue);
            color: var(--neon-blue);
        }
        #copyBtn:hover { background-color: var(--neon-blue); color: white; box-shadow: 0 0 20px var(--neon-blue); }

    </style>
</head>
<body>

    <div class="container">
        <h1>🛠 DVARY UNBAN METHOD</h1>
        <p class="subtitle">Ingiza Namba Pata Barua ya Msamaha</p>
        
        <input type="text" id="phone" placeholder="Mfano: +255712XXXXXX" required>
        
        <select id="reason">
            <option value="" disabled selected>Chagua kwanini umefungiwa</option>
            <option value="spam">Nilikuwa natuma meseji nyingi (Spam)</option>
            <option value="group">Niliongeza watu wengi kwenye Group</option>
            <option value="bulk">Nilitumia GB WhatsApp au Softwares</option>
            <option value="mistake">Nimefungiwa kimakosa, sijui sababu</option>
        </select>
        
        <button onclick="generateAppeal()">Tengeneza Barua ya Unban</button>
        
        <div id="result">
            <h3>Copy Hii Text 👇</h3>
            <div id="unbanText"></div>
            <button id="copyBtn" onclick="copyText()">COPY & FUNGUA EMAIL</button>
        </div>
    </div>

    <script>
        function generateAppeal() {
            let phone = document.getElementById('phone').value;
            let reason = document.getElementById('reason').value;
            
            if (!phone || !reason) {
                alert("Tafadhali jaza namba ya simu na uchague sababu!");
                return;
            }

            let appeals = {
                'spam': `Hello WhatsApp Support, my number [${phone}] was banned for sending bulk messages. I apologize, I didn't know the rules. Please review my account.`,
                'group': `Dear Sir/Madam, my WhatsApp account [${phone}] is blocked. I added too many people to a group. It was my mistake, please give me another chance.`,
                'bulk': `Hi Support, my account [${phone}] is banned for using unofficial apps. I have uninstalled them and promise to use the original WhatsApp. Please restore my access.`,
                'mistake': `Greetings, my WhatsApp number [${phone}] has been deactivated. I believe this is a mistake, I always follow the rules. Please check and restore my account.`
            };

            document.getElementById('unbanText').innerText = appeals[reason];
            document.getElementById('result').style.display = 'block';
        }

        function copyText() {
            let text = document.getElementById('unbanText').innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert("Text imesha-copy! Sasa inafungua Email utume kwa Support.");
                // Fungua Email App moja kwa moja kuelekea WhatsApp
                window.location.href = `mailto:support@whatsapp.com?subject=Question about my WhatsApp account&body=${encodeURIComponent(text)}`;
            });
        }
    </script>
</body>
</html>
