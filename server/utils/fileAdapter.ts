import { S3Adapter } from '@keystonejs/file-adapters'
const BUCKET = 'agileo'
const PATH = 'storage'

export const fileAdapter = new S3Adapter({
  bucket: BUCKET,
  folder: PATH,
  publicUrl: ({ filename, _meta }) => `${process.env.STORAGE_URL}/${BUCKET}/${PATH}/${filename}`,
  s3Options: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    endpoint: process.env.STORAGE_URL,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  },
})
