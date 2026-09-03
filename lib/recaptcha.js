/**
 * Safely loads Google reCAPTCHA v3 script and executes it with the provided action.
 *
 * @param {string} siteKey - The public Google reCAPTCHA v3 site key
 * @param {string} [action="contact_form"] - Action name for reCAPTCHA v3
 * @returns {Promise<string>} reCAPTCHA response token, or empty string on failure/unconfigured
 */
export async function executeRecaptcha(siteKey, action = "contact_form") {
  if (
    !siteKey ||
    siteKey === "<RECAPTCHA_SITE_KEY>" ||
    siteKey === "your_recaptcha_site_key_here"
  ) {
    console.error(
      "[Contact Form] Error: reCAPTCHA site key is missing. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY."
    );
    return "";
  }

  if (typeof window === "undefined") {
    return "";
  }

  return new Promise((resolve) => {
    let resolved = false;

    const safeResolve = (token) => {
      if (!resolved) {
        resolved = true;
        resolve(token);
      }
    };

    const triggerExecute = () => {
      if (window.grecaptcha && typeof window.grecaptcha.ready === "function") {
        try {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(siteKey, { action });
              if (!token) {
                console.error(
                  "[Contact Form] Error: reCAPTCHA token isn't generated. Verify that 'localhost' is listed in your Google reCAPTCHA allowed domains."
                );
                safeResolve("");
                return;
              }
              safeResolve(token);
            } catch (err) {
              console.error(
                "[Contact Form] Error: reCAPTCHA execution error:",
                err?.message || err,
                "(If testing on localhost, verify 'localhost' is permitted for this site key in the Google reCAPTCHA Admin Console)"
              );
              safeResolve("");
            }
          });
          return true;
        } catch (err) {
          console.error(
            "[Contact Form] Error: grecaptcha.ready threw an exception:",
            err?.message || err
          );
          safeResolve("");
          return true;
        }
      }
      return false;
    };

    // If grecaptcha is already available, execute immediately
    if (triggerExecute()) {
      return;
    }

    // Check if script is already injected in document
    const scriptSrc = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    let scriptTag = document.querySelector(`script[src*="recaptcha/api.js"]`);

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.src = scriptSrc;
      scriptTag.async = true;
      scriptTag.defer = true;
      scriptTag.onload = () => {
        triggerExecute();
      };
      scriptTag.onerror = () => {
        console.error(
          "[Contact Form] Error: reCAPTCHA isn't available (Failed to load Google reCAPTCHA script from api.js)."
        );
        safeResolve("");
      };
      document.head.appendChild(scriptTag);
    }

    // Poll with timeout in case script is loading
    let attempts = 0;
    const maxAttempts = 30; // 6 seconds total
    const interval = setInterval(() => {
      attempts++;
      if (triggerExecute() || attempts >= maxAttempts) {
        clearInterval(interval);
        if (attempts >= maxAttempts) {
          console.error(
            "[Contact Form] Error: reCAPTCHA isn't available (Timed out waiting for grecaptcha to become ready)."
          );
          safeResolve("");
        }
      }
    }, 200);
  });
}

