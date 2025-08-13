import { submitApplication } from "../Controllers/ApplicationController.js"
import upload from "../MiddleWare/MulterFileUpload.js"

export function CreateNewApplication(app: any) {
    app.post("/submit/application", upload.single('resume'), submitApplication)
}