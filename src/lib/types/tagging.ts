import { File, UploadParams } from "../file";


export interface TagRequest {
    type: string;
    id: string;
    name: string;
    handle: string;
    pluginInstance: string;
    file: UploadParams;
}


export interface TagResponse {
    file: File;
}
