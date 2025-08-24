/* eslint-disable @typescript-eslint/no-explicit-any */

export function mapFieldErrors(error: any, fields: string[]) {
  const output: Record<string, string> = {};

  error?.errors?.forEach((err: any) => {
    if (fields.includes(err.param)) {
      output[err.param] = err.message;
    }
  })

  return output;
}