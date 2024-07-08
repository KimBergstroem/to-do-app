export const validateForm = (formData) => {
  const formConditions = [
    {
      conditionName: "Email should have at least one character",
      invalidMessage: "Please enter your email address",
      fieldName: "email",
      condition: (fieldValue) => fieldValue.trim().length > 0,
    },
    {
      conditionName:
        "Email should start with a set of letters, numbers, dots, or hyphens",
      invalidMessage: "Please enter a valid email username",
      fieldName: "email",
      condition: (fieldValue) => {
        const emailUsernameRegex = /^[\w-.]+/;
        return emailUsernameRegex.test(fieldValue.trim());
      },
    },
    {
      conditionName: "Email should include a @ symbol",
      invalidMessage: "Please include a @ symbol",
      fieldName: "email",
      condition: (fieldValue) => fieldValue.includes("@"),
    },
    {
      conditionName: "Email should end with a valid domain name",
      invalidMessage: "Please enter a valid email domain",
      fieldName: "email",
      condition: (fieldValue) => {
        const domainRegex = /([\w-]+\.)+[\w-]{2,4}$/;
        return domainRegex.test(fieldValue.trim());
      },
    },
    {
      conditionName: "Password should have at least 8 characters",
      invalidMessage: "Please enter a password with at least 8 characters",
      fieldName: "password",
      condition: (fieldValue) => fieldValue.trim().length >= 8,
    },
    {
      conditionName: "Passwords should match",
      invalidMessage: "Passwords do not match",
      fieldName: "confirmPassword",
      condition: (fieldValue, formData) => fieldValue === formData.password,
    },
  ];

  const validationResults = formConditions
    .map((formCondition) => {
      const fieldValue = formData[formCondition.fieldName];
      if (!fieldValue) {
        return null;
      }

      const meets = formCondition.condition(fieldValue, formData);
      return { ...formCondition, meets };
    })
    .filter(Boolean);

  const areAllValid = validationResults.every((validation) => validation.meets);
  return { areAllValid, validationResults };
};
