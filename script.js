function applyWatermark() {
    const mainImageInput = document.getElementById('mainImage');
    const watermarkImageInput = document.getElementById('watermarkImage');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    if (mainImageInput.files && watermarkImageInput.files && mainImageInput.files[0] && watermarkImageInput.files[0]) {
        const mainImage = new Image();
        const watermarkImage = new Image();

        mainImage.onload = function () {
            canvas.width = mainImage.width;
            canvas.height = mainImage.height;
            ctx.drawImage(mainImage, 0, 0);

            watermarkImage.onload = function () {
                const wmWidth = watermarkImage.width;
                const wmHeight = watermarkImage.height;

                // Calculate position for the watermark (centered)
                const xPos = (canvas.width - wmWidth) / 2;
                const yPos = (canvas.height - wmHeight) / 2;

                // Draw watermark with low opacity
                ctx.globalAlpha = 0.05; // Adjust this value to make the watermark more or less visible
                ctx.drawImage(watermarkImage, xPos, yPos);

                ctx.globalAlpha = 1.0; // Reset opacity for future drawings
            };
            watermarkImage.src = URL.createObjectURL(watermarkImageInput.files[0]);
        };
        mainImage.src = URL.createObjectURL(mainImageInput.files[0]);
    } else {
        alert("Please select both main image and watermark image.");
    }
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'watermarked_image.png';
    link.href = canvas.toDataURL();
    link.click();
}
