export const createInitialFormState = () => ({
  fullname: "",
  gender: "",
  dateOfBirth: "",
  maritalStatus: "",
  personalNationality: "",
  personalPhoto: "",
  permanentAddress: {
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  },
  phoneNumber: "",
  altPhoneNumber: "",
  emailPrimary: "",
  emailAlternate: "",
  academicQualifications: {
    ug: {
      qualification: "",
      specialization: "",
      college: "",
      yearOfPassing: "",
    },
    pg: {
      qualification: "",
      specialization: "",
      college: "",
      yearOfPassing: "",
    },
  },
  academics_phdOrResearchDegrees: [],
  academics_additionalCertifications: [],
  regulatoryDetails: {
    regulatoryAyushRegNo: "",
    councilName: "",
    registrationDate: "",
    regulatoryValidityUntil: "",
  },
  practiceDetails: {
    currentDesignation: "",
    currentInstitution: "",
    workAddress: "",
    yearsExperience: "",
    specializationAreas: [],
  },
  previousExperience: [
    {
      designation: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  researchInterests: [],
  publicationDetails: [
    {
      journal: "",
      title: "",
      year: "",
      link: "",
    },
  ],
  trainingDetails: [
    {
      trainingName: "",
      trainingOrganizer: "",
      trainingRole: [],
      trainingStartDate: "",
      trainingEndDate: "",
    },
  ],
  digitalWebsite: "",
  digitalBlog: "",
  digitalLinkedIn: "",
  digitalResearchGate: "",
  digitalOrcid: "",
  digitalSocialPlatform: [],
  digitalSocialHandle: [],
  digitalSocialURL: [],
  consent_infoTrueAndCorrect: false,
  consent_authorizeDataUse: false,
  consent_agreeToNotifications: false,
  consent_timestamp: new Date().toISOString(),
});

export const defaultExperience = {
  designation: "",
  organization: "",
  startDate: "",
  endDate: "",
  description: "",
};

export const defaultPublication = {
  journal: "",
  title: "",
  year: "",
  link: "",
};

export const defaultTraining = {
  trainingName: "",
  trainingOrganizer: "",
  trainingRole: [],
  trainingStartDate: "",
  trainingEndDate: "",
};

export const extractInputValue = (input) => {
  if (Array.isArray(input)) return input;
  if (input && typeof input === "object" && "target" in input) {
    const { target } = input;
    if (target.type === "checkbox") {
      return target.checked;
    }
    return target.value;
  }
  return input;
};

export const setValueAtPath = (object, path, valueOrFn) => {
  const result = { ...object };
  let current = result;
  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i];
    const existing = current[key];
    const nextKey = path[i + 1];
    if (Array.isArray(existing)) {
      current[key] = [...existing];
    } else if (existing && typeof existing === "object") {
      current[key] = { ...existing };
    } else {
      current[key] = typeof nextKey === "number" ? [] : {};
    }
    current = current[key];
  }
  const lastKey = path[path.length - 1];
  const currentValue = current[lastKey];
  const newValue =
    typeof valueOrFn === "function" ? valueOrFn(currentValue) : valueOrFn;
  current[lastKey] = newValue;
  return result;
};

export const arrayToMultiline = (arr = []) => arr.join("\n");

export const multilineToArray = (value) =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

export const arrayToCommaSeparated = (arr = []) => arr.join(", ");

export const commaSeparatedToArray = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

export const isValueBlank = (value) => {
  if (Array.isArray(value)) {
    return value.length === 0 || value.every((item) => isValueBlank(item));
  }
  if (value === null || value === undefined) {
    return true;
  }
  return String(value).trim().length === 0;
};

export const isObjectEmpty = (obj) =>
  Object.values(obj || {}).every((value) => isValueBlank(value));

export const sanitizeStringArray = (arr) =>
  (arr || [])
    .map((item) => (typeof item === "string" ? item.trim() : item))
    .filter((item) => !isValueBlank(item));

export const normalizeNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
