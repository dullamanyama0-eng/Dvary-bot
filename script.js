function sendResult() {
    const pId = document.getElementById('patientId').value;
    const doctor = document.getElementById('receiverDoctor').value;
    const remarks = document.getElementById('findings').value;

    if (!pId || !doctor || !remarks) {
        alert("Please fill in all fields before sending.");
        return;
    }

    // Creating a simulated secure link
    const secureToken = Math.random().toString(36).substring(7);
    const generatedLink = `https://medlink.hospital/view?id=${pId}&token=${secureToken}`;

    // Add to activity log (Simulation)
    const log = document.getElementById('activityLog');
    const newItem = document.createElement('div');
    newItem.className = 'log-item';
    newItem.innerHTML = `
        <strong>Sent to: ${doctor}</strong><br>
        Patient: ${pId}<br>
        <small>Secure Link: <a href="#">${generatedLink}</a></small>
    `;
    
    log.prepend(newItem);

    // Clear inputs
    document.getElementById('patientId').value = '';
    document.getElementById('findings').value = '';
    alert("Success! Secure link has been sent to the doctor's inbox.");
}

