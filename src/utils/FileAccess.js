export async function OpenFile() {
  return await window.showOpenFilePicker();
}

export async function getFileContents(fileHandle) {
  const file = await fileHandle.getFile();
  return await file.text();
}

export async function saveFileContents(fileHandle, content) {
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
  return fileHandle;
}

export async function CreateFolderMap() {
  try {
    const fileHandle = await window.showDirectoryPicker();

    const root = {
      name: fileHandle.name,
      type: fileHandle.kind,
      open: true,
      path: fileHandle.name,
      children: [],
    };

    await getFile(fileHandle, root);

    return root;
  } catch (error) {
    return null;
  }
}

async function getFile(fileHandle, root) {
  const dirEntries = fileHandle.entries();
  let ent = await dirEntries.next();
  while (!ent.done) {
    const fh = ent.value[1];
    const info = {};
    if (fh.kind == "directory") {
      info.name = ent.value[0];
      info.type = fh.kind;
      info.open = false;
      info.path = root.path + "/" + ent.value[0];
      info.children = [];
      await getFile(fh, info);
    } else {
      // console.log(fh);
      info.handler = fh;
      info.name = ent.value[0];
      info.type = fh.kind;
      info.ext = getFileExtension(ent.value[0]);
      info.path = root.name + "/" + ent.value[0];
    }

    root.children.push(info);
    ent = await dirEntries.next();
  }
  return root;
}

function getFileExtension(fileName) {
  return fileName.substr(1 + fileName.lastIndexOf("."));
}
