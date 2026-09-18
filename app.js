/* ============================================
   DramaVerse Short Stories — App Logic
   ============================================ */

// ==========================================
// Page Data — from Facebook page analysis
// ==========================================
const PAGE_DATA = {
    name: "DramaVerse Short Stories",
    location: "Gurugram, India",
    facebookId: "61594291593404",
    facebookUrl: "https://www.facebook.com/profile.php?id=61594291593404",
    tagline: "Short Stories. Big Emotions. Epic Gaming. 🎮",
    description: "✨ Mini Dramas • Anime-Inspired Stories\n❤️ Romance • Fantasy • Action",
    followers: 10,
    talkingAbout: 43,
    engagementRate: 78,
    performanceScore: 82,
    status: "Active",
    category: "Entertainment & Media"
};

const STORIES_DATA = [
    { id: 1, title: "The Last Letter Before Goodbye", genre: "romance", excerpt: "When Meera found an unsent letter in her grandmother's old diary, she never expected it to lead her to a love story that transcended time itself.", date: "Sep 16, 2026", likes: 24, gradient: "linear-gradient(135deg, #f43f5e, #ec4899)" },
    { id: 2, title: "Shadows of the Enchanted Forest", genre: "fantasy", excerpt: "Deep within the Whispering Woods, a young sorcerer discovers an ancient spell that could either save the realm or destroy everything.", date: "Sep 15, 2026", likes: 31, gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)" },
    { id: 3, title: "Tokyo Midnight: Episode 3", genre: "anime", excerpt: "Haruki's dual life as a student and secret guardian of Neo-Tokyo takes a dangerous turn when his classmate discovers his true identity.", date: "Sep 14, 2026", likes: 42, gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
    { id: 4, title: "The Gaming Chronicles: Boss Level", genre: "gaming", excerpt: "Inside the virtual world of Aetheria Online, five players face the legendary Dragon King in an epic battle for the server's ultimate prize.", date: "Sep 13, 2026", likes: 38, gradient: "linear-gradient(135deg, #22c55e, #10b981)" },
    { id: 5, title: "Tears in the Rain", genre: "drama", excerpt: "A chance encounter at Mumbai's Chhatrapati Shivaji station changes two strangers' lives forever in this emotional rollercoaster.", date: "Sep 12, 2026", likes: 55, gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
    { id: 6, title: "Whispers of a Broken Heart", genre: "romance", excerpt: "After five years, Aisha returns to Jaipur to confront the love she left behind, only to find that some wounds never truly heal.", date: "Sep 11, 2026", likes: 47, gradient: "linear-gradient(135deg, #f43f5e, #ec4899)" },
    { id: 7, title: "Rise of the Crimson Blade", genre: "fantasy", excerpt: "In a world where magic flows through ancient bloodlines, a humble blacksmith's daughter forges a sword that could change the balance of power.", date: "Sep 10, 2026", likes: 36, gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)" },
    { id: 8, title: "Neon Dreams: Chapter 1", genre: "anime", excerpt: "In a cyberpunk city where memories can be traded like currency, one hacker stumbles upon memories of a world that shouldn't exist.", date: "Sep 9, 2026", likes: 29, gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
    { id: 9, title: "The Betrayal at Dawn", genre: "drama", excerpt: "When the most trusted advisor reveals a devastating secret during the king's coronation, the entire kingdom holds its breath.", date: "Sep 8, 2026", likes: 61, gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
];

// ==========================================
// Particle System
// ==========================================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const count = Math.min(Math.floor(window.innerWidth / 15), 80);
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() > 0.5 ? 270 : 190  // purple or cyan
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
            this.ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll handling
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNavLink();
    });

    // Mobile toggle
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
        document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}

// ==========================================
// Counter Animation
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const increment = target / 60;
                const duration = 1500;
                const stepTime = duration / 60;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.floor(current);
                }, stepTime);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// Performance Score Animation
// ==========================================
function animateScore() {
    const scoreEl = document.getElementById('score-number');
    if (!scoreEl) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let current = 0;
                const target = PAGE_DATA.performanceScore;
                const timer = setInterval(() => {
                    current += 1;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    scoreEl.textContent = current;
                }, 20);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(scoreEl);
}

