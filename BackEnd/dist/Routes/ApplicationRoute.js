import { submitApplication } from "../Controllers/ApplicationController.js";
import upload from "../MiddleWare/MulterFileUpload.js";
export function CreateNewApplication(app) {
    app.post("/submit/application", upload.single('resume'), submitApplication);
}
