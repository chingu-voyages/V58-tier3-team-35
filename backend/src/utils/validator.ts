export function validateVoyagerInput(data: any): { [key: string]: string }[] {
  const requiredFields = [
    "gender",
    "goal",
    "source",
    "countryName",
    "soloProjectTier",
    "roleType",
    "voyageRole",
    "voyageTier",
  ];

  const errors: { [key: string]: string }[] = [];

  for (const field of requiredFields) {
    if (!(field in data)) {
      errors.push({ [field]: `Missing field: ${field}` });
    }

    if (data[field] === "") {
      errors.push({ [field]: `Field '${field}' cannot be empty` });
    }
  }

  return errors;
}
