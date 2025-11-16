import { useMemo, useState } from "react";
import { createInitialFormState } from "../constants/registrationInitialState"


const clone = (o) => (Array.isArray(0) ? [...o] : {...(o || {})});

function setByPath(path, obj, value) {
  const keys = path.split(".");
  const root = clone(obj);
  let cur = root;

  for (let i=0; i< keys.length; i++){
    const k = keys[i];
    cur[k] = clone(cur[k]);
    cur = cur[k]
  }

}

function getByPath(obj, path, fallback = undefined) {
  return path.split(".").reduce(
    (acc, k) => (acc == null ? acc : acc[k]),
    obj
  ) ?? fallback;
}

export function useMedicalRegistrationForm(activeStep) {
  const [form, setForm] = useState(() => createInitialFormState());
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (field) => (eOrValue) => {
    const value =
      typeof eOrValue === "string" || Array.isArray(eOrValue)
        ? eOrValue
        : eOrValue?.target?.type === "checkbox"
        ? eOrValue.target.checked
        : eOrValue?.target?.type === "file"
        ? (eOrValue.target.multiple ? Array.from(eOrValue.target.files || []) : eOrValue.target.files?.[0] ?? null)
        : eOrValue?.target?.value;

    if (field.includes(".")) {
      const [root, sub] = field.split(".");
      setForm((f) => ({ ...f, [root]: { ...(f[root] || {}), [sub]: value } }));
    } else {
      setForm((f) => ({ ...f, [field]: value }));
    }
  };

  const onBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const stepErrors = useMemo(() => {
    const e = {};
    // Step 0: Personal Info
    if (activeStep === 0) {
      if (!form.fullName?.trim()) e.fullName = "Full name is required";
      if (!form.gender) e.gender = "Select a gender";
      if (!form.dateOfBirth) e.dateOfBirth = "Date of birth is required";
      if (!form.fatherName?.trim()) e.fatherName = "Father name is required";
      if (!form.motherName?.trim()) e.motherName = "Mother name is required";
      if (!form.maritalStatus) e.maritalStatus = "Marital status is required";
      if (!form.nationality?.trim()) e.nationality = "Nationality is required";
    }
    // Step 1: Contact Details
    if (activeStep === 1) {
      const A = form.permanentAddress || {};
      if (!A.houseNo?.trim()) e["permanentAddress.houseNo"] = "House no. required";
      if (!A.street?.trim()) e["permanentAddress.street"] = "Street required";
      if (!A.city?.trim()) e["permanentAddress.city"] = "City required";
      if (!A.state?.trim()) e["permanentAddress.state"] = "State required";
      if (!A.pinCode?.trim()) e["permanentAddress.pinCode"] = "Pin code required";
      if (!form.emailPrimary?.trim()) e.emailPrimary = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailPrimary)) e.emailPrimary = "Enter a valid email";
      const digits = (form.phoneNumber || "").replace(/\D/g, "");
      if (!digits) e.phoneNumber = "Mobile number is required";
      else if (digits.length < 10) e.phoneNumber = "Enter at least 10 digits";
    }
    return e;
  }, [activeStep, form]);

  // Step 2 : Academic & Professional Qualifications
  if (activeStep === 2) {
    const A = form.academicQualifications || {};
    
  }

  const canGoNext = useMemo(() => Object.keys(stepErrors).length === 0, [stepErrors]);

  return { form, setForm, onChange, onBlur, touched, setTouched, stepErrors, canGoNext, isSubmitting, setIsSubmitting };
}