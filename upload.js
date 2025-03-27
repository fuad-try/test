function handleImageUpload(inputId, imageId) {
    document.getElementById(inputId).addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.querySelector(`#${imageId} image`);
                if (imgElement) {
                    // Set the image source (href) to the uploaded image
                    imgElement.setAttribute("xlink:href", e.target.result);

                    // Ensure the image retains its original width and height
                    const width = imgElement.getAttribute("width");
                    const height = imgElement.getAttribute("height");
                    if (width && height) {
                        imgElement.setAttribute("preserveAspectRatio", "none"); // Ensures full stretch
                        imgElement.setAttribute("width", width);
                        imgElement.setAttribute("height", height);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// Assign upload inputs to corresponding SVG images
handleImageUpload("uploadPerson", "personImage");
handleImageUpload("uploadSignature", "signatureImage");