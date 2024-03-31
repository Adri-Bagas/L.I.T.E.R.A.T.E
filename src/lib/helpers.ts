// Function to generate a random shade of a specified hue
function randomShadeOfHue(hue: number) {
    // Set saturation and lightness to fixed values for consistent shades
    const saturation = '70%'; // You can adjust this value if needed
    const lightness = Math.floor(Math.random() * 41) + 30 + '%'; // Generate lightness between 30% and 70%

    // Construct HSL color string
    const hslColor = `hsl(${hue}, ${saturation}, ${lightness})`;

    return hslColor;
}

export { randomShadeOfHue }