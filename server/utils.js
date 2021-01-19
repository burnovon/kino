const fs = require('fs');
const path = require('path');

const fps = fs.promises;

const dirPath = path.resolve(__dirname, '../temp');
console.log(dirPath);
const filePath = path.resolve(dirPath, 'sessions.json');

const readData = async () => {
  if (!fs.existsSync(filePath)) {
    console.log(fs.existsSync(dirPath));
    if (!fs.existsSync(dirPath)) {
      await fs.promises.mkdir(dirPath);
    }

    const file = await fs.promises.open(filePath, 'w');
    await file.write('[]');
    await file.close();
    return [];
  }

  const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
  return JSON.parse(data);
};

const writeData = async (data) => {
  if (data === undefined) return;

  await fps.writeFile(filePath, JSON.stringify(data), 'utf-8');
};

module.exports = {
  readData,
  writeData,
};
