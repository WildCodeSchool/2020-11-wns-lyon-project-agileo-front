import { S3Adapter } from '@keystonejs/file-adapters'
const BUCKET = 'agileo' // eslint-disable-line
const PATH = 'storage' // eslint-disable-line

export const Adapter = new S3Adapter({
  bucket: process.env.BUCKET,
  folder: process.env.FOLDER,
  publicUrl: ({ filename, _meta }) =>
    `${process.env.STORAGE_URL}/${process.env.BUCKET}/${process.env.FOLDER}/${filename}`,
  s3Options: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: process.env.STORAGE_URL,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  },
})
