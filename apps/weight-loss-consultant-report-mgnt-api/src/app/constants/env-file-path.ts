export const ENV_FILE_PATH = (() : string => {
  if (process.cwd().includes("dist")){
    return "./assets/.env"
  }
  return ".env"
})();
