export function initApp() {
    const btnLandscape = document.getElementById('btn-landscape');
    const btnPortrait = document.getElementById('btn-portrait');
    const businessCard = document.getElementById('business-card');
    const templateSelect = document.getElementById('template-select');
    const inputQrToggle = document.getElementById('input-qr-toggle');
    const cardQrDisplay = document.getElementById('card-qr-display');
    const inputWebsite = document.getElementById('input-website');
    const inputLogo = document.getElementById('input-logo');
    const cardLogoDisplay = document.getElementById('card-logo-display');

    // Persistence Logic (moved up for scope)
    let saveTimeout;
    const saveToLocalStorage = (immediate = false) => {
        const performSave = () => {
            const state = {
                name: document.getElementById('input-name')?.value,
                title: document.getElementById('input-title')?.value,
                email: document.getElementById('input-email')?.value,
                phone: document.getElementById('input-phone')?.value,
                website: document.getElementById('input-website')?.value,
                template: templateSelect?.value,
                orientation: businessCard?.classList.contains('landscape') ? 'landscape' : 'portrait',
                qrEnabled: inputQrToggle?.checked,
                logo: cardLogoDisplay?.querySelector('img')?.src
            };
            localStorage.setItem('bmaker_state', JSON.stringify(state));
        };

        clearTimeout(saveTimeout);
        if (immediate) {
            performSave();
        } else {
            saveTimeout = setTimeout(performSave, 500);
        }
    };

    // Orientation Logic
    if (btnLandscape && btnPortrait && businessCard) {
        btnLandscape.addEventListener('click', () => {
            businessCard.classList.remove('portrait');
            businessCard.classList.add('landscape');
            btnLandscape.classList.add('active');
            btnPortrait.classList.remove('active');
            saveToLocalStorage();
        });

        btnPortrait.addEventListener('click', () => {
            businessCard.classList.remove('landscape');
            businessCard.classList.add('portrait');
            btnPortrait.classList.add('active');
            btnLandscape.classList.remove('active');
            saveToLocalStorage();
        });
    }

    // Template Logic
    if (templateSelect && businessCard) {
        templateSelect.addEventListener('change', (e) => {
            const selectedTemplate = e.target.value;
            businessCard.classList.remove('minimal', 'modern', 'elegant');
            businessCard.classList.add(selectedTemplate);
            saveToLocalStorage();
        });
    }

    // Text Customization Logic
    const inputs = [
        { id: 'input-name', displayId: 'card-name-display' },
        { id: 'input-title', displayId: 'card-title-display' },
        { id: 'input-email', displayId: 'card-email-display' },
        { id: 'input-phone', displayId: 'card-phone-display' },
        { id: 'input-website', displayId: 'card-website-display' }
    ];

    inputs.forEach(inputPair => {
        const inputEl = document.getElementById(inputPair.id);
        const displayEl = document.getElementById(inputPair.displayId);

        if (inputEl && displayEl) {
            inputEl.addEventListener('input', () => {
                displayEl.textContent = inputEl.value;
                saveToLocalStorage();
            });
        }
    });

    // Logo Upload Logic
    if (inputLogo && cardLogoDisplay) {
        inputLogo.addEventListener('change', (e) => {
            const file = e.target.files[0];
            // console.log('File changed:', file?.name);
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    // console.log('FileReader loaded');
                    cardLogoDisplay.innerHTML = `<img src="${event.target.result}" alt="Logo">`;
                    saveToLocalStorage(true); // Immediate save for logo
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function updateQRCode() {
        const website = inputWebsite.value || 'https://example.com';
        if (typeof qrcode !== 'undefined') {
            const qr = qrcode(0, 'M');
            qr.addData(website);
            qr.make();
            cardQrDisplay.innerHTML = qr.createImgTag(4);
        }
    }

    if (inputQrToggle && cardQrDisplay) {
        inputQrToggle.addEventListener('change', () => {
            if (inputQrToggle.checked) {
                cardQrDisplay.classList.add('active');
                updateQRCode();
            } else {
                cardQrDisplay.classList.remove('active');
            }
            saveToLocalStorage();
        });
    }

    if (inputWebsite) {
        inputWebsite.addEventListener('input', () => {
            if (inputQrToggle.checked) {
                updateQRCode();
            }
        });
    }

    const btnPrint = document.getElementById('btn-print');
    const printSheet = document.getElementById('print-sheet');

    if (btnPrint && printSheet) {
        btnPrint.addEventListener('click', () => {
            printSheet.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const clone = businessCard.cloneNode(true);
                clone.id = `print-card-${i}`;
                clone.classList.add('print-card-clone');
                printSheet.appendChild(clone);
            }
            window.print();
        });
    }

    const loadFromLocalStorage = () => {
        const saved = localStorage.getItem('bmaker_state');
        if (!saved) return;

        try {
            const state = JSON.parse(saved);
            if (state.name) document.getElementById('input-name').value = state.name;
            if (state.title) document.getElementById('input-title').value = state.title;
            if (state.email) document.getElementById('input-email').value = state.email;
            if (state.phone) document.getElementById('input-phone').value = state.phone;
            if (state.website) document.getElementById('input-website').value = state.website;

            inputs.forEach(inputPair => {
                const inputEl = document.getElementById(inputPair.id);
                const displayEl = document.getElementById(inputPair.displayId);
                if (inputEl && displayEl) {
                    displayEl.textContent = inputEl.value;
                }
            });

            if (state.template) {
                templateSelect.value = state.template;
                businessCard.classList.remove('minimal', 'modern', 'elegant');
                businessCard.classList.add(state.template);
            }

            if (state.orientation === 'portrait') {
                businessCard.classList.remove('landscape');
                businessCard.classList.add('portrait');
                btnPortrait.classList.add('active');
                btnLandscape.classList.remove('active');
            } else if (state.orientation === 'landscape') {
                businessCard.classList.remove('portrait');
                businessCard.classList.add('landscape');
                btnLandscape.classList.add('active');
                btnPortrait.classList.remove('active');
            }

            if (state.logo) {
                cardLogoDisplay.innerHTML = `<img src="${state.logo}" alt="Logo">`;
            }

            if (state.qrEnabled) {
                inputQrToggle.checked = true;
                cardQrDisplay.classList.add('active');
                const website = document.getElementById('input-website').value || 'https://example.com';
                if (typeof qrcode !== 'undefined') {
                    const qr = qrcode(0, 'M');
                    qr.addData(website);
                    qr.make();
                    cardQrDisplay.innerHTML = qr.createImgTag(4);
                }
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    };

    loadFromLocalStorage();
}

if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
    document.addEventListener('DOMContentLoaded', initApp);
}
