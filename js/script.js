// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Variables globales
let currentSlide = 0;
let typewriterInterval;
let highlightInterval;
const slides = document.querySelectorAll('.hero-slide');
const typewriterElement = document.getElementById('typewriter');
const highlightElement = document.getElementById('highlight-text');
const serviceCards = document.querySelectorAll('.service-card');
const serviceDetail = document.getElementById('serviceDetail');
const serviceTitle = document.getElementById('serviceTitle');
const serviceDescription = document.getElementById('serviceDescription');
const serviceBackground = document.getElementById('serviceBackground');

// Textos para el efecto de máquina de escribir
const textVariations = [
    "para Gobierno",
    "Empresarial",
    "Residencial",
    "para Eventos",
    "Industrial",
    "en Centros Comerciales",
    "de Salud"
];

// Datos de los servicios
const servicesData = {
    "seguridad-fisica": {
        title: "Seguridad Física",
        description: "Nuestro servicio de seguridad física incluye personal de vigilancia altamente capacitado, rondines de inspección, control de accesos y presencia disuasiva en puntos estratégicos. Contamos con guardias certificados en primeros auxilios, manejo de situaciones de crisis y protocolos de seguridad específicos para cada tipo de cliente. Ofrecemos seguridad perimetral, control de acceso a instalaciones y vigilancia 24/7.",
        bgImage: "img/Sector_Salud.jpg"
    },
    "seguridad-monitoreo": {
        title: "Seguridad de Monitoreo",
        description: "Sistemas de videovigilancia de última generación con monitoreo 24/7, alarmas de intrusión, sensores de movimiento y respuesta inmediata ante incidentes. Contamos con un centro de monitoreo propio con tecnología de punta y personal capacitado para detectar y responder a cualquier anomalía. Implementamos cámaras IP de alta resolución, grabación en la nube y alertas en tiempo real.",
        bgImage: "img/monitoreo.jpg"
    },
    "seguridad-traslado": {
        title: "Seguridad de Traslado",
        description: "Protección especializada para el traslado de valores, ejecutivos, personal clave y mercancías de alto valor. Contamos con vehículos blindados, escoltas capacitados y rutas seguras. Nuestro servicio incluye análisis de riesgos, planificación de rutas, comunicación encriptada y respuesta rápida ante emergencias. Ideal para bancos, empresas de valores y ejecutivos de alto perfil.",
        bgImage: "img/traslado.jpg"
    },
    "seguridad-tecnologica": {
        title: "Seguridad Tecnológica",
        description: "Soluciones tecnológicas avanzadas que incluyen control de acceso biométrico, reconocimiento facial, sistemas de alarma inteligentes, detección de intrusión perimetral y automatización de seguridad. Integramos las últimas tecnologías como IA para análisis de comportamiento, sensores térmicos y sistemas de respuesta automatizada para máxima protección.",
        bgImage: "img/tecnologico.jpg"
    },
    "seguridad-vehicular": {
        title: "Seguridad Vehicular",
        description: "Protección integral para flotas vehiculares que incluye blindaje, rastreo satelital GPS, sistemas de alerta de emergencia, conductores capacitados y mantenimiento preventivo. Ofrecemos soluciones para empresas con flotas de transporte, ejecutivos que requieren movilidad segura y protección para vehículos de alto valor.",
        bgImage: "img/Capufe.jpg"
    },
    "seguridad-eventos": {
        title: "Seguridad para Eventos",
        description: "Protección integral para todo tipo de eventos: corporativos, sociales, culturales y deportivos. Incluye control de accesos, revisión de invitados, manejo de multitudes, seguridad perimetral, protección VIP y respuesta ante emergencias. Diseñamos planes de seguridad personalizados para cada evento considerando el perfil de los asistentes y las características del lugar.",
        bgImage: "img/Sat.jpg"
    }
};

