export const createInitialFormState = () => ({
  fullName: "",
  gender: "",
  dateOfBirth: "",
  fatherName: "",
  motherName: "",
  maritalStatus: "",
  nationality: "",
  passPortPhoto: null,

  permanentAddress: {
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  },
  correspondenceAddress: {
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  },
  sameAsPermanent: true,
  phoneNumber: "",
  altPhoneNumber: "",
  emailPrimary: "",
  alternateEmail: "",

  academicQualifications: {
    ug: {
      qualification: "",
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
  traningDetails: [
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
  consent_timestamp: Date.now(),
});