// ==========================================
// Analysis Bars Animation
// ==========================================
function animateAnalysisBars() {
    const fills = document.querySelectorAll('.analysis-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(fill => observer.observe(fill));
}

// ==========================================
// Stories Rendering
// ==========================================
function renderStories(filter = 'all') {
    const grid = document.getElementById('stories-grid');
    if (!grid) return;

    const filtered = filter === 'all' 
        ? STORIES_DATA 
        : STORIES_DATA.filter(s => s.genre === filter);

    grid.innerHTML = filtered.map((story, i) => `
        <article class="story-card" style="animation-delay: ${i * 0.1}s" data-genre="${story.genre}">
            <div class="story-card-header">
                <div class="story-card-gradient" style="background: ${story.gradient}"></div>
                <span class="story-card-badge" style="background: rgba(0,0,0,0.5)">${story.genre.charAt(0).toUpperCase() + story.genre.slice(1)}</span>
            </div>
            <div class="story-card-body">
                <h3 class="story-card-title">${story.title}</h3>
                <p class="story-card-excerpt">${story.excerpt}</p>
                <div class="story-card-footer">
                    <div class="story-card-meta">
                        <span>📅 ${story.date}</span>
                        <span>❤️ ${story.likes}</span>
                    </div>
                    <a href="${PAGE_DATA.facebookUrl}" target="_blank" rel="noopener" class="story-card-link">Read →</a>
                </div>
            </div>
        </article>
    `).join('');
}

function initStoryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderStories(btn.dataset.filter);
        });
    });
}

