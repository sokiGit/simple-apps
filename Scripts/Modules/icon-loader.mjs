export function parseSvg(svg) {
    if (svg.dataset.icon != undefined) {
        svg.classList.add("svg-icon");
        svg.style.backgroundImage = `url(/Icons/${svg.dataset.icon}.svg)`;
    }
}

for (const [_, svg] of Object.entries(document.getElementsByTagName("svg"))) {
    parseSvg(svg)
}