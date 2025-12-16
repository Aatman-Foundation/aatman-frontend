import { useCallback, useMemo, useState } from "react";
import {
  arrayToCommaSeparated,
  commaSeparatedToArray,
  createInitialFormState,
  defaultExperience,
  defaultPublication,
  defaultTraining,
  extractInputValue,
  isObjectEmpty,
  isValueBlank,
  multilineToArray,
  normalizeNumber,
  sanitizeStringArray,
  setValueAtPath,
} from "./utils.js";

export const useMedicalRegistrationForm = (toast) => {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(() => createInitialFormState());
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personalPhotoFileName, setPersonalPhotoFileName] = useState("");
  const [personalPhotoInputKey, setPersonalPhotoInputKey] = useState(
    () => Date.now(),
  );

  const handleChange = useCallback(
    (field) => (value) => {
      const resolvedValue = extractInputValue(value);
      setForm((prev) => ({ ...prev, [field]: resolvedValue }));
    },
    [],
  );

  const handleNestedChange = useCallback(
    (path) => (value) => {
      const resolvedValue = extractInputValue(value);
      setForm((prev) => setValueAtPath(prev, path, resolvedValue));
    },
    [],
  );

  const handleCheckboxGroupChange = useCallback(
    (field) => (values) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setForm((prev) => ({ ...prev, [field]: values }));
    },
    [],
  );

  const handleNestedCheckboxGroupChange = useCallback(
    (path, touchKey) => (values) => {
      setTouched((prev) => ({ ...prev, [touchKey]: true }));
      setForm((prev) => setValueAtPath(prev, path, values));
    },
    [],
  );

  const handleListTextChange = useCallback((field) => (event) => {
    const items = multilineToArray(event.target.value ?? "");
    setForm((prev) => ({ ...prev, [field]: items }));
  }, []);

  const handleNestedListTextChange = useCallback(
    (path) => (event) => {
      const items = multilineToArray(event.target.value ?? "");
      setForm((prev) => setValueAtPath(prev, path, items));
    },
    [],
  );

  const handleTrainingRoleChange = useCallback(
    (index) => (event) => {
      const items = commaSeparatedToArray(event.target.value ?? "");
      setForm((prev) =>
        setValueAtPath(prev, ["trainingDetails", index, "trainingRole"], items),
      );
    },
    [],
  );

  const handlePersonalPhotoUpload = useCallback(
    (event) => {
      setTouched((prev) => ({ ...prev, personalPhoto: true }));
      const file = event.target.files?.[0];
      if (!file) {
        setForm((prev) => ({ ...prev, personalPhoto: "" }));
        setPersonalPhotoFileName("");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: "Please upload an image smaller than 5MB.",
          status: "warning",
        });
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, personalPhoto: reader.result }));
        setPersonalPhotoFileName(file.name);
      };
      reader.onerror = () => {
        toast({
          title: "Could not process image",
          description: "Please try again with a different photo.",
          status: "error",
        });
        setForm((prev) => ({ ...prev, personalPhoto: "" }));
        setPersonalPhotoFileName("");
      };
      reader.readAsDataURL(file);
    },
    [toast],
  );

  const addArrayItem = useCallback((path, template) => {
    setForm((prev) =>
      setValueAtPath(prev, path, (currentValue) => {
        const safe = Array.isArray(currentValue) ? [...currentValue] : [];
        safe.push(template);
        return safe;
      }),
    );
  }, []);

  const removeArrayItem = useCallback((path, index) => {
    setForm((prev) =>
      setValueAtPath(prev, path, (currentValue) => {
        const safe = Array.isArray(currentValue) ? [...currentValue] : [];
        safe.splice(index, 1);
        if (safe.length > 0) return safe;
        if (path[0] === "publicationDetails") return [defaultPublication];
        if (path[0] === "previousExperience") return [defaultExperience];
        if (path[0] === "trainingDetails") return [defaultTraining];
        return safe;
      }),
    );
  }, []);

  const onBlur = useCallback(
    (key) => () => setTouched((prev) => ({ ...prev, [key]: true })),
    [],
  );

  const stepErrors = useMemo(() => {
    const errors = {};
    const requireField = (condition, key, message) => {
      if (condition) {
        errors[key] = message;
      }
    };

    switch (activeStep) {
      case 0: {
        requireField(
          isValueBlank(form.fullname),
          "fullname",
          "Full name is required",
        );
        requireField(isValueBlank(form.gender), "gender", "Select a gender");
        requireField(
          isValueBlank(form.dateOfBirth),
          "dateOfBirth",
          "Date of birth is required",
        );
        requireField(
          isValueBlank(form.maritalStatus),
          "maritalStatus",
          "Marital status is required",
        );
        requireField(
          isValueBlank(form.personalNationality),
          "personalNationality",
          "Nationality is required",
        );
        requireField(
          isValueBlank(form.personalPhoto),
          "personalPhoto",
          "Personal photo is required",
        );
        break;
      }
      case 1: {
        const address = form.permanentAddress || {};
        requireField(
          isValueBlank(address.houseNo),
          "permanentAddress.houseNo",
          "House number is required",
        );
        requireField(
          isValueBlank(address.street),
          "permanentAddress.street",
          "Street is required",
        );
        requireField(
          isValueBlank(address.city),
          "permanentAddress.city",
          "City is required",
        );
        requireField(
          isValueBlank(address.state),
          "permanentAddress.state",
          "State is required",
        );
        requireField(
          isValueBlank(address.pinCode),
          "permanentAddress.pinCode",
          "PIN code is required",
        );
        requireField(
          isValueBlank(form.phoneNumber),
          "phoneNumber",
          "Primary phone number is required",
        );
        if (!isValueBlank(form.phoneNumber) && !errors.phoneNumber) {
          const digitsOnly = String(form.phoneNumber).replace(/\D/g, "");
          if (digitsOnly.length !== 10) {
            errors.phoneNumber = "Phone number must be a 10-digit number!";
          }
        }
        requireField(
          isValueBlank(form.emailPrimary),
          "emailPrimary",
          "Primary email is required",
        );
        break;
      }
      case 2: {
        const { ug, pg } = form.academicQualifications;
        requireField(
          isValueBlank(ug.qualification),
          "academicQualifications.ug.qualification",
          "UG qualification is required",
        );
        requireField(
          isValueBlank(ug.specialization),
          "academicQualifications.ug.specialization",
          "UG specialization is required",
        );
        requireField(
          isValueBlank(ug.college),
          "academicQualifications.ug.college",
          "UG college is required",
        );
        requireField(
          isValueBlank(ug.yearOfPassing),
          "academicQualifications.ug.yearOfPassing",
          "UG year of passing is required",
        );
        requireField(
          isValueBlank(pg.qualification),
          "academicQualifications.pg.qualification",
          "PG qualification is required",
        );
        requireField(
          isValueBlank(pg.specialization),
          "academicQualifications.pg.specialization",
          "PG specialization is required",
        );
        requireField(
          isValueBlank(pg.college),
          "academicQualifications.pg.college",
          "PG college is required",
        );
        requireField(
          isValueBlank(pg.yearOfPassing),
          "academicQualifications.pg.yearOfPassing",
          "PG year of passing is required",
        );
        break;
      }
      case 3: {
        const regulatory = form.regulatoryDetails || {};
        requireField(
          isValueBlank(regulatory.regulatoryAyushRegNo),
          "regulatoryDetails.regulatoryAyushRegNo",
          "AYUSH registration number is required",
        );
        requireField(
          isValueBlank(regulatory.councilName),
          "regulatoryDetails.councilName",
          "Council name is required",
        );
        requireField(
          isValueBlank(regulatory.registrationDate),
          "regulatoryDetails.registrationDate",
          "Registration date is required",
        );
        requireField(
          isValueBlank(regulatory.regulatoryValidityUntil),
          "regulatoryDetails.regulatoryValidityUntil",
          "Validity date is required",
        );
        break;
      }
      case 4: {
        const practice = form.practiceDetails || {};
        requireField(
          isValueBlank(practice.currentDesignation),
          "practiceDetails.currentDesignation",
          "Current designation is required",
        );
        requireField(
          isValueBlank(practice.currentInstitution),
          "practiceDetails.currentInstitution",
          "Institution name is required",
        );
        requireField(
          isValueBlank(practice.workAddress),
          "practiceDetails.workAddress",
          "Work address is required",
        );
        requireField(
          isValueBlank(practice.yearsExperience),
          "practiceDetails.yearsExperience",
          "Years of experience is required",
        );
        requireField(
          isValueBlank(practice.specializationAreas),
          "practiceDetails.specializationAreas",
          "Select at least one specialization",
        );

        (form.previousExperience || []).forEach((experience, index) => {
          const baseKey = `previousExperience.${index}`;
          requireField(
            isValueBlank(experience?.designation),
            `${baseKey}.designation`,
            "Designation is required",
          );
          requireField(
            isValueBlank(experience?.organization),
            `${baseKey}.organization`,
            "Organization is required",
          );
          requireField(
            isValueBlank(experience?.startDate),
            `${baseKey}.startDate`,
            "Start date is required",
          );
          requireField(
            isValueBlank(experience?.endDate),
            `${baseKey}.endDate`,
            "End date is required",
          );
          const description = experience?.description ?? "";
          if (isValueBlank(description)) {
            errors[`${baseKey}.description`] = "Description is required";
          } else if (description.trim().length < 10) {
            errors[`${baseKey}.description`] =
              "Description should be at least 10 characters long";
          }
        });
        break;
      }
      case 5: {
        requireField(
          isValueBlank(form.researchInterests),
          "researchInterests",
          "Select at least one research interest",
        );
        (form.publicationDetails || []).forEach((publication, index) => {
          const baseKey = `publicationDetails.${index}`;
          requireField(
            isValueBlank(publication?.journal),
            `${baseKey}.journal`,
            "Journal name is required",
          );
          requireField(
            isValueBlank(publication?.title),
            `${baseKey}.title`,
            "Publication title is required",
          );
          requireField(
            isValueBlank(publication?.year),
            `${baseKey}.year`,
            "Publication year is required",
          );
          requireField(
            isValueBlank(publication?.link),
            `${baseKey}.link`,
            "Publication link is required",
          );
          if (!isValueBlank(publication?.link) && !errors[`${baseKey}.link`]) {
            try {
              // eslint-disable-next-line no-new
              new URL(publication.link);
            } catch (err) {
              errors[`${baseKey}.link`] =
                "Publication link must be a valid URL";
            }
          }
        });
        break;
      }
      case 6: {
        const firstTraining = form.trainingDetails[0] || {};
        requireField(
          isValueBlank(firstTraining.trainingName),
          "trainingDetails.0.trainingName",
          "Training name is required",
        );
        requireField(
          isValueBlank(firstTraining.trainingOrganizer),
          "trainingDetails.0.trainingOrganizer",
          "Organizer is required",
        );
        requireField(
          isValueBlank(firstTraining.trainingRole),
          "trainingDetails.0.trainingRole",
          "Role is required",
        );
        requireField(
          isValueBlank(firstTraining.trainingStartDate),
          "trainingDetails.0.trainingStartDate",
          "Start date is required",
        );
        requireField(
          isValueBlank(firstTraining.trainingEndDate),
          "trainingDetails.0.trainingEndDate",
          "End date is required",
        );
        break;
      }
      case 8: {
        requireField(
          !form.consent_infoTrueAndCorrect,
          "consent_infoTrueAndCorrect",
          "Please confirm the information is correct",
        );
        requireField(
          !form.consent_authorizeDataUse,
          "consent_authorizeDataUse",
          "Please authorize data usage",
        );
        break;
      }
      default:
        break;
    }
    return errors;
  }, [activeStep, form]);

  const canGoNext = useMemo(
    () => Object.keys(stepErrors).length === 0,
    [stepErrors],
  );

  const resetForm = useCallback(() => {
    setForm(createInitialFormState());
    setTouched({});
    setActiveStep(0);
    setPersonalPhotoFileName("");
    setPersonalPhotoInputKey(Date.now());
  }, []);

  const buildPayload = useCallback(() => ({
    ...form,
    academicQualifications: {
      ug: {
        ...form.academicQualifications.ug,
        yearOfPassing: normalizeNumber(
          form.academicQualifications.ug.yearOfPassing,
        ),
      },
      pg: {
        ...form.academicQualifications.pg,
        yearOfPassing: normalizeNumber(
          form.academicQualifications.pg.yearOfPassing,
        ),
      },
    },
    academics_phdOrResearchDegrees: sanitizeStringArray(
      form.academics_phdOrResearchDegrees,
    ),
    academics_additionalCertifications: sanitizeStringArray(
      form.academics_additionalCertifications,
    ),
    practiceDetails: {
      ...form.practiceDetails,
      yearsExperience: normalizeNumber(form.practiceDetails.yearsExperience),
      specializationAreas: sanitizeStringArray(
        form.practiceDetails.specializationAreas,
      ),
    },
    previousExperience: form.previousExperience
      .map((experience) => ({ ...experience }))
      .filter((experience) => !isObjectEmpty(experience)),
    researchInterests: sanitizeStringArray(form.researchInterests),
    publicationDetails: form.publicationDetails
      .map((publication) => ({
        ...publication,
        year: normalizeNumber(publication.year),
      }))
      .filter((publication) => !isObjectEmpty(publication)),
    trainingDetails: form.trainingDetails
      .map((training) => ({
        ...training,
        // duplicate fields to satisfy backend validator expecting legacy keys
        traningName: training.trainingName,
        traningOrganizer: training.trainingOrganizer,
        traningRole: sanitizeStringArray(training.trainingRole),
        traningStartDate: training.trainingStartDate,
        traningEndDate: training.trainingEndDate,
        trainingRole: sanitizeStringArray(training.trainingRole),
      }))
      .filter((training) => !isObjectEmpty(training)),
    digitalSocialPlatform: sanitizeStringArray(form.digitalSocialPlatform),
    digitalSocialHandle: sanitizeStringArray(form.digitalSocialHandle),
    digitalSocialURL: sanitizeStringArray(form.digitalSocialURL),
    consent_timestamp: new Date().toISOString(),
  }), [form]);

  const formatTrainingRole = useCallback(
    (index) => arrayToCommaSeparated(form.trainingDetails[index]?.trainingRole),
    [form.trainingDetails],
  );

  return {
    activeStep,
    setActiveStep,
    form,
    touched,
    onBlur,
    handleChange,
    handleNestedChange,
    handleCheckboxGroupChange,
    handleNestedCheckboxGroupChange,
    handleListTextChange,
    handleNestedListTextChange,
    handleTrainingRoleChange,
    handlePersonalPhotoUpload,
    personalPhotoFileName,
    personalPhotoInputKey,
    addArrayItem,
    removeArrayItem,
    isSubmitting,
    setIsSubmitting,
    stepErrors,
    canGoNext,
    resetForm,
    buildPayload,
    setTouched,
    setForm,
    formatTrainingRole,
  };
};
