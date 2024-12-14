async function predictAgeAndGender() {
    const name = document.getElementById('nameInput').value.trim();

    if (!name) {
        document.getElementById('result').innerText = 'Please enter a name.';
        return;
    }

    const ageApiUrl = `https://api.agify.io?name=${encodeURIComponent(name)}`;
    const genderApiUrl = `https://api.genderize.io?name=${encodeURIComponent(name)}`;

    try {
        // Fetch age prediction
        const ageResponse = await fetch(ageApiUrl);
        if (!ageResponse.ok) {
            throw new Error('Failed to fetch age prediction.');
        }
        const ageData = await ageResponse.json();

        // Fetch gender prediction
        const genderResponse = await fetch(genderApiUrl);
        if (!genderResponse.ok) {
            throw new Error('Failed to fetch gender prediction.');
        }
        const genderData = await genderResponse.json();

        // Display results
        const ageText = ageData.age !== null
            ? `The predicted age for "${name}" is ${ageData.age} years.`
            : `No age prediction available for "${name}".`;

        const genderText = genderData.gender !== null
            ? `The predicted gender for "${name}" is ${genderData.gender}.`
            : `No gender prediction available for "${name}".`;

        document.getElementById('result').innerText = `${ageText}\n${genderText}`;
    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
}
