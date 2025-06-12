import { $ } from "bun"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GEO_DB_DIR = path.resolve(__dirname, "../server/data/geolite-city")
const GEO_DB_PATH = path.join(GEO_DB_DIR, "GeoLite2-City.mmdb")

const LICENSE_KEY = Bun.env.MAXMIND_LICENSE_KEY

if (!LICENSE_KEY) {
  console.error(
    "ERROR: Please set your MAXMIND_LICENSE_KEY environment variable.",
  )
  process.exit(1)
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await Bun.file(filePath).text()
    return true
  } catch {
    return false
  }
}

async function downloadGeoLite(): Promise<void> {
  console.log("Downloading GeoLite2 City database...")

  const url = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${LICENSE_KEY}&suffix=tar.gz`

  const res = await fetch(url)
  if (!res.ok)
    throw new Error(`Failed to download: ${res.status} ${res.statusText}`)

  const arrayBuffer = await res.arrayBuffer()
  const uint8array = new Uint8Array(arrayBuffer)

  await $`mkdir -p ${GEO_DB_DIR}`

  const tmpPath = path.join(GEO_DB_DIR, "GeoLite2-City.tar.gz")
  await Bun.write(tmpPath, uint8array)

  const listResult = await $`tar -tzf ${tmpPath}`
  const folderName = listResult.stdout.toString().split("\n")[0].split("/")[0]

  if (!folderName)
    throw new Error("Could not find folder name inside tar.gz archive")

  await $`tar -xzf ${tmpPath} -C ${GEO_DB_DIR} ${folderName}/GeoLite2-City.mmdb`
  await $`mv ${path.join(GEO_DB_DIR, folderName, "GeoLite2-City.mmdb")} ${GEO_DB_PATH}`
  await $`rm ${tmpPath}`
  await $`rm -r ${path.join(GEO_DB_DIR, folderName)}`

  console.log("Database downloaded and saved to: ", GEO_DB_PATH)
}

;(async function main() {
  if (await fileExists(GEO_DB_PATH))
    return console.log("GeoLite2-City.mmdb already exists. Skipping download.")

  try {
    await downloadGeoLite()
  } catch (e) {
    console.error("Failed to download GeoLite2 database:", e)
    process.exit(1)
  }
})()
