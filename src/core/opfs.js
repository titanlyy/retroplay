/**
 * opfs.js — Origin Private File System helpers
 *
 * Used to store ROM files, save states, and screenshots
 * persistently in the browser without a backend.
 *
 * MDN Reference: https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system
 */

async function getRoot() {
  return await navigator.storage.getDirectory()
}

async function getDir(path) {
  const root = await getRoot()
  const parts = path.split('/').filter(Boolean)
  let dir = root
  for (const part of parts) {
    dir = await dir.getDirectoryHandle(part, { create: true })
  }
  return dir
}

export async function writeFile(path, data) {
  const parts = path.split('/')
  const filename = parts.pop()
  const dir = await getDir(parts.join('/'))
  const fileHandle = await dir.getFileHandle(filename, { create: true })
  const writable = await fileHandle.createWritable()
  await writable.write(data)
  await writable.close()
}

export async function readFile(path) {
  const parts = path.split('/')
  const filename = parts.pop()
  const dir = await getDir(parts.join('/'))
  const fileHandle = await dir.getFileHandle(filename)
  return await fileHandle.getFile()
}

export async function deleteFile(path) {
  const parts = path.split('/')
  const filename = parts.pop()
  const dir = await getDir(parts.join('/'))
  await dir.removeEntry(filename)
}

export async function listFiles(path) {
  const dir = await getDir(path)
  const entries = []
  for await (const [name, handle] of dir.entries()) {
    entries.push({ name, kind: handle.kind })
  }
  return entries
}

export async function isSupported() {
  return 'storage' in navigator && 'getDirectory' in navigator.storage
}
