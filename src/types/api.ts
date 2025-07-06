export interface UserData{
  "id": number;
  "username": string;
  "email": string
}
export interface SignupSuccessResponse{
  message: string; 
  user?: UserData; 
}


 export interface ErrorResponse {
  message?: string; 
  detail?: string;  
  errors?: { [key: string]: string[] }; 
}
export type APIResponse = SignupSuccessResponse | ErrorResponse;