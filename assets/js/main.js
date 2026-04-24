function revealOnScroll() {
    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) {
        return;
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => observer.observe(element));
        return;
    }

    revealElements.forEach((element) => element.classList.add("active"));
}

function setFooterYear() {
    const yearNodes = document.querySelectorAll(".js-year");
    const year = String(new Date().getFullYear());
    yearNodes.forEach((node) => {
        node.textContent = year;
    });
}

function handleContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) {
        return;
    }

    const statusNode = document.getElementById("form-status");
    const whatsappNumber = "919734687196";

    function encodeWhatsAppMessage(formData) {
        const name = formData.get("name")?.toString().trim() || "";
        const email = formData.get("email")?.toString().trim() || "";
        const subject = formData.get("subject")?.toString().trim() || "General Inquiry";
        const message = formData.get("message")?.toString().trim() || "";

        const composedMessage = [
            "Hello FocalShot Pro Team,",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            "Message:",
            message
        ].join("\n");

        return encodeURIComponent(composedMessage);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            if (statusNode) {
                statusNode.textContent = "Please fill all required fields.";
                statusNode.classList.add("error");
                statusNode.classList.remove("success");
            }
            return;
        }

        const formData = new FormData(form);
        const prefilledText = encodeWhatsAppMessage(formData);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledText}`;

        if (statusNode) {
            statusNode.textContent = "Opening WhatsApp with your prefilled message...";
            statusNode.classList.add("success");
            statusNode.classList.remove("error");
        }

        window.open(whatsappUrl, "_blank", "noopener");
        form.reset();
    });
}

function initPhoneShowcaseRotation() {
    const phoneFrames = document.querySelectorAll("[data-phone-frame]");
    if (phoneFrames.length < 3) {
        return;
    }

    const screenshotUrls = [
        "https://res.cloudinary.com/db1tiugho/image/upload/v1777046364/Picsart_26-04-24_02-15-35-913_nuumtu.png",
        "https://res.cloudinary.com/db1tiugho/image/upload/v1777046363/Picsart_26-04-24_02-26-52-366_kid6uz.png",
        "https://res.cloudinary.com/db1tiugho/image/upload/v1777046331/Picsart_26-04-24_03-18-43-210_piotjv.png",
        "https://res.cloudinary.com/db1tiugho/image/upload/v1777046354/Picsart_26-04-24_04-44-08-726_qlxyxw.png"
    ];

    let startIndex = 0;
    let isUpdating = false;

    function ensureImageReady(url) {
        return new Promise((resolve) => {
            const preloadedImage = new Image();
            preloadedImage.decoding = "async";
            preloadedImage.src = url;

            const finalize = () => {
                if (typeof preloadedImage.decode === "function") {
                    preloadedImage.decode().then(resolve).catch(resolve);
                    return;
                }
                resolve();
            };

            if (preloadedImage.complete) {
                finalize();
                return;
            }

            preloadedImage.addEventListener("load", finalize, { once: true });
            preloadedImage.addEventListener("error", resolve, { once: true });
        });
    }

    async function updateFrames(baseIndex) {
        if (isUpdating) {
            return;
        }
        isUpdating = true;

        const nextFrames = [];
        const nextUrls = [];

        phoneFrames.forEach((frame, frameIndex) => {
            const explicitOffset = Number(frame.dataset.phoneOffset);
            const frameOffset = Number.isFinite(explicitOffset) ? explicitOffset : frameIndex;
            const imageIndex = (baseIndex + frameOffset) % screenshotUrls.length;
            const src = screenshotUrls[imageIndex];
            nextFrames.push({
                frame,
                src,
                alt: `FocalShot Pro screenshot ${imageIndex + 1}`
            });
            nextUrls.push(src);
        });

        await Promise.all(nextUrls.map((url) => ensureImageReady(url)));

        // Step 1: clear animation classes together
        nextFrames.forEach(({ frame }) => {
            frame.classList.remove("is-swiping");
            frame.classList.add("is-preparing");
        });

        // Step 2: force one reflow for the whole batch (not per frame)
        void document.body.offsetWidth;

        // Step 3: update all images
        nextFrames.forEach(({ frame, src, alt }) => {
            frame.src = src;
            frame.alt = alt;
        });

        // Step 4: trigger swipe animation together on next frame
        requestAnimationFrame(() => {
            nextFrames.forEach(({ frame }) => {
                frame.classList.remove("is-preparing");
                frame.classList.add("is-swiping");
            });
            isUpdating = false;
        });
    }

    Promise.all(screenshotUrls.map((url) => ensureImageReady(url))).then(() => {
        updateFrames(startIndex);
    });

    setInterval(() => {
        if (isUpdating) {
            return;
        }
        startIndex = (startIndex + 1) % screenshotUrls.length;
        updateFrames(startIndex);
    }, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    setFooterYear();
    revealOnScroll();
    handleContactForm();
    initPhoneShowcaseRotation();
});
