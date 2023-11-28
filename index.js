// Elements

const binaryInput = document.querySelector("#input-binary");
const outputEl = {
    element: document.querySelector("#output"),
    reset() {
        this.element.textContent = "";
        this.element.classList.remove("text-danger");
    },
    updateText({ text = "", isError = false }) {
        if (isError) {
            this.element.classList.add("text-danger");
        }

        this.element.textContent = text;
    },
};

// Event Listeners

binaryInput.addEventListener("input", handleInputChange);

// Functions

function handleInputChange() {
    const binary = binaryInput.value;

    outputEl.reset();

    if (binary === "") return;

    const isBinaryValid = isBinary(binary);

    if (!isBinaryValid) {
        outputEl.updateText({
            text: `Invalid Input: Please enter a binary number (a number consisting only of 0s and 1s)`,
            isError: true,
        });
        return;
    }

    const decimal = binaryToDecimal(binary);

    outputEl.updateText({ text: `Decimal: ${decimal}` });
}

/**
 * @param {string} binary
 * @returns {boolean}
 */
function isBinary(binary) {
    return binary.split("").every((digit) => digit === "0" || digit === "1");
}

/**
 * @param {string} binary
 * @returns {string}
 */
function binaryToDecimal(binary) {
    const bits = binary.split("");
    let decimal = 0;

    for (let i = 0; i < bits.length; i++) {
        const exponent = bits.length - i - 1;
        const bit = bits[i];

        const bitValue = 2 ** exponent * bit;

        decimal += bitValue;
    }

    return decimal;
}
