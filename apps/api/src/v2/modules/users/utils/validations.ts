export function isPasswordValid(password: string): boolean {
  if (password.length < 8) {
    return false;
  }

  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  return regex.test(password);
}

export function isEmailValid(email: string): boolean {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(email);
}

export function isFieldsRequired<T extends object>(
  requiredFields: (keyof T)[],
  obj: object
): boolean {
  return requiredFields.every((field) => field in obj);
}

export function isUUIDValid(id: string) {
  const regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  return regex.test(id);
}