// Preguntas frecuentes
const faqData = [
    {
        question: "¿Cuándo se fundó Grupo Pryse?",
        answer: "Grupo Pryse fue fundado en el año 2008, acumulando más de 15 años de experiencia en el sector de seguridad privada."
    },
    {
        question: "¿Qué servicios ofrecen?",
        answer: "Ofrecemos seguridad física, seguridad tecnológica, seguridad corporativa, seguridad residencial, seguridad para eventos, consultoría en seguridad y monitoreo 24/7."
    },
    {
        question: "¿Cuál es el valor agregado?",
        answer: "Nuestro valor agregado es la integración de soluciones personalizadas que combinan tecnología de punta con personal altamente capacitado y procesos certificados internacionalmente."
    },
    {
        question: "¿A qué sectores van sus servicios?",
        answer: "Atendemos a los sectores gubernamental, empresarial, industrial, residencial, comercial, de salud, educativo y de eventos especiales."
    },
    {
        question: "¿Qué garantía ofrecen a sus clientes?",
        answer: "Garantizamos la efectividad de nuestros servicios mediante contratos con cláusulas de cumplimiento, seguros de responsabilidad civil y certificaciones internacionales de calidad."
    },
    {
        question: "¿Cuál es la promesa de servicio?",
        answer: "Nuestra promesa es brindar tranquilidad absoluta mediante la protección eficaz de personas, bienes y patrimonio, con respuesta inmediata ante cualquier eventualidad."
    }
];

// Chatbot preguntas predefinidas
const chatbotQuestions = [
    "¿Cuál es su horario de atención?",
    "¿Ofrecen servicios de seguridad para eventos?",
    "¿Cómo puedo solicitar un presupuesto?",
    "¿Tienen servicio de monitoreo 24/7?",
    "¿Ofrecen seguridad vehicular?",
    "¿Qué incluye la seguridad tecnológica?"
];

const chatbotAnswers = {
    "¿Cuál es su horario de atención?": "Nuestro centro de atención está disponible las 24 horas del día, los 7 días de la semana, para emergencias. El horario administrativo es de lunes a viernes de 9:00 a 18:00 hrs.",
    "¿Ofrecen servicios de seguridad para eventos?": "Sí, ofrecemos seguridad especializada para eventos públicos y privados, incluyendo control de accesos, vigilancia perimetral, protección VIP y gestión de multitudes.",
    "¿Cómo puedo solicitar un presupuesto?": "Puede solicitar un presupuesto personalizado contactándonos por teléfono al +52 55 1234 5678, por correo a contacto@grupopryse.com o mediante nuestro formulario de contacto.",
    "¿Tienen servicio de monitoreo 24/7?": "Sí, contamos con un centro de monitoreo operativo las 24 horas del día, los 365 días del año, con personal capacitado y tecnología de última generación.",
    "¿Ofrecen seguridad vehicular?": "Sí, ofrecemos seguridad vehicular completa que incluye blindaje, rastreo satelital, conductores capacitados y protección para flotas empresariales.",
    "¿Qué incluye la seguridad tecnológica?": "Nuestra seguridad tecnológica incluye control de acceso biométrico, reconocimiento facial, sistemas de alarma inteligentes, videovigilancia avanzada y automatización de seguridad."
};

// Clase WhatsApp Protector
class WhatsAppProtector {
    constructor() {
        this.numeroProtegido = this.generarNumero();
        this.inicializado = false;
    }

    // Generar el número de forma segura
    generarNumero() {
        // Dividir el número en partes y combinarlo
        const partes = [
            String.fromCharCode(53, 50), // "52"
            String.fromCharCode(55, 55, 55), // "777"
            String.fromCharCode(52, 52, 52), // "444"
            String.fromCharCode(57, 49, 48, 55) // "9107"
        ];
        return partes.join('');
    }

    // Crear el botón de WhatsApp
    crearBoton() {
        const boton = document.createElement('a');
        boton.id = 'WhatsAppBtn';
        boton.className = 'float-wa whatsapp-btn';
        boton.target = '_blank';
        boton.rel = 'noopener noreferrer';
        
        // Solo asignar el enlace cuando sea necesario
        boton.addEventListener('click', (e) => {
            if (!boton.href) {
                boton.href = `https://wa.me/${this.numeroProtegido}?text=Hola,%20me%20gustaría%20solicitar%20más%20información.`;
            }
        });
        boton.innerHTML = '<i class="fab fa-whatsapp fa-lg"></i>';
        return boton;
    }

