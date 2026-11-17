
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function() {
    document.getElementById("fileName").textContent =
        this.files.length ? this.files[0].name : "No file selected";
});

function convertFile() {

    const file = fileInput.files[0];
    const format = document.getElementById("format").value;
    const message = document.getElementById("message");

    if (!file) {
        alert("Please select a file!");
        return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
        message.textContent =
            "This version supports JPG and PNG images only.";
        return;
    }

    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = function() {

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);

        const mime = format === "jpg" ?
            "image/jpeg" : "image/png";

        canvas.toBlob(function(blob) {

            if (!blob) {
                message.textContent = "Conversion failed.";
                URL.revokeObjectURL(url);
                return;
            }

            const downloadURL = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = downloadURL;
            link.download = "converted." + format;
            link.click();

            URL.revokeObjectURL(downloadURL);
            URL.revokeObjectURL(url);

            message.textContent = "File converted successfully!";

        }, mime);
    };

    image.onerror = function() {
        message.textContent = "Could not read this image.";
        URL.revokeObjectURL(url);
    };

    image.src = url;
}
