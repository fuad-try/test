async function generatePDF() {
    try {
        console.log("Generating high-quality but optimized PDF...");

        var contentElement = document.getElementById("content");
        if (!contentElement) {
            console.error("Element with ID 'content' not found!");
            return;
        }

        // Convert all SVGs to Base64 images
        await inlineSVGImages(contentElement);

        // Capture the content as an image
        const canvas = await html2canvas(contentElement, {
            scale: 12,  // Adjusted scale for better quality
            useCORS: true,
            allowTaint: true,
            logging: false,
        });

        // Convert canvas to an image
        const imgData = canvas.toDataURL("image/jpeg", 0.9);
        console.log("Image Data Length:", imgData.length);

        if (!imgData) {
            console.error("Failed to generate image from HTML.");
            return;
        }

        // Create the PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");

        // Calculate dimensions to fit A4 size
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Save PDF
        pdf.save("NID Recovery.pdf");

        console.log("PDF successfully generated!");
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}

// Convert SVGs' <image> tags to Base64
async function inlineSVGImages(parentElement) {
    const svgs = parentElement.querySelectorAll("svg");
    for (const svg of svgs) {
        const images = svg.querySelectorAll("image");

        for (const img of images) {
            const href = img.getAttribute("xlink:href") || img.getAttribute("href");
            if (!href || href.startsWith("data:image")) continue;

            try {
                const base64Image = await convertImageToBase64(href);
                img.setAttribute("xlink:href", base64Image);
            } catch (error) {
                console.error("Failed to convert image to Base64:", href, error);
            }
        }
    }
}

// Convert Image URL to Base64
function convertImageToBase64(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = function () {
            setTimeout(() => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0, img.width, img.height);
                resolve(canvas.toDataURL("image/png"));
            }, 100);
        };

        img.onerror = function () {
            reject("Failed to load image: " + url);
        };

        img.src = url;
    });
}