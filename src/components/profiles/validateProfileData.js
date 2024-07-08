export const validateProfileData = (data) => {
  const usernamePattern = /^[A-Za-z0-9!?\s]{1,15}$/;
  const workTitlePattern = /^[A-Za-z\s]{1,20}$/;
  const fullNamePattern = /^[A-Za-z\s]{1,25}$/;

  if (!usernamePattern.test(data.username.trim())) {
    return "Username can only use A-Z, 0-9, ! and ?, and must be 1-15 characters long";
  }

  if (!workTitlePattern.test(data.work_title.trim())) {
    return "Work title can only use A-Z and spaces, and must be 1-20 characters long";
  }

  if (!fullNamePattern.test(data.full_name.trim())) {
    return "Full name can only use A-Z and spaces, and must be 1-25 characters long";
  }

  return null;
};
