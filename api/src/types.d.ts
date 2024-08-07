declare module "aes-everywhere" {
  export function encrypt(input: string, secret: string): string;

  export function decrypt(encrypted: string, secret: string): string;
}
