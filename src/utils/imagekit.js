import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;

export const uploadToImageKit = (fileBuffer, originalName) => {
  console.log("Inside Upload imagekit");
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: fileBuffer.toString("base64"), // Buffer → base64
        fileName: originalName || `issue-${Date.now()}.jpg`,
        folder: "/issues",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          fileId: result.fileId,
          url: result.url,
        });
      }
    );
  });
};

export const deleteFromImageKit = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (err) {
    console.error("ImageKit delete error:", err.message);
    return false;
  }
};
