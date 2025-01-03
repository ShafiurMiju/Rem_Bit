import { useState } from "react";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Code,
} from "lucide-react";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    kycDocument: null,
  });

  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    if (password.length < 8) return "weak";
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUppercase && hasLowercase && hasNumber && hasSpecial)
      return "strong";
    if ((hasUppercase || hasLowercase) && hasNumber) return "medium";
    return "weak";
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "kycDocument") {
      setFormData((prev) => ({
        ...prev,
        kycDocument: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "password") {
        setPasswordStrength(validatePassword(value));
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = {};

  //   // Validation checks
  //   if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
  //   if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

  //   if (!formData.email.trim()) {
  //     newErrors.email = 'Email is required';
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = 'Email is invalid';
  //   }

  //   if (!formData.password) {
  //     newErrors.password = 'Password is required';
  //   } else if (formData.password.length < 8) {
  //     newErrors.password = 'Password must be at least 8 characters';
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = 'Passwords do not match';
  //   }

  //   if (!formData.kycDocument) {
  //     newErrors.kycDocument = 'KYC document is required';
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   // If validation passes, proceed with registration
  //   console.log('Registration data:', formData);
  //   // Here you would typically call an API to register the user
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      alert(`Registration successful! Metadata Hash: ${data.metadataHash}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E6E9EF] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        {/* Header with Logo */}
        <header className="text-center mb-6">
          <div className="flex items-center space-x-3 justify-center mb-4">
            <Code className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl font-bold tracking-tight text-gray-800">
              RemitChain
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Secure and instant cross-border transfers
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.firstName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  } focus:outline-none focus:ring-1`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors.lastName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-indigo-500"
                  } focus:outline-none focus:ring-1`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } focus:outline-none focus:ring-1`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } focus:outline-none focus:ring-1`}
              />
              <div className="mt-1 flex items-center">
                {passwordStrength === "weak" && (
                  <div className="w-full h-1 bg-red-500 rounded mr-2"></div>
                )}
                {passwordStrength === "medium" && (
                  <>
                    <div className="w-full h-1 bg-yellow-500 rounded mr-2"></div>
                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                  </>
                )}
                {passwordStrength === "strong" && (
                  <>
                    <div className="w-full h-1 bg-green-500 rounded mr-2"></div>
                    <div className="w-full h-1 bg-green-500 rounded mr-2"></div>
                    <div className="w-full h-1 bg-green-500 rounded"></div>
                  </>
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                } focus:outline-none focus:ring-1`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* <div>
            <label htmlFor="kycDocument" className="block text-sm font-medium text-gray-700 mb-2">
              KYC Document Upload
            </label>
            <div 
              className={`
                border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300
                ${formData.kycDocument 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50'}
              `}
            >
              <input
                type="file"
                id="kycDocument"
                name="kycDocument"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleInputChange}
                className="hidden"
              />
              <label 
                htmlFor="kycDocument" 
                className="cursor-pointer flex flex-col items-center space-y-3"
              >
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-indigo-600" />
                {formData.kycDocument ? (
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      {formData.kycDocument.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Click to change document
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      Drag and drop or <span className="text-indigo-600 font-semibold">Browse</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Supported formats: PDF, JPG, PNG (max 5MB)
                    </p>
                  </>
                )}
              </label>
            </div>
            {errors.kycDocument && (
              <p className="text-red-500 text-xs mt-2 text-center">
                {errors.kycDocument}
              </p>
            )}
          </div> */}

          <div className="flex items-center space-x-2 text-xs text-gray-600 mt-4">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <p>
              We protect your personal information with advanced blockchain
              security
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition shadow-md flex items-center justify-center"
          >
            Create Account
            <UserPlus className="w-5 h-5 ml-2" />
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;






