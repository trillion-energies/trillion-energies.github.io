const header = document.getElementById('site-header');
const footer = document.getElementById('site-footer');
const navItems = [
  ['Home','index.html'],['About','about.html'],['Services','services.html'],['Projects','projects.html'],['Blog','blog.html'],['Contact','contact.html']
];
const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

if (header) {
  header.innerHTML = `
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <a class="navbar-brand" href="index.html" aria-label="Trillion Energies home"><img src="assets/logo.png" alt="TRILLION ENERGIES (OPC) PVT LTD"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="mainNav"><ul class="navbar-nav ms-auto align-items-lg-center">
        ${navItems.map(([label,url]) => `<li class="nav-item"><a class="nav-link ${currentPage===url?'active':''}" ${currentPage===url?'aria-current="page"':''} href="${url}">${label}</a></li>`).join('')}
        <li class="nav-item ms-lg-2"><button class="btn btn-primary btn-sm px-3" type="button" data-bs-toggle="modal" data-bs-target="#enquiryModal">Get in touch <i class="bi bi-arrow-up-right ms-1"></i></button></li>
      </ul></div>
    </div>
  </nav>`;
}

if (footer) {
  footer.innerHTML = `
  <footer class="site-footer"><div class="container"><div class="row g-5">
    <div class="col-lg-5"><img class="footer-logo" src="assets/logo.png" alt="Trillion Energies logo"><p class="footer-copy">TRILLION ENERGIES (OPC) PVT LTD<br>Building professional relationships and supporting energy-sector business requirements.</p></div>
    <div class="col-6 col-lg-3"><h4 class="footer-title">QUICK LINKS</h4><ul class="footer-links">${navItems.map(([label,url])=>`<li><a href="${url}">${label}</a></li>`).join('')}</ul></div>
    <div class="col-6 col-lg-4"><h4 class="footer-title">CONTACT</h4><p class="footer-contact"><i class="bi bi-envelope me-2"></i><a class="footer-contact" href="mailto:sales@trillion-energies.com">sales@trillion-energies.com</a></p><p class="footer-contact"><i class="bi bi-geo-alt me-2"></i>Hyderabad, Telangana, India – 500052</p><p class="footer-contact"><i class="bi bi-globe me-2"></i>www.trillion-energies.com</p><button class="btn btn-outline-light btn-sm mt-2" type="button" data-bs-toggle="modal" data-bs-target="#enquiryModal">Send an enquiry</button></div>
  </div><div class="footer-bottom"><span>© <span id="year"></span> TRILLION ENERGIES (OPC) PVT LTD. All rights reserved.</span><span>GST No: 36AAMCT7011K1Z2</span></div></div></footer>`;
  document.getElementById('year').textContent = new Date().getFullYear();
}

// Shared enquiry popup available on every page through the header and footer buttons.
const enquiryModal = document.createElement('div');
enquiryModal.innerHTML = `
<div class="modal fade" id="enquiryModal" tabindex="-1" aria-labelledby="enquiryModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
    <div class="modal-content enquiry-modal">
      <div class="modal-header">
        <div><span class="eyebrow dark">TRILLION ENERGIES</span><h2 class="modal-title fs-3 mt-2" id="enquiryModalLabel">Send an enquiry</h2><p class="text-secondary mb-0 small">Tell us how we can help. Our team will be glad to hear from you.</p></div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="globalEnquiryForm">
        <div class="modal-body">
          <div class="row g-3">
            <div class="col-md-6"><label for="popupName" class="form-label">Your name *</label><input id="popupName" name="name" class="form-control" autocomplete="name" required placeholder="Full name"></div>
            <div class="col-md-6"><label for="popupEmail" class="form-label">Email address *</label><input id="popupEmail" name="email" type="email" class="form-control" autocomplete="email" required placeholder="name@example.com"></div>
            <div class="col-md-6"><label for="popupPhone" class="form-label">Phone number</label><input id="popupPhone" name="phone" type="tel" class="form-control" autocomplete="tel" placeholder="Phone number (optional)"></div>
            <div class="col-md-6"><label for="popupSubject" class="form-label">Subject *</label><input id="popupSubject" name="subject" class="form-control" required placeholder="How can we help?"></div>
            <div class="col-12"><label for="popupMessage" class="form-label">Message *</label><textarea id="popupMessage" name="message" class="form-control" rows="4" required placeholder="Please describe your enquiry..."></textarea></div>
          </div>
          <p id="popupFormNote" class="form-note mb-0" role="status">Your email application will open with your enquiry ready to send.</p>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn btn-primary">Prepare email <i class="bi bi-arrow-up-right ms-2"></i></button></div>
      </form>
    </div>
  </div>
</div>`;
document.body.appendChild(enquiryModal.firstElementChild);

window.addEventListener('load', () => setTimeout(() => document.body.classList.add('loaded'), 450));

function prepareEmail(form, fields, noteElement) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = Object.fromEntries(fields.map(id => [id, document.getElementById(id).value.trim()]));
    const body = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || 'Not provided'}\n\n${values.message}`;
    const subject = values.subject || 'Website enquiry';
    noteElement.textContent = 'Opening your email application. If it does not open, email sales@trillion-energies.com directly.';
    window.location.href = `mailto:sales@trillion-energies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const popupForm = document.getElementById('globalEnquiryForm');
if (popupForm) {
  prepareEmail(popupForm, ['popupName','popupEmail','popupPhone','popupSubject','popupMessage'], document.getElementById('popupFormNote'));
}

// Keep the dedicated Contact page form working as well.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  prepareEmail(contactForm, ['name','email','subject','message'], document.getElementById('formNote'));
}

// Back-to-top control only. Call and WhatsApp buttons have been removed.
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.title = 'Back to top';
backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
document.body.appendChild(backToTop);
const updateBackToTop = () => backToTop.classList.toggle('visible', window.scrollY > 350);
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