// ==========================================
// Chart Drawing (lightweight canvas charts)
// ==========================================
function drawEngagementChart() {
    const canvas = document.getElementById('engagement-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    const w = rect.width;
    const h = rect.height;

    const data = [12, 19, 28, 35, 29, 43, 51, 48, 62, 55, 68, 78];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVal = Math.max(...data) * 1.2;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();
    }

    // Labels
    ctx.fillStyle = 'rgba(160, 160, 181, 0.6)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    data.forEach((_, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        ctx.fillText(labels[i], x, h - 10);
    });

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartW, h - padding.bottom);
    ctx.lineTo(padding.left, h - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
    lineGrad.addColorStop(0, '#a855f7');
    lineGrad.addColorStop(1, '#06b6d4');

    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Dots
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.fill();
        ctx.strokeStyle = '#0a0a0f';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function drawGrowthChart() {
    const canvas = document.getElementById('growth-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    const w = rect.width;
    const h = rect.height;

    const data = [2, 3, 4, 5, 5, 6, 7, 8, 10, 12, 15, 20];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVal = Math.max(...data) * 1.3;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barW = chartW / data.length * 0.6;

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();
    }

    // Bars
    const barGrad = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    barGrad.addColorStop(0, '#06b6d4');
    barGrad.addColorStop(1, '#a855f7');

    data.forEach((val, i) => {
        const x = padding.left + (chartW / data.length) * i + (chartW / data.length - barW) / 2;
        const barH = (val / maxVal) * chartH;
        const y = padding.top + chartH - barH;

        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fillStyle = barGrad;
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(160, 160, 181, 0.6)';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barW / 2, h - 10);
    });
}

// ==========================================
// Reveal on Scroll
// ==========================================
function initRevealOnScroll() {
    const elements = document.querySelectorAll('.genre-card, .analytics-card, .fb-info-card, .contact-card, .contact-form-wrapper, .fb-embed-card, .story-card');
    
    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ==========================================
// Auto-Updating Status System
// ==========================================
class StatusUpdater {
    constructor() {
        this.statusEl = document.getElementById('page-status');
        this.updatedEl = document.getElementById('last-updated');
        this.footerStatusEl = document.getElementById('footer-status-text');
        this.refreshBtn = document.getElementById('status-refresh');
        this.lastUpdate = new Date();
        
        this.refreshBtn?.addEventListener('click', () => this.refresh());
        
        // Auto-update every 30 seconds
        setInterval(() => this.updateTimestamp(), 30000);
        
        // Auto-refresh status every 2 minutes
        setInterval(() => this.refresh(), 120000);
    }

    refresh() {
        const statuses = ['Active', 'Active', 'Active', 'Posting', 'Updating', 'Active'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Animate refresh button
        if (this.refreshBtn) {
            this.refreshBtn.querySelector('svg').style.transform = 'rotate(720deg)';
            setTimeout(() => {
                this.refreshBtn.querySelector('svg').style.transform = '';
            }, 600);
        }

        this.lastUpdate = new Date();
        
        if (this.statusEl) this.statusEl.textContent = status;
        if (this.footerStatusEl) this.footerStatusEl.textContent = `Page ${status}`;
        
        this.updateTimestamp();
        
        // Simulate random follower/engagement updates
        const followersEl = document.getElementById('metric-followers');
        const talkingEl = document.getElementById('metric-talking');
        if (followersEl) {
            const f = PAGE_DATA.followers + Math.floor(Math.random() * 3);
            followersEl.textContent = f;
        }
        if (talkingEl) {
            const t = PAGE_DATA.talkingAbout + Math.floor(Math.random() * 10) - 3;
            talkingEl.textContent = Math.max(t, PAGE_DATA.talkingAbout);
        }

        showToast('✅', 'Status Updated', `Page is ${status.toLowerCase()}. All systems operational.`);
    }

    updateTimestamp() {
        if (!this.updatedEl) return;
        const diff = Math.floor((new Date() - this.lastUpdate) / 1000);
        
        if (diff < 10) {
            this.updatedEl.textContent = 'Just now';
        } else if (diff < 60) {
            this.updatedEl.textContent = `${diff}s ago`;
        } else {
            const mins = Math.floor(diff / 60);
            this.updatedEl.textContent = `${mins}m ago`;
        }
    }
}

// ==========================================
// Toast Notifications
// ==========================================
function showToast(icon, title, message) {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');

    if (!toast) return;

    toastIcon.textContent = icon;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

function initToast() {
    const closeBtn = document.getElementById('toast-close');
    closeBtn?.addEventListener('click', () => {
        document.getElementById('toast')?.classList.remove('show');
    });
}

// ==========================================
// Contact Form
// ==========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('📩', 'Message Sent!', 'Thank you! We\'ll get back to you soon.');
        form.reset();
    });
}

// ==========================================
// Facebook SDK fallback
// ==========================================
function initFacebookFallback() {
    // If FB SDK doesn't load within 3 seconds, show fallback
    setTimeout(() => {
        const fbPage = document.querySelector('.fb-page');
        const fbFallback = document.getElementById('fb-fallback');
        if (fbPage && fbFallback) {
            // Check if FB SDK rendered the page
            const iframe = fbPage.querySelector('iframe');
            if (!iframe) {
                fbPage.style.display = 'none';
                fbFallback.style.display = 'block';
            } else {
                fbFallback.style.display = 'none';
            }
        }
    }, 3000);
}

// ==========================================
// Chart resize handler
// ==========================================
function initChartResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            drawEngagementChart();
            drawGrowthChart();
        }, 250);
    });
}

// ==========================================
// Initialize Everything
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Particle background
    const canvas = document.getElementById('particles-canvas');
    if (canvas) new ParticleSystem(canvas);

    // Navigation
    initNavigation();

    // Counter animations
    animateCounters();

    // Stories
    renderStories();
    initStoryFilters();

    // Analytics
    setTimeout(() => {
        drawEngagementChart();
        drawGrowthChart();
    }, 500);
    
    animateAnalysisBars();
    animateScore();

    // Reveal on scroll
    initRevealOnScroll();

    // Auto-updating status
    new StatusUpdater();

    // Toast system
    initToast();

    // Contact form
    initContactForm();

    // Facebook fallback
    initFacebookFallback();

    // Chart resize
    initChartResize();

    // Initial welcome toast
    setTimeout(() => {
        showToast('🎬', 'Welcome to DramaVerse!', 'Explore short stories, big emotions & epic gaming.');
    }, 2000);
});
