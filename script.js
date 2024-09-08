function calculateBaseCoinPotential(currentCoinPotential, currentLevel) {
    return currentCoinPotential / (((currentLevel - 1) * 0.04) + 1);
}

function calculateCoinPotential(baseCoinPotential, level) {
    return baseCoinPotential * (((level - 1) * 0.04) + 1);
}

function calculateBaseGemPotential(currentGemPotential, currentLevel) {
    return currentGemPotential / (((currentLevel - 1) * 0.025) + 1);
}

function calculateGemPotential(baseGemPotential, level) {
    return baseGemPotential * (((level - 1) * 0.025) + 1);
}

function formatNumber(number) {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1000000) {
        return (number / 1000).toFixed(1) + "K";
    } else if (number < 1000000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else {
        return (number / 1000000000).toFixed(1) + "B";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

document.addEventListener('DOMContentLoaded', function() {
    // Dark mode initialization
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Save dark mode state when it changes
    document.body.addEventListener('classChange', function() {
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentLevel = parseInt(document.getElementById('level').value);
        const targetLevel = parseInt(document.getElementById('targetLevel').value);
        const coinMultiplier = parseInt(document.getElementById('coinmultiplier').value);
        const gemMultiplier = parseInt(document.getElementById('gemmultiplier').value);
        const runeValue = document.getElementById('rune').value;

        const baseCoinPotential = calculateBaseCoinPotential(coinMultiplier, currentLevel);
        const baseGemPotential = calculateBaseGemPotential(gemMultiplier, currentLevel);
        let targetCoinPotential = calculateCoinPotential(baseCoinPotential, targetLevel);
        let targetGemPotential = calculateGemPotential(baseGemPotential, targetLevel);

        let runeName = "None";
        if (runeValue) {
            const [runeType, runeMultiplier] = runeValue.split(':');
            if (runeType === "coin") {
                targetCoinPotential *= parseFloat(runeMultiplier);
                runeName = document.getElementById('rune').options[document.getElementById('rune').selectedIndex].text;
            } else if (runeType === "gem") {
                targetGemPotential *= parseFloat(runeMultiplier);
                runeName = document.getElementById('rune').options[document.getElementById('rune').selectedIndex].text;
            }
        }

        document.getElementById('coinPotential').textContent = `${formatNumber(Math.floor(targetCoinPotential))} (${Math.floor(targetCoinPotential)})`;
        document.getElementById('gemPotential').textContent = `${formatNumber(Math.floor(targetGemPotential))} (${Math.floor(targetGemPotential)})`;
        document.getElementById('runeSelected').textContent = runeName;
        document.getElementById('result').style.display = 'block';
        
        // Add class to trigger animation
        document.getElementById('result').classList.add('show');
    });
});
