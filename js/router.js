let pageUrls = {
    about: '/index.html?about',
    contact:'/index.html?contact',
    gallery: '/index.html?gallery'
    };
    function OnStartUp() {
    popStateHandler();
    }
    OnStartUp();
    document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
    });
    document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
    });
    function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
    <h1 class="title">About Me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
    }
 function RenderContactPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
            <label for="name">Imię:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Wiadomość:</label>
            <textarea id="message" name="message" required></textarea>

            <label for="captcha">Ile to jest <span id="captcha-question"></span>?</label>
            <input type="text" id="captcha" required>

            <button type="submit">Wyślij</button>
            <p id="form-status"></p>
        </form>
    `;

    setupCaptcha(); // przygotuj pytanie
    setupContactFormValidation(); // uruchom walidację
}
let captchaAnswer = 0;

function setupCaptcha() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    captchaAnswer = a + b;
    document.getElementById('captcha-question').textContent = `${a} + ${b}`;
}
function setupContactFormValidation() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        const captcha = parseInt(form.captcha.value.trim());

        // Walidacja
        if (name === '' || email === '' || message === '') {
            status.textContent = "Wszystkie pola są wymagane.";
            status.style.color = 'red';
            return;
        }

        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(email)) {
            status.textContent = "Nieprawidłowy adres e-mail.";
            status.style.color = 'red';
            return;
        }

        if (captcha !== captchaAnswer) {
            status.textContent = "Niepoprawna odpowiedź CAPTCHA.";
            status.style.color = 'red';
            setupCaptcha(); // wygeneruj nowe pytanie
            return;
        }

        // Jeśli wszystko OK
        status.textContent = "Formularz poprawny. Wiadomość została wysłana!";
        status.style.color = 'green';
        form.reset();
        setupCaptcha();
    });
}

        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            });
    function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact){ RenderContactPage(); }
    if(loc === pageUrls.about){ RenderAboutPage(); }
    if (loc === pageUrls.gallery) { RenderGalleryPage(); }
    }
    document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});
function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div id="gallery" class="gallery-grid"></div>

        <div id="modal" class="modal hidden">
            <span id="modal-close">&times;</span>
            <img id="modal-img" src="" alt="Preview">
        </div>
    `;

    loadImages();
    setupModalHandlers();
}
function loadImages() {
    const gallery = document.getElementById('gallery');
    for (let i = 1; i <= 9; i++) {
        fetch(`images/${i}.jpg`)
            .then(res => res.blob())
            .then(blob => {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(blob);
                img.classList.add('thumb');
                img.loading = 'lazy'; // lazy loading
                img.setAttribute('data-index', i); // numer obrazka
                gallery.appendChild(img);
            })
            .catch(err => console.error(`Błąd ładowania obrazu ${i}.jpg:`, err));
    }
}

function setupModalHandlers() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('modal-close');

    document.getElementById('gallery').addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            modalImg.src = e.target.src;
            modal.classList.remove('hidden');
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}


    window.onpopstate = popStateHandler;