    // Inicializar la protección
    inicializar() {
        if (this.inicializado) return;
        
        // Verificar si ya existe el botón
        let botonExistente = document.getElementById('WhatsAppBtn');
        
        if (botonExistente) {
            // Configurar el enlace existente
            botonExistente.addEventListener('click', (e) => {
                if (!botonExistente.href.includes('wa.me')) {
                    botonExistente.href = `https://wa.me/${this.numeroProtegido}?text=Hola,%20me%20gustaría%20solicitar%20más%20información.`;
                }
            });
        } else {
            // Crear nuevo botón
            const nuevoBoton = this.crearBoton();
            document.body.appendChild(nuevoBoton);
        }
        this.inicializado = true;
    }
}

// ==================== FUNCIONES DEL SLIDER HERO ====================

// Funciones del slider hero
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Efecto de máquina de escribir para el texto destacado
function typeWriterEffect(text, element, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Cambiar el texto destacado
let currentTextIndex = 0;
function changeHighlightedText() {
    const text = textVariations[currentTextIndex];
    typeWriterEffect(text, highlightElement, 70);
    
    currentTextIndex = (currentTextIndex + 1) % textVariations.length;
}

// ==================== FUNCIÓN DE CONTADORES ====================

// Animación de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Velocidad de animación
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / speed;
        let current = 0;
        
        // Asegurarse de que el contador esté en 0 al inicio
        counter.textContent = "0";
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ==================== FUNCIONES DE SERVICIOS ====================

// Mostrar detalles del servicio
function showServiceDetails(serviceId) {
    const service = servicesData[serviceId];
    if (!service) return;
    
    // Actualizar contenido
    serviceTitle.textContent = service.title;
    serviceDescription.textContent = service.description;
    
    // Cambiar imagen de fondo
    serviceBackground.style.backgroundImage = `url('${service.bgImage}')`;
    
    // Mostrar detalle
    serviceDetail.classList.add('active');
    
    // Actualizar tarjeta activa
    serviceCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-service') === serviceId) {
            card.classList.add('active');
        }
    });
}

// ==================== FUNCIONES DE PESTAÑAS ====================

// Cambiar pestañas (Misión, Visión, Valores, Objetivos)
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Actualizar botones activos
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar contenido activo
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// ==================== FUNCIONES DE FAQ ====================

// Configurar preguntas frecuentes
function setupFAQ() {
    const faqContainer = document.getElementById('faqAccordion');
    
    faqData.forEach((faq, index) => {
        const faqId = `faq${index}`;
        const faqItem = document.createElement('div');
        faqItem.className = 'accordion-item';
        
        faqItem.innerHTML = `
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${faqId}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="${faqId}">
                    ${faq.question}
                </button>
            </h2>
            <div id="${faqId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    ${faq.answer}
                </div>
            </div>
        `;
        
        faqContainer.appendChild(faqItem);
    });
}

// ==================== CHATBOT OPTIMIZADO ====================

