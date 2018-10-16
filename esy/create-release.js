const fs = require("fs");
const path = require("path");

const releaseFolder = process.env["FLEXDLL_RELEASE_FOLDER"];

if (!releaseFolder) {
    console.error("[FlexDLL Packager]: FLEXDLL_RELEASE_FOLDER environment variable must be set");
} else {
    console.log(`[FlexDLL Packager]: Using release folder ${releaseFolder}.`);
}

const filesToBundle = [
    "flexlink.exe",
    "flexdll_initer_mingw64.o",
    "flexdll_mingw64.o",
    "esy/package.json",
];

if (!fs.existsSync(releaseFolder)) {
    console.log(`[FlexDLL Packager]: Creating release folder ${releaseFolder}.`);
    fs.mkdirSync(releaseFolder);
}

filesToBundle.forEach((f) => {
    fs.copyFileSync(path.join(__dirname, "..", f), path.join(releaseFolder, path.basename(f)));
});
