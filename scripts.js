// Atualiza o ano automaticamente no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Efeito de scroll na Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('nav-scrolled', window.scrollY > 30);
});

// Lógica de abrir/fechar o Menu Mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

const toggleMenu = () => mobileMenu.classList.toggle('open');

if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Animações de Fade-Up ao rolar a página
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Animação dos contadores numéricos
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / 60;
            let current = 0;
            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    // Adiciona o sufixo correto dependendo do número
                    if (target === 98) counter.textContent = target + '%';
                    else counter.textContent = target + '+';
                }
            };
            update();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// Simulação de envio do formulário de contato
function handleSubmit(e) {
    e.preventDefault();
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const successMsg = document.getElementById('successMsg');
    
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    
    // Simula um tempo de carregamento de 1.5s
    setTimeout(() => {
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        successMsg.classList.remove('hidden');
        e.target.reset();
        
        // Esconde a mensagem de sucesso após 5 segundos
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 5000);
    }, 1500);
}