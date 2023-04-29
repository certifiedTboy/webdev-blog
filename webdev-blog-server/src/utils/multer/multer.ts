import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { UnprocessableError } from '../../lib/exceptions'
import path from "path"


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void



const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "public/uploads");
  },

  filename: (
    req: any,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    const uniqueSuffix = req.user.id
    callback(null, file.originalname + "-" + uniqueSuffix );
  }
})


const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  let ext = path.extname(file.originalname); 
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".jpeg"
  ) {
    callback(new UnprocessableError(`unsupported file format`));
  }
  callback(null, true);
}


const upload = multer({
  storage, 
  fileFilter
});



export default upload