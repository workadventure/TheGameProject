import 'dotenv/config';
import { lstatSync, readdirSync } from 'fs';
import { defineConfig } from "vite";
import { getMaps, getMapsOptimizers, getMapsScripts, LogLevel, OptimizeOptions } from "wa-map-optimizer-vite";

const isDirectory = (path: string) => {
  const stats = lstatSync(path)
  return stats.isDirectory()
}

const maps = getMaps();

let optimizerOptions: OptimizeOptions = {
    logs: process.env.LOG_LEVEL && process.env.LOG_LEVEL in LogLevel ? LogLevel[process.env.LOG_LEVEL] : LogLevel.NORMAL,
};

if (process.env.TILESET_OPTIMIZATION && process.env.TILESET_OPTIMIZATION === "true") {
    const qualityMin = process.env.TILESET_OPTIMIZATION_QUALITY_MIN ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MIN) : 0.9;
    const qualityMax = process.env.TILESET_OPTIMIZATION_QUALITY_MAX ? parseInt(process.env.TILESET_OPTIMIZATION_QUALITY_MAX) : 1;

    optimizerOptions.output = {
        tileset: {
            compress: {
                quality: [qualityMin, qualityMax],
            }
        }
    }
}

const getAllFromDirectory = async (directoryName: string, wantedExtension: string | null = null) => {
    const fileList: { [p: string]: string } = {}
    const files = readdirSync(directoryName)
  
    if (typeof files !== 'undefined') {
      for (let i = 0; i < files.length; i++) {
        const path = directoryName + '/' + files[i]
        if (isDirectory(path)) {
          const filesFromDir = await getAllFromDirectory(directoryName + '/' + files[i], wantedExtension) as unknown as string
          const keys = Object.keys(filesFromDir)
          for (let j = 0; j < keys.length; j++) {
            fileList[keys[j]] = Object.values(filesFromDir)[j]
          }
        } else {
          const key = 'view_' + files[i].split('.')[0]
          const extension = files[i].split('.')[1]
          if (!wantedExtension || extension === wantedExtension) {
            fileList[key] = './' + path
          }
        }
      }
    }
    return fileList
  }

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                ...(await getAllFromDirectory('views', 'html')),
                ...getMapsScripts(maps),
            },
        },
    },
    plugins: [...getMapsOptimizers(maps, optimizerOptions)],
    server: {
        host: "localhost",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Cache-Control": "no-cache, no-store, must-revalidate",
        },
        open: "/",
    },
});
