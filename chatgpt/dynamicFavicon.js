document.addEventListener("DOMContentLoaded", () => {
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="#007BFF"/>
            
            <path d="M10 30 L50 10 L90 30" stroke="white" stroke-width="5" fill="gray"/>
            <rect x="10" y="30" width="80" height="50" fill="white"/>
            <path d="M10 30 L50 60 L90 30" stroke="white" stroke-width="1" fill="gray"/>
            <text x="50" y="75" font-size="20" text-anchor="middle" fill="#007BFF" font-family="Arial, sans-serif">@</text>
        </svg>
    `;
    const svgBlob = new Blob([svgIcon], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    document.getElementById("dynamic-favicon").href = url;
    document.getElementById("newsletter-image").src = url;
    document.getElementById("og-image").content = url;
});
