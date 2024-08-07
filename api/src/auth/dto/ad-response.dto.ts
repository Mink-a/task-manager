export interface AdResponseDto {
  KBZRefNo: string;
  Data: Data;
}

export interface Data {
  user_name: string;
  login_id: string;
  branch_code: string;
}