// Configurar chatbot optimizado con limpieza al cerrar
function setupChatbot() {
    const chatBtn = document.getElementById('chatBtn');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChat = document.getElementById('closeChat');
    let chatbotBody = document.getElementById('chatbotBody');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    
    let isChatOpen = false;
    let cleanupTimeout = null;
    
    // Función para limpiar completamente el chat
    function performCleanup() {
        // Solo limpiar si el chat no está abierto
        if (!chatbotContainer.classList.contains('active')) {
            // Método rápido: reemplazar el elemento completo
            const newChatbotBody = document.createElement('div');
            newChatbotBody.id = 'chatbotBody';
            newChatbotBody.className = 'chatbot-body';
            chatbotBody.parentNode.replaceChild(newChatbotBody, chatbotBody);
            
            // Actualizar la referencia
            chatbotBody = newChatbotBody;
            
            // Limpiar input
            chatInput.value = '';
            chatInput.blur();
            
            console.log('Chat limpiado completamente');
        }
    }
    
    // Cleanup con debouncing
    function debouncedCleanup() {
        if (cleanupTimeout) {
            clearTimeout(cleanupTimeout);
        }
        
        cleanupTimeout = setTimeout(() => {
            performCleanup();
        }, 500);
    }
    
    // Función para iniciar el chat
    function iniciarChat() {
        // Mensaje inicial del bot
        setTimeout(() => {
            addMessageToChatbot("¡Hola! Soy el asistente virtual de Grupo Pryse. ¿En qué puedo ayudarte hoy?", false);
        }, 300);
        
        // Preguntas sugeridas después de un momento
        setTimeout(() => {
            showChatbotQuestions();
        }, 800);
        
        isChatOpen = true;
    }
    
    // Abrir chatbot
    chatBtn.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
        
        if (!isChatOpen) {
            iniciarChat();
        }
        
        // Enfocar el input
        setTimeout(() => {
            chatInput.focus();
        }, 100);
    });
    
    // Cerrar chatbot
    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        isChatOpen = false;
        debouncedCleanup();
    });
    
    // Mostrar preguntas predefinidas
    function showChatbotQuestions() {
        addMessageToChatbot("Puedes seleccionar una de estas preguntas frecuentes o escribir tu propia pregunta:", false);
        
        // Usar event delegation para mejor rendimiento
        chatbotQuestions.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.className = 'chatbot-question';
            questionElement.textContent = question;
            questionElement.dataset.question = question;
            
            chatbotBody.appendChild(questionElement);
        });
        
        // Event delegation para todas las preguntas
        chatbotBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('chatbot-question')) {
                const question = e.target.dataset.question;
                addMessageToChatbot(question, true);
                setTimeout(() => {
                    addMessageToChatbot(chatbotAnswers[question] || "Lo siento, no tengo información sobre esa pregunta en este momento. Por favor, contacte a nuestro equipo.", false);
                }, 500);
            }
        });
    }
    
    // Enviar mensaje
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessageToChatbot(message, true);
            chatInput.value = '';
            
            // Respuesta automatizada
            setTimeout(() => {
                let response = "Gracias por tu pregunta. Para obtener una respuesta más precisa y personalizada, te recomiendo contactar directamente a nuestro equipo de atención al cliente. ¿Hay algo más en lo que pueda ayudarte?";
                
                const lowerMessage = message.toLowerCase();
                if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('presupuesto') || lowerMessage.includes('cotización')) {
                    response = "Para obtener un presupuesto personalizado, por favor contacte a nuestro equipo de ventas al teléfono +52 55 1234 5678 o envíe un correo a ventas@grupopryse.com. ¿Necesitas ayuda con algo más?";
                } else if (lowerMessage.includes('horario') || lowerMessage.includes('atención') || lowerMessage.includes('hora')) {
                    response = chatbotAnswers["¿Cuál es su horario de atención?"] + " ¿Hay algo más en lo que pueda asistirte?";
                } else if (lowerMessage.includes('evento')) {
                    response = chatbotAnswers["¿Ofrecen servicios de seguridad para eventos?"] + " Para más detalles específicos, puedes contactar a nuestro departamento de eventos.";
                } else if (lowerMessage.includes('hola') || lowerMessage.includes('buenas')) {
                    response = "¡Hola! ¿En qué puedo ayudarte hoy?";
                } else if (lowerMessage.includes('gracias') || lowerMessage.includes('agradezco')) {
                    response = "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?";
                }
                
                addMessageToChatbot(response, false);
            }, 800);
        }
    }
    
    sendChat.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Añadir mensaje al chat
    function addMessageToChatbot(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
    
    // Cerrar chatbot al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (chatbotContainer.classList.contains('active') && 
            !chatbotContainer.contains(e.target) && 
            e.target !== chatBtn) {
            
            chatbotContainer.classList.remove('active');
            isChatOpen = false;
            debouncedCleanup();
        }
    });
}

// ==================== NAVBAR CON EFECTOS DE SCROLL ====================

