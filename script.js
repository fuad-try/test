function generateBarcode() {
            try {
                const pin = document.getElementById('pinInput').value;
                const name = document.getElementById('nameInput').value;
                const dob = document.getElementById('dobInput').value;
                const ds = document.getElementById('dsInput').value;

                const barcodeData = `<pin>${pin}</pin><name>${name}</name><DOB>${dob}</DOB><ds>${ds}</ds>`;

                // Remove existing barcode canvas if any
                const barcodeContainer = document.getElementById('barcode-container');
                barcodeContainer.innerHTML = ''; // Clears the container before adding a new barcode

                // Create new canvas
                const canvas = document.createElement('canvas');
                canvas.id = "barcodeCanvas"; // Set an ID
                canvas.style.position = "absolute";
                canvas.style.top = "225px";
                canvas.style.left = "415px";
                canvas.style.width = "308px";
                canvas.style.height = "45px";      

                barcodeContainer.appendChild(canvas);

                // Generate the barcode
                bwipjs.toCanvas(canvas, {
                    bcid: 'pdf417',
                    text: barcodeData,
                    scale: 5, // Adjust scale if needed
                    includetext: false
                });
            } catch (e) {
                console.error("Barcode generation error: ", e);
            }
        }

        window.onload = function() {
            document.getElementById('pinInput').value = "20062698842000197";
            document.getElementById('nameInput').value = "AZMAL FUAD";
            document.getElementById('dobInput').value = "02 Apr 2006";
            document.getElementById('dsInput').value = "302d0215008ca873cf5e728cb0d71fea2d2632cae791ef77a802143f9527804333df56af76012bc83314dc1aae7c96";
            
            generateBarcode(); // Auto-generate barcode on load
        };