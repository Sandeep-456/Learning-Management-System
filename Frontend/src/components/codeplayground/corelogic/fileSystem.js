export function loadFiles() {
  return JSON.parse(localStorage.getItem("files") || "{}");
}

export function saveFiles(files) {
  localStorage.setItem("files", JSON.stringify(files));
}
