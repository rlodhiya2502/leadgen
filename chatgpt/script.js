document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("leadForm");
    const locationField = document.getElementById("location");
    const nameField = document.getElementById("name");
    const mobileField = document.getElementById("mobile");
    const emailField = document.getElementById("email");
    const nameCharCount = document.getElementById("nameCharCount");
    const submitButton = form.querySelector("button[type='submit']");
    const mobileStatus = document.getElementById("mobileStatus");
    const emailStatus = document.getElementById("emailStatus");
    const termsCheckbox = document.getElementById("terms");
    const termsLink = document.getElementById("termsLink");
    const termsModal = document.getElementById("termsModal");
    const closeModalBtn = termsModal.querySelector(".close-btn");

    // Clear all fields if the page is loading for the first time
    const isFirstLoad = !localStorage.getItem("uniqueSignature");
    if (isFirstLoad) {
        localStorage.clear();
        document.cookie.split(";").forEach((c) => {
            document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        });
        form.reset();
        nameCharCount.textContent = "(0/50)";
    }

    // Generate unique signature
    const generateSignature = () => {
        return 'xxxx-xxxx-4xxx-yxxx-xxxx-yyyy'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    // Persist unique signature in local storage and cookie
    let signature = localStorage.getItem("uniqueSignature");
    if (!signature) {
        signature = generateSignature();
        localStorage.setItem("uniqueSignature", signature);
        document.cookie = `uniqueSignature=${signature}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }

    // Check if user has already submitted details
    const hasSubmitted = localStorage.getItem("hasSubmitted");
    if (hasSubmitted) {
        showToast("You have already submitted your details.");
        form.style.display = "none";
        return;
    }

    // Detect location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationField.value = `Lat: ${latitude}, Lon: ${longitude}`;
            },
            () => {
                locationField.value = "Location permission denied.";
            }
        );
    } else {
        locationField.value = "Geolocation not supported.";
    }

    // Show toast message
    const showToast = (message, callback) => {
        // Remove existing toast if any
        const existingToast = document.querySelector(".toast");
        if (existingToast) {
            document.body.removeChild(existingToast);
        }

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<span class="close-btn">&times;</span>${message}`;

        const closeButton = toast.querySelector(".close-btn");
        closeButton.onclick = () => {
            document.body.removeChild(toast);
        };

        if (callback) {
            const confirmButton = document.createElement("button");
            confirmButton.innerText = "Confirm";
            confirmButton.onclick = () => {
                document.body.removeChild(toast);
                callback();
            };

            const cancelButton = document.createElement("button");
            cancelButton.innerText = "Cancel";
            cancelButton.onclick = () => {
                document.body.removeChild(toast);
            };

            toast.appendChild(confirmButton);
            toast.appendChild(cancelButton);
        } else {
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 3000);
        }

        document.body.appendChild(toast);
    };

    // Validate name field
    const validateName = () => {
        const nameValue = nameField.value;
        const sanitizedValue = nameValue.replace(/[^a-zA-Z\s]/g, "");
        if (nameValue !== sanitizedValue) {
            nameField.value = sanitizedValue;
        }
        const remainingChars = 50 - sanitizedValue.length;
        nameCharCount.textContent = `(${sanitizedValue.length}/50)`;
        mobileField.disabled = sanitizedValue.length < 2;
        return sanitizedValue.length <= 50;
    };

    nameField.addEventListener("input", validateName);

    // Simulate checking if mobile number exists in backend
    const checkMobileExists = async (mobile) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const exists = mobile === "07123456789"; // Simulate existing number
                resolve(exists);
            }, 500);
        });
    };

    // Validate mobile field
    const validateMobile = async () => {
        const mobileValue = mobileField.value;
        const sanitizedValue = mobileValue.replace(/[^0-9]/g, "");
        if (mobileValue !== sanitizedValue) {
            mobileField.value = sanitizedValue;
        }
        const isValid = /^07\d{9}$/.test(sanitizedValue);
        emailField.disabled = !isValid;
        if (isValid) {
            const exists = await checkMobileExists(sanitizedValue);
            mobileStatus.style.display = "block";
            if (exists) {
                mobileStatus.className = "status-icon invalid";
            } else {
                mobileStatus.className = "status-icon valid";
            }
        } else {
            mobileStatus.style.display = "none";
            if (sanitizedValue.length > 0) {
                showToast("Mobile number must start with 07 and be 11 digits long.");
            }
        }
        return isValid;
    };

    mobileField.addEventListener("input", validateMobile);

    // Simulate checking if email exists in backend
    const checkEmailExists = async (email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const exists = email === "test@example.com"; // Simulate existing email
                resolve(exists);
            }, 500);
        });
    };

    // Validate email field
    const validateEmail = async () => {
        const emailValue = emailField.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        if (isValid) {
            const exists = await checkEmailExists(emailValue);
            emailStatus.style.display = "block";
            if (exists) {
                emailStatus.className = "status-icon invalid";
            } else {
                emailStatus.className = "status-icon valid";
            }
            termsCheckbox.disabled = !isValid;
        } else {
            emailStatus.style.display = "none";
            termsCheckbox.disabled = true;
        }
        return isValid;
    };

    emailField.addEventListener("blur", validateEmail);
    emailField.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const isValid = await validateEmail();
            if (isValid) {
                termsCheckbox.disabled = false;
                termsCheckbox.focus();
            }
        }
    });

    // Show terms and conditions modal
    termsLink.addEventListener("click", (event) => {
        event.preventDefault();
        termsModal.style.display = "block";
    });

    // Close terms and conditions modal
    closeModalBtn.addEventListener("click", () => {
        termsModal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === termsModal) {
            termsModal.style.display = "none";
        }
    });

    // Simulate fetch response
    const simulateFetch = async (url, options) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    json: async () => ({ success: true })
                });
            }, 1000);
        });
    };

    // Submit form
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!validateName()) {
            showToast("Name must be 50 characters or less and contain no special characters.");
            return;
        }

        if (!(await validateMobile())) {
            showToast("Mobile number must start with 07 and be 11 digits long.");
            return;
        }

        if (!(await validateEmail())) {
            showToast("Please enter a valid email address.");
            return;
        }

        showToast("Are you sure you want to submit your details?", async () => {
            const formData = new FormData(form);
            formData.append("signature", signature); // Append signature to form data

            const response = await simulateFetch("backend.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                showToast("Thank you! Your details have been submitted.");
                localStorage.setItem("hasSubmitted", "true");
                localStorage.setItem("name", nameField.value);
                localStorage.setItem("mobile", mobileField.value);
                localStorage.setItem("email", emailField.value);
                localStorage.setItem("location", locationField.value);
                document.cookie = `name=${nameField.value}; path=/; max-age=${60 * 60 * 24 * 365}`;
                document.cookie = `mobile=${mobileField.value}; path=/; max-age=${60 * 60 * 24 * 365}`;
                document.cookie = `email=${emailField.value}; path=/; max-age=${60 * 60 * 24 * 365}`;
                document.cookie = `location=${locationField.value}; path=/; max-age=${60 * 60 * 24 * 365}`;
                nameField.disabled = true;
                mobileField.disabled = true;
                emailField.disabled = true;
                locationField.disabled = true;
                submitButton.textContent = "Clear";
                submitButton.onclick = clearForm;
            } else {
                showToast("There was an error. Please try again.");
            }
        });
    });

    // Clear form
    const clearForm = () => {
        localStorage.removeItem("hasSubmitted");
        localStorage.removeItem("name");
        localStorage.removeItem("mobile");
        localStorage.removeItem("email");
        localStorage.removeItem("location");
        document.cookie = "name=; path=/; max-age=0";
        document.cookie = "mobile=; path=/; max-age=0";
        document.cookie = "email=; path=/; max-age=0";
        document.cookie = "location=; path=/; max-age=0";
        form.reset();
        nameField.disabled = false;
        mobileField.disabled = true;
        emailField.disabled = true;
        locationField.disabled = false;
        termsCheckbox.disabled = true;
        nameCharCount.textContent = "(0/50)";
        mobileStatus.style.display = "none";
        emailStatus.style.display = "none";
        submitButton.textContent = "Submit";
        submitButton.onclick = null;
    };
});