// Configurar efectos de scroll mejorados
function setupScrollEffects() {
    const infoHeader = document.querySelector('.info-header');
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    // Hacer visible el navbar después de un breve retraso
    setTimeout(() => {
        navbar.classList.add('visible');
    }, 500);
    
    // Función optimizada para scroll
    function updateNavbarOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ocultar/mostrar header informativo
        if (scrollTop > 80) {
            infoHeader.classList.add('hidden');
        } else {
            infoHeader.classList.remove('hidden');
        }
        
        // Cambiar navbar de transparente a blanco al hacer scroll
        if (scrollTop > 150) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Efecto de opacidad sutil mientras se hace scroll
        if (scrollTop > 50 && scrollTop < 150) {
            const opacity = Math.min((scrollTop - 50) / 100, 0.7);
            navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            navbar.style.backdropFilter = `blur(${opacity * 10}px)`;
        } else if (scrollTop <= 50) {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    // Scroll optimizado con requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbarOnScroll();
            });
            ticking = true;
        }
    });
    
    // Asegurar que el navbar tenga la clase correcta al cargar
    window.addEventListener('load', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 150) {
            navbar.classList.add('scrolled');
            navbar.classList.add('visible');
        } else if (scrollTop > 50) {
            const opacity = Math.min((scrollTop - 50) / 100, 0.7);
            navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            navbar.style.backdropFilter = `blur(${opacity * 10}px)`;
            navbar.classList.add('visible');
        } else {
            navbar.classList.add('visible');
        }
        
        // Ocultar/mostrar header informativo
        if (scrollTop > 80) {
            infoHeader.classList.add('hidden');
        }
    });
    
    // También actualizar en resize
    window.addEventListener('resize', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 150) {
            navbar.classList.add('scrolled');
        }
    });
}

// ==================== FORMULARIO DE CONTACTO ====================

// Manejar envío del formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aquí normalmente se enviaría el formulario a un servidor
        alert('¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.');
        contactForm.reset();
    });
}

// ==================== NAVEGACIÓN SUAVE ====================

// Configurar navegación suave
function setupSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Actualizar clase activa en navbar
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ==================== INICIALIZACIÓN PRINCIPAL ====================

// Inicializar todo cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar slider
    setInterval(nextSlide, 5000);
    
    // Iniciar efecto de máquina de escribir
    changeHighlightedText();
    setInterval(changeHighlightedText, 3000);
    
    // Configurar observadores para animaciones de contadores
    const observerOptions = {
        threshold: 0.3
    };
    
    // Observador para la sección de estadísticas (nueva)
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones con estadísticas
    const statsSections = document.querySelectorAll('.stats-section, .hero-section .stats-container');
    statsSections.forEach(section => {
        if (section) statsObserver.observe(section);
    });
    
    // Configurar eventos de servicios
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.getAttribute('data-service');
            showServiceDetails(serviceId);
        });
    });
    
    // Configurar pestañas
    setupTabs();
    
    // Configurar preguntas frecuentes
    setupFAQ();
    
    // Configurar chatbot
    setupChatbot();
    
    // Configurar efectos de scroll
    setupScrollEffects();
    
    // Configurar formulario de contacto
    setupContactForm();
    
    // Configurar navegación suave
    setupSmoothNavigation();
    
    // Cerrar chatbot al hacer clic fuera (adicional)
    document.addEventListener('click', (e) => {
        const chatbotContainer = document.getElementById('chatbotContainer');
        const chatBtn = document.getElementById('chatBtn');
        
        if (chatbotContainer.classList.contains('active') && 
            !chatbotContainer.contains(e.target) && 
            e.target !== chatBtn) {
            
            chatbotContainer.classList.remove('active');
            
            // Limpiar después de cerrar
            setTimeout(() => {
                const chatbotBody = document.getElementById('chatbotBody');
                if (chatbotBody) {
                    chatbotBody.innerHTML = '';
                }
            }, 300);
        }
    });
    
    // Inicializar WhatsApp Protector
    const whatsAppProtector = new WhatsAppProtector();
    whatsAppProtector.inicializar();
});

// ==================== EVENTOS ADICIONALES ====================

// Recargar la página cuando se haga clic en el logo para resetear todo
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.navbar-brand');
    if (logo) {
        logo.addEventListener('click', (e) => {
            if (e.target.closest('a[href="#"]')) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Resetear el chatbot si está abierto
                const chatbotContainer = document.getElementById('chatbotContainer');
                if (chatbotContainer.classList.contains('active')) {
                    chatbotContainer.classList.remove('active');
                    const chatbotBody = document.getElementById('chatbotBody');
                    if (chatbotBody) {
                        chatbotBody.innerHTML = '';
                    }
                }
            }
        });
    }
});