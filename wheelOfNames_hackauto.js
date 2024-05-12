function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getEditorValues() {
    const editor = document.querySelector(".basic-editor");
    if (!editor) return [];
    return editor.innerText.split("\n").filter(value => value.trim() !== "");
}

function adjustRandomIndex(target, offset) {
    const values = getEditorValues();
    const index = values.indexOf(target);
    if (index === -1) {
        return;
    }

    let adjustedIndex = (index + offset + values.length / 2) % values.length - 1 / (values.length * 2);
    adjustedIndex = adjustedIndex < 0 ? values.length + adjustedIndex : adjustedIndex;
    const randomValue = clamp(adjustedIndex / values.length, 0, 1);
    Math.random = () => randomValue;
}

function restoreOriginalRandom() {
    Math.random = originalRandom;
}

let originalRandom = Math.random;

window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        initialize();
    }, 2000);
});

function initialize() {
    const xpath = '//*[@id="q-app"]/div[1]/div/div[1]/div[3]/div/div[2]/div/div/div[1]/button[1]';
    let shuffleButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (shuffleButton) {
        shuffleButton.addEventListener("click", restoreOriginalRandom);
    }

    const target = "Phát";
    const offset = 1;

    setInterval(() => {
        adjustRandomIndex(target, offset);
    }, 1000);
}
